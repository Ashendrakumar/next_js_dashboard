// components/dashboard/DashboardHeader.tsx

"use client";

import LogoutButton from "@/components/auth/LogoutButton";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = "User" }: DashboardHeaderProps) {
  return (
    <header className="bg-[#1e293b] border-b border-[#475569] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Dashboard</h1>
          <p className="text-sm text-[#cbd5e1] mt-1">
            Welcome back,{" "}
            <span className="font-medium text-blue-400">{userName}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6">
            <a
              href="/dashboard"
              className="text-[#cbd5e1] hover:text-blue-400 font-medium text-sm transition-colors"
            >
              Users
            </a>
            <a
              href="/dashboard/profile"
              className="text-[#cbd5e1] hover:text-blue-400 font-medium text-sm transition-colors"
            >
              Profile
            </a>
          </nav>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
