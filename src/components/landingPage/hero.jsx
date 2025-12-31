// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { motion, useMotionValue, useSpring } from "framer-motion";

// export default function HeroSection() {
//   const [mounted, setMounted] = useState(false);

//   // Mouse tracking for lighting effect
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
//   const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

//   useEffect(() => {
//     setMounted(true);
//     const handleMouseMove = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <section className="relative h-screen pt-20 overflow-hidden bg-[#020617]">
//       {/* 1. MOUSE FOLLOW SPOTLIGHT (Interactive Lighting) */}
//       <motion.div
//         className="pointer-events-none absolute inset-0 z-30 opacity-50"
//         style={{
//           background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
//         }}
//       />

//       {/* 2. BACKGROUND IMAGE WITH PULSING GLOW */}
//       <div className="absolute inset-0 z-0">
//         <motion.div
//           animate={{
//             opacity: [0.4, 0.7, 0.4],
//             scale: [1, 1.05, 1],
//           }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent blur-3xl"
//         />

//         <motion.img
//           src="/Gemini_Generated_Image_o1fd84o1fd84o1fd.png"
//           alt="Hero Background"
//           className="h-screen w-full object-cover opacity-80 mix-blend-lighten"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 2 }}
//         />

//         {/* Neural Sparks (Choti chamakti lights) */}
//         {[...Array(150)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_8px_#14b8a6]"
//             initial={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               opacity: 0,
//             }}
//             animate={{
//               opacity: [0, 1, 0],
//               scale: [0, 1.5, 0],
//             }}
//             transition={{
//               duration: 2 + Math.random() * 3,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           />
//         ))}
//       </div>

//       {/* 3. DYNAMIC SCANNING LASER */}
//       <motion.div
//         className="absolute top-0 left-0 w-full h-0.75 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_20px_#14b8a6] z-20 opacity-40"
//         animate={{ top: ["-10%", "110%"] }}
//         transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//       />

//       {/* HERO CONTENT */}
//       <div className="-mt-10 relative ml-16 z-40 px-6 md:px-16 h-full flex items-center">
//         <div className="max-w-4xl space-y-12  p-8 rounded-3xl ">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-6xl font-bold text-slate-300 leading-tight">
//               Verify Content. Defend Trust.
//             </h1>
//             <h1 className="text-4xl md:text-5xl font-semibold text-slate-300 leading-tight">
//               AI Content Analysis Platform
//             </h1>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-4 max-w-2xl"
//           >
//             <p className="text-lg text-slate-300 leading-relaxed">
//               Detect AI-generated text, images, and video with high-precision
//               models built for publishers, researchers, and security teams. Get
//               clear, explainable results {""}
//               <span className="block">you can trust.</span>
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="flex flex-col sm:flex-row gap-5"
//           >
//             <Link href="/dashboard">
//               <motion.button
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-teal-500"
//               >
//                 Start Analysis
//                 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </motion.button>
//             </Link>

//             <Link href="/about">
//               <button className="rounded-xl border border-slate-300/80 bg-white/60 px-8 py-4 text-lg text-slate-700 backdrop-blur transition hover:bg-white">
//                 Learn More
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       {/* AMBIENT GLOW ORBS (Niche wala lighting effect) */}
//       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
//     </section>
//   );
// }














"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Brain, Scan } from "lucide-react";
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
    <section className="relative min-h-screen pt-16 md:pt-20 overflow-hidden bg-linear-to-br from-[#020617] via-[#0a1128] to-[#020617]">
      {/* 1. ENHANCED BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,200 Q200,100 400,300 T800,100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main Background Image with Enhanced Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div className="absolute opacity-50 inset-0 bg-linear-to-b from-transparent via-[#020617]/50 to-[#020617]" />
          <motion.img
            src="/deeptrace-bg.jpg"
            alt="AI Detection Background"
            className="h-full w-full scale-x-[-1] object-cover object-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* 2. ENHANCED INTERACTIVE SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(800px circle at ${springX}px ${springY}px, 
            rgba(20, 184, 166, 0.25) 0%, 
            rgba(20, 184, 166, 0.15) 30%, 
            transparent 70%)`,
        }}
      />

      {/* 3. DYNAMIC SCANNING EFFECTS */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_30px_#14b8a6] z-20"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-0 right-0 w-0.5 h-full bg-linear-to-b from-transparent via-teal-300 to-transparent shadow-[0_0_20px_#14b8a6] z-20 opacity-60"
        animate={{ right: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      {/* 4. NEURAL SPARKS ENHANCED */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-teal-300 rounded-full"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 ${Math.random() * 10 + 5}px #14b8a6`,
          }}
        />
      ))}

      {/* 5. MAIN CONTENT - CENTERED & PROFESSIONAL */}
      <div className="relative z-30 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-teal-900/30 backdrop-blur-sm border border-teal-700/50 rounded-full px-4 py-2"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-teal-300">
                  Next-Gen AI Detection Platform
                </span>
              </motion.div>

              {/* Main Heading with Staggered Animation */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl font-bold tracking-tight">
                    <span className="block bg-linear-to-r from-slate-200 via-teal-200 to-slate-200 bg-clip-text text-transparent">
                      Uncover AI-Generated
                    </span>
                    <span className="block mt-2 bg-linear-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                      Content With Precision
                    </span>
                  </h1>
                </motion.div>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg sm:text-xl text-slate-300/90 max-w-2xl leading-relaxed"
                >
                  Advanced detection for text, images, and videos. 
                  <span className="text-teal-300 font-semibold"> Trust the science</span> behind content verification.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {[
                  { icon: Scan, text: "Real-time Analysis", color: "text-teal-400" },
                  { icon: Shield, text: "Enterprise Security", color: "text-cyan-400" },
                  { icon: Brain, text: "Multi-modal AI", color: "text-emerald-400" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    <span className="text-sm text-slate-300">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/dashboard" className="sm:flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-teal-700 via-teal-600 to-emerald-600 p-0.5"
                  >
                    <div className="relative flex items-center justify-center gap-3 rounded-[11px] bg-linear-to-r from-teal-800 to-teal-900 px-8 py-4 text-lg font-semibold text-white transition-all group-hover:from-teal-700 group-hover:to-emerald-700">
                      <span>Start Free Analysis</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                </Link>

                <Link href="/about" className="sm:flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl border border-teal-500/30 bg-white/5 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-slate-300 transition-all hover:bg-white/10 hover:border-teal-400/50"
                  >
                    See How It Works
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-6"
              >
                <p className="text-sm text-slate-400">
                  Trusted by researchers, publishers, and security teams worldwide
                </p>
                <div className="flex items-center gap-4 mt-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-20 bg-linear-to-r from-slate-800/50 to-slate-900/50 rounded opacity-50"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Visual/Stats Card */}
            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl p-8 shadow-2xl">
               
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-50" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Detection Accuracy</h3>
                    <div className="px-3 py-1 rounded-full bg-teal-900/50 border border-teal-700">
                      <span className="text-sm font-medium text-teal-300">Live</span>
                    </div>
                  </div>
                  
                
                  <div className="space-y-4">
                    {[
                      { label: "Text Analysis", value: "98%", color: "bg-teal-500" },
                      { label: "Image Detection", value: "95%", color: "bg-cyan-500" },
                      { label: "Video Analysis", value: "92%", color: "bg-emerald-500" },
                    ].map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{stat.label}</span>
                          <span className="font-semibold text-white">{stat.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: stat.value }}
                            transition={{ delay: 1 + index * 0.2, duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                 
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <p className="text-sm text-slate-300">
                      <span className="text-teal-400 font-medium">Deeptrace</span> uses advanced neural networks to detect AI-generated content across multiple formats with industry-leading accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* 6. ENHANCED AMBIENT GLOW ORBS */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-125 h-125 bg-teal-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-32 -right-32 w-150 h-150 bg-cyan-500/5 rounded-full blur-[150px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* 7. SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-teal-500/50 flex justify-center p-1">
            <div className="w-1 h-3 rounded-full bg-teal-400/70" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}