// "use client";
// import { useState, useEffect } from "react";
// import { CheckCircle } from "lucide-react";

// export default function TrustIndicators() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="h-screen py-16">
//       <div className="bg-gray-500/5 rounded-2xl backdrop-blur-sm border-slate-200/40">
//         <div className="container p-12 mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-slate-900 bg-gray-100/5">
//               Trusted by Professionals
//             </h2>
//             <p className="text-slate-600 text-lg bg-white/40 rounded-xl p-3 border border-white/50 max-w-md mx-auto">
//               Industry-leading accuracy and reliability
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
//             {[
//               { value: "99.7%", label: "Accuracy Rate", color: "teal" },
//               { value: "<1s", label: "Processing Time", color: "green" },
//               { value: "1M+", label: "Files Analyzed", color: "green" },
//               { value: "24/7", label: "Availability", color: "slate" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-green-400/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-300 group"
//               >
//                 <div
//                   className={`text-4xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-105 transition-transform duration-300`}
//                 >
//                   {stat.value}
//                 </div>
//                 <div className="text-slate-600 font-medium flex items-center justify-center gap-1">
//                   <CheckCircle className="w-4 h-4" />
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Shield, Zap, Target, BarChart3, Clock, Users, Globe, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustIndicators() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = [
    { 
      value: "99.7%", 
      label: "Accuracy Rate", 
      icon: Target,
      color: "teal",
      gradient: "from-teal-50 to-emerald-50",
      description: "Industry-leading detection precision"
    },
    { 
      value: "<1s", 
      label: "Processing Time", 
      icon: Zap,
      color: "cyan",
      gradient: "from-cyan-50 to-blue-50",
      description: "Real-time analysis"
    },
    { 
      value: "1M+", 
      label: "Files Analyzed", 
      icon: BarChart3,
      color: "emerald",
      gradient: "from-emerald-50 to-green-50",
      description: "And growing daily"
    },
    { 
      value: "24/7", 
      label: "Uptime", 
      icon: Clock,
      color: "violet",
      gradient: "from-violet-50 to-purple-50",
      description: "Always available"
    },
  ];

  const features = [
    { icon: Shield, text: "Enterprise Security", color: "text-teal-600" },
    { icon: Users, text: "Global Coverage", color: "text-cyan-600" },
    { icon: Globe, text: "Multi-language", color: "text-emerald-600" },
    { icon: Award, text: "Certified", color: "text-violet-600" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #14b8a6 1px, transparent 1px),
                           linear-gradient(to bottom, #14b8a6 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        
        {/* Glow Effects */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
            <Shield className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">Trust & Reliability</span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Trusted by Professionals
            </span>
            <br />
            <span className="text-lg md:text-xl font-normal text-slate-600 mt-4 block">
              Industry-leading accuracy and reliability
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of security professionals, researchers, and enterprises 
            who rely on Deeptrace for accurate AI content detection.
          </motion.p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="relative group"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-br from-teal-400/10 via-cyan-400/10 to-emerald-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main Card */}
              <div className="relative h-full bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-teal-100/30 group-hover:border-teal-200">
                {/* Top Gradient Bar */}
                <div className={`h-1 bg-linear-to-r ${stat.gradient}`} />
                
                <div className="p-6 md:p-8 text-center">
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-white to-slate-50 border border-slate-100 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>

                  {/* Stat Value */}
                  <motion.div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 100 }}
                  >
                    <span className={`bg-linear-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </motion.div>

                  {/* Stat Label */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 mb-4">
                    {stat.description}
                  </p>

                  {/* Verification Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-medium text-slate-700">Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-teal-50 to-cyan-50 border border-teal-100 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Why professionals trust Deeptrace
              </h3>
              <p className="text-sm text-slate-600">
                Comprehensive features for enterprise-grade security
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-white"
                >
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Testimonials */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Industry Recognition</h3>
              <div className="space-y-4">
                {[
                  { name: "Security Weekly", quote: "Best AI detection accuracy in 2024" },
                  { name: "Tech Research", quote: "Enterprise-ready with military-grade security" },
                  { name: "AI Review Board", quote: "Top performer in independent testing" },
                ].map((testimonial, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-teal-500 mt-0.5" />
                      <div>
                        <p className="text-slate-700 mb-1">{testimonial.quote}</p>
                        <p className="text-sm text-slate-500">— {testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Trust Indicators */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Compliance & Standards</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "GDPR Compliant", value: "100%" },
                  { label: "SOC 2 Type II", value: "Certified" },
                  { label: "ISO 27001", value: "Certified" },
                  { label: "Zero Data Leaks", value: "100%" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{item.value}</div>
                    <div className="text-sm text-slate-600">{item.label}</div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="p-6 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800">
                <h4 className="text-xl font-bold text-white mb-2">Ready to get started?</h4>
                <p className="text-slate-300 mb-4">Join thousands of satisfied professionals</p>
                <button className="w-full py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-12 border-t border-slate-100"
        >
          <p className="text-center text-sm text-slate-500 mb-8">
            Trusted by organizations worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Logo Placeholders */}
            {[
              { name: "Security", color: "teal" },
              { name: "Research", color: "cyan" },
              { name: "Enterprise", color: "emerald" },
              { name: "Government", color: "violet" },
              { name: "Education", color: "blue" },
            ].map((org, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-${org.color}-50 border border-${org.color}-100 flex items-center justify-center mb-2`}>
                  <Shield className={`w-6 h-6 text-${org.color}-600`} />
                </div>
                <span className="text-sm font-medium text-slate-700">{org.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}