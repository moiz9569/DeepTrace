"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  ArrowRight,
  Eye,
  MessageSquare,
  Video,
  Shield,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleClick = (path) => {
    if (!user) {
      // redirect to login if not logged in
      router.push("/login");
      return;
    }
    router.push(path);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-white">
      <div className="p-7 px-12 ">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-teal-600 shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">
                    Truth Seeker
                  </span>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Professional platform trusted by worldwide.
              </p>

              <div className="flex items-center gap-3">
                {[Twitter, Linkedin, Mail].map((Icon, index) => (
                  <button
                    key={index}
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 bg-teal-600 text-white hover:opacity-90 transition-all duration-300 shadow-md"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Case Studies", "Integrations"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Contact"],
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Support", "Status"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 px-2 pr-6">
            <p className="text-sm text-muted-foreground">
              © 2025 SEO Automation. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
