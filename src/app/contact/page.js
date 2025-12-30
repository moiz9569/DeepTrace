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
} from "lucide-react";
import Footer from "@/components/landingPage/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
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
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["contact@deeptrace.ai"],
      description: "We'll respond within 24 hours",
      color: "emerald",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri, 9am-6pm EST",
      color: "emerald",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Karachi, Pakistan", "Dubai, UAE"],
      description: "Global offices across 2 countries",
      color: "emerald",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["< 24 hours", "Priority: < 4 hours"],
      description: "Enterprise support available",
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50">
      <div className="container mx-auto max-w-6xl p-6 relative z-10">
        {/* Hero Section */}
        <div className="mt-18 text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get in{" "}
            <span className="bg-linear-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-sm">
            Have questions about our AI detection services? Our team is here to
            help. Reach out for demos, pricing, or technical support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-linear-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-slate-500">
                      We'll get back to you as soon as possible
                    </p>
                  </div>
                </div>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center">
                  <div className="inline-flex p-4 bg-linear-to-br from-emerald-100 to-teal-100 rounded-2xl mb-6">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Thank you for reaching out. Our team will respond to your
                    inquiry within 24 hours.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                    <Sparkles className="w-4 h-4" />
                    <span>We appreciate your interest in Truth Seeker AI</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
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
                        className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
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
                        className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
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
                        className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
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
                        className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                        placeholder="+1 (555) 123-4567"
                      />
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
                      className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
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
                      className="w-full px-4 py-3 bg-white/80 border border-slate-300/60 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-linear-to-r from-teal-800 via-teal-700 to-teal-800  hover:from-teal-700 hover:to-teal-700 shadow-md shadow-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/40"
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
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    By submitting this form, you agree to our Privacy Policy and
                    Terms of Service.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-linear-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Contact Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Multiple ways to reach us
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 bg-linear-to-br from-${info.color}-100 to-${info.color}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon
                            className={`w-6 h-6 text-${info.color}-600`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-900 font-semibold mb-1">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-slate-700">
                                {detail}
                              </p>
                            ))}
                          </div>
                          <p className="text-sm text-slate-500 mt-2">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
