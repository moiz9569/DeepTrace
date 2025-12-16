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
              className="flex mx-auto items-center py-4 px-10 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-800 text-white text-lg shadow-xl hover:scale-105 transition"
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




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import LoginModal from "@/components/LoginModal";
// import { useAuth } from "@/components/auth/AuthProvider";
// import {
//   ArrowRight,
//   Eye,
//   MessageSquare,
//   Video,
//   Shield,
//   Sparkles,
//   CheckCircle,
// } from "lucide-react";
// import { Mail, Linkedin, Twitter } from "lucide-react";

// export default function CTASection() {
//   const [mounted, setMounted] = useState(false);
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [showLogin, setShowLogin] = useState(false);


//   const handleClick = (path) => {
//   if (!user) {
//     setShowLogin(true);
//     return;
//   }
//   router.push(path);
// };


//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
  
//   return (
//     <div className="p-16">
//       <div className="bg-gray-500/10 p-16 rounded-2xl relative overflow-hidden">
//         <div className=" container relative mx-auto px-4 text-center">
//           <h2 className="text-5xl font-bold text-slate-900 mb-9">
//             Ready to Get Started?
//           </h2>
//           <p className="text-white mb-9 max-w-2xl mx-auto text-lg bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 backdrop-blur-sm rounded-xl p-4 border border-white/10">
//             Join thousands of professionals who trust Truth Seeker for their
//             content analysis needs.
//           </p>
//           <div className="flex justify-center">
//           <Link href="/dashboard">
//             <button
//               size="lg"
//               className="flex items-center py-4 px-10 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-800 to-teal-700 hover:from-teal-800 hover:to-teal-700 text-white text-lg shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
//             >
//               Start Free Analysis
//               <Sparkles className="ml-2 w-5 h-5" />
//             </button>
//           </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
