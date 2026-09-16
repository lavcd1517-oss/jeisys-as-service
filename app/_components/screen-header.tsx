import type { ReactNode } from "react";

// 모든 화면 상단에 공통으로 들어가는 남색 바 (참고 화면의 header 구조)
export default function ScreenHeader({
  title,
  subtitle,
  action,
  width = "max-w-[900px]",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  width?: string;
}) {
  return (
    <div className="bg-navy px-5 py-3.5 text-white shadow-sm">
      <div className={`mx-auto flex items-center gap-3 ${width}`}>
        <div className="min-w-0">
          <div className="text-[15px] font-bold tracking-tight">{title}</div>
          {subtitle && (
            <div className="mt-1 text-[11.5px] text-white/65">{subtitle}</div>
          )}
        </div>
        <div className="flex-1" />
        {action}
      </div>
    </div>
  );
}
