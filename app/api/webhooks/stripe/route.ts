import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const userId = session.metadata?.supabase_user_id;
          
          if (userId) {
            // Update user profile with subscription info
            await supabase
              .from('profiles')
              .update({
                stripe_subscription_id: subscription.id,
                subscription_status: subscription.status,
                subscription_plan: session.metadata?.plan || 'STARTER',
                stripe_customer_id: session.customer as string,
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);

            console.log(`Subscription created for user ${userId}: ${subscription.id}`);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);

          console.log(`Subscription updated for customer ${subscription.customer}: ${subscription.status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              stripe_subscription_id: null,
              subscription_status: 'canceled',
              subscription_plan: null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);

          console.log(`Subscription canceled for customer ${subscription.customer}`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', invoice.customer)
          .single();

        if (profile) {
          // Log successful payment
          console.log(`Payment succeeded for customer ${invoice.customer}: $${(invoice.amount_paid / 100).toFixed(2)}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', invoice.customer)
          .single();

        if (profile) {
          // Handle payment failure - could send notification, update status, etc.
          console.log(`Payment failed for customer ${invoice.customer}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}