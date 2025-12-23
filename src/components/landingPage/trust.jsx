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

export default function TrustIndicators() {
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
    <div className="h-screen py-16">
      <div className="bg-gray-500/5 rounded-2xl backdrop-blur-sm border-slate-200/40">
        <div className="container p-12 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 bg-gray-100/5">
              Trusted by Professionals
            </h2>
            <p className="text-slate-600 text-lg bg-white/40 rounded-xl p-3 border border-white/50 max-w-md mx-auto">
              Industry-leading accuracy and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            {[
              { value: "99.7%", label: "Accuracy Rate", color: "teal" },
              { value: "<1s", label: "Processing Time", color: "green" },
              { value: "1M+", label: "Files Analyzed", color: "green" },
              { value: "24/7", label: "Availability", color: "slate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-green-400/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-300 group"
              >
                <div
                  className={`text-4xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
