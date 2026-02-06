import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
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