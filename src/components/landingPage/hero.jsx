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
                className="inline-flex items-center gap-2  px-4 py-2"
              >
                
                <span className="text-sm font-medium text-teal-300">
          
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
                      Detect AI-Generated
                    </span>
                    <span className="block mt-2 bg-linear-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                      Content With Confidence
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
                  Advanced AI detection for text, images, and videos. 
                  <span className="text-teal-300 font-semibold"> Instantly verify</span> AI-generated or human-written content with scientific accuracy.
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
                  { icon: Scan, text: "Real-Time Detection", color: "text-teal-400" },
                  { icon: Shield, text: "Secure & Private Analysis", color: "text-cyan-400" },
                  { icon: Brain, text: "Text, Image & Video AI Detection", color: "text-emerald-400" },
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
                      <span>Start AI Detection</span>
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
                  Trusted by educators, publishers, researchers, and digital security teams worldwide
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