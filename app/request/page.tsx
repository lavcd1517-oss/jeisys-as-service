"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { createRequest, type CreateRequestState } from "../actions";
import { DEVICES } from "../_components/nav-items";

const initialState: CreateRequestState = {};

// 팝업 안내에 쓰는 필수 항목 목록 (PRD 5번 must-have 1)
const REQUIRED_FIELDS: [string, string][] = [
  ["requester", "접수자 이름"],
  ["company", "거래처명(병원명)"],
  ["equipment_name", "기기"],
  ["symptom", "증상 / 요청 내용"],
  ["visit_date", "방문 요청일"],
  ["visit_time", "방문 희망 시간"],
];

const fieldClass =
  "h-[34px] w-full rounded-lg border border-line bg-white px-3 text-[13px] text-txt outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,97,172,0.12)]";
const labelClass = "flex flex-col gap-1.5 text-[12px] font-semibold text-sub";

function Required() {
  return <span className="text-shell">*</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 border-b border-line-soft pb-2 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
      {children}
    </div>
  );
}

export default function RequestPage() {
  const [state, formAction, pending] = useActionState(createRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state]);

  // 빈칸이 있으면 제출 자체를 막는다. 그대로 보내면 입력값이 전부 초기화되기 때문.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const missing = REQUIRED_FIELDS.filter(
      ([name]) => !String(formData.get(name) ?? "").trim()
    );

    if (missing.length > 0) {
      event.preventDefault();
      alert(`다음 항목을 입력해주세요.\n\n${missing.map(([, label]) => label).join(", ")}`);
    }
  }

  return (
    <div>
      <div className="bg-navy px-5 py-3.5 text-white shadow-sm">
        <div className="mx-auto max-w-[900px]">
          <div className="text-[15px] font-bold tracking-tight">📨 A/S 접수하기</div>
          <div className="mt-1 text-[11.5px] text-white/65">
            별표(<span className="text-[#ffb4bb]">*</span>) 항목은 반드시 입력해주세요
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] p-4">
        {state.success && (
          <div className="mb-3 rounded-lg border border-[#a9dcbd] bg-[#e7f5ec] px-4 py-3 text-[13px] font-semibold text-[#1e7b45]">
            ✅ 접수가 완료되었습니다. 담당 부서에 전달되었습니다.{" "}
            <Link href="/list" className="underline">
              접수 목록 보기
            </Link>
          </div>
        )}
        {state.error && (
          <div className="mb-3 rounded-lg border border-[#e3b4b0] bg-[#f8ecea] px-4 py-3 text-[13px] font-semibold text-[#9c3b34]">
            {state.error}
          </div>
        )}

        <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-3">
          <section className="rounded-xl border border-line bg-card p-4 sm:p-5">
            <SectionTitle>기본 정보</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                <span>
                  접수자 이름 <Required />
                </span>
                <input name="requester" placeholder="이름을 입력하세요" className={fieldClass} />
              </label>

              <label className={labelClass}>
                구분
                <select name="role" defaultValue="엔지니어" className={fieldClass}>
                  <option value="엔지니어">엔지니어</option>
                  <option value="영업사원">영업사원</option>
                </select>
              </label>

              <label className={labelClass}>
                <span>
                  거래처명(병원명) <Required />
                </span>
                <input name="company" placeholder="예: 한빛병원" className={fieldClass} />
              </label>

              <label className={labelClass}>
                연락처
                <input
                  name="phone"
                  type="tel"
                  placeholder="선택 입력 (연락받으실 번호)"
                  className={fieldClass}
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                주소
                <input
                  name="address"
                  placeholder="예: 경기 남양주시 와부읍 덕소로 180"
                  className={fieldClass}
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-card p-4 sm:p-5">
            <SectionTitle>장비 정보</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                <span>
                  기기 <Required />
                </span>
                <select name="equipment_name" defaultValue="" className={fieldClass}>
                  <option value="">선택하세요</option>
                  {DEVICES.map((device) => (
                    <option key={device} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
              </label>

              <label className={labelClass}>
                시리얼번호
                <input name="serial_no" placeholder="선택 입력" className={fieldClass} />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                <span>
                  증상 / 요청 내용 <Required />
                </span>
                <textarea
                  name="symptom"
                  rows={4}
                  placeholder="어떤 문제가 있는지 적어주세요"
                  className={`${fieldClass} h-auto py-2 leading-6`}
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-card p-4 sm:p-5">
            <SectionTitle>방문 일정</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                <span>
                  방문 요청일 <Required />
                </span>
                <input name="visit_date" type="date" className={fieldClass} />
              </label>

              <label className={labelClass}>
                <span>
                  방문 희망 시간 <Required />
                </span>
                <input name="visit_time" type="time" className={fieldClass} />
              </label>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="h-[34px] rounded-md bg-navy px-5 text-[12px] font-bold text-white transition hover:bg-navy-dark active:scale-95 disabled:opacity-50"
            >
              {pending ? "접수 중..." : "접수하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
