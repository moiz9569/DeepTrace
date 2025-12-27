"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  // Mouse tracking for lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen pt-20 overflow-hidden bg-[#020617]">
      
      {/* 1. MOUSE FOLLOW SPOTLIGHT (Interactive Lighting) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
        }}
      />

      {/* 2. BACKGROUND IMAGE WITH PULSING GLOW */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent blur-3xl"
        />
        
        <motion.img
          src="/Gemini_Generated_Image_o1fd84o1fd84o1fd.png"
          alt="Hero Background"
          className="h-screen w-full object-cover opacity-80 mix-blend-lighten"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Neural Sparks (Choti chamakti lights) */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_8px_#14b8a6]"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`, 
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* 3. DYNAMIC SCANNING LASER */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-0.75 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_20px_#14b8a6] z-20 opacity-40"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* HERO CONTENT */}
      <div className="-mt-10 relative ml-16 z-40 px-6 md:px-16 h-full flex items-center">
        <div className="max-w-4xl space-y-12  p-8 rounded-3xl ">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-300 leading-tight">
                Verify Content. Defend Trust.
              </h1>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-300 leading-tight">
                AI Content Analysis Platform
              </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 max-w-2xl"
          >
             <p className="text-lg text-slate-300 leading-relaxed">
                Detect AI-generated text, images, and video with high-precision
                models built for publishers, researchers, and security teams. Get clear,
                explainable results {""}
                <span className="block">you can trust.</span>
              </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-teal-500"
              >
                Start Analysis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link href="/about">
              <button className="rounded-xl border border-slate-300/80 bg-white/60 px-8 py-4 text-lg text-slate-700 backdrop-blur transition hover:bg-white">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* AMBIENT GLOW ORBS (Niche wala lighting effect) */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />

    </section>
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion"; // Framer Motion import kiya

// export default function HeroSection() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <section className="relative h-screen pt-20 overflow-hidden bg-black">
//       {/* 1. ANIMATED BACKGROUND IMAGE */}
//       <motion.div 
//         initial={{ scale: 1.1, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1.5 }}
//         className="absolute inset-0 z-0"
//       >
//         <motion.img
//           src="/Gemini_Generated_Image_o1fd84o1fd84o1fd.png"
//           alt="Hero Background"
//           className="h-screen w-full object-cover opacity-80"
//           animate={{ 
//             y: [0, -15, 0], // Floating Effect
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
        
//         {/* 2. SCANNING LINE EFFECT (AI Feel) */}
//         <motion.div 
//           className="absolute top-0 left-0 w-full h-[2px] bg-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.8)] z-10"
//           animate={{ top: ["0%", "100%", "0%"] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         />
        
//         {/* Background Overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-1" />
//       </motion.div>

//       {/* HERO WRAPPER */}
//       <div className="relative px-16 h-full flex items-center">
//         <div className="relative overflow-hidden rounded-2xl bg-gray-900/10 backdrop-blur-sm p-12 md:p-24 border border-white/5">
          
//           {/* CONTENT ANIMATION */}
//           <motion.div 
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative z-20 space-y-8"
//           >
//             <div>
//               <motion.h1 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-4xl md:text-6xl font-bold text-white leading-tight"
//               >
//                 Verify Content. <span className="text-teal-400">Defend Trust.</span>
//               </motion.h1>
//               <motion.h1 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="text-4xl md:text-5xl font-semibold text-slate-300/90 leading-tight"
//               >
//                 AI Content Analysis Platform
//               </motion.h1>
//             </div>

//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="space-y-2"
//             >
//               <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
//                 Detect AI-generated text, images, and video with high-precision
//                 models built for publishers, researchers, and security teams.
//               </p>
//               <p className="text-lg text-slate-200 font-medium">
//                 Get clear, explainable results <span className="text-teal-400">you can trust.</span>
//               </p>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               className="flex flex-col sm:flex-row gap-4 justify-left pt-4"
//             >
//               <Link href="/dashboard">
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-900 px-8 py-4 text-lg text-white shadow-lg shadow-teal-500/20 transition hover:shadow-teal-500/40"
//                 >
//                   Start Analysis
//                   <ArrowRight className="h-5 w-5" />
//                 </motion.button>
//               </Link>

//               <Link href="/about">
//                 <motion.button 
//                   whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
//                   className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg text-white backdrop-blur-md transition"
//                 >
//                   Learn More
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* 3. OPTIONAL: ORBITAL GLOW EFFECTS */}
//       <div className="absolute top-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
//     </section>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function HeroSection() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <section className="h-screen pt-20">
//       {/* BACKGROUND IMAGE */}
//       <img
//         src="/Gemini_Generated_Image_o1fd84o1fd84o1fd.png"
//         alt="Hero Background"
//         className="absolute inset-0 z-0 bg-black h-screen w-full object-cover opacity-100"
//       />

//       {/* HERO WRAPPER */}
//       <div className="relative px-16">
//         <div className="relative overflow-hidden rounded-2xl bg-gray-900/25 p-24">
//           {/* CONTENT */}
//           <div className="relative z-10 space-y-8">
//             <div className="">
//               <h1 className="text-4xl md:text-6xl font-bold text-slate-300 leading-tight">
//                 Verify Content. Defend Trust.
//               </h1>
//               <h1 className="text-4xl md:text-5xl font-semibold text-slate-300 leading-tight">
//                 AI Content Analysis Platform
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg text-slate-300 leading-relaxed">
//                 Detect AI-generated text, images, and video with high-precision
//                 models built for
//               </p>
//               <p className="text-lg text-slate-200">
//                 publishers, researchers, and security teams. Get clear,
//                 explainable results {""}
//                 <span className="block">you can trust.</span>
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-left pt-4">
//               <Link href="/dashboard">
//                 <button className="inline-flex items-left gap-2 rounded-xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-8 py-4 text-lg text-white shadow-lg shadow-teal-500/25 transition hover:shadow-teal-500/40">
//                   Start Analysis
//                   <ArrowRight className="h-5 w-5" />
//                 </button>
//               </Link>

//               <Link href="/about">
//                 <button className="rounded-xl border border-slate-300/80 bg-white/60 px-8 py-4 text-lg text-slate-700 backdrop-blur transition hover:bg-white">
//                   Learn More
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
