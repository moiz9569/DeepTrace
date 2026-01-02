// "use client";
// import {
//   Brain,
//   Shield,
//   Zap,
//   Users,
//   Target,
//   Building2,
//   CheckCircle,
//   Globe,
//   Cpu,
// } from "lucide-react";
// import Footer from "@/components/landingPage/footer";

// export default function AboutPage() {
//   const features = [
//     {
//       icon: Brain,
//       title: "Custom AI Models",
//       desc: "Proprietary machine learning models for truth detection.",
//       color: "green",
//     },
//     {
//       icon: Shield,
//       title: "Enterprise Security",
//       desc: "Bank-grade security with SOC 2 compliance.",
//       color: "green",
//     },
//     {
//       icon: Zap,
//       title: "Real-time Processing",
//       desc: "Lightning-fast analysis with sub-second response.",
//       color: "green",
//     },
//     {
//       icon: Users,
//       title: "Multi-format Support",
//       desc: "Analysis across video, images, audio, and text.",
//       color: "green",
//     },
//   ];

//   const stats = [
//     { label: "Accuracy", value: "99.7%", icon: Target },
//     { label: "Speed", value: "<1s", icon: Zap },
//     { label: "Formats", value: "15+", icon: Building2 },
//     { label: "Clients", value: "500+", icon: Users },
//     { label: "Countries", value: "40+", icon: Globe },
//     { label: "Uptime", value: "99.9%", icon: CheckCircle },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-b from-white to-slate-50">
//       <div className="container max-w-6xl mx-auto px-4 py-16">
//         {/* Header */}
//         <div className="mt-22 text-center mb-16">
//           <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             The Future of <span className="text-teal-600">Authenticity</span>{" "}
//             Verification
//           </h1>

//           <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
//             Leading the industry in AI-powered content verification trusted by
//             Fortune 500 companies worldwide.
//           </p>
//         </div>

//         {/* Mission */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
//           <div className="items-center justify-center">
//             <div className="flex items-center justify-center gap-4 mb-8">
//               <div className="p-3 bg-linear-to-r from-teal-500 to-emerald-500 bg rounded-lg">
//                 <Target className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
//             </div>

//             <p className="text-center text-slate-600 mb-8 leading-relaxed">
//               To provide organizations with advanced AI technology for content
//               verification, enabling informed decision-making and maintaining
//               trust in digital communications.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               "Ethical AI Development",
//               "Transparent Algorithms",
//               "Data Privacy First",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
//               >
//                 <CheckCircle className="w-5 h-5 text-teal-500" />
//                 <span className="font-medium text-slate-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Features */}
//         <div className="mb-16">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-slate-900 mb-4">
//               Why Choose DeepTrace
//             </h2>
//             <p className="text-slate-600">
//               Advanced AI technology with enterprise-grade security
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feat, i) => (
//               <div key={i} className="bg-white rounded-xl shadow p-6">
//                 <div
//                   className={`p-3 rounded-lg bg-${feat.color}-100 w-fit mb-4`}
//                 >
//                   <feat.icon className={`w-6 h-6 text-${feat.color}-600`} />
//                 </div>
//                 <h3 className="font-bold text-lg text-slate-900 mb-2">
//                   {feat.title}
//                 </h3>
//                 <p className="text-slate-600 text-sm">{feat.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="bg-slate-900 rounded-2xl p-8 mb-16">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-white mb-2">
//               Performance Metrics
//             </h2>
//             <p className="text-slate-300">Industry-leading benchmarks</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {stats.map((stat, i) => (
//               <div key={i} className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-slate-300 text-sm">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tech Stack */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-16">
//           <div className="bg-white rounded-xl shadow p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-teal-100 rounded-lg">
//                 <Cpu className="w-5 h-5 text-teal-600" />
//               </div>
//               <h3 className="font-bold text-lg text-slate-900">
//                 Technology Stack
//               </h3>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {[
//                 "TensorFlow",
//                 "PyTorch",
//                 "AWS",
//                 "Node.js",
//                 "MongoDB",
//                 "Docker",
//               ].map((tech, i) => (
//                 <span
//                   key={i}
//                   className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <Shield className="w-5 h-5 text-emerald-600" />
//               </div>
//               <h3 className="font-bold text-lg text-slate-900">
//                 Certifications
//               </h3>
//             </div>

//             <div className="space-y-3">
//               {[
//                 "SOC 2 Type II",
//                 "ISO 27001",
//                 "GDPR Compliant",
//                 "HIPAA Ready",
//               ].map((cert, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5 text-emerald-500" />
//                   <span className="text-slate-700">{cert}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="bg-linear-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 text-center">
//           <h2 className="text-2xl font-bold text-slate-900 mb-4">
//             Ready to Secure Your Content?
//           </h2>
//           <p className="text-slate-600 mb-8 max-w-lg mx-auto">
//             Join 500+ enterprises trusting DeepTrace for content verification.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-6 py-3 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-xl font-medium hover:bg-teal-700 transition">
//               Explore Services
//             </button>
//             <button className="px-6 py-3 bg-white text-slate-700 border rounded-xl font-medium hover:bg-slate-50 transition">
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }











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
  Sparkles,
  Lock,
  BarChart3,
  Award,
  ArrowRight,
  Heart,
  Code2,
  Server,
  Cloud,
} from "lucide-react";
import Footer from "@/components/landingPage/footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "Custom AI Models",
      desc: "Proprietary machine learning models trained on millions of samples for precise AI detection.",
      color: "teal",
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      stats: "98.5%"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "Bank-grade security with SOC 2 compliance, end-to-end encryption, and zero-data retention.",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      stats: "100%"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      desc: "Lightning-fast analysis with sub-second response times for instant content verification.",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      stats: "<1s"
    },
    {
      icon: Users,
      title: "Multi-format Support",
      desc: "Comprehensive analysis across video, images, audio, and text using specialized AI models.",
      color: "violet",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50",
      stats: "15+"
    },
  ];

  const stats = [
    { label: "Accuracy", value: "99.7%", icon: Target, color: "teal" },
    { label: "Processing Speed", value: "<1s", icon: Zap, color: "cyan" },
    { label: "Supported Formats", value: "15+", icon: Building2, color: "emerald" },
    { label: "Enterprise Clients", value: "500+", icon: Users, color: "violet" },
    { label: "Countries Served", value: "40+", icon: Globe, color: "blue" },
    { label: "System Uptime", value: "99.9%", icon: CheckCircle, color: "green" },
  ];

  const values = [
    { icon: Lock, title: "Privacy First", desc: "Your data never leaves your control" },
    { icon: Heart, title: "Ethical AI", desc: "Transparent, unbiased algorithms" },
    { icon: Award, title: "Excellence", desc: "Industry-leading accuracy" },
    { icon: Sparkles, title: "Innovation", desc: "Continuous research & development" },
  ];

  return (
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">About DeepTrace</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Redefining Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Authenticity
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Leading the industry in AI-powered content verification, trusted by Fortune 500 companies 
            and security professionals worldwide. We're on a mission to restore trust in digital content.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-emerald-500/5 rounded-3xl blur-xl" />
          
          <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    Our Mission & Vision
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      To provide organizations with advanced AI technology for content verification, 
                      enabling informed decision-making and maintaining trust in digital communications 
                      across all platforms.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {values.map((value, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
                            <value.icon className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{value.title}</h4>
                            <p className="text-sm text-slate-600">{value.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Organizations Choose DeepTrace
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced AI technology combined with enterprise-grade security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-400/10 via-cyan-400/10 to-emerald-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 p-6 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200">
                  {/* Top Gradient Bar */}
                  <div className={`h-2 bg-gradient-to-r ${feat.gradient} rounded-t-2xl -mx-6 -mt-6 mb-6`} />
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${feat.bgGradient} border border-slate-200 flex items-center justify-center flex-shrink-0`}>
                      <feat.icon className={`w-6 h-6 bg-gradient-to-r ${feat.gradient} bg-clip-text text-transparent`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{feat.title}</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                          {feat.stats}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl blur-xl" />
          
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Industry-Leading Performance
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Measurable results that set the standard for AI content verification
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center group"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${stat.color}-900/30 to-${stat.color}-800/20 border border-${stat.color}-700/30 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech & Certifications */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Technology Stack</h3>
                  <p className="text-slate-600">Built on modern, scalable infrastructure</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { name: "TensorFlow", color: "from-orange-500 to-orange-600" },
                  { name: "PyTorch", color: "from-red-500 to-orange-500" },
                  { name: "AWS", color: "from-yellow-500 to-orange-500" },
                  { name: "Node.js", color: "from-green-500 to-green-600" },
                  { name: "MongoDB", color: "from-green-600 to-emerald-600" },
                  { name: "Docker", color: "from-blue-500 to-cyan-500" },
                  { name: "Kubernetes", color: "from-blue-600 to-blue-700" },
                  { name: "Redis", color: "from-red-600 to-red-700" },
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-xl text-sm font-medium border border-slate-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl blur opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Certifications & Compliance</h3>
                  <p className="text-slate-600">Highest standards for enterprise security</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { cert: "SOC 2 Type II", icon: Shield, color: "text-teal-600" },
                  { cert: "ISO 27001", icon: Lock, color: "text-cyan-600" },
                  { cert: "GDPR Compliant", icon: Globe, color: "text-emerald-600" },
                  { cert: "HIPAA Ready", icon: Heart, color: "text-violet-600" },
                ].map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <cert.icon className={`w-5 h-5 ${cert.color}`} />
                      </div>
                      <span className="font-medium text-slate-900">{cert.cert}</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
          
          <div className="relative bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl border border-teal-100 overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ready to Secure Your Digital Content?
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Join 500+ enterprises and security teams who trust DeepTrace for accurate, 
                reliable AI content detection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-white font-semibold hover:shadow-lg hover:shadow-teal-200 transition-all duration-300">
                  <div className="relative flex items-center justify-center gap-2">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
                
                <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
              
              <p className="text-sm text-slate-500 mt-6">
                No credit card required • 14-day free trial • Full enterprise features
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}