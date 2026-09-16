"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "../auth-actions";

const fieldClass =
  "h-[38px] w-full rounded-lg border border-line bg-white px-3 text-[13px] text-txt outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,97,172,0.12)]";
const labelClass = "flex flex-col gap-1.5 text-[12px] font-semibold text-sub";

type Props = {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
};

export default function AuthForm({ mode, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {} as AuthState);
  const isSignup = mode === "signup";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-[380px]">
        <div className="mb-6 text-center">
          <div className="text-[15px] font-extrabold tracking-wide text-[#17191c]">
            JEISYS MEDICAL
          </div>
          <div className="mt-1 text-[11.5px] font-semibold text-mute">A/S 통합서비스</div>
        </div>

        <div className="rounded-xl border border-line bg-card p-6">
          <h1 className="text-[16px] font-bold text-txt">
            {isSignup ? "직원 가입" : "로그인"}
          </h1>
          <p className="mt-1.5 text-[12px] leading-5 text-sub">
            {isSignup
              ? "회사 메일(@jeisys.com)로만 가입할 수 있습니다."
              : "사내 직원 전용입니다. 회사 계정으로 로그인해주세요."}
          </p>

          {state.error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-[#e3b4b0] bg-[#f8ecea] px-3.5 py-2.5 text-[12px] leading-5 font-semibold text-[#9c3b34]"
            >
              {state.error}
            </div>
          )}
          {state.message && (
            <div
              role="status"
              className="mt-4 rounded-lg border border-[#a9dcbd] bg-[#e7f5ec] px-3.5 py-2.5 text-[12px] leading-5 font-semibold text-[#1e7b45]"
            >
              {state.message}
            </div>
          )}

          <form action={formAction} className="mt-4 flex flex-col gap-3">
            {isSignup && (
              <label className={labelClass}>
                이름
                <input name="name" placeholder="예: 김경일" className={fieldClass} />
              </label>
            )}

            <label className={labelClass}>
              회사 메일
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@jeisys.com"
                className={fieldClass}
              />
            </label>

            <label className={labelClass}>
              비밀번호
              <input
                name="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder={isSignup ? "10자 이상" : "비밀번호"}
                className={fieldClass}
              />
            </label>

            <button
              type="submit"
              disabled={pending}
              className="mt-1 h-[38px] rounded-md bg-navy text-[13px] font-bold text-white transition hover:bg-navy-dark active:scale-[0.98] disabled:opacity-50"
            >
              {pending ? "처리 중..." : isSignup ? "가입하기" : "로그인"}
            </button>
          </form>

          <div className="mt-4 border-t border-line-soft pt-3 text-center text-[12px] text-sub">
            {isSignup ? (
              <>
                이미 계정이 있나요?{" "}
                <Link href="/login" className="font-bold text-navy underline">
                  로그인
                </Link>
              </>
            ) : (
              <>
                아직 계정이 없나요?{" "}
                <Link href="/signup" className="font-bold text-navy underline">
                  직원 가입
                </Link>
              </>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-mute">제이시스메디칼 국내 A/S팀</p>
      </div>
    </div>
  );
}
