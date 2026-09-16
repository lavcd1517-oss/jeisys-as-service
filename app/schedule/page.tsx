import { createServerSupabaseClient } from "@/lib/supabase-server";
import { updateAssignee } from "../actions";
import ScreenHeader from "../_components/screen-header";
import { STATUS_STYLE, type Status } from "../_components/status";

export const dynamic = "force-dynamic";

type ScheduleRow = {
  id: string;
  visit_date: string;
  visit_time: string;
  requester: string;
  assignee: string | null;
  company: string;
  symptom: string;
  address: string | null;
  status: string;
};

export default async function SchedulePage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("as_requests")
    .select("id, visit_date, visit_time, requester, assignee, company, symptom, address, status")
    .returns<ScheduleRow[]>();

  // 방문예상일 기준 정렬, 같은 날이면 시간 순
  const rows = (data ?? []).sort(
    (a, b) =>
      a.visit_date.localeCompare(b.visit_date) || a.visit_time.localeCompare(b.visit_time)
  );
  const pendingCount = rows.filter((row) => !row.assignee).length;

  return (
    <div>
      <ScreenHeader
        title="📅 일정 관리"
        subtitle="방문예상일 순으로 정렬됩니다. 담당직원은 칸에 바로 적고 저장하세요"
        width="max-w-[1100px]"
      />

      <div className="mx-auto max-w-[1100px] p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold text-mute">
          <span>전체 {rows.length}건</span>
          <span className="text-line">|</span>
          <span className="text-[#97621b]">담당직원 미지정 {pendingCount}건</span>
        </div>

        {error && (
          <p className="rounded-lg border border-[#e3b4b0] bg-[#f8ecea] px-4 py-3 text-[13px] text-[#9c3b34]">
            일정을 불러오지 못했습니다.
          </p>
        )}

        {!error && rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-line bg-card px-4 py-12 text-center text-[13px] text-mute">
            아직 등록된 일정이 없습니다.
          </div>
        )}

        {rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-line bg-card">
            <table className="w-full min-w-[900px] border-collapse text-[12.5px]">
              <thead>
                <tr className="bg-soft text-left text-sub">
                  <th className="w-[118px] border-b border-line px-3 py-2.5 font-bold">날짜</th>
                  <th className="w-[84px] border-b border-line px-3 py-2.5 font-bold">접수자</th>
                  <th className="w-[150px] border-b border-line px-3 py-2.5 font-bold">담당직원</th>
                  <th className="w-[130px] border-b border-line px-3 py-2.5 font-bold">거래처</th>
                  <th className="border-b border-line px-3 py-2.5 font-bold">내용</th>
                  <th className="w-[190px] border-b border-line px-3 py-2.5 font-bold">주소</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`align-middle ${row.status === "접수" ? "bg-[#fdfaf3]" : ""}`}
                  >
                    <td className="border-b border-line-soft px-3 py-2.5 whitespace-nowrap">
                      <div className="font-bold text-txt">{row.visit_date.slice(5)}</div>
                      <div className="text-[11px] text-mute">{row.visit_time}</div>
                    </td>
                    <td className="border-b border-line-soft px-3 py-2.5 whitespace-nowrap">
                      {row.requester}
                    </td>
                    <td className="border-b border-line-soft px-3 py-2.5">
                      <form action={updateAssignee.bind(null, row.id)} className="flex gap-1">
                        <input
                          name="assignee"
                          defaultValue={row.assignee ?? ""}
                          placeholder="미지정"
                          className="h-[30px] w-full min-w-0 rounded-md border border-line bg-white px-2 text-[12px] text-txt outline-none transition placeholder:text-mute focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,97,172,0.12)]"
                        />
                        <button
                          type="submit"
                          className="h-[30px] shrink-0 rounded-md border border-line px-2 text-[11px] font-bold text-sub transition hover:border-navy hover:text-navy"
                        >
                          저장
                        </button>
                      </form>
                    </td>
                    <td className="border-b border-line-soft px-3 py-2.5">
                      <div className="font-bold text-txt">{row.company}</div>
                      <span
                        className={`mt-1 inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold ${
                          STATUS_STYLE[row.status as Status] ?? STATUS_STYLE["접수"]
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="max-w-0 border-b border-line-soft px-3 py-2.5">
                      <div className="truncate" title={row.symptom}>
                        {row.symptom}
                      </div>
                    </td>
                    <td className="max-w-0 border-b border-line-soft px-3 py-2.5 text-sub">
                      <div className="truncate" title={row.address ?? ""}>
                        {row.address ?? "—"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 text-[11px] text-mute">
          미확정(접수) 건은 배경색으로 구분됩니다. 상태 변경은 접수 목록 화면에서 할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
