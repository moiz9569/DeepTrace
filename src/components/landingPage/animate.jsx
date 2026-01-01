// "use client";
// import { TrendingUp, Shield, Zap } from "lucide-react";
// import { motion } from "motion/react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import React from "react";

// const benefits = [
//   {
//     icon: TrendingUp,
//     title: "Increase Organic Traffic",
//     description:
//       "Rank higher for relevant keywords and attract qualified visitors ready to convert",
//     color: "from-teal-500 to-teal-400",
//     bgColor: "bg-gradient-to-br from-teal-50 to-teal-50",
//   },
//   {
//     icon: Shield,
//     title: "Build Brand Authority",
//     description:
//       "Establish your business as an industry leader and earn trust from your audience",
//     color: "from-teal-600 to-teal-400",
//     bgColor: "bg-gradient-to-br from-teal-50/50 to-indigo-50",
//   },
//   {
//     icon: Zap,
//     title: "Improve User Experience",
//     description:
//       "Optimize your website for better performance, speed, and user engagement",
//     color: "from-teal-500 to-teal-400",
//     bgColor: "bg-gradient-to-br from-teal-50 to-teal-50",
//   },
// ];

// export default function Animate() {
//   return (
//     <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl" />
//         <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* Left - Enhanced Benefits List */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="w-12 h-px bg-linear-to-r from-teal-500 to-teal-500" />
//                 <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
//                   Essential Strategy
//                 </span>
//               </div>

//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
//                 Why{" "}
//                 <span className="bg-linear-to-r from-teal-600 via-teal-500 to-teal-600 bg-clip-text text-transparent">
//                   SEO Matters
//                 </span>{" "}
//                 for Your Business
//               </h2>

//               <p className="text-base text-gray-600 mb-4 leading-relaxed max-w-xl">
//                 Search engine optimization is critical for online success and
//                 sustainable growth. It's not just about rankings—it's about
//                 building a foundation for long-term success.
//               </p>
//             </motion.div>

//             <div className="space-y-3">
//               {benefits.map((benefit, index) => {
//                 const Icon = benefit.icon;
//                 return (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="group"
//                   >
//                     <div className="relative">
//                       {/* Hover Background Effect */}
//                       <div
//                         className={`absolute inset-0 ${benefit.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                       />

//                       {/* Main Content */}
//                       <div className="relative h-28 flex gap-6 p-2 rounded-2xl border border-gray-200 group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:shadow-xl">
//                         <div className="shrink-0 relative">
//                           {/* Icon Background with Gradient */}
//                           <div
//                             className={`absolute inset-0 bg-linear-to-br ${benefit.color} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
//                           />
//                           <div
//                             className={`relative w-10 mt-6 border border-gray-300 h-10 rounded-xl ${benefit.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
//                           >
//                             <Icon className="w-7 h-7 text-gray-800" />
//                           </div>
//                         </div>

//                         <div className="flex-1">
//                           <h3 className="text-base font-bold text-gray-900 mb-1 mt-4 group-hover:text-gray-800 transition-colors duration-300">
//                             {benefit.title}
//                           </h3>
//                           <p className="text-gray-600 text-sm leading-relaxed">
//                             {benefit.description}
//                           </p>
//                         </div>

//                         {/* Number Badge */}
//                         <div className="absolute -top-3 -right-3 w-8 h-8 bg-linear-to-br from-teal-500 to-teal-400 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
//                           {index + 1}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Right - SEO Animation */}
//           <div className="flex items-center justify-center">
//             <div className="relative w-96 h-96">
//               {/* Outer Glow Ring */}
//               <DotLottieReact
//                 src="https://lottie.host/432513b0-8f0d-427d-b812-fb5ced4929b6/HFa0etEFRW.lottie"
//                 loop
//                 autoplay
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import { Brain, Shield, Zap, Target, Lock, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const benefits = [
  {
    icon: Brain,
    title: "Advanced AI Detection",
    description: "Utilize cutting-edge neural networks to accurately identify AI-generated content across all formats with 99.7% precision.",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-emerald-50",
    stat: "99.7%",
    statLabel: "Accuracy"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and compliance with GDPR, SOC 2, and ISO 27001 standards for complete data protection.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    stat: "100%",
    statLabel: "Secure"
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Process text, images, and videos in milliseconds with our optimized AI models for instant verification results.",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    stat: "<1s",
    statLabel: "Processing"
  },
  {
    icon: Target,
    title: "Multi-modal Detection",
    description: "Comprehensive analysis across text, images, and video content using specialized AI models for each format.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    stat: "3-in-1",
    statLabel: "Models"
  },
];

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-white via-white/50 to-transparent" />
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

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Advanced AI Detection
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Built for Professionals
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Deeptrace provides enterprise-grade AI detection solutions trusted by security teams, 
                researchers, and media organizations worldwide. Our platform combines cutting-edge 
                technology with unparalleled accuracy.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "10M+", label: "Content Analyzed", icon: BarChart3 },
                  { value: "500+", label: "Enterprise Clients", icon: Shield },
                  { value: "24/7", label: "Uptime", icon: Zap },
                  { value: "0", label: "False Positives", icon: Target },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
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
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 p-0.5">
                <div className="relative flex items-center justify-center gap-3 rounded-[11px] bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all group-hover:bg-slate-50">
                  <span>Start Free Analysis</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right - AI Detection Animation */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Animation Container with Border */}
              <div className="relative rounded-3xl border-8 border-white shadow-2xl shadow-teal-100/50 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50" />
                
                {/* Animation */}
                <div className="relative p-8">
                  <DotLottieReact
                    src="https://lottie.host/432513b0-8f0d-427d-b812-fb5ced4929b6/HFa0etEFRW.lottie"
                    loop
                    autoplay
                    className="w-[600px] -ml-14 h-[400px]"
                  />
                </div>
                
                
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 border-4 border-white shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 border-4 border-white shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}