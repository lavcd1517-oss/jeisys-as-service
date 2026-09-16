"use client";

import { useMemo, useState } from "react";
import ScreenHeader from "../_components/screen-header";
import DemoNotice, { demoFieldClass } from "../_components/demo-notice";
import { STOCK_ITEMS } from "../_data/demo";

const DEVICES = ["전체", ...new Set(STOCK_ITEMS.map((item) => item.device))];

function qtyStyle(qty: number) {
  if (qty <= 2) return "border-[#e3b4b0] bg-[#f8ecea] text-[#9c3b34]";
  if (qty <= 8) return "border-[#e6cd9e] bg-[#f9f2e4] text-[#97621b]";
  return "border-[#a9dcbd] bg-[#e7f5ec] text-[#1e7b45]";
}

export default function StockPage() {
  const [device, setDevice] = useState("전체");
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return STOCK_ITEMS.filter((item) => device === "전체" || item.device === device).filter(
      (item) =>
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        (item.serial ?? "").toLowerCase().includes(q)
    );
  }, [device, keyword]);

  const lowStock = results.filter((item) => item.qty <= 2).length;

  return (
    <div>
      <ScreenHeader
        title="📦 재고 조회"
        subtitle="품목명, 품목코드, 시리얼번호로 찾을 수 있습니다"
        width="max-w-[1000px]"
      />

      <div className="mx-auto max-w-[1000px] p-4">
        <DemoNotice text="실제 재고 현황이 아니라 화면 동작을 보여주기 위한 예시 수량입니다." />

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex shrink-0 gap-1.5 overflow-x-auto lg:w-[150px] lg:flex-col">
            {DEVICES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setDevice(name)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-[12px] font-bold transition ${
                  device === name
                    ? "bg-navy text-white"
                    : "border border-line bg-card text-sub hover:border-navy-light hover:text-navy"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="예: 니들 팁, PTZ-TIP-16, DENMT-23-0119"
              className={`${demoFieldClass} mb-3 h-[42px] w-full`}
            />

            <div className="mb-2.5 flex items-center gap-2 text-[11px] font-bold text-mute">
              <span>{results.length}개 품목</span>
              {lowStock > 0 && (
                <>
                  <span className="text-line">|</span>
                  <span className="text-[#9c3b34]">부족 {lowStock}건</span>
                </>
              )}
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line bg-card px-4 py-12 text-center text-[13px] text-mute">
                검색 결과가 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-line bg-card">
                <table className="w-full min-w-[620px] border-collapse text-[12.5px]">
                  <thead>
                    <tr className="bg-soft text-left text-sub">
                      <th className="border-b border-line px-3 py-2.5 font-bold">품목명</th>
                      <th className="w-[130px] border-b border-line px-3 py-2.5 font-bold">품목코드</th>
                      <th className="w-[120px] border-b border-line px-3 py-2.5 font-bold">장비</th>
                      <th className="w-[110px] border-b border-line px-3 py-2.5 font-bold">보관 위치</th>
                      <th className="w-[80px] border-b border-line px-3 py-2.5 text-right font-bold">수량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item) => (
                      <tr key={item.code}>
                        <td className="border-b border-line-soft px-3 py-2.5">
                          <div className="font-bold text-txt">{item.name}</div>
                          {item.serial && (
                            <div className="mt-0.5 text-[11px] text-mute">S/N {item.serial}</div>
                          )}
                        </td>
                        <td className="border-b border-line-soft px-3 py-2.5 font-mono text-[11.5px] text-sub">
                          {item.code}
                        </td>
                        <td className="border-b border-line-soft px-3 py-2.5 text-sub">
                          {item.device}
                        </td>
                        <td className="border-b border-line-soft px-3 py-2.5 text-sub">
                          {item.location}
                        </td>
                        <td className="border-b border-line-soft px-3 py-2.5 text-right">
                          <span
                            className={`inline-block rounded border px-2 py-0.5 text-[11.5px] font-bold ${qtyStyle(item.qty)}`}
                          >
                            {item.qty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
