"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/LoginModal";

import {
  Eye,
  MessageSquare,
  Video,
} from "lucide-react";

export default function FeaturesSection() {
  const { user, loading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault(); // 🔥 link navigation roko
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
              {/* TEXT */}
              <div className="rounded-2xl bg-gray-400/10 backdrop-blur-sm hover:bg-gray-400/20 transition-all duration-500">
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
                  <Link href="/text-model" onClick={handleProtectedClick}>
                    <button className="bg-white/70 px-4 py-2 rounded-lg text-teal-600 hover:bg-green-50 transition">
                      Analyze Text
                    </button>
                  </Link>
                </div>
              </div>



              {/* IMAGE */}
              <div className="rounded-2xl bg-gray-400/10 backdrop-blur-sm hover:bg-gray-400/20 transition-all duration-500">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Image Analysis</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive image forensics to identify alterations,
                    forgeries, and digital manipulations
                  </p>
                  <Link href="/picture-model" onClick={handleProtectedClick}>
                    <button className="bg-white/70 px-4 py-2 rounded-lg text-green-600 hover:bg-green-50 transition">
                      Analyze Image
                    </button>
                  </Link>
                </div>
              </div>


              {/* VIDEO */}
              <div className="rounded-2xl bg-gray-400/10 backdrop-blur-sm hover:bg-gray-400/20 transition-all duration-500">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Video className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Video Analysis</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Advanced video processing to detect deepfakes,
                    manipulations, and verify content authenticity
                  </p>
                  <Link href="/video-model" onClick={handleProtectedClick}>
                    <button className="bg-white/70 px-4 py-2 rounded-lg text-teal-600 hover:bg-teal-50 transition">
                      Analyze Video
                    </button>
                  </Link>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}
