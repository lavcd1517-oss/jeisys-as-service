import "server-only";

import { cache } from "react";
import { createClient } from "./supabase/server";
import { createServerSupabaseClient } from "./supabase-server";

export const ALLOWED_EMAIL_DOMAIN = "@jeisys.com";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

// 같은 요청 안에서 여러 번 불러도 조회는 한 번만 일어난다.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();

  // getSession()은 쿠키를 그대로 믿기 때문에 서버에서 쓰면 안 된다.
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) return null;

  // 권한은 profiles 테이블이 기준이라 service role로 읽는다.
  const admin = createServerSupabaseClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("email, name, role")
    .eq("id", claims.sub)
    .maybeSingle<{ email: string; name: string | null; role: "user" | "admin" }>();

  if (!profile) return null;

  return {
    id: claims.sub,
    email: profile.email,
    name: profile.name ?? profile.email.split("@")[0],
    role: profile.role,
  };
});

export function isCompanyEmail(email: string) {
  return email.trim().toLowerCase().endsWith(ALLOWED_EMAIL_DOMAIN);
}
