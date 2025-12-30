"use client";
import {
  Brain,
  Shield,
  Zap,
  Users,
  Target,
  Building2,
  CheckCircle,
  Globe,
  Cpu,
} from "lucide-react";
import Footer from "@/components/landingPage/footer";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "Custom AI Models",
      desc: "Proprietary machine learning models for truth detection.",
      color: "green",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "Bank-grade security with SOC 2 compliance.",
      color: "green",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      desc: "Lightning-fast analysis with sub-second response.",
      color: "green",
    },
    {
      icon: Users,
      title: "Multi-format Support",
      desc: "Analysis across video, images, audio, and text.",
      color: "green",
    },
  ];

  const stats = [
    { label: "Accuracy", value: "99.7%", icon: Target },
    { label: "Speed", value: "<1s", icon: Zap },
    { label: "Formats", value: "15+", icon: Building2 },
    { label: "Clients", value: "500+", icon: Users },
    { label: "Countries", value: "40+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mt-22 text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            The Future of <span className="text-teal-600">Authenticity</span>{" "}
            Verification
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            Leading the industry in AI-powered content verification trusted by
            Fortune 500 companies worldwide.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="items-center justify-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-3 bg-linear-to-r from-teal-500 to-emerald-500 bg rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            </div>

            <p className="text-center text-slate-600 mb-8 leading-relaxed">
              To provide organizations with advanced AI technology for content
              verification, enabling informed decision-making and maintaining
              trust in digital communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Ethical AI Development",
              "Transparent Algorithms",
              "Data Privacy First",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose DeepTrace
            </h2>
            <p className="text-slate-600">
              Advanced AI technology with enterprise-grade security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div
                  className={`p-3 rounded-lg bg-${feat.color}-100 w-fit mb-4`}
                >
                  <feat.icon className={`w-6 h-6 text-${feat.color}-600`} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Performance Metrics
            </h2>
            <p className="text-slate-300">Industry-leading benchmarks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Cpu className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Technology Stack
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "TensorFlow",
                "PyTorch",
                "AWS",
                "Node.js",
                "MongoDB",
                "Docker",
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Certifications
              </h3>
            </div>

            <div className="space-y-3">
              {[
                "SOC 2 Type II",
                "ISO 27001",
                "GDPR Compliant",
                "HIPAA Ready",
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Secure Your Content?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Join 500+ enterprises trusting DeepTrace for content verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-xl font-medium hover:bg-teal-700 transition">
              Explore Services
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 border rounded-xl font-medium hover:bg-slate-50 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
