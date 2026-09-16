import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import ScreenHeader from "../_components/screen-header";
import EngineerTabs, { type AsHistoryRow } from "./engineer-tabs";

export const dynamic = "force-dynamic";

export default async function EngineerPage() {
  const user = await getCurrentUser();

  if (user?.role !== "admin") {
    return (
      <div>
        <ScreenHeader title="🔧 엔지니어 전용" subtitle="관리자만 볼 수 있는 화면입니다" />
        <div className="mx-auto max-w-[900px] p-4">
          <div className="rounded-xl border border-dashed border-line bg-card px-4 py-14 text-center">
            <div className="text-[22px]">🔒</div>
            <div className="mt-2.5 text-[14px] font-bold text-txt">접근 권한이 없습니다</div>
            <p className="mt-1.5 text-[12.5px] leading-5 text-sub">
              이 화면은 관리자 권한이 있어야 볼 수 있습니다.
              <br />
              필요하시면 A/S팀 관리자에게 권한을 요청해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("as_requests")
    .select("id, visit_date, company, equipment_name, assignee, status")
    .order("visit_date", { ascending: true })
    .returns<AsHistoryRow[]>();

  return (
    <div>
      <ScreenHeader
        title="🔧 엔지니어 전용"
        subtitle="현장 점검과 팀 현황을 확인하는 도구 모음"
        width="max-w-[1000px]"
      />

      <div className="mx-auto max-w-[1000px] p-4">
        <EngineerTabs asHistory={data ?? []} />
      </div>
    </div>
  );
}
