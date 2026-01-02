"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/AuthModals/LoginModal";
import { Eye, MessageSquare, Video, Sparkles, Shield, Zap, BarChart3, Target, CheckCircle, ArrowRight } from "lucide-react";
import TextModal from "../modals/TextModal";
import ImageModal from "../modals/ImageModal";
import VideoModal from "../modals/VideoModal";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyzeClick = async (type) => {
    setActiveModal(type);
  };

  if (!mounted) return null;

  const features = [
    {
      id: "text",
      title: "AI Text Detection",
      description: "Analyze written content to determine whether it is AI-generated or human-written, using advanced language pattern recognition.",
      icon: MessageSquare,
      iconBg: "from-teal-50 to-emerald-50",
      iconColor: "text-teal-600",
      buttonColor: "text-teal-700 hover:bg-teal-50",
      gradient: "from-teal-500/5 to-emerald-500/5",
      borderColor: "border-teal-200",
      features: ["GPT-4 Detection", "Plagiarism Check", "Bias Analysis", "Sentiment Scoring"],
      stats: { accuracy: "95%", speed: "<2s" }
    },
    {
      id: "image",
      title: "AI Image Detection",
      description: "Detect AI-generated and manipulated images using deep forensic analysis and pixel-level inspection.",
      icon: Eye,
      iconBg: "from-cyan-50 to-blue-50",
      iconColor: "text-cyan-600",
      buttonColor: "text-cyan-700 hover:bg-cyan-50",
      gradient: "from-cyan-500/5 to-blue-500/5",
      borderColor: "border-cyan-200",
      features: ["GAN Detection", "Metadata Analysis", "ELA Forensics", "Manipulation Tracing"],
      stats: { accuracy: "84%", speed: "<5s" }
    },
    {
      id: "video",
      title: "AI Video Detection",
      description: "Identify AI-generated and manipulated videos by analyzing frames and motion patterns.",
      icon: Video,
      iconBg: "from-emerald-50 to-green-50",
      iconColor: "text-emerald-600",
      buttonColor: "text-emerald-700 hover:bg-emerald-50",
      gradient: "from-emerald-500/5 to-green-500/5",
      borderColor: "border-emerald-200",
      features: ["Deepfake Detection", "Frame Analysis", "Audio Verification", "Temporal Analysis"],
      stats: { accuracy: "81%", speed: "<10s" }
    }
  ];

  return (
    <>
      {/* ✅ LOGIN MODAL */}
      {showLogin && !user && <LoginModal onClose={() => setShowLogin(false)} />}

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-teal-400/30 to-transparent" />
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                             linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-teal-50 border border-teal-100"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">AI vs Human Content Detection</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Advanced AI Content Detection
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Three powerful detection systems built to identify whether content is AI-generated or human-created across text, images, and videos
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Card Glow Effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-linear-to-br from-teal-400/20 via-transparent to-emerald-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: hoveredCard === feature.id ? [1, 1.02, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Main Card */}
                <div className="relative h-full rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-100/50 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200/50">
                  {/* Top Gradient Bar */}
                  <div className={`h-2 bg-linear-to-r ${feature.gradient}`} />
                  
                  <div className="p-8">
                    {/* Icon Container */}
                    <motion.div
                      className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${feature.iconBg} ${feature.borderColor} border flex items-center justify-center mx-auto mb-6`}
                      animate={{
                        y: hoveredCard === feature.id ? [-5, 0, -5] : 0,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-white/50" />
                      <feature.icon className={`w-10 h-10 ${feature.iconColor} relative z-10`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-center text-slate-900 mb-4">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-center mb-8 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Features List
                    <div className="space-y-3 mb-8">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-teal-500" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div> */}

                    {/* Stats Bar */}
                    <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{feature.stats.accuracy}</div>
                        <div className="text-xs text-slate-500">Accuracy</div>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{feature.stats.speed}</div>
                        <div className="text-xs text-slate-500">Analysis Time</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnalyzeClick(feature.id)}
                      className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white border ${feature.borderColor} ${feature.buttonColor} font-semibold transition-all duration-300 group-hover:shadow-md`}
                    >
                      <span>Analyze {feature.title.split(" ")[1]}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-linear-to-r from-teal-50 to-cyan-50 border border-teal-100 max-w-3xl mx-auto">
              <div className="text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ready to detect AI-generated content?
                </h3>
                <p className="text-slate-600">
                  Get started with our enterprise API or try our dashboard
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                  Analyze Content Free
                </button>
                <button className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors">
                  Explore Detection API
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 pt-8 border-t border-slate-100"
          >
            <p className="text-center text-sm text-slate-500 mb-6">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {["Enterprise Security", "Media Publishers", "Research Labs", "Government"].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-500" />
                  <span className="text-sm font-medium text-slate-700">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      {activeModal === "text" && (
        <TextModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "image" && (
        <ImageModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "video" && (
        <VideoModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}