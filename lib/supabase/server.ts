import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 서버(Server Component / Server Action)에서 로그인한 사용자로 동작하는 클라이언트.
// 요청마다 쿠키가 다르므로 매번 새로 만들어야 한다.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Component에서는 쿠키를 쓸 수 없다. 이 경우 토큰 갱신은
            // proxy.ts가 대신 처리하므로 여기서는 무시해도 된다.
          }
        },
      },
    }
  );
}
