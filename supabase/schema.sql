-- Run this in the Supabase SQL editor for your project.
-- Stores cross-device Fortuna progress, keyed by connected wallet address.
-- Only the service-role key (used server-side in /api/stats.ts) ever
-- reads/writes this table; RLS is enabled with no policies as defense
-- in depth against the anon/public key.

create table if not exists fortuna_stats (
  wallet_address text primary key,
  total_xp integer not null default 0,
  streak_count integer not null default 0,
  best_streak integer not null default 0,
  last_cast_date_key text,
  total_casts integer not null default 0,
  total_wins integer not null default 0,
  total_goldens integer not null default 0,
  offerings_sent integer not null default 0,
  history jsonb not null default '[]'::jsonb,
  unlocked_achievements jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table fortuna_stats enable row level security;
