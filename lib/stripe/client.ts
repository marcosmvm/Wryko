import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backwards compatibility - lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop];
  },
});

export const STRIPE_PLANS = {
  STARTER: {
    name: 'Starter',
    price: 1500,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_1Sxru1HdnJeEddwg3k2vUoE2',
    features: [
      '1,000 leads per month',
      'Basic email campaigns',
      'Email support',
      'Standard integrations'
    ]
  },
  GROWTH: {
    name: 'Growth', 
    price: 2500,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || 'price_1Sxru9HdnJeEddwg40vqSUTq',
    features: [
      '5,000 leads per month',
      'Advanced email campaigns',
      'Priority support',
      'Advanced integrations',
      'Analytics dashboard'
    ]
  },
  SCALE: {
    name: 'Scale',
    price: 4000,
    priceId: process.env.STRIPE_SCALE_PRICE_ID || 'price_1SxruFHdnJeEddwgafeChnFJ',
    features: [
      'Unlimited leads',
      'Custom campaigns',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
      'White-label options'
    ]
  }
} as const;

export type StripePlan = keyof typeof STRIPE_PLANS;