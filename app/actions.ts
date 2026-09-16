"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import { isStatus } from "./_components/status";

const REQUIRED_FIELDS = [
  ["company", "거래처"],
  ["requester", "접수자"],
  ["equipment_name", "장비명"],
  ["symptom", "증상"],
  ["visit_date", "방문예상일"],
  ["visit_time", "방문요청 시간"],
] as const;

export type CreateRequestState = {
  error?: string;
  success?: boolean;
};

// 연락처·구분·주소·시리얼번호는 선택 항목이라 비어 있으면 null로 저장한다.
// 담당직원(assignee)은 일정 관리 화면에서만 다루므로 여기 넣지 않는다.
// 넣으면 접수 목록에서 수정 저장할 때 이미 배정된 담당직원이 지워진다.
const OPTIONAL_FIELDS = ["phone", "role", "address", "serial_no"] as const;

// 폼 값을 읽어 필수 항목 누락 여부까지 함께 돌려준다.
function readFields(formData: FormData) {
  const values: Record<string, string | null> = {};
  for (const [key] of REQUIRED_FIELDS) {
    values[key] = String(formData.get(key) ?? "").trim();
  }

  const missing = REQUIRED_FIELDS.filter(([key]) => !values[key]);

  for (const key of OPTIONAL_FIELDS) {
    values[key] = String(formData.get(key) ?? "").trim() || null;
  }

  return { values, missing };
}

// 접수·목록·일정 화면이 모두 같은 데이터를 보므로 함께 갱신한다.
function revalidateScreens() {
  revalidatePath("/");
  revalidatePath("/list");
  revalidatePath("/schedule");
}

export async function createRequest(
  _prevState: CreateRequestState,
  formData: FormData
): Promise<CreateRequestState> {
  // 화면을 막아도 Server Action은 직접 호출될 수 있어 여기서도 확인한다.
  if (!(await getCurrentUser())) {
    return { error: "로그인이 필요합니다. 다시 로그인해주세요." };
  }

  const { values, missing } = readFields(formData);

  if (missing.length > 0) {
    return {
      error: `다음 항목을 입력해주세요: ${missing.map(([, label]) => label).join(", ")}`,
    };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("as_requests").insert(values);

  if (error) {
    return { error: "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }

  revalidateScreens();
  return { success: true };
}

// 접수 목록에서 담당자가 내용을 고칠 때 사용
export async function updateRequest(id: string, formData: FormData) {
  if (!(await getCurrentUser())) return;

  const { values, missing } = readFields(formData);
  if (missing.length > 0) return;

  const supabase = createServerSupabaseClient();
  await supabase.from("as_requests").update(values).eq("id", id);
  revalidateScreens();
}

// 담당자가 조정한 방문 일정까지 함께 저장하면서 확정 처리
export async function confirmRequest(id: string, formData: FormData) {
  if (!(await getCurrentUser())) return;

  const { values, missing } = readFields(formData);
  if (missing.length > 0) return;

  const supabase = createServerSupabaseClient();
  await supabase
    .from("as_requests")
    .update({ ...values, status: "일정확정", confirmed: true })
    .eq("id", id);
  revalidateScreens();
}

// 확정 이후 진행 상태(수리중·완료 등)를 바꿀 때 사용
export async function updateStatus(id: string, formData: FormData) {
  if (!(await getCurrentUser())) return;

  const status = String(formData.get("status") ?? "");
  // 확정 취소(되돌리기)는 PRD 6번 비범위라서 '접수'로는 되돌리지 않는다
  if (!isStatus(status) || status === "접수") return;

  const supabase = createServerSupabaseClient();
  await supabase
    .from("as_requests")
    .update({ status, confirmed: true })
    .eq("id", id);
  revalidateScreens();
}

// 일정 관리 표에서 담당직원 이름을 직접 적어 저장할 때 사용
export async function updateAssignee(id: string, formData: FormData) {
  if (!(await getCurrentUser())) return;

  const assignee = String(formData.get("assignee") ?? "").trim() || null;

  const supabase = createServerSupabaseClient();
  await supabase.from("as_requests").update({ assignee }).eq("id", id);
  revalidateScreens();
}
