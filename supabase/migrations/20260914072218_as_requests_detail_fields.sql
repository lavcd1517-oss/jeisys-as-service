-- 참고 화면(제이시스메디칼 A/S 통합 조회)에 맞춰 접수 항목을 세분화
alter table as_requests add column if not exists role text;        -- 구분: 엔지니어 / 영업사원
alter table as_requests add column if not exists address text;     -- 병원 주소
alter table as_requests add column if not exists serial_no text;   -- 장비 시리얼번호
