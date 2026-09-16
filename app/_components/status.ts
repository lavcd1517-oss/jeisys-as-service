// 접수 건의 상태 4종. 배열 순서가 곧 목록 정렬 순서다 (조치가 필요한 건이 위로).
export const STATUSES = ["접수", "일정확정", "수리중", "완료"] as const;

export type Status = (typeof STATUSES)[number];

// 참고 화면(제이시스메디칼 A/S 통합 조회)의 파스텔 뱃지 색을 그대로 사용
export const STATUS_STYLE: Record<Status, string> = {
  접수: "border-[#e6cd9e] bg-[#f9f2e4] text-[#97621b]",
  일정확정: "border-[#b7cbe6] bg-[#eef3fa] text-[#2c5c96]",
  수리중: "border-[#b9d2c9] bg-[#eef6f2] text-[#35735d]",
  완료: "border-[#a9dcbd] bg-[#e7f5ec] text-[#1e7b45]",
};

export function statusRank(status: string) {
  const index = STATUSES.indexOf(status as Status);
  return index === -1 ? STATUSES.length : index;
}

export function isStatus(value: string): value is Status {
  return STATUSES.includes(value as Status);
}
