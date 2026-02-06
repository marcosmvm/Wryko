-- Engine G Onboarding: Add workspace configuration fields to clients table
-- These fields store Google Sheet IDs and Telegram Chat ID provided during onboarding

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS workspace_sheet_id text,
  ADD COLUMN IF NOT EXISTS telegram_chat_id text,
  ADD COLUMN IF NOT EXISTS leads_sheet_id text;
