@AGENTS.md

# 프로젝트 규칙 (A/S통합서비스)

## 개요
- A/S 접수 및 일정 관리 통합 서비스. 현재 POC(개념 검증) 단계.
- 배경·목표·범위·보안 방침 등 기획 전체는 [PRD.md](./PRD.md)가 기준 문서입니다.
  새 기능을 추가하거나 범위를 바꾸기 전에 먼저 PRD.md를 확인/갱신하세요.

## 기술 스택
- Next.js (App Router) + TypeScript + Tailwind CSS
- 데이터 저장: Supabase(Postgres), 클라이언트 라이브러리 `@supabase/supabase-js`
- 배포 예정: Vercel (아직 배포 전)

## POC 단계 개발 원칙
- 지금은 PRD의 must-have 2개(A/S 접수 양식, 접수 목록/일정 관리)만 가볍게 구현하는 단계입니다.
- 알림, 상세 통계, 엑셀 내보내기, 스팸 방지 등 PRD 6번 "절대 만들지 않을 것"에 있는 항목은 임의로 추가하지 않습니다.
- zod 같은 별도 검증 라이브러리 없이, 서버 액션 안에서 직접 필수값을 검사하는 수준을 유지합니다.
- PRD에 없는 기능이 필요해지면, 먼저 PRD.md를 갱신해 합의한 뒤 구현합니다.

## 코드 구조
- `app/page.tsx` — 홈 대시보드, 접수 현황 KPI (Server Component)
- `app/request/page.tsx` — A/S 접수 폼 (Client Component, `useActionState` 사용)
- `app/list/page.tsx` — 접수 목록 조회, 수정, 일정 확정, 상태 변경 (Server Component)
- `app/schedule/page.tsx` — 일정 관리 표, 담당직원 배정 (Server Component)
- `app/actions.ts` — Server Actions (`'use server'`). 데이터 생성/수정은 모두 여기서 처리
- `app/_components/` — 사이드바·상단바 셸, 메뉴 정의, 화면 헤더, 상태 뱃지 정의
- `lib/supabase-server.ts` — 서버 전용 Supabase 클라이언트 (service role key 사용)

## 코딩 컨벤션
- Supabase 테이블/컬럼명은 영문 snake_case (예: `as_requests`, `equipment_name`, `visit_date`). 화면에 보이는 라벨만 한글로 표기합니다.
- 데이터 생성/수정은 반드시 Server Action을 통해 처리하고, 클라이언트 컴포넌트에서 Supabase를 직접 호출하지 않습니다.
- 기존 톤을 유지합니다: 간결한 Tailwind 클래스, 불필요한 상태관리 라이브러리나 추상화 레이어를 추가하지 않습니다.

## 환경 변수 (.env)
- `.env`는 절대 git에 커밋하지 않습니다 (`.gitignore`에 `.env*` 처리되어 있음).
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — 클라이언트에 노출되어도 되는 값.
- `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_PASSWORD`, `SUPABASE_ACCESS_TOKEN` — 서버 전용. 클라이언트 코드나 로그에 절대 노출하지 않습니다.
- `GITHUB_TOKEN`, `VERCEL_TOKEN`, `OPENAI_API_KEY` — 현재 이 프로젝트 기능에서는 사용하지 않는 값입니다. 실제로 사용하게 되면 용도를 먼저 확인하세요.

## 보안 (PRD 7번과 연동)
- 모든 화면은 로그인해야 볼 수 있습니다. 차단은 루트의 `proxy.ts`가 담당합니다 (Next.js 16에서 `middleware.ts`는 폐기되고 `proxy.ts`로 바뀌었습니다).
- 화면을 막아도 Server Action은 직접 호출될 수 있으므로, **데이터를 바꾸는 액션에는 반드시 `getCurrentUser()` 확인을 넣습니다.**
- 가입은 회사 메일(@jeisys.com)만 허용하며, 화면 검증과 DB 트리거 양쪽에서 막습니다. 검증을 한쪽에서만 하면 API 직접 호출로 우회됩니다.
- 권한은 `profiles.role`에 `user` / `admin`으로 저장하고, 화면에만 한글로 표기합니다.
- 테이블에 RLS를 켜두었지만 정책은 없습니다. 앱은 service role key로 접근하므로 그대로 동작하고, 외부에서 anon key로 직접 조회하는 경로만 차단됩니다.
- **다음 단계 과제**: service role key 대신 anon key + RLS 정책으로 옮기는 작업. 지금은 키가 유출되면 로그인과 무관하게 데이터 전체가 노출됩니다.

## 작업 규칙
- 모든 설명과 주석은 한국어로 작성합니다.
- 새 파일은 `my-app` 폴더 안에만 만듭니다.
- 기술 스택은 PRD에 정한 대로 Next.js로 고정합니다. 다른 프레임워크로 바꾸거나 마이그레이션을 제안하지 않습니다. 배포는 Vercel을 사용합니다.
- 코드를 바꾸면 반드시 무엇을 왜 바꿨는지 한 줄로 알려줍니다.
- `.env` 등 비밀 정보 파일과 `node_modules` 폴더는 `.gitignore`에 등록해 두고, 절대 커밋하지 않습니다. (현재 둘 다 이미 등록되어 있음)
- 외부 서비스 인증이 필요하면 토큰 값을 사용자에게 묻거나 채팅에 출력하지 않고, `.env`에 있는 값을 읽어서 사용합니다.
  - 예: Supabase 작업이 필요하면 Supabase CLI를 설치해 `.env`의 `SUPABASE_ACCESS_TOKEN`으로 작업합니다.
  - 예: Vercel 작업(배포 등)이 필요하면 Vercel CLI를 설치해 `.env`의 `VERCEL_TOKEN`으로 인증해 작업합니다.
- 파일을 지워야 할 때는 바로 삭제하지 않고, `trash-can` 폴더를 만들어 그 안으로 옮겨만 둡니다. 작업이 끝난 뒤 사용자가 직접 확인하고 삭제합니다.
- 이미 설치된 서브에이전트는 필요할 때마다 적극 활용합니다.

## 기타
- 사용자가 명시적으로 요청하기 전까지 git commit을 만들지 않습니다.
