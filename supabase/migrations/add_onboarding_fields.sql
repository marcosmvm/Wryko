-- Engine G Client Onboarding: Create clients table with onboarding fields
-- This migration was applied to production on 2026-02-02

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  phone text,
  plan text DEFAULT 'pilot',
  status text DEFAULT 'onboarding',
  health_score integer DEFAULT 80,
  mrr numeric DEFAULT 0,
  notes text,
  industry text,
  website text,
  instantly_api_key text,
  has_instantly boolean DEFAULT false,
  blocked_domains text,
  blocked_countries text,
  default_niche text DEFAULT 'General',
  niche_definitions jsonb,
  target_icp text,
  company_size text,
  user_id uuid REFERENCES auth.users(id),
  onboarding_started_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index on user_id for fast lookups during onboarding check
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);

-- Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own client record"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client record"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access"
  ON clients FOR ALL
  USING (auth.role() = 'service_role');
