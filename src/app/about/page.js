"use client"

import { Brain, Shield, Zap, Users, Target, Building2, CheckCircle, Sparkles } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Custom AI Models",
      description: "Proprietary machine learning models trained specifically for truth detection and content analysis.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance with industry standards.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description:
        "Lightning-fast analysis with results delivered in seconds, backed by scalable cloud infrastructure.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-format Support",
      description: "Comprehensive analysis across video, images, and text with specialized models for each format.",
    },
  ]

  const stats = [
    { label: "Accuracy Rate", value: "99.7%" },
    { label: "Processing Speed", value: "<1s" },
    { label: "Supported Formats", value: "15+" },
    { label: "Enterprise Clients", value: "500+" },
  ]

  const certifications = ["SOC 2 Type II Compliant", "ISO 27001 Certified", "GDPR Compliant", "HIPAA Ready"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mt-14 bg-gradient-to-br from-slate-50/80 via-white to-teal-50/40 border-b border-slate-200/60">
        <div className="container mx-auto max-w-6xl p-6 ">
          <div className="text-center mb-16">
            {/* <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">About Truth Seeker</span>
            </div> */}
            <h1 className="mt-6 text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              About Truth Seeker
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              Leading the industry in AI-powered content verification with enterprise-grade solutions trusted by
              organizations worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl p-6">
        {/* Mission Statement */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-12 hover:shadow-lg transition-all duration-500">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-100/50">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              To provide organizations with the most advanced AI technology for content verification, enabling informed
              decision-making and maintaining trust in digital communications. We are committed to accuracy,
              transparency, and ethical AI practices.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Why Choose Truth Seeker
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-500 group">
                <div className="p-8">
                  <div className="text-teal-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-16 hover:shadow-lg transition-all duration-500">
          <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
            <div className="text-slate-900 py-1.5 text-center text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Performance Metrics
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
                  <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology & Compliance */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Technology Stack */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
            <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
              <div className="text-slate-900 py-1.5 px-2 text-2xl flex items-center gap-2 font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <Shield className="w-6 h-6 text-green-600" />
                Technology Stack
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">AI & Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {["TensorFlow", "PyTorch", "Computer Vision", "NLP"].map((tech, index) => (
                    <div key={index} className="rounded-2xl px-1.5 bg-teal-100/70 text-teal-800 border-teal-200/50 backdrop-blur-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "MongoDB", "Redis", "Docker", "AWS"].map((tech, index) => (
                    <div key={index} className="px-1.5 rounded-2xl bg-slate-100/70 text-slate-800 border-slate-200/50 backdrop-blur-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Security */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
            <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
              <div className="text-slate-900 py-1.5 px-2 text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <Shield className="w-6 h-6 text-green-600" />
                Security & Compliance
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-900 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50/70 rounded-lg border border-green-200/50 backdrop-blur-sm">
                <p className="text-green-800 text-sm">
                  <strong>Enterprise Ready:</strong> Our platform meets the highest security standards required by
                  Fortune 500 companies and government agencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
          <div className="rounded-2xl border-b border-slate-200/60 bg-white/40">
            <div className="text-slate-900 py-1 text-center text-3xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              <Building2 className="w-8 h-8 text-teal-600" />
              Our Team
            </div>
          </div>
          <div className="p-8">
            <div className="text-center space-y-6">
              <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                Our team consists of world-class AI researchers, data scientists, and engineers with decades of combined
                experience from leading technology companies and research institutions. We're passionate about building
                reliable, ethical AI solutions.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                {[
                  { value: "25+", label: "AI Researchers & Engineers", color: "teal" },
                  { value: "15+", label: "Years Average Experience", color: "green" },
                  { value: "50+", label: "Patents & Publications", color: "orange" }
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
                    <div className={`text-3xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
















// "use client"

// import { Brain, Shield, Zap, Users, Target, Building2, CheckCircle, Sparkles } from "lucide-react"

// export default function AboutPage() {
//   const features = [
//     {
//       icon: <Brain className="w-8 h-8" />,
//       title: "Custom AI Models",
//       description: "Proprietary machine learning models trained specifically for truth detection and content analysis.",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Enterprise Security",
//       description: "Bank-grade security with end-to-end encryption and compliance with industry standards.",
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Real-time Processing",
//       description:
//         "Lightning-fast analysis with results delivered in seconds, backed by scalable cloud infrastructure.",
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Multi-format Support",
//       description: "Comprehensive analysis across video, images, and text with specialized models for each format.",
//     },
//   ]

//   const stats = [
//     { label: "Accuracy Rate", value: "99.7%" },
//     { label: "Processing Speed", value: "<1s" },
//     { label: "Supported Formats", value: "15+" },
//     { label: "Enterprise Clients", value: "500+" },
//   ]

//   const certifications = ["SOC 2 Type II Compliant", "ISO 27001 Certified", "GDPR Compliant", "HIPAA Ready"]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/30">
//       {/* Header */}
//       <div className="bg-gradient-to-br from-slate-50/80 via-white to-teal-50/40 border-b border-slate-200/60">
//         <div className="container mx-auto max-w-6xl p-6">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-6">
//               <Sparkles className="w-4 h-4" />
//               <span className="text-sm font-medium">About Truth Seeker</span>
//             </div>
//             <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               About Truth Seeker
//             </h1>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
//               Leading the industry in AI-powered content verification with enterprise-grade solutions trusted by
//               organizations worldwide.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto max-w-6xl p-6">
//         {/* Mission Statement */}
//         <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-12 hover:shadow-lg transition-all duration-500">
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-100/50">
//               <Target className="w-8 h-8 text-teal-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Our Mission
//             </h2>
//             <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
//               To provide organizations with the most advanced AI technology for content verification, enabling informed
//               decision-making and maintaining trust in digital communications. We are committed to accuracy,
//               transparency, and ethical AI practices.
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Why Choose Truth Seeker
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-500 group">
//                 <div className="p-8">
//                   <div className="text-teal-600 mb-4 group-hover:scale-110 transition-transform duration-300">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
//                   <p className="text-slate-600 leading-relaxed bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-16 hover:shadow-lg transition-all duration-500">
//           <div className="border-b border-slate-200/60 bg-white/40">
//             <div className="text-slate-900 text-center text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Performance Metrics
//             </div>
//           </div>
//           <div className="p-8">
//             <div className="grid md:grid-cols-4 gap-8 text-center">
//               {stats.map((stat, index) => (
//                 <div key={index} className="space-y-2 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
//                   <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">
//                     {stat.value}
//                   </div>
//                   <div className="text-slate-600 font-medium">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Technology & Compliance */}
//         <div className="grid md:grid-cols-2 gap-8 mb-16">
//           {/* Technology Stack */}
//           <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
//             <div className="border-b border-slate-200/60 bg-white/40">
//               <div className="text-slate-900 text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Technology Stack
//               </div>
//             </div>
//             <div className="p-6 space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-900 mb-3">AI & Machine Learning</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {["TensorFlow", "PyTorch", "Computer Vision", "NLP"].map((tech, index) => (
//                     <div key={index} className="bg-teal-100/70 text-teal-800 border-teal-200/50 backdrop-blur-sm">
//                       {tech}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-slate-900 mb-3">Infrastructure</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {["Node.js", "Express.js", "MongoDB", "Redis", "Docker", "AWS"].map((tech, index) => (
//                     <div key={index} className="bg-slate-100/70 text-slate-800 border-slate-200/50 backdrop-blur-sm">
//                       {tech}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compliance & Security */}
//           <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
//             <div className="border-b border-slate-200/60 bg-white/40">
//               <div className="text-slate-900 text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <Shield className="w-6 h-6 text-green-600" />
//                 Security & Compliance
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="space-y-4">
//                 {certifications.map((cert, index) => (
//                   <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="text-slate-900 font-medium">{cert}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6 p-4 bg-green-50/70 rounded-lg border border-green-200/50 backdrop-blur-sm">
//                 <p className="text-green-800 text-sm">
//                   <strong>Enterprise Ready:</strong> Our platform meets the highest security standards required by
//                   Fortune 500 companies and government agencies.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Team Section */}
//         <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-500">
//           <div className="border-b border-slate-200/60 bg-white/40">
//             <div className="text-slate-900 text-center text-3xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               <Building2 className="w-8 h-8 text-teal-600" />
//               Our Team
//             </div>
//           </div>
//           <div className="p-8">
//             <div className="text-center space-y-6">
//               <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50">
//                 Our team consists of world-class AI researchers, data scientists, and engineers with decades of combined
//                 experience from leading technology companies and research institutions. We're passionate about building
//                 reliable, ethical AI solutions.
//               </p>
//               <div className="grid md:grid-cols-3 gap-8 mt-8">
//                 {[
//                   { value: "25+", label: "AI Researchers & Engineers", color: "teal" },
//                   { value: "15+", label: "Years Average Experience", color: "green" },
//                   { value: "50+", label: "Patents & Publications", color: "orange" }
//                 ].map((stat, index) => (
//                   <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group">
//                     <div className={`text-3xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`}>
//                       {stat.value}
//                     </div>
//                     <div className="text-slate-600 font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
