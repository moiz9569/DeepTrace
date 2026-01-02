"use client";
import React from "react";
import {
  IconBrandFacebook,
  IconBrandX,
  IconBrandInstagram,
  IconShieldCheck,
  IconScale,
  IconCpu,
  IconGauge,
  IconApi,
  IconCheckupList,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const StrategySection = () => {
  return (
    <section className="relative w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-16 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #14b8a6 1px, transparent 1px),linear-gradient(to bottom, #14b8a6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-teal-900/30 border border-teal-700/40">
            <IconShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-teal-300">Strategic AI Security</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mb-5">
            <span className="text-slate-100">Accurate AI Content Detection</span>
            <br />
            <span className="text-teal-400">Built for Digital Trust</span>
          </h2>

          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Scalable AI-driven detection systems built to protect organizations
            from misinformation and synthetic media.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-10">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6 backdrop-blur">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-900/40 flex items-center justify-center">
                  <IconCpu className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Advanced AI Detection Engine
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    AI models combining linguistic patterns, visual artifacts,
                    and statistical signals for high-accuracy detection.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["AI vs Human", "Pattern Analysis", "Real-Time Detection"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs bg-teal-900/30 text-teal-300 rounded-full border border-teal-700/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6 max-w-xl backdrop-blur">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-900/40 flex items-center justify-center">
                  <IconApi className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Seamless Platform Integration
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Easily integration with scalable, secure, API-first
                    detection infrastructure.
                  </p>

                  <div className="flex items-center gap-3">
                    {[IconBrandFacebook, IconBrandX, IconBrandInstagram].map(
                      (Icon, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"
                        >
                          <Icon className="w-4 h-4 text-slate-400" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-end"
          >
            <div className="relative bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6 max-w-xl overflow-hidden backdrop-blur">
              <div className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/40 flex items-center justify-center">
                  <IconCheckupList className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Trust & Transparency
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Explainable AI results with confidence scoring and audit
                    trails.
                  </p>

                  <div className="flex items-center gap-3">
                    {[IconBrandFacebook, IconBrandX, IconBrandInstagram].map(
                      (Icon, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"
                        >
                          <Icon className="w-4 h-4 text-slate-400" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
