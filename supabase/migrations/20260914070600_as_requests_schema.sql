-- A/S 접수 테이블 (PRD 5번 must-have 기준)
create table if not exists as_requests (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  requester text not null,
  equipment_name text not null,
  symptom text not null,
  visit_date date not null,
  visit_time text not null,
  confirmed boolean not null default false,
  created_at timestamptz not null default now()
);

-- 연락처는 선택 항목이므로 nullable
alter table as_requests add column if not exists phone text;
