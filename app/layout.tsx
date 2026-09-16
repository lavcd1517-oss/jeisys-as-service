import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./_components/app-shell";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "A/S 통합서비스",
  description: "A/S 접수 및 일정 관리",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        {/* 로그인 전(로그인·가입 화면)에는 사이드바 없이 화면만 보여준다. */}
        {user ? <AppShell user={user}>{children}</AppShell> : children}
      </body>
    </html>
  );
}
