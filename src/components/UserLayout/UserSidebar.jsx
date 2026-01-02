"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  LayoutDashboard,
  BarChart3,
  Image,
  Video,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

export default function UserSidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user,logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    router.push("/dashboard/user/profile");
  };

  const Logout = async () => {
    try {
      setLogoutLoading(true);
      logout()
      await new Promise((resolve) => setTimeout(resolve, 2500));
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const sections = [
    {
      title: "DASHBOARD",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/user" },
        { label: "Profile", icon: User, path: "/dashboard/user/profile" },
        { label: "Details", icon: BarChart3, path: "/dashboard/user/details" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          label: "Text Model",
          icon: FileText,
          path: "/dashboard/user/text-model",
        },
        {
          label: "Image Model",
          icon: Image,
          path: "/dashboard/user/picture-model",
        },
        {
          label: "Video Model",
          icon: Video,
          path: "/dashboard/user/video-model",
        },
      ],
    },
    // {
    //   title: "OTHERS",
    //   items: [
    //     { label: "Settings", icon: Settings, path: "/dashboard/user/settings" },
    //   ],
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-50 rounded-2xl">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 shadow-sm right-0 z-30 h-16 bg-transparent rounded-2xl backdrop-blur-md">
        <div className="h-full px-6 flex items-center justify-end gap-4">
          {/* Welcome Badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-4 py-2 
      bg-linear-to-r from-teal-50 to-emerald-50 
      border border-emerald-200 
      rounded-full text-sm text-emerald-700 shadow-sm"
          >
            <span className="opacity-80">Welcome,</span>
            <span className="font-semibold truncate max-w-30">
              {user?.name || user?.email || "User"}
            </span>
          </div>

          {/* Profile + Logout */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 
          rounded-full bg-teal-600/90 hover:bg-teal-700 
          text-white shadow-md transition-all"
              >
                <span className="hidden sm:inline text-sm font-medium truncate max-w-25">
                  View Profile
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 rounded-r-2xl left-0 z-50 h-full bg-teal-900 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1">
            <header className="mt-3 bg-teal-900">
              <div className="h-16 flex p-7 items-center gap-3">
                <img
                  src="/Deeptrace-new-logo.png"
                  className={`${
                    collapsed ? "w-9" : "w-12"
                  } transition-all duration-300`}
                  alt="logo"
                />
                {!collapsed && (
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-200">
                      DeepTrace
                    </p>
                    <p className="text-xs text-slate-300">User Dashboard</p>
                  </div>
                )}
              </div>
            </header>

            {/* Collapse Toggle */}
            <div
              className={`flex ${
                collapsed ? "justify-center" : "justify-end"
              } px-3`}
            >
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="h-8 w-8 rounded-lg flex items-center justify-center"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4 text-white" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-white" />
                )}
              </button>
            </div>

            <nav className="px-3 mt-2 space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  {!collapsed && (
                    <p className="px-3 mb-2 text-xs font-semibold text-slate-200">
                      {section.title}
                    </p>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = pathname === item.path;

                      return (
                        <button
                          key={item.path}
                          onClick={() => router.push(item.path)}
                          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition
    ${
      active
        ? "bg-emerald-50 text-emerald-900"
        : "text-slate-200 cursor-pointer hover:bg-emerald-50 hover:text-teal-900"
    }`}
                        >
                          <Icon
                            className={`h-5 w-5 transition-colors
      ${
        active ? "text-emerald-600" : "text-slate-200 group-hover:text-teal-900"
      }`}
                          />

                          {!collapsed && (
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* User Menu */}
          <div className="p-3 border-t border-teal-800" ref={userMenuRef}>
            <button
              onClick={Logout}
              className="flex items-center cursor-pointer gap-3 w-full px-8 py-2.5 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-base">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      <main
        className={`pt-16 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="p-1">{children}</div>
      </main>
    </div>
  );
}
