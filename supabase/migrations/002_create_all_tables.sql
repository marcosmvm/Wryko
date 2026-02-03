-- =============================================================================
-- USER-CLIENT MAPPING (bridges auth.users to client organizations)
-- =============================================================================
create table if not exists public.user_client_map (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member', 'viewer')),
  created_at timestamptz default now(),
  unique(user_id, client_id)
);

create index idx_user_client_map_user on public.user_client_map(user_id);
create index idx_user_client_map_client on public.user_client_map(client_id);

-- =============================================================================
-- CAMPAIGNS
-- =============================================================================
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('active', 'paused', 'completed', 'draft')),
  start_date date,
  target text,
  sent integer default 0,
  daily_send integer default 0,
  domains integer default 0,
  sequences integer default 0,
  opened integer default 0,
  open_rate numeric(5,2) default 0,
  replied integer default 0,
  reply_rate numeric(5,2) default 0,
  meetings integer default 0,
  positive_replies integer default 0,
  neutral_replies integer default 0,
  negative_replies integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_campaigns_client on public.campaigns(client_id);

-- =============================================================================
-- CAMPAIGN SEQUENCES
-- =============================================================================
create table if not exists public.campaign_sequences (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  email_number integer not null,
  subject text,
  sent integer default 0,
  opened integer default 0,
  open_rate numeric(5,2) default 0,
  replied integer default 0,
  reply_rate numeric(5,2) default 0,
  created_at timestamptz default now()
);

-- =============================================================================
-- A/B TESTS
-- =============================================================================
create table if not exists public.ab_tests (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  variable text not null check (variable in ('subject_line', 'opening_line', 'cta', 'send_time')),
  variant_a text not null,
  variant_b text not null,
  status text not null default 'running' check (status in ('running', 'completed', 'paused')),
  started_at timestamptz default now(),
  completed_at timestamptz,
  results jsonb,
  created_at timestamptz default now()
);

-- =============================================================================
-- OPTIMIZATION RECOMMENDATIONS
-- =============================================================================
create table if not exists public.optimization_recommendations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  type text not null check (type in ('subject_line', 'copy', 'targeting', 'timing', 'volume')),
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  title text not null,
  description text,
  expected_impact text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'implemented', 'rejected')),
  created_at timestamptz default now()
);

-- =============================================================================
-- MEETINGS
-- =============================================================================
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  contact_name text not null,
  contact_title text,
  contact_email text,
  company_name text not null,
  company_size text,
  industry text,
  scheduled_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'no_show', 'rescheduled', 'cancelled')),
  campaign_name text,
  meeting_type text default 'discovery' check (meeting_type in ('discovery', 'demo', 'followup')),
  notes text,
  outcome text check (outcome in ('opportunity', 'not_qualified', 'pending')),
  calendar_link text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_meetings_client on public.meetings(client_id);
create index idx_meetings_scheduled on public.meetings(scheduled_at);

-- =============================================================================
-- DOMAINS
-- =============================================================================
create table if not exists public.domains (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  domain text not null,
  status text not null default 'healthy' check (status in ('healthy', 'warning', 'critical')),
  health_score integer default 100 check (health_score >= 0 and health_score <= 100),
  spf_status text default 'pass' check (spf_status in ('pass', 'fail', 'warning')),
  dkim_status text default 'pass' check (dkim_status in ('pass', 'fail', 'warning')),
  dmarc_status text default 'pass' check (dmarc_status in ('pass', 'fail', 'warning')),
  blacklisted boolean default false,
  blacklist_details text[],
  bounce_rate numeric(5,2) default 0,
  deliverability_rate numeric(5,2) default 100,
  spam_complaint_rate numeric(5,3) default 0,
  daily_volume integer default 0,
  total_sent integer default 0,
  last_checked_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_domains_client on public.domains(client_id);

-- =============================================================================
-- DOMAIN ISSUES
-- =============================================================================
create table if not exists public.domain_issues (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid not null references public.domains(id) on delete cascade,
  severity text not null check (severity in ('critical', 'warning', 'info')),
  type text not null,
  message text not null,
  detected_at timestamptz default now(),
  resolved_at timestamptz,
  auto_fixed boolean default false,
  created_at timestamptz default now()
);

-- =============================================================================
-- WEBSITE VISITORS
-- =============================================================================
create table if not exists public.website_visitors (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  company_name text not null,
  company_domain text,
  company_size text,
  industry text,
  location text,
  first_visit_at timestamptz,
  last_visit_at timestamptz,
  total_visits integer default 1,
  pages_viewed text[] default '{}',
  time_on_site integer default 0,
  intent_score text default 'low' check (intent_score in ('high', 'medium', 'low')),
  intent_signals text[] default '{}',
  status text default 'new' check (status in ('new', 'pushed_to_campaign', 'ignored')),
  campaign_id uuid references public.campaigns(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_visitors_client on public.website_visitors(client_id);

-- =============================================================================
-- VISITOR CONTACTS
-- =============================================================================
create table if not exists public.visitor_contacts (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.website_visitors(id) on delete cascade,
  name text not null,
  title text,
  email text,
  linkedin text,
  created_at timestamptz default now()
);

-- =============================================================================
-- CLIENT REQUESTS
-- =============================================================================
create table if not exists public.client_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  type text not null check (type in ('icp_update', 'campaign_pause', 'campaign_resume', 'add_leads', 'domain_request', 'copy_change', 'schedule_call', 'report_download', 'calendar_update', 'other')),
  category text not null default 'review' check (category in ('instant', 'review', 'complex')),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'rejected')),
  title text not null,
  description text,
  submitted_at timestamptz default now(),
  completed_at timestamptz,
  processing_time numeric,
  assigned_to text,
  notes text,
  created_at timestamptz default now()
);

create index idx_requests_client on public.client_requests(client_id);

-- =============================================================================
-- ENGINE ACTIVITY (client-facing)
-- =============================================================================
create table if not exists public.engine_activity (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  engine_code text not null,
  engine_name text not null,
  status text not null default 'completed' check (status in ('running', 'completed', 'failed', 'scheduled')),
  started_at timestamptz default now(),
  completed_at timestamptz,
  summary text,
  details text,
  impact text,
  affected_campaigns uuid[],
  created_at timestamptz default now()
);

create index idx_engine_activity_client on public.engine_activity(client_id);

-- =============================================================================
-- WEEKLY REPORTS
-- =============================================================================
create table if not exists public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  generated_at timestamptz default now(),
  metrics jsonb not null default '{}',
  vs_last_week jsonb default '{}',
  ai_summary text,
  key_wins text[] default '{}',
  recommendations text[] default '{}',
  pdf_url text,
  created_at timestamptz default now()
);

create index idx_reports_client on public.weekly_reports(client_id);

-- =============================================================================
-- HEALTH SCORES
-- =============================================================================
create table if not exists public.health_scores (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  overall integer not null check (overall >= 0 and overall <= 100),
  status text not null default 'healthy' check (status in ('healthy', 'warning', 'critical')),
  domain_health integer default 0,
  reply_quality integer default 0,
  engagement_level integer default 0,
  meeting_conversion integer default 0,
  risk_signals jsonb default '[]',
  trend text default 'stable' check (trend in ('improving', 'stable', 'declining')),
  last_updated_at timestamptz default now(),
  created_at timestamptz default now()
);

create index idx_health_client on public.health_scores(client_id);

-- =============================================================================
-- WEEKLY TRENDS
-- =============================================================================
create table if not exists public.weekly_trends (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  week date not null,
  week_label text,
  meetings_booked integer default 0,
  emails_sent integer default 0,
  open_rate numeric(5,2) default 0,
  reply_rate numeric(5,2) default 0,
  positive_replies integer default 0,
  created_at timestamptz default now(),
  unique(client_id, week)
);

create index idx_trends_client on public.weekly_trends(client_id);

-- =============================================================================
-- DASHBOARD METRICS (latest snapshot per client)
-- =============================================================================
create table if not exists public.dashboard_metrics (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade unique,
  meetings_booked integer default 0,
  meetings_this_week integer default 0,
  meetings_this_month integer default 0,
  meetings_target integer default 20,
  meetings_trend numeric(5,2) default 0,
  total_sent integer default 0,
  total_opened integer default 0,
  open_rate numeric(5,2) default 0,
  open_rate_trend numeric(5,2) default 0,
  total_replied integer default 0,
  reply_rate numeric(5,2) default 0,
  reply_rate_trend numeric(5,2) default 0,
  positive_replies integer default 0,
  vs_last_week jsonb default '{}',
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- =============================================================================
-- ENGINE RUNS (admin-level, cross-client)
-- =============================================================================
create table if not exists public.engine_runs (
  id uuid primary key default gen_random_uuid(),
  engine_slug text not null,
  engine_name text not null,
  client_id uuid references public.clients(id) on delete set null,
  client_name text,
  status text not null default 'queued' check (status in ('running', 'completed', 'failed', 'queued')),
  started_at timestamptz default now(),
  completed_at timestamptz,
  duration_ms integer,
  input_summary text,
  output_summary text,
  error_message text,
  created_at timestamptz default now()
);

create index idx_engine_runs_engine on public.engine_runs(engine_slug);
create index idx_engine_runs_client on public.engine_runs(client_id);

-- =============================================================================
-- ADMIN ACTIVITY (admin audit log)
-- =============================================================================
create table if not exists public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  admin_name text not null,
  action text not null,
  resource_type text not null check (resource_type in ('client', 'engine', 'settings', 'campaign')),
  resource_id text,
  resource_name text,
  details text,
  timestamp timestamptz default now(),
  created_at timestamptz default now()
);

create index idx_admin_activity_timestamp on public.admin_activity(timestamp desc);

-- =============================================================================
-- TEAM MEMBERS
-- =============================================================================
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  role text not null default 'Member' check (role in ('Admin', 'Member', 'Viewer')),
  avatar text,
  status text default 'active' check (status in ('active', 'pending', 'inactive')),
  created_at timestamptz default now()
);

create index idx_team_members_client on public.team_members(client_id);

-- =============================================================================
-- APPLY updated_at TRIGGERS (reuses function from migration 001)
-- =============================================================================
create trigger campaigns_updated_at before update on public.campaigns for each row execute function public.update_updated_at();
create trigger meetings_updated_at before update on public.meetings for each row execute function public.update_updated_at();
create trigger domains_updated_at before update on public.domains for each row execute function public.update_updated_at();
create trigger visitors_updated_at before update on public.website_visitors for each row execute function public.update_updated_at();
