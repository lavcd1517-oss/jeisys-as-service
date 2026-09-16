"use client";

import { useMemo, useState } from "react";
import ScreenHeader from "../_components/screen-header";
import DemoNotice, { demoFieldClass } from "../_components/demo-notice";
import { ERROR_CODES } from "../_data/demo";

const DEVICES = [...new Set(ERROR_CODES.map((item) => item.device))];

const LEVEL_STYLE: Record<string, string> = {
  오류: "border-[#e3b4b0] bg-[#f8ecea] text-[#9c3b34]",
  경고: "border-[#e6cd9e] bg-[#f9f2e4] text-[#97621b]",
  안내: "border-[#b7cbe6] bg-[#eef3fa] text-[#2c5c96]",
};

export default function ErrorCodePage() {
  const [device, setDevice] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    if (!device) return [];
    const q = keyword.trim().toLowerCase();
    return ERROR_CODES.filter((item) => item.device === device).filter(
      (item) =>
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.cause.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q)
    );
  }, [device, keyword]);

  return (
    <div>
      <ScreenHeader
        title="🔍 에러코드 조회"
        subtitle="장비를 고른 뒤 코드나 증상 키워드로 찾아보세요"
      />

      <div className="mx-auto max-w-[900px] p-4">
        <DemoNotice text="실제 서비스 매뉴얼이 아니라 동작을 보여주기 위해 지어낸 코드입니다." />

        {!device ? (
          <>
            <div className="mb-2.5 text-[10.5px] font-extrabold uppercase tracking-wider text-mute">
              장비를 선택하세요
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DEVICES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setDevice(name)}
                  className="rounded-xl border border-line bg-card px-3 py-5 text-[13px] font-bold text-txt transition hover:border-navy-light hover:bg-soft hover:shadow-[0_2px_8px_rgba(20,30,50,0.07)]"
                >
                  {name}
                  <div className="mt-1 text-[11px] font-semibold text-mute">
                    코드 {ERROR_CODES.filter((item) => item.device === name).length}개
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-line bg-card px-3.5 py-2.5">
              <span className="text-[13px] font-bold text-navy">{device}</span>
              <span className="flex-1" />
              <button
                type="button"
                onClick={() => {
                  setDevice(null);
                  setKeyword("");
                }}
                className="rounded-md border border-line px-3 py-1 text-[11.5px] font-bold text-sub transition hover:border-navy hover:text-navy"
              >
                장비 변경
              </button>
            </div>

            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="코드 입력 (E101, W301...) 또는 키워드 (핸드피스, 냉각...)"
              className={`${demoFieldClass} mb-3 h-[42px] w-full`}
            />

            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line bg-card px-4 py-12 text-center text-[13px] text-mute">
                검색 결과가 없습니다.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((item) => (
                  <div key={item.code} className="rounded-xl border border-line bg-card p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[15px] font-extrabold text-navy">
                        {item.code}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${LEVEL_STYLE[item.level]}`}
                      >
                        {item.level}
                      </span>
                      <span className="text-[13.5px] font-bold text-txt">{item.title}</span>
                    </div>
                    <dl className="mt-3 grid gap-2 border-t border-line-soft pt-3 text-[12.5px] leading-5 sm:grid-cols-[64px_1fr]">
                      <dt className="font-bold text-mute">원인</dt>
                      <dd className="text-txt">{item.cause}</dd>
                      <dt className="font-bold text-mute">조치</dt>
                      <dd className="text-txt">{item.action}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
