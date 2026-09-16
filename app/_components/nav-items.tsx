import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
    >
      {children}
    </svg>
  );
}

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  ready: boolean;
  group: "업무" | "기타";
  // 관리자만 볼 수 있는 메뉴
  adminOnly?: boolean;
};

// ready=false 인 메뉴는 자리만 잡아두고 "준비 중" 안내로 연결된다.
export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "홈(대시보드)",
    ready: true,
    group: "업무",
    icon: (
      <Icon>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
      </Icon>
    ),
  },
  {
    href: "/request",
    label: "A/S 접수하기",
    ready: true,
    group: "업무",
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </Icon>
    ),
  },
  {
    href: "/list",
    label: "접수 목록",
    ready: true,
    group: "업무",
    icon: (
      <Icon>
        <path d="M8 6h12M8 12h12M8 18h12" />
        <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
      </Icon>
    ),
  },
  {
    href: "/schedule",
    label: "일정 관리",
    ready: true,
    group: "업무",
    icon: (
      <Icon>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </Icon>
    ),
  },
  {
    href: "/error-code",
    label: "에러코드 조회",
    ready: true,
    group: "기타",
    icon: (
      <Icon>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20 15.3 15.3" />
      </Icon>
    ),
  },
  {
    href: "/parts-exchange",
    label: "비출동 소모품 교환",
    ready: true,
    group: "기타",
    icon: (
      <Icon>
        <rect x="2" y="7" width="12" height="9" rx="1" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18.5" r="1.6" />
        <circle cx="17.5" cy="18.5" r="1.6" />
      </Icon>
    ),
  },
  {
    href: "/stock",
    label: "재고 조회",
    ready: true,
    group: "기타",
    icon: (
      <Icon>
        <path d="M4 4h6l2 3h8v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      </Icon>
    ),
  },
  {
    href: "/field-issue",
    label: "필드이슈 대시보드",
    ready: true,
    group: "기타",
    icon: (
      <Icon>
        <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2.2h8a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17Z" />
      </Icon>
    ),
  },
  {
    href: "/engineer",
    label: "엔지니어 전용",
    ready: true,
    group: "기타",
    adminOnly: true,
    icon: (
      <Icon>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 0 0 4.9-5.4l-2.8 2.8-2.1-2.1Z" />
      </Icon>
    ),
  },
];

// 참고 화면에 나온 제이시스메디칼 장비 목록
export const DEVICES = [
  "POTENZA",
  "Linear Z",
  "DENSITY",
  "TRI-BEAM Premium",
  "Cellec V",
  "D'LIV",
  "기타",
];
