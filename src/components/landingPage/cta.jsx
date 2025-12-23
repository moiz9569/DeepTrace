"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Sparkles } from "lucide-react";
import LoginModal from "@/components/LoginModal";

export default function CTASection() {
  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowLogin(true); // ✅ modal open
      return;
    }
    router.push("/dashboard");
  };

  return (
    <>
      <div className="p-16">
        <div className="bg-gray-500/10 p-16 rounded-2xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Ready to Get Started?
            </h2>

            <p className="text-white mb-9 max-w-2xl mx-auto text-lg bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 backdrop-blur-sm rounded-xl p-4">
              Join thousands of professionals who trust Truth Seeker.
            </p>

            <button
              onClick={handleClick}
              className="flex mx-auto items-center py-4 px-10 rounded-2xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white text-lg shadow-xl hover:scale-105 transition"
            >
              Start Free Analysis
              <Sparkles className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />  
      )}
    </>
  );
}


