"use client";

import { useState } from "react";
import DemoNotice, { demoFieldClass } from "../_components/demo-notice";
import { ENGINEER_KPI, OUTPUT_SPECS } from "../_data/demo";

export type AsHistoryRow = {
  id: string;
  visit_date: string;
  company: string;
  equipment_name: string;
  assignee: string | null;
  status: string;
};

const TABS = [
  "출력검사",
  "팀 KPI 현황",
  "A/S 접수 내역",
  "데이터 관리",
  "재고이동 처리",
  "고객자산입고대장",
  "인수인계",
] as const;

const READY_TABS: string[] = ["출력검사", "팀 KPI 현황", "A/S 접수 내역"];

function OutputCheck() {
  const [device, setDevice] = useState(OUTPUT_SPECS[0].device);
  const [value, setValue] = useState("");

  const spec = OUTPUT_SPECS.find((item) => item.device === device)!;
  const measured = Number(value);
  const hasValue = value.trim() !== "" && !Number.isNaN(measured);
  const pass = hasValue && measured >= spec.min && measured <= spec.max;

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="mb-3 border-b border-line-soft pb-2 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
        출력 측정값 판정
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[12px] font-semibold text-sub">
          장비
          <select
            value={device}
            onChange={(event) => {
              setDevice(event.target.value);
              setValue("");
            }}
            className={`${demoFieldClass} w-full`}
          >
            {OUTPUT_SPECS.map((item) => (
              <option key={item.device} value={item.device}>
                {item.device}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-semibold text-sub">
          측정값 ({spec.unit})
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            inputMode="decimal"
            placeholder={`기준 ${spec.min} ~ ${spec.max} ${spec.unit}`}
            className={`${demoFieldClass} w-full`}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line-soft pt-4">
        <div className="text-[12px] text-sub">
          <span className="font-bold text-txt">{spec.item}</span> 기준 {spec.min} ~ {spec.max}{" "}
          {spec.unit}
        </div>
        <span className="flex-1" />
        {hasValue ? (
          <span
            className={`rounded-md border px-3 py-1 text-[12.5px] font-bold ${
              pass
                ? "border-[#a9dcbd] bg-[#e7f5ec] text-[#1e7b45]"
                : "border-[#e3b4b0] bg-[#f8ecea] text-[#9c3b34]"
            }`}
          >
            {pass ? "합격" : "기준 벗어남"} · {measured} {spec.unit}
          </span>
        ) : (
          <span className="text-[12px] text-mute">측정값을 입력하면 판정됩니다.</span>
        )}
      </div>
    </div>
  );
}

function TeamKpi() {
  const maxVisits = Math.max(...ENGINEER_KPI.map((item) => item.visits));

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
        <thead>
          <tr className="bg-soft text-left text-sub">
            <th className="w-[110px] border-b border-line px-3 py-2.5 font-bold">엔지니어</th>
            <th className="border-b border-line px-3 py-2.5 font-bold">방문 건수</th>
            <th className="w-[90px] border-b border-line px-3 py-2.5 text-right font-bold">완료</th>
            <th className="w-[110px] border-b border-line px-3 py-2.5 text-right font-bold">
              평균 소요
            </th>
          </tr>
        </thead>
        <tbody>
          {ENGINEER_KPI.map((row) => (
            <tr key={row.name}>
              <td className="border-b border-line-soft px-3 py-2.5 font-bold text-txt">
                {row.name}
              </td>
              <td className="border-b border-line-soft px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 flex-1 overflow-hidden rounded bg-soft">
                    <span
                      className="block h-full rounded bg-navy-light"
                      style={{ width: `${(row.visits / maxVisits) * 100}%` }}
                    />
                  </span>
                  <span className="w-[26px] text-right font-bold text-navy">{row.visits}</span>
                </div>
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 text-right text-sub">
                {row.completed}건
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 text-right text-sub">
                {row.avgHours}시간
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AsHistory({ rows }: { rows: AsHistoryRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-card px-4 py-12 text-center text-[13px] text-mute">
        접수된 건이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-[620px] border-collapse text-[12.5px]">
        <thead>
          <tr className="bg-soft text-left text-sub">
            <th className="w-[100px] border-b border-line px-3 py-2.5 font-bold">방문예정</th>
            <th className="border-b border-line px-3 py-2.5 font-bold">거래처</th>
            <th className="w-[150px] border-b border-line px-3 py-2.5 font-bold">장비</th>
            <th className="w-[110px] border-b border-line px-3 py-2.5 font-bold">담당직원</th>
            <th className="w-[90px] border-b border-line px-3 py-2.5 font-bold">상태</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border-b border-line-soft px-3 py-2.5 whitespace-nowrap">
                {row.visit_date}
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 font-bold text-txt">
                {row.company}
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 text-sub">
                {row.equipment_name}
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 text-sub">
                {row.assignee ?? "미지정"}
              </td>
              <td className="border-b border-line-soft px-3 py-2.5 text-sub">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EngineerTabs({ asHistory }: { asHistory: AsHistoryRow[] }) {
  const [tab, setTab] = useState<string>("출력검사");

  return (
    <>
      <DemoNotice text="출력검사 기준값과 팀 KPI는 지어낸 예시입니다. A/S 접수 내역만 실제 데이터입니다." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {TABS.map((name) => {
          const ready = READY_TABS.includes(name);
          return (
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
              {!ready && (
                <span
                  className={`ml-1.5 text-[10px] ${tab === name ? "text-white/70" : "text-mute"}`}
                >
                  준비중
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "출력검사" && <OutputCheck />}
      {tab === "팀 KPI 현황" && <TeamKpi />}
      {tab === "A/S 접수 내역" && <AsHistory rows={asHistory} />}
      {!READY_TABS.includes(tab) && (
        <div className="rounded-xl border border-dashed border-line bg-card px-4 py-14 text-center">
          <div className="text-[22px]">🚧</div>
          <div className="mt-2.5 text-[13.5px] font-bold text-txt">{tab}</div>
          <p className="mt-1.5 text-[12.5px] text-sub">
            이 탭은 아직 만들지 않았습니다. 사내 자료와 연결되는 기능이라 보안 검토가 필요합니다.
          </p>
        </div>
      )}
    </>
  );
}
