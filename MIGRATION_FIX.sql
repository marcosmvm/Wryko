-- Quick fix for missing onboarding_metadata column
-- Run this in Supabase SQL Editor

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS onboarding_metadata jsonb DEFAULT NULL;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'clients' 
AND column_name = 'onboarding_metadata';