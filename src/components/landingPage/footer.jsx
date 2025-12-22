"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/LoginModal";

import {
  Sparkles,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault(); // 🔥 navigation stop
      setShowLogin(true); // 🔥 modal open
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* ✅ LOGIN MODAL */}
      {showLogin && !user && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      <footer className="bg-white">
        <div className="p-7 px-12">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

              {/* BRAND */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-teal-600 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-slate-900">
                      DeepTrace
                    </span>
                    <p className="text-xs text-gray-500">Powered by AI</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-6">
                  Professional platform trusted worldwide.
                </p>

                <div className="flex items-center gap-3">
                  {[Twitter, Linkedin, Mail].map((Icon, index) => (
                    <button
                      key={index}
                      className="rounded-xl flex justify-center items-center h-9 w-9 bg-teal-600 text-white hover:opacity-90 transition shadow-md"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* LINKS */}
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "Case Studies"],
                },
                {
                  title: "Company",
                  links: ["About Us", "Careers", "Blog"],
                },
                {
                  title: "Resources",
                  links: ["Documentation", "API Reference", "Support"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-slate-900 mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <Link
                          href="/"
                          onClick={handleProtectedClick}
                          className="hover:text-slate-700 transition"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            <div className="pt-4 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 px-2 pr-6">
              <p className="text-sm text-gray-500">
                © 2025 DeepTrace. All rights reserved.
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href="/"
                      onClick={handleProtectedClick}
                      className="hover:text-slate-700 transition"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
