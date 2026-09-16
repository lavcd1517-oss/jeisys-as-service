"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "./nav-items";
import { signOut } from "../auth-actions";
import type { CurrentUser } from "@/lib/auth";

export default function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: CurrentUser;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 관리자 전용 메뉴는 일반 직원에게 보이지 않는다.
  const navItems = NAV_ITEMS.filter((item) => !item.adminOnly || user.role === "admin");
  const current = navItems.find((item) => item.href === pathname);

  return (
    <div className="flex min-h-screen">
      {/* 모바일에서 사이드바를 열었을 때 뒤를 덮는 막 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-sidebar-border px-[18px] py-5">
          <div className="text-[13px] font-extrabold tracking-wide text-[#17191c]">
            JEISYS MEDICAL
          </div>
          <div className="mt-1 text-[10.5px] font-semibold text-mute">
            A/S 통합서비스
          </div>
        </div>

        <nav className="flex flex-1 flex-col p-2.5">
          {(["업무", "기타"] as const).map((group) => (
            <div
              key={group}
              className="mt-1 flex flex-col gap-0.5 first:mt-0 [&+div]:mt-3 [&+div]:border-t [&+div]:border-sidebar-border [&+div]:pt-3"
            >
              <div className="px-3 pb-1 text-[9.5px] font-bold uppercase tracking-wider text-mute">
                {group}
              </div>
              {navItems.filter((item) => item.group === group).map((item) => {
                const active = item.href === pathname;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[12.5px] font-bold transition-colors ${
                      active
                        ? "bg-shell-soft text-shell before:absolute before:left-0 before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:rounded-r before:bg-shell"
                        : "text-[#4b5563] hover:bg-shell-soft hover:text-shell"
                    }`}
                  >
                    <span className="w-[18px] shrink-0 text-center">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {!item.ready && (
                      <span className="rounded-full bg-line-soft px-1.5 py-0.5 text-[9px] font-bold text-mute">
                        준비중
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3 text-[10.5px] text-mute">
          제이시스메디칼 국내 A/S팀
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[54px] items-center gap-2.5 border-b border-line bg-white px-[18px]">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="메뉴 열기"
            className="text-lg text-sub lg:hidden"
          >
            ☰
          </button>
          <div className="text-[13.5px] font-bold text-txt">
            {current?.label ?? "A/S 통합서비스"}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2.5">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-[12px] font-bold text-txt">{user.name}</div>
              <div className="text-[10.5px] text-mute">
                {user.role === "admin" ? "관리자" : "국내 A/S"}
              </div>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-shell-soft text-[12px] font-bold text-shell">
              {user.name.slice(0, 1)}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md border border-line px-2.5 py-1.5 text-[11.5px] font-bold text-sub transition hover:border-navy hover:text-navy"
              >
                로그아웃
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
