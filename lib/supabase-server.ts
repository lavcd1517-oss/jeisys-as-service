// 데이터 작업 전용 클라이언트. service role key는 RLS를 우회하므로
// 클라이언트 컴포넌트에서 import되면 안 된다 (server-only가 빌드 단계에서 막아준다).
import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
