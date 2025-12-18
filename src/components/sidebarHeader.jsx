"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Image,
  Video,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  ChevronUp,
} from "lucide-react";

export default function SidebarHeader({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
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

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  const sections = [
    {
      title: "DASHBOARD",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Traffic", icon: BarChart3, path: "/dashboard/traffic" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: "Text Model", icon: FileText, path: "/dashboard/text-model" },
        { label: "Image Model", icon: Image, path: "/dashboard/picture-model" },
        { label: "Video Model", icon: Video, path: "/dashboard/video-model" },
      ],
    },
    {
      title: "OTHERS",
      items: [
        { label: "Settings", icon: Settings, path: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 rounded-2xl">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-transparent flex items-center px-6"></header>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-teal-900 rounded-r-2xl transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1">
            <header className="mt-3 bg-teal-900">
              <div className="h-16 flex p-7 items-center gap-3">
                <img
                  src="/globe.svg"
                  className={`${
                    collapsed ? "w-9" : "w-7"
                  } transition-all duration-300`}
                  alt="logo"
                />
                {!collapsed && (
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-200">
                      DeepTrace
                    </p>
                    <p className="text-xs text-slate-300">Dashboard</p>
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
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition
                            ${
                              active
                                ? "bg-emerald-50 text-emerald-900"
                                : "text-slate-200 hover:bg-emerald-50 hover:text-teal-900"
                            }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              active ? "text-emerald-600" : "text-slate-200"
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
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center ${
                collapsed ? "justify-center" : "justify-between"
              } w-full p-2 rounded-lg hover:bg-teal-800 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
                  MS
                </div>
                {!collapsed && (
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Moiz Shah</p>
                    <p className="text-xs text-slate-300">Admin</p>
                  </div>
                )}
              </div>
              {!collapsed && (
                <ChevronUp
                  className={`h-4 w-4 text-slate-300 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && !collapsed && (
              <div className="absolute bottom-16 left-3 right-3 bg-white rounded-lg shadow-lg py-2 border">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`pt-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="p-1">{children}</div>
      </main>
    </div>
  );
}




















// "use client";

// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   BarChart3,
//   Image,
//   Video,
//   FileText,
//   Settings,
//   Bell,
//   Search,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// export default function SidebarHeader({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   //   logout handler
//   const handleLogout = () => {
//     // Implement your logout logic here
//     console.log("User logged out");
//     router.push("/");
//   };

//   const sections = [
//     {
//       title: "DASHBOARD",
//       items: [
//         { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//         { label: "Traffic", icon: BarChart3, path: "/dashboard/traffic" },
//       ],
//     },
//     {
//       title: "MANAGEMENT",
//       items: [
//         { label: "Text Model", icon: FileText, path: "/dashboard/text-model" },
//         { label: "Image Model", icon: Image, path: "/dashboard/picture-model" },
//         { label: "Video Model", icon: Video, path: "/dashboard/video-model" },
//       ],
//     },
//     {
//       title: "OTHERS",
//       items: [
//         { label: "Settings", icon: Settings, path: "/dashboard/settings" },
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 rounded-2xl">
//       {/* ================= HEADER ================= */}
//       <header className="fixed top-0 justify-end left-0 right-0 z-30 h-18 bg-white shadow-sm flex items-center px-6"></header>

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full bg-teal-900 rounded-r-2xl transition-all duration-300
//           ${collapsed ? "w-20" : "w-64"}`}
//       >
//         <div className="">
//           <header className="mt-3 bg-teal-900">
//             <div className="h-16 flex p-7 items-center gap-3 bg-teal-900">
//               {/* Logo */}
//               <img
//                 src={collapsed ? "/globe.svg" : "/globe.svg"}
//                 className={`${
//                   collapsed ? "w-9" : "w-7"
//                 } transition-all duration-300`}
//                 alt="logo"
//               />

//               {/* Text */}
//               {!collapsed && (
//                 <div className="leading-tight">
//                   <p className="text-sm font-semibold text-slate-200">
//                     DeepTrace
//                   </p>
//                   <p className="text-xs text-slate-300">Dashboard</p>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Collapse Toggle (Top Right) */}
//           <div
//             className={`flex ${
//               collapsed ? "justify-center" : "justify-end"
//             } px-3`}
//           >
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="h-8 w-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center"
//             >
//               {collapsed ? (
//                 <ChevronRight className="h-4 w-4 text-emerald-700" />
//               ) : (
//                 <ChevronLeft className="h-4 w-4 text-emerald-700" />
//               )}
//             </button>
//           </div>

//           <nav className="px-3 mt-2 bg-teal-900 space-y-6">
//             {sections.map((section) => (
//               <div key={section.title}>
//                 {!collapsed && (
//                   <p className="px-3 mb-2 text-xs font-semibold text-slate-200">
//                     {section.title}
//                   </p>
//                 )}

//                 <div className="space-y-1">
//                   {section.items.map((item) => {
//                     const Icon = item.icon;
//                     const active = pathname === item.path;

//                     return (
//                       <button
//                         key={item.path}
//                         onClick={() => router.push(item.path)}
//                         className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition
//                         ${
//                           active
//                             ? "bg-emerald-50 text-emerald-900"
//                             : "text-slate-200 hover:bg-emerald-50 hover:text-teal-900"
//                         }`}
//                       >
//                         <Icon
//                           className={`h-5 w-5 ${
//                             active ? "text-emerald-600" : "text-slate-200"
//                           }`}
//                         />
//                         {!collapsed && (
//                           <span className="text-sm font-medium">
//                             {item.label}
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </nav>

//           <footer className="bg-red-700">
//             <div className="absolute bottom-2 w-full flex justify-center bg-red-700 p-3">
//               <div className="flex items-center gap-1">
//                 <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
//                   MS
//                 </div>

//                 <span className="hidden md:block text-slate-600 text-sm font-medium">
//                   Moiz Shah
//                 </span>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="hidden md:flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </footer>


//         </div>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <main
//         className={`pt-16 transition-all duration-300 ${
//           collapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         <div className="p-1">{children}</div>
//       </main>
//     </div>
//   );
// }












// "use client";

// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import {Search,BarChart3,Users,Settings,Bell,ChevronLeft,ChevronRight,TrendingUp,Download,} from "lucide-react";

// export const ACCENT = ["#1447E6", "#4772FF", "#8CA8FF", "#C7D4FF", "#EEF3FF"];

// export default function SidebarHeader({
//   children,
//   user = { name: "John Doe" },
// }) {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const navigation = [
//     {
//       id: "text",
//       name: "Text",
//       icon: BarChart3,
//       path: "/dashboard/text-model",
//     },
//     {
//       id: "image",
//       name: "Image",
//       icon: TrendingUp,
//       path: "/dashboard/picture-model",
//     },
//     {
//       id: "video",
//       name: "Video",
//       icon: Search,
//       path: "/dashboard/video-model",
//     },
//     {
//       id: "reports",
//       name: "Reports",
//       icon: Download,
//       path: "/dashboard/reports",
//     },
//     {
//       id: "settings",
//       name: "Settings",
//       icon: Settings,
//       path: "/dashboard/settings",
//     },
//   ];

//   const activeId =
//     navigation.find((n) => pathname === n.path)?.id || "overview";

//   const toggleSidebar = () => setIsSidebarCollapsed((v) => !v);

//   return (
//     <div className="flex min-h-screen bg-white text-slate-700">
//       {/* HEADER (BEHIND SIDEBAR) */}
//       <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 backdrop-blur z-20 px-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Search className="w-5 h-5" style={{ color: ACCENT[0] }} />
//           <span className="font-semibold text-lg text-slate-800">
//             {/* SEO Dashboard */}
//           </span>
//         </div>

//         <div className="flex items-center gap-4">
//           <button className="relative p-2 rounded-lg hover:bg-slate-100">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
//           </button>

//           <div className="flex items-center gap-2 cursor-pointer">
//             <div
//               className="w-8 h-8 rounded-full flex items-center justify-center text-white"
//               style={{
//                 background: `linear-gradient(135deg, ${ACCENT[0]}, ${ACCENT[1]})`,
//               }}
//             >
//               <Users className="w-4 h-4" />
//             </div>
//             <span className="text-sm font-medium">{user.name}</span>
//           </div>
//         </div>
//       </header>

//       {/* SIDEBAR (ON TOP OF HEADER) */}
//       <aside
//         className={`fixed top-0 rounded-2xl left-0 h-screen bg-white border-r border-slate-200 z-50 transition-all ${
//           isSidebarCollapsed ? "w-20" : "w-64"
//         } pt-16`}
//       >
//         <nav className="px-3 space-y-1">
//           {navigation.map((item) => {
//             const Icon = item.icon;
//             const active = activeId === item.id;

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => router.push(item.path)}
//                 className={`flex items-center w-full gap-3 rounded-xl transition px-4 py-2.5 ${
//                   active
//                     ? "bg-blue-50 font-semibold"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`}
//               >
//                 <Icon
//                   className="w-5 h-5"
//                   style={{ color: active ? ACCENT[0] : "#94a3b8" }}
//                 />
//                 {!isSidebarCollapsed && <span>{item.name}</span>}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-6 w-full flex justify-center">
//           <button
//             onClick={toggleSidebar}
//             className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
//           >
//             {isSidebarCollapsed ? (
//               <ChevronRight className="h-4 w-4" />
//             ) : (
//               <ChevronLeft className="h-4 w-4" />
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main
//         className={`flex-1 mt-16 p-1 transition-all bg-white duration-300 ${
//           isSidebarCollapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }
