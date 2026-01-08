"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle,
  Users,
  MessageSquare,
  Shield,
  Zap,
  Globe,
  Building2,
  ArrowRight,
  HeadphonesIcon as Support,
  FileText,
} from "lucide-react";
import Footer from "@/components/landingPage/footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: ["contact@deeptrace.ai", "support@deeptrace.ai"],
      description: "Response within 24 hours",
      color: "teal",
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50"
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri, 9am-6pm EST",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50"
    },
    {
      icon: MapPin,
      title: "Global Offices",
      details: ["Karachi, Pakistan", "Dubai, UAE", "San Francisco, USA"],
      description: "Serving clients worldwide",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["< 24 hours standard", "< 4 hours priority"],
      description: "Enterprise SLA available",
      color: "violet",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50"
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "technical", label: "Technical Support", icon: Shield },
    { value: "sales", label: "Sales & Pricing", icon: Building2 },
    { value: "enterprise", label: "Enterprise Solution", icon: Globe },
  ];

  const supportFeatures = [
    { icon: Zap, title: "24/7 Support", desc: "Round-the-clock assistance" },
    { icon: Shield, title: "SLA Guaranteed", desc: "99.9% uptime guarantee" },
    { icon: Support, title: "Live Chat", desc: "Instant chat support" },
    { icon: FileText, title: "Documentation", desc: "Comprehensive guides" },
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 ">
            
            <span className="text-sm font-medium text-teal-700"></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Let's Connect &
            </span>
            <br />
            <span className="bg-linear-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Build Something Great
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our AI detection services? Our team is ready to help with demos, 
            pricing, technical support, or custom solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
              
              <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                {/* Form Header */}
                <div className="border-b border-slate-100 bg-linear-to-r from-white to-slate-50/80 p-6 md:p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                      <Send className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Send us a Message
                      </h2>
                      <p className="text-slate-600 mt-1">
                        We'll respond promptly to your inquiry
                      </p>
                    </div>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 md:p-12 text-center"
                  >
                    <div className="inline-flex p-6 bg-linear-to-br from-teal-50 to-emerald-50 rounded-3xl border border-teal-100 mb-6">
                      <CheckCircle className="w-16 h-16 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-lg text-slate-600 mb-6 max-w-md mx-auto">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-emerald-700">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">We appreciate your interest in DeepTrace</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                          placeholder="Company Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Inquiry Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {inquiryTypes.map((type) => (
                          <label
                            key={type.value}
                            className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                              formData.inquiryType === type.value
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="inquiryType"
                              value={type.value}
                              checked={formData.inquiryType === type.value}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <type.icon className={`w-4 h-4 ${
                              formData.inquiryType === type.value ? 'text-teal-600' : 'text-slate-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.inquiryType === type.value ? 'text-teal-700' : 'text-slate-700'
                            }`}>
                              {type.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400 resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group cursor-pointer relative w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-linear-to-r from-teal-600 to-emerald-600 hover:shadow-lg hover:shadow-teal-200"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center mt-4">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-linear-to-br from-teal-500/10 to-emerald-500/10 rounded-3xl blur" />
              
              <div className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 overflow-hidden">
                <div className="border-b border-slate-100 bg-linear-to-r from-white to-slate-50/80 p-6 md:p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Contact Information
                      </h2>
                      <p className="text-slate-600 mt-1">
                        Multiple channels to reach our team
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="p-4 rounded-2xl bg-linear-to-br from-white to-slate-50 border border-slate-100 hover:border-teal-200 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${info.bgGradient} border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <info.icon className={`w-6 h-6 bg-linear-to-r ${info.gradient} bg-clip-text text-transparent`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                {info.title}
                              </h3>
                              <div className="space-y-1 mb-2">
                                {info.details.map((detail, idx) => (
                                  <p key={idx} className="text-slate-700 font-medium">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                              <p className="text-sm text-slate-500">
                                {info.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            

                  
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20"
        >
          <div className="absolute -inset-4 bg-linear-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
          
          <div className="relative bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700 overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of organizations using DeepTrace for accurate AI content detection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 cursor-pointer py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors">
                  Schedule Demo
                </button>
                <button className="px-8 cursor-pointer py-4 bg-linear-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}