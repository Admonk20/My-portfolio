-- Run this in the Supabase SQL editor (one time).
-- Creates the tables and policies used by the portfolio site + admin.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text not null,
  description text,
  cover_url text,
  tags text[] default '{}',
  live_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamptz not null default now()
);

-- Row level security
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- Public read on projects (anyone with the anon key can SELECT).
drop policy if exists "projects public read" on public.projects;
create policy "projects public read"
  on public.projects for select
  using (true);

-- Writes happen only through the admin API, which uses the service role
-- key and bypasses RLS by design. No insert/update/delete policies here.

-- Messages: no anon access. The /api/contact route uses the service role.
-- (If you want to allow public insert via anon, uncomment below.)
-- create policy "messages anon insert" on public.messages
--   for insert with check (true);

-- Auto-update updated_at on project edits
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Seed a few sample projects (safe to re-run; uses slug uniqueness).
insert into public.projects (title, slug, summary, description, tags, featured)
values
  (
    'Aurora Inbox',
    'aurora-inbox',
    'An AI triage layer that answers 64% of support emails on its own.',
    'Built for a 40-person SaaS. The agent reads the thread, drafts a reply in the company voice, and either sends or escalates. Ships with a review dashboard and full audit log.',
    array['AI Agents','Support','GPT'],
    true
  ),
  (
    'Knowledge Nebula',
    'knowledge-nebula',
    'RAG pipeline that turns 12 years of Notion docs into a queryable brain.',
    'Nightly sync, semantic chunking, source citations. Used daily by sales and onboarding. Answers are grounded — no hallucinations.',
    array['RAG','Pipelines','Notion'],
    true
  ),
  (
    'Moonphase Ops',
    'moonphase-ops',
    'End-to-end automation stack that saved a founder 22 hours a week.',
    'Lead capture → enrichment → proposal draft → CRM → calendar. All glued with n8n, OpenAI, and a small Supabase layer. Observability built in.',
    array['Workflows','n8n','Integrations'],
    false
  )
on conflict (slug) do nothing;
