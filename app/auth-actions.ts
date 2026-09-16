"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ALLOWED_EMAIL_DOMAIN, isCompanyEmail } from "@/lib/auth";

export type AuthState = {
  error?: string;
  message?: string;
};

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
  };
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const { email, password } = readCredentials(formData);

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  // 레이아웃이 사용자 정보를 다시 읽도록 갱신한 뒤 이동한다.
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const { email, password, name } = readCredentials(formData);

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해주세요." };
  }

  // 화면에서 걸러주는 1차 확인. 실제 차단은 DB 트리거가 담당한다.
  if (!isCompanyEmail(email)) {
    return { error: `회사 메일(${ALLOWED_EMAIL_DOMAIN})로만 가입할 수 있습니다.` };
  }

  if (password.length < 10) {
    return { error: "비밀번호는 10자 이상으로 정해주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: name || email.split("@")[0] } },
  });

  if (error) {
    // DB 트리거가 막은 경우도 여기로 들어온다.
    return { error: "가입하지 못했습니다. 회사 메일인지 확인하고 다시 시도해주세요." };
  }

  return {
    message: `${email}로 확인 메일을 보냈습니다. 메일의 링크를 눌러 가입을 완료해주세요.`,
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
