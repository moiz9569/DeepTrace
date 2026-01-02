// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/AuthProvider";
// import { Sparkles } from "lucide-react";
// import LoginModal from "@/components/AuthModals/LoginModal";

// export default function CTASection() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [showLogin, setShowLogin] = useState(false);

//   const handleClick = () => {
//     if (!user) {
//       setShowLogin(true); // ✅ modal open
//       return;
//     }
//     router.push("/dashboard");
//   };

//   return (
//     <>
//       <div className="p-16">
//         <div className="bg-gray-500/10 p-16 rounded-2xl">
//           <div className="text-center">
//             <h2 className="text-5xl font-bold text-slate-900 mb-6">
//               Ready to Get Started?
//             </h2>

//             <p className="text-white mb-9 max-w-2xl mx-auto text-lg bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 backdrop-blur-sm rounded-xl p-4">
//               Join thousands of professionals who trust Truth Seeker.
//             </p>

//             <button
//               onClick={handleClick}
//               className="flex mx-auto items-center py-4 px-10 rounded-2xl bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white text-lg shadow-xl hover:scale-105 transition"
//             >
//               Start Free Analysis
//               <Sparkles className="ml-2 w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* LOGIN MODAL */}
//       {showLogin && (
//         <LoginModal onClose={() => setShowLogin(false)} />  
//       )}
//     </>
//   );
// }





const CTASection = () => {
  return (
    <section className="w-full flex justify-center px-4 py-16">
      <div
        className="relative w-full max-w-4xl rounded-[48px] overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #1f8f8b 0%, #0b1f24 100%)",
        }}
      >
        <div className="relative z-10 px-8 md:px-16 py-14 md:py-14">
          
          {/* Left Content */}
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
              Ready to Start Learning <br /> Smarter?
            </h2>
          </div>

          {/* Right Content */}
          <div className="mt-10 md:mt-4 flex flex-col md:items-start gap-6">
            <p className="text-white/80 max-w-md text-sm md:text-base">
              Join thousands of learners using SkillSphere to grow their
              skills, build real projects, and unlock new opportunities.
            </p>

            <button className="inline-flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition">
              Get Started – It’s Free
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <img
          src="/ai-hand-pic.png" // replace with your image path
          alt="AI Hand"
          className="absolute right-0 bottom-0 h-full max-h-80 md:max-h-105 object-contain pointer-events-none"
        />
      </div>
    </section>
  );
};

export default CTASection;
