"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  // If user goes to home page, log them out
  useEffect(() => {
    if (pathname === "/" && user) {
      logout();
    }
  }, [pathname, user, logout]);

  const isHome = pathname === "/";

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent px-6 py-3 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-200">Truth Seeker</span>
        </Link>

        {/* Navbar */}
        {isHome || !user ? (
          <div className="flex items-center gap-7">
            <Link href="/" className="hidden md:inline text-slate-200 hover:text-slate-500">Home</Link>
            <Link href="/about" className="hidden md:inline text-slate-200 hover:text-slate-500">About</Link>
            <Link href="/" className="hidden md:inline text-slate-200 hover:text-slate-500">Contact Us</Link>
            <Link href="/" className="hidden md:inline text-slate-200 hover:text-slate-500">Services</Link>
            <Link href="/text-model" className="hidden md:inline text-slate-200 hover:text-slate-500">Text</Link>
            <Link href="/picture-model" className="hidden md:inline text-slate-200 hover:text-slate-500">Image</Link>
            <Link href="/video-model" className="hidden md:inline text-slate-200 hover:text-slate-500">Video</Link>

          </div>
        ) : (
          <div className="flex items-center gap-7">
            <Link href="/text-model" className="hidden md:inline text-slate-600 hover:text-slate-900">Text</Link>
            <Link href="/picture-model" className="hidden md:inline text-slate-600 hover:text-slate-900">Image</Link>
            <Link href="/video-model" className="hidden md:inline text-slate-600 hover:text-slate-900">Video</Link>
            <Link href="/dashboard" className="hidden md:inline text-slate-600 hover:text-slate-900">Dashboard</Link>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="text-slate-500">...</div>
          ) : user ? (
            <button
              onClick={logout}
              className="mr-11 px-3 py-1 border rounded text-slate-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1 border rounded text-slate-200 hover:text-slate-500">Login</Link>
              <Link href="/signup" className="px-3 py-1 bg-teal-600 text-white rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}














// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Brain, Menu, Home, BarChart3, Video, Eye, MessageSquare, Info } from "lucide-react"

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const pathname = usePathname()

//   const navItems = [
//     { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
//     { href: "/dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
//     { href: "/text-model", label: "Text Analysis", icon: <MessageSquare className="w-4 h-4" /> },
//     { href: "/picture-model", label: "Image Analysis", icon: <Eye className="w-4 h-4" /> },
//     { href: "/video-model", label: "Video Analysis", icon: <Video className="w-4 h-4" /> },
//     { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
//   ]

//   const isActive = (href) => pathname === href

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-9 shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
//               <Brain className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-slate-900">Truth Seeker</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href}>
//                 <Button
//                   variant={isActive(item.href) ? "default" : "ghost"}
//                   className={`flex items-center space-x-2 ${
//                     isActive(item.href)
//                       ? "bg-teal-600 text-white hover:bg-teal-700"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </Button>
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Navigation */}
//           <div className="md:hidden">
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="text-slate-600">
//                   <Menu className="w-6 h-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="bg-white border-slate-200">
//                 <div className="flex flex-col space-y-4 mt-8">
//                   {navItems.map((item) => (
//                     <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
//                       <Button
//                         variant={isActive(item.href) ? "default" : "ghost"}
//                         className={`w-full justify-start flex items-center space-x-2 ${
//                           isActive(item.href)
//                             ? "bg-teal-600 text-white hover:bg-teal-700"
//                             : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//                         }`}
//                       >
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </Button>
//                     </Link>
//                   ))}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }