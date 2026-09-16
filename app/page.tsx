import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NAV_ITEMS } from "./_components/nav-items";

export const dynamic = "force-dynamic";

function todayString() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("as_requests")
    .select("status, visit_date")
    .returns<{ status: string; visit_date: string }[]>();

  const rows = data ?? [];
  const today = todayString();

  const kpis = [
    {
      label: "전체 접수",
      value: rows.length,
      bar: "bg-navy",
      value_color: "text-navy",
    },
    {
      label: "일정 미확정",
      value: rows.filter((row) => row.status === "접수").length,
      bar: "bg-[#c98a2c]",
      value_color: "text-[#97621b]",
    },
    {
      label: "진행 중",
      value: rows.filter((row) => row.status === "일정확정" || row.status === "수리중").length,
      bar: "bg-accent",
      value_color: "text-accent",
    },
    {
      label: "오늘 방문 예정",
      value: rows.filter((row) => row.visit_date === today && row.status !== "완료").length,
      bar: "bg-[#1e7b45]",
      value_color: "text-[#1e7b45]",
    },
  ];

  return (
    <div className="mx-auto max-w-[980px] p-4 sm:p-6">
      <h1 className="text-[22px] font-extrabold tracking-tight text-txt">안녕하세요 👋</h1>
      <p className="mt-1.5 text-[12px] leading-5 text-sub">
        POTENZA · Linear Z · DENSITY · TRI-BEAM Premium · Cellec V · D&apos;LIV
        <br />
        A/S 접수와 방문 일정을 한 곳에서 관리합니다.
      </p>

      <h2 className="mt-7 mb-2.5 text-[13px] font-extrabold text-txt">📊 접수 현황</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="flex overflow-hidden rounded-xl border border-line bg-card"
          >
            <div className={`w-1 shrink-0 ${kpi.bar}`} />
            <div className="px-4 py-3.5">
              <div className="text-[11px] font-bold text-mute">{kpi.label}</div>
              <div className={`mt-1 text-[26px] font-extrabold leading-none ${kpi.value_color}`}>
                {kpi.value}
                <span className="ml-1 text-[11.5px] font-bold text-mute">건</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-7 mb-2.5 text-[13px] font-extrabold text-txt">바로가기</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {NAV_ITEMS.filter((item) => item.href !== "/").map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-line bg-card px-3 py-5 text-center transition hover:border-navy-light hover:bg-soft hover:shadow-[0_2px_8px_rgba(20,30,50,0.07)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft text-navy transition group-hover:bg-navy group-hover:text-white">
              {item.icon}
            </span>
            <span className="text-[12px] font-bold text-txt">{item.label}</span>
            {!item.ready && (
              <span className="rounded-full bg-line-soft px-2 py-0.5 text-[9.5px] font-bold text-mute">
                준비중
              </span>
            )}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] text-mute">제이시스메디칼 국내 A/S팀</p>
    </div>
  );
}
