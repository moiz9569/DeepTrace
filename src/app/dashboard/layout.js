"use client";

import { useState } from "react";
import SidebarHeader from "@/components/sidebarHeader";

export default function DashboardLayout({ children }) {
  const [currentView, setCurrentView] = useState("overview");

  return (
    <SidebarHeader
      currentView={currentView}
      onViewChange={setCurrentView}
      user={{ name: "John Doe" }}
    >
      {children}
    </SidebarHeader>
  );
}
