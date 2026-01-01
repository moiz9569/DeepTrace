"use client";

import SidebarHeader from "@/components/AdminLayout/AdminSidebar";

export default function DashboardLayout({ children }) {
  return <SidebarHeader>{children}</SidebarHeader>;
}
