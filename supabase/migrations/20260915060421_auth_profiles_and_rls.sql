-- 로그인 도입: 직원 프로필(권한) 테이블과 회사 메일 도메인 제한

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text,
  -- 'user' = 일반 직원, 'admin' = 관리자 (화면에는 한글로 표기)
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- 가입 허용 도메인. Server Action 검증만으로는 Supabase API 직접 호출로 우회되므로
-- DB에서 한 번 더 막는다.
create or replace function public.check_signup_domain()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is null or new.email not like '%@jeisys.com' then
    raise exception '회사 메일(@jeisys.com)로만 가입할 수 있습니다.';
  end if;
  return new;
end;
$$;

drop trigger if exists check_signup_domain_trigger on auth.users;
create trigger check_signup_domain_trigger
  before insert on auth.users
  for each row execute function public.check_signup_domain();

-- 가입이 끝나면 프로필 행을 자동으로 만들어 둔다.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists handle_new_user_trigger on auth.users;
create trigger handle_new_user_trigger
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS를 켜되 정책은 두지 않는다. 앱은 service role key로 접근해 그대로 동작하고,
-- 외부에서 anon key로 직접 찌르는 경로만 차단된다.
alter table as_requests enable row level security;
alter table profiles enable row level security;
