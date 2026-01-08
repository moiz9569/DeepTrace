"use client";
import {
  Video,
  Image as ImageIcon,
  FileText,
  Shield,
  Cloud,
  Users,
  Globe,
  Sparkles,
  Target,
  ArrowRight,
  Layers,
  CheckCircle,
  Server,
  Database,
  ShieldCheck,
  CpuIcon as Chip,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/AuthModals/LoginModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Footer from "@/components/landingPage/footer";
import TextModal from "@/components/modals/TextModal";
import ImageModal from "@/components/modals/ImageModal";
import VideoModal from "@/components/modals/VideoModal";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Text Authenticity Analysis",
      description: "...",
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      stats: { accuracy: "95%", speed: "<2s" },
      modalType: "text",
    },
    {
      icon: ImageIcon,
      title: "Image Verification",
      description: "...",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      stats: { accuracy: "84%", speed: "<5s" },
      modalType: "image",
    },
    {
      icon: Video,
      title: "Video Deepfake Detection",
      description: "...",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      stats: { accuracy: "81%", speed: "<10s" },
      modalType: "video",
    },
  ];

  const solutions = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Military-grade encryption with SOC 2 Type II, ISO 27001, and GDPR compliance for complete data protection.",
      color: "teal",
      gradient: "from-teal-50 to-cyan-50",
      features: [
        "SOC 2 Type II",
        "ISO 27001",
        "GDPR Compliant",
        "Zero-knowledge",
      ],
      iconColor: "text-teal-600",
    },
    {
      icon: Cloud,
      title: "Cloud API",
      description:
        "Scalable FASTAPI with comprehensive documentation, SDKs, and 99.9% uptime SLA.",
      color: "cyan",
      gradient: "from-cyan-50 to-blue-50",
      features: ["FASTAPI", "Dockers", "GraphQL", "Huggingface"],
      iconColor: "text-cyan-600",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Shared workspaces with role-based access control and collaborative workflows for teams.",
      color: "emerald",
      gradient: "from-emerald-50 to-green-50",
      features: [
        "Role-based Access",
        "Shared Projects",
        "Real-time Updates",
        "Team Analytics",
      ],
      iconColor: "text-emerald-600",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description:
        "Low-latency processing with edge computing and data centers across 15+ regions worldwide.",
      color: "violet",
      gradient: "from-violet-50 to-purple-50",
      features: [
        "99.9% Uptime",
        "Edge Computing",
        "Global CDN",
        "Auto-scaling",
      ],
      iconColor: "text-violet-600",
    },
  ];

  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const handleAnalyzeClick = async (type) => {
    setActiveModal(type);
  };

  const handleClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Background Decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                             linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 "></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                DeepTrace Services
              </span>
              <br />
              <span className="bg-linear-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                For Every Need
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI-powered verification tools for text, images, and
              video content. Trusted by enterprises worldwide for unmatched
              accuracy and reliability.
            </p>
          </motion.div>

          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Core Detection Services
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Specialized AI models for comprehensive content verification
                    across all media types
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-linear-to-br from-teal-400/10 via-cyan-400/10 to-emerald-400/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div
                    className="cursor-pointer"
                    onClick={() => handleAnalyzeClick(service.modalType)}
                  >
                    <div className="relative h-full bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200">
                      {/* Top Gradient Bar */}
                      <div
                        className={`h-2 bg-linear-to-r ${service.gradient}`}
                      />

                      <div className="p-8">
                        {/* Icon & Stats */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`w-16 h-16 rounded-2xl ${service.bgGradient} border border-slate-200 flex items-center justify-center`}
                          >
                            <service.icon
                              className={`w-8 h-8 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}
                            />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              {service.stats.accuracy}
                            </div>
                            <div className="text-sm text-slate-500">
                              Accuracy
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Bottom Stats & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">
                                {service.stats.speed}
                              </div>
                              <div className="text-xs text-slate-500">
                                Speed
                              </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">
                                24/7
                              </div>
                              <div className="text-xs text-slate-500">
                                Support
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-teal-600 font-semibold">
                            <span>Try Now</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise Solutions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Enterprise Solutions
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Complete infrastructure and tools for organizations of all
                    sizes
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-full bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 p-6 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200">
                    {/* Top Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 to-cyan-400 rounded-t-2xl" />

                    <div
                      className={`w-12 h-12 rounded-xl ${solution.gradient} border border-slate-200 flex items-center justify-center mb-4`}
                    >
                      <solution.icon
                        className={`w-6 h-6 ${solution.iconColor}`}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300">
                      {solution.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {solution.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />

            <div className="relative bg-linear-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl border border-teal-100 overflow-hidden">
              <div className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Start Your AI Detection Journey
                </h2>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                  Join thousands of organizations that trust DeepTrace for
                  accurate, reliable AI content verification. Get started in
                  minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleClick}
                    className="group cursor-pointer relative overflow-hidden rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-8 py-4 text-white font-semibold hover:shadow-lg hover:shadow-teal-200 transition-all duration-300"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  <button className="px-8 cursor-pointer py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                    Schedule Demo
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">
                      No credit card required
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">1 free check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">
                      Full enterprise features
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

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
