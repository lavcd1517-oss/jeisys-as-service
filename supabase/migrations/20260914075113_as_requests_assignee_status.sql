-- 일정 관리 표에서 담당직원을 직접 적을 수 있도록 컬럼 추가 (비워둘 수 있음)
alter table as_requests add column if not exists assignee text;

-- 상태 뱃지 4종: 접수 / 일정확정 / 수리중 / 완료
alter table as_requests add column if not exists status text not null default '접수';

-- 기존 데이터는 confirmed 값을 기준으로 상태를 채워준다
update as_requests set status = '일정확정' where confirmed = true and status = '접수';
