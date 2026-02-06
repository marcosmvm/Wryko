-- Client Onboarding: Add JSONB metadata column for storing client onboarding data
-- Stores target audience, campaign preferences, and other onboarding details

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS onboarding_metadata jsonb DEFAULT NULL;
