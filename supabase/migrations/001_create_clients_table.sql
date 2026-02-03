-- Create clients table for admin portal management
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  phone text,
  plan text not null default 'founding_partner',
  status text not null default 'onboarding' check (status in ('active', 'onboarding', 'paused', 'churned')),
  health_score integer default 80 check (health_score >= 0 and health_score <= 100),
  mrr numeric(10,2) default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.clients enable row level security;

-- Allow authenticated users with admin role to manage clients
create policy "Admins can manage clients"
  on public.clients
  for all
  using (
    auth.jwt() ->> 'role' = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Allow authenticated users to read clients (for dashboard)
create policy "Authenticated users can read clients"
  on public.clients
  for select
  using (auth.role() = 'authenticated');

-- Auto-update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at
  before update on public.clients
  for each row
  execute function public.update_updated_at();
