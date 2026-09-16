import { createBrowserClient } from "@supabase/ssr";

// 브라우저(클라이언트 컴포넌트)에서 로그인 상태를 다룰 때 쓰는 클라이언트.
// 쿠키 처리는 라이브러리가 알아서 하므로 따로 설정하지 않는다.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
