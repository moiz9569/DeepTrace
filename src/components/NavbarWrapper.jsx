"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();

  // ❌ routes where navbar should NOT appear
  const hideNavbarRoutes = ["/dashboard"];

  const hideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
