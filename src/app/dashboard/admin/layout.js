"use client";

import SidebarHeader from "@/components/UserLayout/UserSidebar";

export default function DashboardLayout({ children }) {
  return <SidebarHeader>{children}</SidebarHeader>;
}
