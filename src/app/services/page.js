// "use client";
// import {
//   Video,
//   Image as ImageIcon,
//   FileText,
//   Shield,
//   Cloud,
//   Users,
//   Globe,
//   Sparkles,
//   Target,
//   ArrowRight,
//   Layers,
// } from "lucide-react";
// import { useState } from "react";
// import Link from "next/link";
// import LoginModal from "@/components/AuthModals/LoginModal";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/AuthProvider";
// import Footer from "@/components/landingPage/footer";

// export default function ServicesPage() {
//   const services = [
//     {
//       icon: FileText,
//       title: "Text Authenticity",
//       description:
//         "AI vs human text classification using state-of-the-art NLP models.",
//       features: [
//         "RoBERTa models",
//         "Style analysis",
//         "Plagiarism check",
//         "Sentiment analysis",
//       ],
//       color: "teal",
//       href: "/text-model",
//     },
//     {
//       icon: ImageIcon,
//       title: "Image Verification",
//       description:
//         "Advanced image forensics for detecting manipulated or AI-generated images.",
//       features: [
//         "High accuracy",
//         "Metadata analysis",
//         "Pattern recognition",
//         "Watermark detection",
//       ],
//       color: "emerald",
//       href: "/picture-model",
//     },
//     {
//       icon: Video,
//       title: "Video Analysis",
//       description:
//         "Frame-by-frame AI video detection using advanced deep learning models.",
//       features: [
//         "Real-time processing",
//         "Multi-format support",
//         "Batch analysis",
//         "API integration",
//       ],
//       color: "teal",
//       href: "/video-model",
//     },
//   ];

//   const solutions = [
//     {
//       icon: Shield,
//       title: "Enterprise Security",
//       description:
//         "End-to-end encrypted analysis with compliance-ready infrastructure.",
//       color: "green",
//       features: ["SOC 2 Type II", "GDPR Compliant", "ISO 27001", "HIPAA Ready"],
//     },
//     {
//       icon: Cloud,
//       title: "Cloud API",
//       description:
//         "Scalable REST API with comprehensive documentation and SDKs.",
//       color: "green",
//       features: ["REST API", "WebSocket", "GraphQL", "Webhooks"],
//     },
//     {
//       icon: Users,
//       title: "Team Collaboration",
//       description:
//         "Shared workspaces, role-based access, and collaborative workflows.",
//       color: "green",
//       features: [
//         "Role-based access",
//         "Shared projects",
//         "Real-time updates",
//         "Team analytics",
//       ],
//     },
//     {
//       icon: Globe,
//       title: "Global Infrastructure",
//       description: "Low-latency processing with data centers worldwide.",
//       color: "green",
//       features: [
//         "99.9% uptime",
//         "Edge computing",
//         "Global CDN",
//         "Auto-scaling",
//       ],
//     },
//   ];

//   const { user } = useAuth();
//   const router = useRouter();
//   const [showLogin, setShowLogin] = useState(false);
//   const handleClick = () => {
//     if (!user) {
//       setShowLogin(true);
//       return;
//     }
//     router.push("/dashboard");
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-linear-to-b from-white to-slate-50 border-b border-slate-200/60">
//         <div className="mt-16 container mx-auto max-w-6xl p-6 relative z-10">
//           {/* Hero Section */}
//           <div className="text-center py-16 mb-16">
//             <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               DeepTrace Services
//             </h1>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
//               Comprehensive AI-powered verification tools for video, image, and
//               text content. Trusted by enterprises worldwide for accuracy and
//               reliability.
//             </p>
//           </div>

//           {/* Core Services */}
//           <div className="rounded-2xl mb-20">
//             <div className="text-center mb-12">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
//                   <Target className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-slate-900">
//                   Core Services
//                 </h2>
//               </div>
//               <p className="text-slate-600 max-w-2xl mx-auto">
//                 Specialized AI models for comprehensive content verification
//                 across all media types
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {services.map((service, index) => (
//                 <Link href={service.href} key={index}>
//                   <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
//                     <div className="p-8">
//                       <div
//                         className={`flex items-center justify-center w-16 h-16 bg-linear-to-br from-${service.color}-100 to-${service.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
//                       >
//                         <service.icon
//                           className={`w-8 h-8 text-${service.color}-600`}
//                         />
//                       </div>

//                       <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
//                         {service.title}
//                       </h3>

//                       <p className="text-slate-600 mb-6">
//                         {service.description}
//                       </p>

//                       <div className="space-y-3">
//                         {service.features.map((feature, idx) => (
//                           <div key={idx} className="flex items-center gap-3">
//                             <div
//                               className={`w-2 h-2 bg-${service.color}-500 rounded-full`}
//                             ></div>
//                             <span className="text-sm text-slate-700">
//                               {feature}
//                             </span>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-8 pt-6 border-t border-slate-200/60">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
//                             Try Service
//                           </span>
//                           <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform duration-300" />
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className={`h-1 bg-linear-to-r from-${service.color}-500 to-${service.color}-600`}
//                     ></div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Additional Solutions */}
//           <div className="mt-16 mb-20">
//             <div className="text-center mb-12">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
//                   <Layers className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-slate-900">
//                   Enterprise Solutions
//                 </h2>
//               </div>
//               <p className="text-slate-600 max-w-2xl mx-auto">
//                 Complete infrastructure and tools for organizations of all sizes
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {solutions.map((solution, index) => (
//                 <div
//                   key={index}
//                   className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
//                 >
//                   <div
//                     className={`inline-flex p-3 bg-linear-to-br from-${solution.color}-100 to-${solution.color}-50 rounded-lg mb-4`}
//                   >
//                     <solution.icon
//                       className={`w-6 h-6 text-${solution.color}-600`}
//                     />
//                   </div>

//                   <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors duration-300">
//                     {solution.title}
//                   </h3>

//                   <p className="text-slate-600 text-sm mb-4">
//                     {solution.description}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {solution.features.map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="mt-16 mb-20">
//             <div className="bg-linear-to-br from-teal-50 to-emerald-50/50 border border-emerald-200/50 rounded-2xl p-12 text-center shadow-sm">
//               <div className="inline-flex p-4 bg-linear-to-br from-teal-500 to-emerald-500 rounded-2xl mb-6">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>

//               <h2 className="text-2xl font-bold text-slate-900 mb-4">
//                 Ready to Get Started?
//               </h2>

//               <p className="text-slate-600 max-w-xl mx-auto mb-8">
//                 Start verifying content authenticity with our simple, powerful
//                 API. No credit card required.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={handleClick}
//                   className="px-8 py-3 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
//                 >
//                   Start Free Trial
//                 </button>
//                 <button className="px-8 py-3 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300">
//                   Contact Sales
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Footer */}
//         <Footer />
//       </div>
//       {/* LOGIN MODAL */}
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
//     </>
//   );
// }









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
  Cpu,
  Zap,
  BarChart3,
  Lock,
  CheckCircle,
  Server,
  Database,
  Code2,
  ShieldCheck,
  CpuIcon as Chip,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/AuthModals/LoginModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Footer from "@/components/landingPage/footer";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Text Authenticity Analysis",
      description: "Advanced NLP models for detecting AI-generated text with 99.7% accuracy across multiple languages and writing styles.",
      features: [
        "GPT-4 Detection",
        "BERT Models",
        "Style Analysis",
        "Plagiarism Check",
        "Sentiment Scoring",
        "Multi-language"
      ],
      color: "teal",
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      href: "/text-model",
      stats: { accuracy: "99.7%", speed: "<1s" }
    },
    {
      icon: ImageIcon,
      title: "Image Verification",
      description: "Comprehensive image forensics to identify AI-generated and manipulated images using GAN detection and metadata analysis.",
      features: [
        "GAN Detection",
        "Metadata Forensics",
        "Pattern Recognition",
        "Watermark Analysis",
        "ELA Analysis",
        "Multi-format"
      ],
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      href: "/picture-model",
      stats: { accuracy: "98.5%", speed: "<2s" }
    },
    {
      icon: Video,
      title: "Video Deepfake Detection",
      description: "Frame-by-frame AI video analysis for deepfake detection and manipulation verification using temporal analysis models.",
      features: [
        "Deepfake Detection",
        "Frame Analysis",
        "Temporal Analysis",
        "Audio Verification",
        "Real-time Processing",
        "Batch Analysis"
      ],
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      href: "/video-model",
      stats: { accuracy: "97.9%", speed: "<5s" }
    },
  ];

  const solutions = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with SOC 2 Type II, ISO 27001, and GDPR compliance for complete data protection.",
      color: "teal",
      gradient: "from-teal-50 to-cyan-50",
      features: ["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "Zero-knowledge"],
      iconColor: "text-teal-600"
    },
    {
      icon: Cloud,
      title: "Cloud API",
      description: "Scalable REST API with comprehensive documentation, SDKs, and 99.9% uptime SLA.",
      color: "cyan",
      gradient: "from-cyan-50 to-blue-50",
      features: ["REST API", "WebSocket", "GraphQL", "Webhooks"],
      iconColor: "text-cyan-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Shared workspaces with role-based access control and collaborative workflows for teams.",
      color: "emerald",
      gradient: "from-emerald-50 to-green-50",
      features: ["Role-based Access", "Shared Projects", "Real-time Updates", "Team Analytics"],
      iconColor: "text-emerald-600"
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Low-latency processing with edge computing and data centers across 15+ regions worldwide.",
      color: "violet",
      gradient: "from-violet-50 to-purple-50",
      features: ["99.9% Uptime", "Edge Computing", "Global CDN", "Auto-scaling"],
      iconColor: "text-violet-600"
    },
  ];

  const enterpriseFeatures = [
    { icon: Server, title: "Dedicated Infrastructure", desc: "Isolated compute resources for maximum performance" },
    { icon: Database, title: "Data Sovereignty", desc: "Choose your data storage region for compliance" },
    { icon: ShieldCheck, title: "Custom SLAs", desc: "Tailored service level agreements for your needs" },
    { icon: Chip, title: "Model Customization", desc: "Fine-tune AI models for your specific use cases" },
  ];

  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

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
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                             linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                AI Detection Services
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                For Every Need
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI-powered verification tools for text, images, and video content. 
              Trusted by enterprises worldwide for unmatched accuracy and reliability.
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Core Detection Services
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Specialized AI models for comprehensive content verification across all media types
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
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-400/10 via-cyan-400/10 to-emerald-400/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Link href={service.href}>
                    <div className="relative h-full bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200">
                      {/* Top Gradient Bar */}
                      <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                      
                      <div className="p-8">
                        {/* Icon & Stats */}
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-16 h-16 rounded-2xl ${service.bgGradient} border border-slate-200 flex items-center justify-center`}>
                            <service.icon className={`w-8 h-8 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">{service.stats.accuracy}</div>
                            <div className="text-sm text-slate-500">Accuracy</div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Stats & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">{service.stats.speed}</div>
                              <div className="text-xs text-slate-500">Speed</div>
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">24/7</div>
                              <div className="text-xs text-slate-500">Support</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-teal-600 font-semibold">
                            <span>Try Now</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Enterprise Solutions
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Complete infrastructure and tools for organizations of all sizes
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-t-2xl" />
                    
                    <div className={`w-12 h-12 rounded-xl ${solution.gradient} border border-slate-200 flex items-center justify-center mb-4`}>
                      <solution.icon className={`w-6 h-6 ${solution.iconColor}`} />
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

            {/* Enterprise Features */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Enterprise-Grade Features
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {enterpriseFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl border border-teal-100 overflow-hidden">
              <div className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Start Your AI Detection Journey
                </h2>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                  Join thousands of organizations that trust DeepTrace for accurate, 
                  reliable AI content verification. Get started in minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleClick}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-white font-semibold hover:shadow-lg hover:shadow-teal-200 transition-all duration-300"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                  
                  <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                    Schedule Demo
                  </button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm text-slate-600">Full enterprise features</span>
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
    </>
  );
}