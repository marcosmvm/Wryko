-- =============================================================================
-- ENABLE RLS ON ALL NEW TABLES
-- =============================================================================
alter table public.user_client_map enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_sequences enable row level security;
alter table public.ab_tests enable row level security;
alter table public.optimization_recommendations enable row level security;
alter table public.meetings enable row level security;
alter table public.domains enable row level security;
alter table public.domain_issues enable row level security;
alter table public.website_visitors enable row level security;
alter table public.visitor_contacts enable row level security;
alter table public.client_requests enable row level security;
alter table public.engine_activity enable row level security;
alter table public.weekly_reports enable row level security;
alter table public.health_scores enable row level security;
alter table public.weekly_trends enable row level security;
alter table public.dashboard_metrics enable row level security;
alter table public.engine_runs enable row level security;
alter table public.admin_activity enable row level security;
alter table public.team_members enable row level security;

-- =============================================================================
-- HELPER FUNCTION: get the client_id for the current auth user
-- =============================================================================
create or replace function public.get_my_client_id()
returns uuid as $$
  select client_id from public.user_client_map
  where user_id = auth.uid()
  limit 1;
$$ language sql security definer stable;

-- =============================================================================
-- HELPER FUNCTION: check if current user is admin
-- =============================================================================
create or replace function public.is_admin()
returns boolean as $$
  select coalesce(
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin',
    false
  );
$$ language sql security definer stable;

-- =============================================================================
-- USER-CLIENT MAP
-- =============================================================================
create policy "Users see own mappings" on public.user_client_map
  for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage mappings" on public.user_client_map
  for all using (public.is_admin());

-- =============================================================================
-- CAMPAIGNS
-- =============================================================================
create policy "Clients read own campaigns" on public.campaigns
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage campaigns" on public.campaigns
  for all using (public.is_admin());

-- =============================================================================
-- CAMPAIGN SEQUENCES
-- =============================================================================
create policy "Clients read own sequences" on public.campaign_sequences
  for select using (
    campaign_id in (select id from public.campaigns where client_id = public.get_my_client_id())
    or public.is_admin()
  );
create policy "Admins manage sequences" on public.campaign_sequences
  for all using (public.is_admin());

-- =============================================================================
-- A/B TESTS
-- =============================================================================
create policy "Clients read own tests" on public.ab_tests
  for select using (
    campaign_id in (select id from public.campaigns where client_id = public.get_my_client_id())
    or public.is_admin()
  );
create policy "Admins manage tests" on public.ab_tests
  for all using (public.is_admin());

-- =============================================================================
-- OPTIMIZATION RECOMMENDATIONS
-- =============================================================================
create policy "Clients read own recommendations" on public.optimization_recommendations
  for select using (
    campaign_id in (select id from public.campaigns where client_id = public.get_my_client_id())
    or public.is_admin()
  );
create policy "Admins manage recommendations" on public.optimization_recommendations
  for all using (public.is_admin());

-- =============================================================================
-- MEETINGS
-- =============================================================================
create policy "Clients read own meetings" on public.meetings
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage meetings" on public.meetings
  for all using (public.is_admin());

-- =============================================================================
-- DOMAINS
-- =============================================================================
create policy "Clients read own domains" on public.domains
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage domains" on public.domains
  for all using (public.is_admin());

-- =============================================================================
-- DOMAIN ISSUES
-- =============================================================================
create policy "Clients read own domain issues" on public.domain_issues
  for select using (
    domain_id in (select id from public.domains where client_id = public.get_my_client_id())
    or public.is_admin()
  );
create policy "Admins manage domain issues" on public.domain_issues
  for all using (public.is_admin());

-- =============================================================================
-- WEBSITE VISITORS
-- =============================================================================
create policy "Clients read own visitors" on public.website_visitors
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage visitors" on public.website_visitors
  for all using (public.is_admin());

-- =============================================================================
-- VISITOR CONTACTS
-- =============================================================================
create policy "Clients read own visitor contacts" on public.visitor_contacts
  for select using (
    visitor_id in (select id from public.website_visitors where client_id = public.get_my_client_id())
    or public.is_admin()
  );
create policy "Admins manage visitor contacts" on public.visitor_contacts
  for all using (public.is_admin());

-- =============================================================================
-- CLIENT REQUESTS (clients can also INSERT)
-- =============================================================================
create policy "Clients read own requests" on public.client_requests
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Clients create requests" on public.client_requests
  for insert with check (client_id = public.get_my_client_id());
create policy "Admins manage requests" on public.client_requests
  for all using (public.is_admin());

-- =============================================================================
-- ENGINE ACTIVITY
-- =============================================================================
create policy "Clients read own engine activity" on public.engine_activity
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage engine activity" on public.engine_activity
  for all using (public.is_admin());

-- =============================================================================
-- WEEKLY REPORTS
-- =============================================================================
create policy "Clients read own reports" on public.weekly_reports
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage reports" on public.weekly_reports
  for all using (public.is_admin());

-- =============================================================================
-- HEALTH SCORES
-- =============================================================================
create policy "Clients read own health" on public.health_scores
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage health" on public.health_scores
  for all using (public.is_admin());

-- =============================================================================
-- WEEKLY TRENDS
-- =============================================================================
create policy "Clients read own trends" on public.weekly_trends
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage trends" on public.weekly_trends
  for all using (public.is_admin());

-- =============================================================================
-- DASHBOARD METRICS
-- =============================================================================
create policy "Clients read own metrics" on public.dashboard_metrics
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage metrics" on public.dashboard_metrics
  for all using (public.is_admin());

-- =============================================================================
-- ENGINE RUNS (admin only)
-- =============================================================================
create policy "Admins manage engine runs" on public.engine_runs
  for all using (public.is_admin());
create policy "Authenticated read engine runs" on public.engine_runs
  for select using (auth.role() = 'authenticated');

-- =============================================================================
-- ADMIN ACTIVITY (admin only)
-- =============================================================================
create policy "Admins manage admin activity" on public.admin_activity
  for all using (public.is_admin());

-- =============================================================================
-- TEAM MEMBERS
-- =============================================================================
create policy "Clients read own team" on public.team_members
  for select using (client_id = public.get_my_client_id() or public.is_admin());
create policy "Admins manage teams" on public.team_members
  for all using (public.is_admin());
