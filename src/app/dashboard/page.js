"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Video, 
  Eye, 
  MessageSquare, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  Sparkles, 
  TrendingUp,
  Shield,
  Cpu,
  Database,
  Zap,
  ArrowUpRight,
  PlayCircle,
  Image as ImageIcon,
  FileText,
  Users,
  Target,
  LineChart,
  ChevronRight
} from "lucide-react"

export default function Dashboard() {
  const [recentAnalyses] = useState([
    { 
      id: 1, 
      type: "video", 
      name: "interview_clip.mp4", 
      status: "completed", 
      confidence: 94, 
      timestamp: "2 hours ago",
      size: "45.2 MB",
      model: "Video Forensics"
    },
    {
      id: 2,
      type: "image",
      name: "document_scan.jpg",
      status: "processing",
      confidence: null,
      timestamp: "5 minutes ago",
      size: "8.7 MB",
      model: "Image Classifier"
    },
    { 
      id: 3, 
      type: "text", 
      name: "news_article.txt", 
      status: "completed", 
      confidence: 87, 
      timestamp: "1 day ago",
      size: "15.3 KB",
      model: "RoBERTa"
    },
    { 
      id: 4, 
      type: "video", 
      name: "security_footage.mp4", 
      status: "flagged", 
      confidence: 23, 
      timestamp: "3 hours ago",
      size: "128 MB",
      model: "Video Forensics"
    },
    { 
      id: 5, 
      type: "image", 
      name: "product_image.png", 
      status: "completed", 
      confidence: 96, 
      timestamp: "Yesterday",
      size: "4.2 MB",
      model: "Image Classifier"
    },
    { 
      id: 6, 
      type: "text", 
      name: "research_paper.txt", 
      status: "completed", 
      confidence: 91, 
      timestamp: "4 days ago",
      size: "82.1 KB",
      model: "RoBERTa"
    },
  ])

  const stats = {
    totalAnalyses: 127,
    imagesProcessed: 89,
    textsExamined: 234,
    avgAccuracy: 92.4,
    aiDetected: 67,
    humanVerified: 183,
    avgProcessingTime: "2.3 min",
    modelsUsed: 3
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
      case "flagged":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-slate-500" />
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-teal-600" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-emerald-600" />
      case "text":
        return <FileText className="w-5 h-5 text-amber-600" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700"
      case "processing":
        return "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-700"
      case "flagged":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const getConfidenceColor = (confidence) => {
    if (!confidence) return "bg-slate-100 text-slate-600"
    if (confidence >= 80) return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
    if (confidence >= 60) return "bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800"
    return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800"
  }

  const getModelIcon = (model) => {
    switch (model) {
      case "Video Forensics":
        return <Video className="w-4 h-4" />
      case "Image Classifier":
        return <Eye className="w-4 h-4" />
      case "RoBERTa":
        return <Cpu className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 z-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl p-6 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-2 bg-teal-600 rounded-xl">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-emerald-800 font-semibold">AI Detection Suite</span>
                  <p className="text-sm text-slate-600">Real-time Analytics Dashboard</p>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Analysis <span className="bg-gradient-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl">
                Monitor and manage all AI authenticity analyses in real-time. Track performance metrics, 
                review historical data, and access advanced detection tools.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4">
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Uptime</p>
                    <p className="text-xl font-bold text-slate-900">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Shield, value: stats.totalAnalyses, label: "Total Analyses", color: "teal", change: "+12%" },
              { icon: Target, value: `${stats.avgAccuracy}%`, label: "Avg Accuracy", color: "emerald", change: "+2.1%" },
              { icon: Users, value: stats.humanVerified, label: "Human Verified", color: "blue", change: "+8%" },
              { icon: Cpu, value: stats.modelsUsed, label: "Active Models", color: "purple", change: "Active" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-50 rounded-xl`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-white/60 rounded-lg border border-slate-200/50">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span className="text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-slate-900 group-hover:text-slate-950">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Quick Analysis</h2>
            </div>
            <p className="text-sm text-slate-500">Select a model to start analyzing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                href: "/video-model", 
                icon: Video, 
                title: "Video Analysis", 
                desc: "Frame-by-frame AI video detection", 
                color: "teal",
                stats: "94.2% accuracy",
                model: "Video Forensics"
              },
              { 
                href: "/picture-model", 
                icon: Eye, 
                title: "Image Analysis", 
                desc: "Advanced image authenticity detection", 
                color: "emerald",
                stats: "96.7% accuracy",
                model: "Image Classifier"
              },
              { 
                href: "/text-model", 
                icon: MessageSquare, 
                title: "Text Analysis", 
                desc: "AI vs human text classification", 
                color: "amber",
                stats: "92.4% accuracy",
                model: "RoBERTa"
              }
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl hover:shadow-2xl hover:border-teal-300/50 transition-all duration-500 group cursor-pointer overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 bg-gradient-to-br from-${item.color}-100 to-${item.color}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                      </div>
                      <div className="text-xs font-medium px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/50 text-slate-600">
                        {item.stats}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Database className="w-3 h-3" />
                        <span>{item.model}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-teal-600 group-hover:text-teal-700">
                        <span>Start Analysis</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Analyses */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Analyses Table */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Recent Analyses</h2>
                      <p className="text-sm text-slate-500">Latest AI detection results</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Showing {recentAnalyses.length} of 127 analyses
                  </div>
                </div>
              </div>
              
              <div className="p-0">
                <div className="divide-y divide-slate-200/60">
                  {recentAnalyses.map((analysis) => (
                    <div 
                      key={analysis.id} 
                      className="flex items-center justify-between p-6 hover:bg-white/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${getStatusColor(analysis.status)} group-hover:scale-110 transition-transform duration-300`}>
                          {getTypeIcon(analysis.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-slate-900 font-medium group-hover:text-slate-950 transition-colors duration-300">
                            {analysis.name}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {analysis.timestamp}
                            </span>
                            <span>•</span>
                            <span>{analysis.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {getModelIcon(analysis.model)}
                              {analysis.model}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {analysis.confidence && (
                          <div className={`text-sm px-4 py-2 rounded-lg font-semibold border backdrop-blur-sm ${getConfidenceColor(analysis.confidence)}`}>
                            {analysis.confidence}% confidence
                          </div>
                        )}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-sm ${getStatusColor(analysis.status)}`}>
                          {getStatusIcon(analysis.status)}
                          <span className="capitalize text-sm font-medium">{analysis.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All Button */}
                <div className="p-6 border-t border-slate-200/60 bg-white/40">
                  <Link href="/history">
                    <div className="w-full py-3 px-4 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                      <span>View Complete History</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <LineChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Performance Trends</h2>
                    <p className="text-sm text-slate-500">Analysis accuracy over time</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center py-16 text-center">
                  <div className="space-y-4">
                    <div className="inline-flex p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-2">
                      <TrendingUp className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700">Performance Analytics</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                      Detailed charts and metrics will appear here as you conduct more analyses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Insights */}
          <div className="space-y-8">
            {/* Overall Statistics */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Overall Statistics</h2>
                    <p className="text-sm text-slate-500">Complete analysis overview</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { label: "Total Videos Analyzed", value: "127", icon: Video, color: "teal" },
                    { label: "Images Processed", value: "89", icon: Eye, color: "emerald" },
                    { label: "Texts Examined", value: "234", icon: FileText, color: "amber" },
                    { label: "AI Content Detected", value: "67", icon: Cpu, color: "red" },
                    { label: "Human Content Verified", value: "183", icon: Users, color: "blue" },
                    { label: "Average Processing Time", value: "2.3 min", icon: Clock, color: "purple" },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50/50 rounded-xl transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                          <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                        </div>
                        <span className="text-sm text-slate-700">{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Model Status */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Cpu className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Model Status</h3>
                  <p className="text-sm text-slate-300">All systems operational</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Video Forensics</span>
                  </div>
                  <span className="text-xs text-green-300 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Image Classifier</span>
                  </div>
                  <span className="text-xs text-green-300 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">RoBERTa Text Detector</span>
                  </div>
                  <span className="text-xs text-green-300 font-medium">Online</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                  Last updated: Just now • All endpoints responding normally
                </p>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-900">Quick Insights</h3>
              </div>
              <ul className="space-y-3 text-sm text-emerald-800/80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Video analysis has highest accuracy rate (94.2%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Processing time decreased by 18% this week</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Text analysis requests increased by 34%</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>All models are operating at optimal capacity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 text-center">
          <p className="text-slate-500 text-sm">
            Real-time dashboard • Updates every 30 seconds • Powered by AI Detection Suite
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Last data refresh: Just now • System status: All services operational
          </p>
        </div>
      </div>
    </div>
  )
}






















// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Video, Eye, MessageSquare, Activity, Clock, CheckCircle, AlertTriangle, BarChart3, Sparkles, TrendingUp } from "lucide-react"

// export default function Dashboard() {
//   const [recentAnalyses] = useState([
//     { id: 1, type: "video", name: "interview_clip.mp4", status: "completed", confidence: 94, timestamp: "2 hours ago" },
//     {
//       id: 2,
//       type: "image",
//       name: "document_scan.jpg",
//       status: "processing",
//       confidence: null,
//       timestamp: "5 minutes ago",
//     },
//     { id: 3, type: "text", name: "news_article.txt", status: "completed", confidence: 87, timestamp: "1 day ago" },
//     { id: 4, type: "video", name: "security_footage.mp4", status: "flagged", confidence: 23, timestamp: "3 hours ago" },
//   ])

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4 text-green-600" />
//       case "processing":
//         return <Clock className="w-4 h-4 text-orange-500" />
//       case "flagged":
//         return <AlertTriangle className="w-4 h-4 text-red-500" />
//       default:
//         return <Activity className="w-4 h-4 text-slate-500" />
//     }
//   }

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "video":
//         return <Video className="w-4 h-4 text-teal-600" />
//       case "image":
//         return <Eye className="w-4 h-4 text-green-600" />
//       case "text":
//         return <MessageSquare className="w-4 h-4 text-orange-600" />
//       default:
//         return <Activity className="w-4 h-4" />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <div className="container mx-auto max-w-7xl p-6">
//         {/* Header */}
//         <div className="mb-8">
//           {/* <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-4">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Analysis Dashboard</span>
//           </div> */}
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Analysis Dashboard
//           </h1>
//           <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
//             Monitor and manage your AI model analyses
//           </p>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {[
//             { href: "/video-model", icon: Video, title: "Video Analysis", desc: "Upload and analyze video content", color: "teal" },
//             { href: "/picture-model", icon: Eye, title: "Image Analysis", desc: "Examine images for authenticity", color: "green" },
//             { href: "/text-model", icon: MessageSquare, title: "Text Analysis", desc: "Analyze text for credibility", color: "orange" }
//           ].map((item, index) => (
//             <Link key={index} href={item.href}>
//               <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-500 group cursor-pointer">
//                 <div className="p-6 text-center">
//                   <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${item.color}-100/50`}>
//                     <item.icon className={`w-8 h-8 text-${item.color}-600`} />
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
//                   <p className="text-slate-600 text-sm">{item.desc}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Recent Analyses */}
//         <div className="rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-8 hover:shadow-lg transition-all duration-500">
//           <div className="rounded-t-2xl border-b border-slate-200/60 bg-white/40">
//             <div className="py-5 text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-lg font-semibold">
//               <BarChart3 className="w-5 h-5" />
//               Recent Analyses
//             </div>
//           </div>
//           <div className="p-0">
//             <div className="divide-y divide-slate-200/60">
//               {recentAnalyses.map((analysis) => (
//                 <div key={analysis.id} className="flex items-center justify-between p-6 hover:bg-white/50 transition-all duration-300 group">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-white/60 rounded-lg group-hover:scale-110 transition-transform duration-300">
//                       {getTypeIcon(analysis.type)}
//                     </div>
//                     <div>
//                       <div className="text-slate-900 font-medium">{analysis.name}</div>
//                       <div className="text-slate-500 text-sm">{analysis.timestamp}</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     {analysis.confidence && (
//                       <div
//                         variant={analysis.confidence > 70 ? "default" : "destructive"}
//                         className={`text-sm px-3 py-1 rounded-lg font-medium border backdrop-blur-sm ${
//                           analysis.confidence > 70
//                             ? "bg-green-100/70 text-green-800 border-green-200/50"
//                             : "bg-red-100/70 text-red-800 border-red-200/50"
//                         }`}
//                       >
//                         {analysis.confidence}% confidence
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200/50">
//                       {getStatusIcon(analysis.status)}
//                       <span className="text-slate-700 capitalize text-sm font-medium">{analysis.status}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-4 gap-6">
//           {[
//             { value: "127", label: "Videos Analyzed", color: "teal" },
//             { value: "89", label: "Images Processed", color: "green" },
//             { value: "234", label: "Texts Examined", color: "orange" },
//             { value: "92%", label: "Avg Accuracy", color: "slate" }
//           ].map((stat, index) => (
//             <div key={index} className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-lg transition-all duration-500 group">
//               <div className="p-6 text-center">
//                 <div className={`text-3xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`}>
//                   {stat.value}
//                 </div>
//                 <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
