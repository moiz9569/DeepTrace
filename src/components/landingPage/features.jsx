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
import { AfterContext } from "next/dist/server/after/after-context";

export default function FeaturesSection() {
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
    <div className="py-16">
      <div className="rounded-2xl p-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Professional AI Analysis
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl px-4 border border-white/50">
              Three specialized models designed for enterprise content
              verification and analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-400/5 backdrop-blur-sm hover:bg-gray-400/10 hover:shadow-lg hover:shadow-teal-100/30 transition-all duration-500 group">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal-100/50">
                  <Video className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Video Analysis
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Advanced video processing to detect deepfakes, manipulations,
                  and verify content authenticity
                </p>
                <Link href="/video-model">
                  <button
                    variant="outline"
                    className="bg-white/70 text-teal-600 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300"
                  >
                    Analyze Video
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-400/5 backdrop-blur-sm hover:bg-gray-400/10 hover:shadow-lg hover:shadow-green-100/30 transition-all duration-500 group">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-100/50">
                  <Eye className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Image Analysis
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Comprehensive image forensics to identify alterations,
                  forgeries, and digital manipulations
                </p>
                <Link href="/picture-model">
                  <button
                    variant="outline"
                    className="bg-white/70 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                  >
                    Analyze Image
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-400/5 backdrop-blur-sm hover:bg-gray-400/10 hover:shadow-lg hover:shadow-orange-100/30 transition-all duration-500 group">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-100/50">
                  <MessageSquare className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Text Analysis
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Natural language processing to detect misinformation, bias,
                  and assess content credibility
                </p>
                <Link href="/text-model">
                  <button
                    variant="outline"
                    className="bg-white/70 text-teal-600 hover:bg-orange-50 hover:border-teal-300 transition-all duration-300"
                  >
                    Analyze Text
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
