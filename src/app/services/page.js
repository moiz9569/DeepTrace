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
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/AuthModals/LoginModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Footer from "@/components/landingPage/footer";

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Text Authenticity",
      description:
        "AI vs human text classification using state-of-the-art NLP models.",
      features: [
        "RoBERTa models",
        "Style analysis",
        "Plagiarism check",
        "Sentiment analysis",
      ],
      color: "teal",
      href: "/text-model",
    },
    {
      icon: ImageIcon,
      title: "Image Verification",
      description:
        "Advanced image forensics for detecting manipulated or AI-generated images.",
      features: [
        "High accuracy",
        "Metadata analysis",
        "Pattern recognition",
        "Watermark detection",
      ],
      color: "emerald",
      href: "/picture-model",
    },
    {
      icon: Video,
      title: "Video Analysis",
      description:
        "Frame-by-frame AI video detection using advanced deep learning models.",
      features: [
        "Real-time processing",
        "Multi-format support",
        "Batch analysis",
        "API integration",
      ],
      color: "teal",
      href: "/video-model",
    },
  ];

  const solutions = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "End-to-end encrypted analysis with compliance-ready infrastructure.",
      color: "green",
      features: ["SOC 2 Type II", "GDPR Compliant", "ISO 27001", "HIPAA Ready"],
    },
    {
      icon: Cloud,
      title: "Cloud API",
      description:
        "Scalable REST API with comprehensive documentation and SDKs.",
      color: "green",
      features: ["REST API", "WebSocket", "GraphQL", "Webhooks"],
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Shared workspaces, role-based access, and collaborative workflows.",
      color: "green",
      features: [
        "Role-based access",
        "Shared projects",
        "Real-time updates",
        "Team analytics",
      ],
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Low-latency processing with data centers worldwide.",
      color: "green",
      features: [
        "99.9% uptime",
        "Edge computing",
        "Global CDN",
        "Auto-scaling",
      ],
    },
  ];

  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const handleClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-white to-slate-50 border-b border-slate-200/60">
        <div className="mt-16 container mx-auto max-w-6xl p-6 relative z-10">
          {/* Hero Section */}
          <div className="text-center py-16 mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              DeepTrace Services
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              Comprehensive AI-powered verification tools for video, image, and
              text content. Trusted by enterprises worldwide for accuracy and
              reliability.
            </p>
          </div>

          {/* Core Services */}
          <div className="rounded-2xl mb-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Core Services
                </h2>
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Specialized AI models for comprehensive content verification
                across all media types
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Link href={service.href} key={index}>
                  <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
                    <div className="p-8">
                      <div
                        className={`flex items-center justify-center w-16 h-16 bg-linear-to-br from-${service.color}-100 to-${service.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon
                          className={`w-8 h-8 text-${service.color}-600`}
                        />
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-slate-600 mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 bg-${service.color}-500 rounded-full`}
                            ></div>
                            <span className="text-sm text-slate-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-200/60">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                            Try Service
                          </span>
                          <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`h-1 bg-linear-to-r from-${service.color}-500 to-${service.color}-600`}
                    ></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Solutions */}
          <div className="mt-16 mb-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Enterprise Solutions
                </h2>
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Complete infrastructure and tools for organizations of all sizes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`inline-flex p-3 bg-linear-to-br from-${solution.color}-100 to-${solution.color}-50 rounded-lg mb-4`}
                  >
                    <solution.icon
                      className={`w-6 h-6 text-${solution.color}-600`}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors duration-300">
                    {solution.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {solution.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 mb-20">
            <div className="bg-linear-to-br from-teal-50 to-emerald-50/50 border border-emerald-200/50 rounded-2xl p-12 text-center shadow-sm">
              <div className="inline-flex p-4 bg-linear-to-br from-teal-500 to-emerald-500 rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h2>

              <p className="text-slate-600 max-w-xl mx-auto mb-8">
                Start verifying content authenticity with our simple, powerful
                API. No credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleClick}
                  className="px-8 py-3 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  Start Free Trial
                </button>
                <button className="px-8 py-3 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
