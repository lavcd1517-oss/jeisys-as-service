"use client";

import { useState } from "react";
import ScreenHeader from "../_components/screen-header";
import DemoNotice, { demoFieldClass } from "../_components/demo-notice";
import { PARTS_EXCHANGES, type PartsExchange } from "../_data/demo";

const STATUS_STYLE: Record<PartsExchange["status"], string> = {
  접수: "border-[#e6cd9e] bg-[#f9f2e4] text-[#97621b]",
  발송완료: "border-[#b7cbe6] bg-[#eef3fa] text-[#2c5c96]",
  수령확인: "border-[#a9dcbd] bg-[#e7f5ec] text-[#1e7b45]",
};

const labelClass = "flex flex-col gap-1.5 text-[12px] font-semibold text-sub";

export default function PartsExchangePage() {
  const [rows, setRows] = useState<PartsExchange[]>(PARTS_EXCHANGES);
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const requester = String(data.get("requester") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const partName = String(data.get("partName") ?? "").trim();

    if (!requester || !company || !partName) {
      alert("다음 항목을 입력해주세요.\n\n접수자 이름, 거래처명, 교환할 소모품명");
      return;
    }

    const nextId = `PE-${String(56 + rows.length - PARTS_EXCHANGES.length).padStart(4, "0")}`;
    setRows([
      {
        id: nextId,
        date: new Date().toISOString().slice(0, 10),
        requester,
        company,
        partName,
        qty: String(data.get("qty") ?? "").trim() || "1개",
        tracking: String(data.get("tracking") ?? "").trim() || null,
        status: "접수",
      },
      ...rows,
    ]);
    form.reset();
    setDone(true);
  }

  return (
    <div>
      <ScreenHeader
        title="🚚 비출동 소모품 교환"
        subtitle="출동 없이 소모품만 발송하는 건을 접수합니다"
      />

      <div className="mx-auto max-w-[900px] p-4">
        <DemoNotice text="접수하면 아래 목록에 바로 추가되지만 저장되지는 않습니다. 새로고침하면 처음 상태로 돌아갑니다." />

        {done && (
          <div className="mb-3 rounded-lg border border-[#a9dcbd] bg-[#e7f5ec] px-4 py-3 text-[13px] font-semibold text-[#1e7b45]">
            ✅ 접수가 완료되었습니다. 아래 목록 맨 위에 추가되었습니다.
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-card p-4 sm:p-5">
          <div className="mb-3 border-b border-line-soft pb-2 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
            교환 신청
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={labelClass}>
              <span>
                접수자 이름 <span className="text-shell">*</span>
              </span>
              <input name="requester" placeholder="이름을 입력하세요" className={`${demoFieldClass} w-full`} />
            </label>
            <label className={labelClass}>
              <span>
                거래처명(병원명) <span className="text-shell">*</span>
              </span>
              <input name="company" placeholder="예: 한빛병원" className={`${demoFieldClass} w-full`} />
            </label>
            <label className={labelClass}>
              <span>
                교환할 소모품명 <span className="text-shell">*</span>
              </span>
              <input name="partName" placeholder="예: 니들 팁 (16핀)" className={`${demoFieldClass} w-full`} />
            </label>
            <label className={labelClass}>
              수량
              <input name="qty" placeholder="예: 2개" className={`${demoFieldClass} w-full`} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              운송장번호
              <input
                name="tracking"
                placeholder="선택 입력 (발송 전이면 비워두세요)"
                className={`${demoFieldClass} w-full`}
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="h-[34px] rounded-md bg-navy px-5 text-[12px] font-bold text-white transition hover:bg-navy-dark active:scale-95"
            >
              접수하기
            </button>
          </div>
        </form>

        <div className="mt-6 mb-2.5 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
          교환 접수 내역 {rows.length}건
        </div>
        <div className="overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full min-w-[720px] border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-soft text-left text-sub">
                <th className="w-[90px] border-b border-line px-3 py-2.5 font-bold">접수번호</th>
                <th className="w-[92px] border-b border-line px-3 py-2.5 font-bold">접수일</th>
                <th className="w-[80px] border-b border-line px-3 py-2.5 font-bold">접수자</th>
                <th className="w-[120px] border-b border-line px-3 py-2.5 font-bold">거래처</th>
                <th className="border-b border-line px-3 py-2.5 font-bold">소모품</th>
                <th className="w-[130px] border-b border-line px-3 py-2.5 font-bold">운송장</th>
                <th className="w-[86px] border-b border-line px-3 py-2.5 font-bold">상태</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border-b border-line-soft px-3 py-2.5 font-mono text-[11.5px] text-sub">
                    {row.id}
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5 whitespace-nowrap">{row.date}</td>
                  <td className="border-b border-line-soft px-3 py-2.5">{row.requester}</td>
                  <td className="border-b border-line-soft px-3 py-2.5 font-bold text-txt">
                    {row.company}
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5">
                    {row.partName}
                    <span className="ml-1.5 text-mute">{row.qty}</span>
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5 font-mono text-[11px] text-sub">
                    {row.tracking ?? "—"}
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
