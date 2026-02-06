# 🚨 URGENT: Fix Wryko Onboarding Database Error

## Issue
The onboarding flow shows "Failed to create your account. Please try again." because the `clients` table is missing the `onboarding_metadata` column.

## Immediate Fix Steps

### STEP 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select your Wryko project
3. Go to "SQL Editor" in the sidebar

### STEP 2: Run This SQL Migration
```sql
-- Add missing onboarding_metadata column
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS onboarding_metadata jsonb DEFAULT NULL;

-- Verify it was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'clients' 
AND column_name = 'onboarding_metadata';
```

### STEP 3: Check Table Structure
```sql
-- See all columns in clients table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'clients'
ORDER BY ordinal_position;
```

### STEP 4: Test the Fix
After running the SQL:
1. Go to https://www.wryko.com/onboarding
2. Complete the 4-step onboarding process  
3. It should now work without the error!

## Alternative: Quick Backend Fix
If the database fix is complex, update the onboarding function to be more resilient:

Replace the `completeClientOnboarding` function in `lib/supabase/actions.ts` with a version that handles missing columns gracefully.

## Expected Result
✅ Onboarding completes successfully
✅ User gets redirected to dashboard
✅ Client record created in database
✅ n8n webhook triggered for Engine G

## This is the ONLY remaining issue blocking full production launch! 🚀