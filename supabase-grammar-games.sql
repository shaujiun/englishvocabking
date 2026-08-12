-- B3 文法冒險：學生闖關進度
-- 執行前可先在 Supabase SQL Editor 中確認目前連接的是英文單字系統共用專案。

create table if not exists public.grammar_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  book text not null,
  lesson text not null,
  game_code text not null,
  best_score integer not null default 0 check (best_score between 0 and 100),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  passed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, book, lesson, game_code)
);

alter table public.grammar_progress enable row level security;

drop policy if exists "grammar_progress_select_self_or_admin" on public.grammar_progress;
create policy "grammar_progress_select_self_or_admin"
on public.grammar_progress
for select
to authenticated
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

drop policy if exists "grammar_progress_insert_self" on public.grammar_progress;
create policy "grammar_progress_insert_self"
on public.grammar_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "grammar_progress_update_self" on public.grammar_progress;
create policy "grammar_progress_update_self"
on public.grammar_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.grammar_progress to authenticated;
