import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { confirmRequest, updateRequest, updateStatus } from "../actions";
import { DEVICES } from "../_components/nav-items";
import ScreenHeader from "../_components/screen-header";
import { STATUSES, STATUS_STYLE, statusRank, type Status } from "../_components/status";

export const dynamic = "force-dynamic";

type AsRequest = {
  id: string;
  company: string;
  requester: string;
  role: string | null;
  phone: string | null;
  address: string | null;
  equipment_name: string;
  serial_no: string | null;
  symptom: string;
  visit_date: string;
  visit_time: string;
  assignee: string | null;
  status: string;
  created_at: string;
};

const controlClass =
  "h-[34px] rounded-lg border border-line bg-white px-3 text-[13px] text-txt outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,97,172,0.12)]";
const fieldClass = `${controlClass} w-full`;
const labelClass = "flex flex-col gap-1.5 text-[11.5px] font-semibold text-sub";

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLE[status as Status] ?? STATUS_STYLE["접수"];
  return (
    <span className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${style}`}>
      {status}
    </span>
  );
}

export default async function ListPage({ searchParams }: PageProps<"/list">) {
  const { status: statusParam } = await searchParams;
  const activeTab = typeof statusParam === "string" ? statusParam : "전체";

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("as_requests")
    .select("*")
    .returns<AsRequest[]>();

  // 조치가 필요한 상태를 위로 올리고, 같은 상태 안에서는 방문일이 빠른 순 (PRD 5번 AI 규칙)
  const allRows = (data ?? []).sort(
    (a, b) =>
      statusRank(a.status) - statusRank(b.status) ||
      a.visit_date.localeCompare(b.visit_date)
  );
  const rows = activeTab === "전체" ? allRows : allRows.filter((row) => row.status === activeTab);

  const tabs = ["전체", ...STATUSES];
  const countOf = (tab: string) =>
    tab === "전체" ? allRows.length : allRows.filter((row) => row.status === tab).length;

  return (
    <div>
      <ScreenHeader
        title="🗂️ 접수 목록"
        subtitle="접수 내용을 고치거나 방문 일정을 확정할 수 있습니다"
        action={
          <Link
            href="/request"
            className="shrink-0 rounded-md border border-white/30 px-3 py-1.5 text-[11.5px] font-bold hover:bg-white/10"
          >
            + A/S 접수하기
          </Link>
        }
      />

      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[900px] overflow-x-auto">
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <Link
                key={tab}
                href={tab === "전체" ? "/list" : `/list?status=${encodeURIComponent(tab)}`}
                className={`shrink-0 border-b-2 px-4 py-3 text-[12.5px] font-bold transition ${
                  active
                    ? "border-navy bg-soft text-navy"
                    : "border-transparent text-sub hover:bg-[#f5f5f5]"
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[11px] ${active ? "text-navy-light" : "text-mute"}`}>
                  {countOf(tab)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[900px] p-4">
        {error && (
          <p className="rounded-lg border border-[#e3b4b0] bg-[#f8ecea] px-4 py-3 text-[13px] text-[#9c3b34]">
            목록을 불러오지 못했습니다.
          </p>
        )}

        {!error && rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-line bg-card px-4 py-12 text-center text-[13px] text-mute">
            {activeTab === "전체"
              ? "아직 접수된 건이 없습니다."
              : `'${activeTab}' 상태인 건이 없습니다.`}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {rows.map((row) =>
            row.status === "접수" ? (
              <form
                key={row.id}
                action={updateRequest.bind(null, row.id)}
                className="rounded-xl border border-[#e6cd9e] bg-[#fdfaf3] p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <StatusBadge status={row.status} />
                  <span className="text-[12.5px] font-bold text-txt">{row.company}</span>
                  <span className="flex-1" />
                  <span className="text-[11px] text-mute">
                    접수일 {row.created_at.slice(0, 10)}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className={labelClass}>
                    거래처명(병원명)
                    <input name="company" defaultValue={row.company} required className={fieldClass} />
                  </label>
                  <label className={labelClass}>
                    접수자 이름
                    <input name="requester" defaultValue={row.requester} required className={fieldClass} />
                  </label>
                  <label className={labelClass}>
                    구분
                    <select name="role" defaultValue={row.role ?? ""} className={fieldClass}>
                      <option value="">선택 안 함</option>
                      <option value="엔지니어">엔지니어</option>
                      <option value="영업사원">영업사원</option>
                    </select>
                  </label>
                  <label className={labelClass}>
                    연락처
                    <input name="phone" type="tel" defaultValue={row.phone ?? ""} className={fieldClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    주소
                    <input name="address" defaultValue={row.address ?? ""} className={fieldClass} />
                  </label>
                  <label className={labelClass}>
                    기기
                    <select name="equipment_name" defaultValue={row.equipment_name} required className={fieldClass}>
                      {!DEVICES.includes(row.equipment_name) && (
                        <option value={row.equipment_name}>{row.equipment_name}</option>
                      )}
                      {DEVICES.map((device) => (
                        <option key={device} value={device}>
                          {device}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={labelClass}>
                    시리얼번호
                    <input name="serial_no" defaultValue={row.serial_no ?? ""} className={fieldClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    증상 / 요청 내용
                    <textarea
                      name="symptom"
                      defaultValue={row.symptom}
                      rows={3}
                      required
                      className={`${fieldClass} h-auto py-2 leading-6`}
                    />
                  </label>
                  <label className={labelClass}>
                    방문 요청일
                    <input name="visit_date" type="date" defaultValue={row.visit_date} required className={fieldClass} />
                  </label>
                  <label className={labelClass}>
                    방문 희망 시간
                    <input name="visit_time" type="time" defaultValue={row.visit_time} required className={fieldClass} />
                  </label>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="submit"
                    className="h-[34px] rounded-md border border-navy bg-white px-4 text-[12px] font-bold text-navy transition hover:shadow-[0_2px_6px_rgba(20,30,50,0.1)] active:scale-95"
                  >
                    수정 저장
                  </button>
                  <button
                    type="submit"
                    formAction={confirmRequest.bind(null, row.id)}
                    className="h-[34px] rounded-md bg-navy px-4 text-[12px] font-bold text-white transition hover:bg-navy-dark active:scale-95"
                  >
                    일정 확정
                  </button>
                </div>
              </form>
            ) : (
              <div key={row.id} className="rounded-xl border border-line bg-card p-4 transition hover:border-navy-light">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={row.status} />
                  <span className="text-[12px] font-bold text-navy">
                    {row.visit_date} {row.visit_time}
                  </span>
                  <span className="flex-1" />
                  <span className="text-[11px] text-mute">접수일 {row.created_at.slice(0, 10)}</span>
                </div>
                <div className="text-[13.5px] font-bold text-txt">
                  {row.company}
                  <span className="ml-2 font-normal text-sub">
                    {row.requester}
                    {row.role ? ` (${row.role})` : ""}
                    {row.phone ? ` · ${row.phone}` : ""}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-sub">
                  {row.equipment_name}
                  {row.serial_no ? ` · S/N ${row.serial_no}` : ""}
                  {row.address ? ` · ${row.address}` : ""}
                </div>
                <p className="mt-2 border-t border-line-soft pt-2 text-[12.5px] leading-5 text-txt">
                  {row.symptom}
                </p>
                <form
                  action={updateStatus.bind(null, row.id)}
                  className="mt-3 flex items-center justify-end gap-2 border-t border-line-soft pt-3"
                >
                  <span className="shrink-0 whitespace-nowrap text-[11.5px] font-semibold text-sub">
                    상태 변경
                  </span>
                  <select
                    name="status"
                    defaultValue={row.status}
                    className={`${controlClass} w-[110px] shrink-0`}
                  >
                    {/* 확정 취소는 PRD 6번 비범위이므로 '접수'로 되돌리는 선택지는 두지 않는다 */}
                    {STATUSES.filter((status) => status !== "접수").map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="h-[34px] shrink-0 whitespace-nowrap rounded-md border border-navy bg-white px-4 text-[12px] font-bold text-navy transition hover:shadow-[0_2px_6px_rgba(20,30,50,0.1)] active:scale-95"
                  >
                    저장
                  </button>
                </form>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
