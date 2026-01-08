"use client";
import { Brain, Shield, Zap, Target, Lock, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

export default function Animate() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                           linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-linear-to-b from-white via-white/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Enhanced Benefits List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">Why Choose Deeptrace</span>
              </div>

              
              <h2 className="text-2xl sm:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Detect AI-Generated Content&nbsp;
                </span>
                {/* <br /> */}
                <span className="bg-linear-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  With Accuracy & Confidence
                </span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Our platform helps individuals and organizations verify whether content is AI-generated or human-created using reliable, transparent, and fast detection models.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "10M+", label: "Content Analyzed", icon: BarChart3 },
                  { value: "500+", label: "Trusted Users", icon: Shield },
                  { value: "24/7", label: "Uptime", icon: Zap },
                  { value: "95%", label: "Accuracy", icon: Target },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

           

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <button className="group cursor-pointer relative overflow-hidden rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 p-0.5">
                <div className="relative flex items-center justify-center gap-3 rounded-[11px] bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all group-hover:bg-slate-50">
                  <span>Start Free Analysis</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-linear-to-r from-teal-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right - AI Detection Animation */}
          <div className="flex items-center justify-center">
            <div className="relative max-w-sm sm:max-w-lg">
              {/* Animation Container with Border */}
              <div className="relative rounded-3xl border-8 border-white shadow-2xl shadow-teal-100/50 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-white to-cyan-50" />
                
                {/* Animation */}
                <div className="relative p-8">
                  <DotLottieReact
                    src="https://lottie.host/432513b0-8f0d-427d-b812-fb5ced4929b6/HFa0etEFRW.lottie"
                    loop
                    autoplay
                    className="w-120 sm:w-150 -ml-20 lg:-ml-24 xl:-ml-14 h-100"
                  />
                </div>
                
                
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-linear-to-br from-teal-100 to-cyan-100 border-4 border-white shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-linear-to-br from-emerald-100 to-green-100 border-4 border-white shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}