"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  BarChart3,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Download,
} from "lucide-react";

export const ACCENT = ["#1447E6", "#4772FF", "#8CA8FF", "#C7D4FF", "#EEF3FF"];

export default function SidebarHeader({
  children,
  user = { name: "John Doe" },
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { id: "text", name: "Text", icon: BarChart3, path: "/dashboard/text-model" },
    { id: "image", name: "Image", icon: TrendingUp, path: "/dashboard/image-model" },
    { id: "video", name: "Video", icon: Search, path: "/dashboard/video-model" },
    { id: "reports", name: "Reports", icon: Download, path: "/dashboard/reports" },
    { id: "settings", name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const activeId =
    navigation.find((n) => pathname === n.path)?.id || "overview";

  const toggleSidebar = () => setIsSidebarCollapsed((v) => !v);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700">
      {/* HEADER (BEHIND SIDEBAR) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur border-b border-slate-200 z-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" style={{ color: ACCENT[0] }} />
          <span className="font-semibold text-lg text-slate-800">
            SEO Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT[0]}, ${ACCENT[1]})`,
              }}
            >
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </header>

      {/* SIDEBAR (ON TOP OF HEADER) */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-50 transition-all ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } pt-16`}
      >
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activeId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex items-center w-full gap-3 rounded-xl transition px-4 py-2.5 ${
                  active
                    ? "bg-blue-50 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: active ? ACCENT[0] : "#94a3b8" }}
                />
                {!isSidebarCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 w-full flex justify-center">
          <button
            onClick={toggleSidebar}
            className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 ml-${
          isSidebarCollapsed ? "20" : "64"
        } mt-16 p-4 transition-all`}
      >
        {children}
      </main>
    </div>
  );
}
