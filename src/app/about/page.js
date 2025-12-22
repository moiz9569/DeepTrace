// "use client"

// import { 
//   Brain, 
//   Shield, 
//   Zap, 
//   Users, 
//   Target, 
//   Building2, 
//   CheckCircle, 
//   Sparkles,
//   Globe,
//   Cpu,
//   Database,
//   Server,
//   Code,
//   Layers,
//   Award,
//   Lock,
//   ShieldCheck,
//   BarChart3,
//   Clock,
//   FileCheck
// } from "lucide-react"
// import Footer from "@/components/landingPage/footer"

// export default function AboutPage() {
//   const features = [
//     {
//       icon: Brain,
//       title: "Custom AI Models",
//       description: "Proprietary machine learning models trained specifically for truth detection and content analysis with state-of-the-art accuracy.",
//       color: "purple"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise Security",
//       description: "Bank-grade security with end-to-end encryption, SOC 2 compliance, and military-grade data protection protocols.",
//       color: "emerald"
//     },
//     {
//       icon: Zap,
//       title: "Real-time Processing",
//       description: "Lightning-fast analysis with sub-second response times, powered by scalable cloud infrastructure and edge computing.",
//       color: "amber"
//     },
//     {
//       icon: Users,
//       title: "Multi-format Support",
//       description: "Comprehensive analysis across video, images, audio, and text with specialized models for each media type.",
//       color: "blue"
//     },
//   ]

//   const stats = [
//     { label: "Accuracy Rate", value: "99.7%", icon: Target, color: "emerald" },
//     { label: "Processing Speed", value: "<1s", icon: Zap, color: "amber" },
//     { label: "Supported Formats", value: "15+", icon: FileCheck, color: "blue" },
//     { label: "Enterprise Clients", value: "500+", icon: Building2, color: "purple" },
//     { label: "Countries Served", value: "40+", icon: Globe, color: "teal" },
//     { label: "Uptime", value: "99.9%", icon: Server, color: "green" },
//   ]

//   const certifications = [
//     { name: "SOC 2 Type II Compliant", icon: ShieldCheck },
//     { name: "ISO 27001 Certified", icon: Award },
//     { name: "GDPR Compliant", icon: Lock },
//     { name: "HIPAA Ready", icon: CheckCircle },
//   ]

//   const techStack = {
//     ai: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Transformers", "Deep Learning"],
//     infrastructure: ["Node.js", "Express.js", "MongoDB", "Redis", "Docker", "AWS", "Kubernetes", "GraphQL"]
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
//       <div className="container mx-auto max-w-6xl p-6 relative z-10">
//         {/* Hero Section */}
//         <div className="mt-18 text-center pt-12 pb-16">          
//           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
//             The Future of <span className="bg-gradient-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">Authenticity</span> Verification
//           </h1>
//           <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-sm">
//             Leading the industry in AI-powered content verification with enterprise-grade solutions trusted by Fortune 500 companies, government agencies, and organizations worldwide.
//           </p>
//         </div>

//         {/* Mission Statement */}
//         <div className="mb-16">
//           <div className="bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-8">
//             <div className="flex flex-col lg:flex-row items-center gap-8">
//               <div className="lg:w-1/3">
//                 <div className="p-6 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/30">
//                   <Target className="w-16 h-16 text-white" />
//                 </div>
//               </div>
//               <div className="lg:w-2/3">
//                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
//                 <p className="text-lg text-slate-600 leading-relaxed mb-6">
//                   To provide organizations with the most advanced AI technology for content verification, enabling informed decision-making and maintaining trust in digital communications. We are committed to accuracy, transparency, and ethical AI practices that shape the future of digital authenticity.
//                 </p>
//                 <div className="flex flex-wrap gap-4 text-sm text-slate-600">
//                   <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200/50">
//                     <CheckCircle className="w-4 h-4 text-emerald-500" />
//                     <span>Ethical AI Development</span>
//                   </div>
//                   <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200/50">
//                     <CheckCircle className="w-4 h-4 text-blue-500" />
//                     <span>Transparent Algorithms</span>
//                   </div>
//                   <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200/50">
//                     <CheckCircle className="w-4 h-4 text-slate-500" />
//                     <span>Data Privacy First</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="mb-16">
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
//                 <Cpu className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold text-slate-900">Why Choose DeepTrace</h2>
//             </div>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Cutting-edge AI technology combined with enterprise-grade security and performance
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
//               >
//                 <div className="p-8">
//                   <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                     <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-950 transition-colors duration-300">
//                     {feature.title}
//                   </h3>
//                   <p className="text-slate-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//                 <div className={`h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600`}></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="mb-16">
//           <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-lg overflow-hidden">
//             <div className="p-8 border-b border-slate-700">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-2 bg-white/10 rounded-lg">
//                   <BarChart3 className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
//               </div>
//               <p className="text-slate-300">Industry-leading benchmarks and statistics</p>
//             </div>

//             <div className="p-8">
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {stats.map((stat, index) => (
//                   <div 
//                     key={index} 
//                     className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
//                   >
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className={`p-3 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-lg`}>
//                         <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
//                       </div>
//                       <div>
//                         <div className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
//                           {stat.value}
//                         </div>
//                         <div className="text-slate-300 text-sm">{stat.label}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Technology & Compliance Grid */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-16">
//           {/* Technology Stack */}
//           <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
//             <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
//                   <Code className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-slate-900">Technology Stack</h2>
//                   <p className="text-sm text-slate-500">Advanced frameworks and infrastructure</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="space-y-6">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <Cpu className="w-4 h-4 text-purple-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">AI & Machine Learning</h3>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {techStack.ai.map((tech, index) => (
//                       <span 
//                         key={index}
//                         className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200/50 hover:bg-purple-100 transition-colors duration-200"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <Database className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900">Infrastructure</h3>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {techStack.infrastructure.map((tech, index) => (
//                       <span 
//                         key={index}
//                         className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200/50 hover:bg-blue-100 transition-colors duration-200"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compliance & Security */}
//           <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
//             <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
//                   <Shield className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-slate-900">Security & Compliance</h2>
//                   <p className="text-sm text-slate-500">Enterprise-grade certifications and standards</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="space-y-4">
//                 {certifications.map((cert, index) => (
//                   <div 
//                     key={index} 
//                     className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group"
//                   >
//                     <div className="p-2 bg-emerald-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
//                       <cert.icon className="w-5 h-5 text-emerald-600" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-slate-900 font-medium">{cert.name}</h3>
//                       <p className="text-sm text-slate-500">Fully compliant and audited</p>
//                     </div>
//                     <CheckCircle className="w-5 h-5 text-emerald-500" />
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50">
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 bg-white rounded-lg border border-emerald-200">
//                     <Award className="w-5 h-5 text-emerald-600" />
//                   </div>
//                   <div>
//                     <p className="text-emerald-800 text-sm font-medium">
//                       Enterprise Ready Platform
//                     </p>
//                     <p className="text-emerald-700/80 text-xs mt-1">
//                       Meets the highest security standards required by Fortune 500 companies and government agencies worldwide.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Team Section */}
//         <div className="mb-16">
//           <div className="bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
//             <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-8">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">Our Team</h2>
//                   <p className="text-slate-600">World-class AI researchers and engineers</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="space-y-8">
//                 <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto text-center">
//                   Our team consists of world-class AI researchers, data scientists, and engineers with decades of combined experience from leading technology companies and top-tier research institutions.
//                 </p>

//                 <div className="grid md:grid-cols-3 gap-6">
//                   {[
//                     { value: "25+", label: "AI Researchers & Engineers", color: "purple", icon: Brain },
//                     { value: "15+", label: "Years Average Experience", color: "blue", icon: Clock },
//                     { value: "50+", label: "Patents & Publications", color: "emerald", icon: Award },
//                   ].map((stat, index) => (
//                     <div 
//                       key={index} 
//                       className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group"
//                     >
//                       <div className={`inline-flex p-4 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                         <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
//                       </div>
//                       <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
//                         {stat.value}
//                       </div>
//                       <div className="text-slate-700 font-medium">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 p-6 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/60">
//                   <div className="flex flex-col md:flex-row items-center gap-6">
//                     <div className="md:w-1/3">
//                       <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl shadow-lg">
//                         <Building2 className="w-12 h-12 text-white mx-auto" />
//                       </div>
//                     </div>
//                     <div className="md:w-2/3 text-center md:text-left">
//                       <h3 className="text-xl font-bold text-slate-900 mb-2">Global Reach, Local Expertise</h3>
//                       <p className="text-slate-600">
//                         With team members across 8 countries and partnerships with leading research institutions, we combine global perspectives with deep technical expertise to solve the most challenging authenticity verification problems.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mb-12">
//           <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 border border-emerald-200/50 rounded-2xl p-8">
//             <div className="inline-flex p-4 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl mb-6">
//               <Sparkles className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Secure Your Digital Content?</h2>
//             <p className="text-slate-600 max-w-2xl mx-auto mb-8">
//               Join 500+ enterprises who trust DeepTrace for their content verification needs. Experience industry-leading AI accuracy with enterprise-grade security.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a href="/services" className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
//                 Explore Services
//               </a>
//               <a href="/contact" className="px-8 py-3 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300">
//                 Contact Us
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   )
// }





// // "use client"

// // import { Brain, Shield, Zap, Users, Target, Building2, CheckCircle, Sparkles } from "lucide-react"
// // import Footer from "@/components/landingPage/footer"

// // export default function AboutPage() {
// //   const features = [
// //     {
// //       icon: <Brain className="w-8 h-8" />,
// //       title: "Custom AI Models",
// //       description: "Proprietary machine learning models trained specifically for truth detection and content analysis.",
// //     },
// //     {
// //       icon: <Shield className="w-8 h-8" />,
// //       title: "Enterprise Security",
// //       description: "Bank-grade security with end-to-end encryption and compliance with industry standards.",
// //     },
// //     {
// //       icon: <Zap className="w-8 h-8" />,
// //       title: "Real-time Processing",
// //       description:
// //         "Lightning-fast analysis with results delivered in seconds, backed by scalable cloud infrastructure.",
// //     },
// //     {
// //       icon: <Users className="w-8 h-8" />,
// //       title: "Multi-format Support",
// //       description: "Comprehensive analysis across video, images, and text with specialized models for each format.",
// //     },
// //   ]

// //   const stats = [
// //     { label: "Accuracy Rate", value: "99.7%" },
// //     { label: "Processing Speed", value: "<1s" },
// //     { label: "Supported Formats", value: "15+" },
// //     { label: "Enterprise Clients", value: "500+" },
// //   ]

// //   const certifications = ["SOC 2 Type II Compliant", "ISO 27001 Certified", "GDPR Compliant", "HIPAA Ready"]

// //   return (
// //     <div className="min-h-screen bg-white">
// //       {/* Header */}
// //       <div className="mt-24 bg-gradient-to-br from-slate-50/80 via-white to-teal-50/40 border-b border-slate-200/60">
// //         <div className="container mx-auto max-w-6xl p-6 ">
// //           <div className="text-center mb-16">
// //             {/* <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-6">
// //               <Sparkles className="w-4 h-4" />
// //               <span className="text-sm font-medium">About Truth Seeker</span>
// //             </div> */}
// //             <h1 className="mt-6 text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //               About DeepTrace
// //             </h1>
// //             <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
// //               Leading the industry in AI-powered content verification with enterprise-grade solutions trusted by
// //               organizations worldwide.
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mx-auto max-w-6xl p-6">
// //         {/* Mission Statement */}
// //         <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-12 hover:shadow-lg transition-all duration-500">
// //           <div className="p-8 text-center">
// //             <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-100/50">
// //               <Target className="w-8 h-8 text-teal-600" />
// //             </div>
// //             <h2 className="text-3xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //               Our Mission
// //             </h2>
// //             <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
// //               To provide organizations with the most advanced AI technology for content verification, enabling informed
// //               decision-making and maintaining trust in digital communications. We are committed to accuracy,
// //               transparency, and ethical AI practices.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Features Grid */}
// //         <div className="mb-16">
// //           <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //             Why Choose Truth Seeker
// //           </h2>
// //           <div className="grid md:grid-cols-2 gap-8">
// //             {features.map((feature, index) => (
// //               <div key={index} className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-500 group">
// //                 <div className="p-8">
// //                   <div className="text-teal-600 mb-4 group-hover:scale-110 transition-transform duration-300">
// //                     {feature.icon}
// //                   </div>
// //                   <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
// //                   <p className="text-slate-600 leading-relaxed bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50">
// //                     {feature.description}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Stats Section */}
// //         <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-16 hover:shadow-lg transition-all duration-500">
// //           <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
// //             <div className="text-slate-900 py-7 text-center text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //               Performance Metrics
// //             </div>
// //           </div>
// //           <div className="p-8">
// //             <div className="grid md:grid-cols-4 gap-8 text-center">
// //               {stats.map((stat, index) => (
// //                 <div key={index} className="space-y-2 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
// //                   <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">
// //                     {stat.value}
// //                   </div>
// //                   <div className="text-slate-600 font-medium">{stat.label}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Technology & Compliance */}
// //         <div className="grid md:grid-cols-2 gap-8 mb-16">
// //           {/* Technology Stack */}
// //           <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
// //             <div className="rounded-t-2xl border-b hover:bg-red-600 border-slate-200/60 bg-white/40">
// //               <div className="text-slate-900 py-6 px-4 text-2xl flex items-center gap-2 font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //                 <Shield className="w-6 h-6 text-green-600" />
// //                 Technology Stack
// //               </div>
// //             </div>
// //             <div className="p-6 space-y-6">
// //               <div>
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-3">AI & Machine Learning</h3>
// //                 <div className="flex flex-wrap gap-2">
// //                   {["TensorFlow", "PyTorch", "Computer Vision", "NLP"].map((tech, index) => (
// //                     <div key={index} className="rounded-2xl px-2.5 py-1 text-xs font-semibold bg-teal-100/70 text-teal-800 hover:bg-teal-800 hover:text-teal-100/70 border-teal-200/50 backdrop-blur-sm">
// //                       {tech}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-3">Infrastructure</h3>
// //                 <div className="flex flex-wrap gap-2">
// //                   {["Node.js", "Express.js", "MongoDB", "Redis", "Docker", "AWS"].map((tech, index) => (
// //                     <div key={index} className="rounded-2xl px-2.5 py-1 text-xs font-semibold bg-slate-100/70 text-slate-800 hover:text-slate-100/70 hover:bg-slate-800 border-slate-200/50 backdrop-blur-sm">
// //                       {tech}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Compliance & Security */}
// //           <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
// //             <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
// //               <div className="text-slate-900 py-6 px-4 text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //                 <Shield className="w-6 h-6 text-green-600" />
// //                 Security & Compliance
// //               </div>
// //             </div>
// //             <div className="p-6">
// //               <div className="space-y-4">
// //                 {certifications.map((cert, index) => (
// //                   <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
// //                     <CheckCircle className="w-5 h-5 text-green-600" />
// //                     <span className="text-slate-900 font-medium">{cert}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="mt-6 p-4 bg-green-50/70 rounded-lg border border-green-200/50 backdrop-blur-sm">
// //                 <p className="text-green-800 text-sm">
// //                   <strong>Enterprise Ready:</strong> Our platform meets the highest security standards required by
// //                   Fortune 500 companies and government agencies.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Team Section */}
// //         <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
// //           <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
// //             <div className="text-slate-900 py-7 text-center text-3xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
// //               <Building2 className="w-8 h-8 text-teal-600" />
// //               Our Team
// //             </div>
// //           </div>
// //           <div className="p-8">
// //             <div className="text-center space-y-6">
// //               <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
// //                 Our team consists of world-class AI researchers, data scientists, and engineers with decades of combined
// //                 experience from leading technology companies and research institutions. We're passionate about building
// //                 reliable, ethical AI solutions.
// //               </p>
// //               <div className="grid md:grid-cols-3 gap-8 mt-8">
// //                 {[
// //                   { value: "25+", label: "AI Researchers & Engineers", color: "teal" },
// //                   { value: "15+", label: "Years Average Experience", color: "green" },
// //                   { value: "50+", label: "Patents & Publications", color: "orange" }
// //                 ].map((stat, index) => (
// //                   <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
// //                     <div className={`text-3xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`}>
// //                       {stat.value}
// //                     </div>
// //                     <div className="text-slate-600 font-medium">{stat.label}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Footer */}
// //       <Footer />
// //     </div>
// //   )
// // }







"use client"

import { Brain, Shield, Zap, Users, Target, Building2, CheckCircle, Sparkles, Globe, Cpu, Award } from "lucide-react"
import Footer from "@/components/landingPage/footer"

export default function AboutPage() {
  const features = [
    { icon: Brain, title: "Custom AI Models", desc: "Proprietary machine learning models for truth detection.", color: "purple" },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security with SOC 2 compliance.", color: "emerald" },
    { icon: Zap, title: "Real-time Processing", desc: "Lightning-fast analysis with sub-second response.", color: "amber" },
    { icon: Users, title: "Multi-format Support", desc: "Analysis across video, images, audio, and text.", color: "blue" },
  ]

  const stats = [
    { label: "Accuracy", value: "99.7%", icon: Target },
    { label: "Speed", value: "<1s", icon: Zap },
    { label: "Formats", value: "15+", icon: Building2 },
    { label: "Clients", value: "500+", icon: Users },
    { label: "Countries", value: "40+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mt-18 text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">About DeepTrace</span>
          </div> */}

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The Future of <span className="text-teal-600">Authenticity</span> Verification
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Leading the industry in AI-powered content verification trusted by Fortune 500 companies worldwide.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="items-center justify-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            </div>

            <p className="text-center text-slate-600 mb-8 leading-relaxed">
              To provide organizations with advanced AI technology for content verification, enabling informed decision-making and maintaining trust in digital communications.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Ethical AI Development", "Transparent Algorithms", "Data Privacy First"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose DeepTrace</h2>
            <p className="text-slate-600">Advanced AI technology with enterprise-grade security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div className={`p-3 rounded-lg bg-${feat.color}-100 w-fit mb-4`}>
                  <feat.icon className={`w-6 h-6 text-${feat.color}-600`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Performance Metrics</h2>
            <p className="text-slate-300">Industry-leading benchmarks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Cpu className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900">Technology Stack</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {["TensorFlow", "PyTorch", "AWS", "Node.js", "MongoDB", "Docker"].map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm">
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
              <h3 className="font-bold text-slate-900">Certifications</h3>
            </div>

            <div className="space-y-3">
              {["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "HIPAA Ready"].map((cert, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Secure Your Content?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Join 500+ enterprises trusting DeepTrace for content verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition">
              Explore Services
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 border rounded-lg font-medium hover:bg-slate-50 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}