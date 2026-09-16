"use client";

import { useMemo, useState } from "react";
import ScreenHeader from "../_components/screen-header";
import DemoNotice from "../_components/demo-notice";
import { FIELD_ISSUES, type FieldIssue } from "../_data/demo";

const STATUS_STYLE: Record<FieldIssue["status"], string> = {
  접수: "border-[#e6cd9e] bg-[#f9f2e4] text-[#97621b]",
  분석중: "border-[#b7cbe6] bg-[#eef3fa] text-[#2c5c96]",
  조치완료: "border-[#a9dcbd] bg-[#e7f5ec] text-[#1e7b45]",
};

const TABS = ["전체", "접수", "분석중", "조치완료"] as const;

export default function FieldIssuePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("전체");

  const rows = useMemo(
    () => (tab === "전체" ? FIELD_ISSUES : FIELD_ISSUES.filter((item) => item.status === tab)),
    [tab]
  );

  // 불량유형별로 몇 건씩 올라왔는지 집계 (많은 순)
  const byDefect = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of FIELD_ISSUES) {
      counts.set(item.defect, (counts.get(item.defect) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const maxCount = byDefect[0]?.[1] ?? 1;

  return (
    <div>
      <ScreenHeader
        title="🗂️ 필드이슈 대시보드"
        subtitle="현장에서 올라온 불량·이슈를 모아서 봅니다"
        width="max-w-[1000px]"
      />

      <div className="mx-auto max-w-[1000px] p-4">
        <DemoNotice text="실제 필드이슈 기록이 아니라 화면 동작을 보여주기 위해 지어낸 사례입니다." />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="mb-3 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
              상태별 현황
            </div>
            <div className="flex gap-2">
              {(["접수", "분석중", "조치완료"] as const).map((status) => (
                <div key={status} className="flex-1 rounded-lg bg-soft px-3 py-2.5">
                  <div className="text-[11px] font-bold text-mute">{status}</div>
                  <div className="mt-1 text-[22px] font-extrabold leading-none text-navy">
                    {FIELD_ISSUES.filter((item) => item.status === status).length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-card p-4">
            <div className="mb-3 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
              불량유형 분포
            </div>
            <div className="flex flex-col gap-2">
              {byDefect.map(([defect, count]) => (
                <div key={defect} className="flex items-center gap-2">
                  <span className="w-[68px] shrink-0 text-[11.5px] font-semibold text-sub">
                    {defect}
                  </span>
                  <span className="h-3 flex-1 overflow-hidden rounded bg-soft">
                    <span
                      className="block h-full rounded bg-navy-light"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="w-[22px] shrink-0 text-right text-[11.5px] font-bold text-navy">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 mb-3 flex gap-1.5">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTab(name)}
              className={`rounded-lg px-3.5 py-2 text-[12px] font-bold transition ${
                tab === name
                  ? "bg-navy text-white"
                  : "border border-line bg-card text-sub hover:border-navy-light hover:text-navy"
              }`}
            >
              {name}
              <span className="ml-1.5 text-[11px] opacity-70">
                {name === "전체"
                  ? FIELD_ISSUES.length
                  : FIELD_ISSUES.filter((item) => item.status === name).length}
              </span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-soft text-left text-sub">
                <th className="w-[84px] border-b border-line px-3 py-2.5 font-bold">번호</th>
                <th className="w-[92px] border-b border-line px-3 py-2.5 font-bold">접수일</th>
                <th className="w-[140px] border-b border-line px-3 py-2.5 font-bold">제품</th>
                <th className="w-[120px] border-b border-line px-3 py-2.5 font-bold">병원</th>
                <th className="border-b border-line px-3 py-2.5 font-bold">내용</th>
                <th className="w-[96px] border-b border-line px-3 py-2.5 font-bold">담당</th>
                <th className="w-[86px] border-b border-line px-3 py-2.5 font-bold">상태</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border-b border-line-soft px-3 py-2.5 font-mono text-[11.5px] text-sub">
                    {row.id}
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5">
                    <div className="font-bold text-txt">{row.product}</div>
                    <div className="mt-0.5 text-[11px] text-mute">{row.group}</div>
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5">{row.hospital}</td>
                  <td className="max-w-0 border-b border-line-soft px-3 py-2.5">
                    <div className="truncate" title={row.detail}>
                      <span className="mr-1.5 font-bold text-navy">[{row.defect}]</span>
                      {row.detail}
                    </div>
                  </td>
                  <td className="border-b border-line-soft px-3 py-2.5 text-sub">{row.engineer}</td>
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
