"use client"

import { useState } from "react"
import Link from "next/link"
import { Video, Eye, MessageSquare, Activity, Clock, CheckCircle, AlertTriangle, BarChart3, Sparkles, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const [recentAnalyses] = useState([
    { id: 1, type: "video", name: "interview_clip.mp4", status: "completed", confidence: 94, timestamp: "2 hours ago" },
    {
      id: 2,
      type: "image",
      name: "document_scan.jpg",
      status: "processing",
      confidence: null,
      timestamp: "5 minutes ago",
    },
    { id: 3, type: "text", name: "news_article.txt", status: "completed", confidence: 87, timestamp: "1 day ago" },
    { id: 4, type: "video", name: "security_footage.mp4", status: "flagged", confidence: 23, timestamp: "3 hours ago" },
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "flagged":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-slate-500" />
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-teal-600" />
      case "image":
        return <Eye className="w-4 h-4 text-green-600" />
      case "text":
        return <MessageSquare className="w-4 h-4 text-orange-600" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Analysis Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Analysis Dashboard
          </h1>
          <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
            Monitor and manage your AI model analyses
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { href: "/video-model", icon: Video, title: "Video Analysis", desc: "Upload and analyze video content", color: "teal" },
            { href: "/picture-model", icon: Eye, title: "Image Analysis", desc: "Examine images for authenticity", color: "green" },
            { href: "/text-model", icon: MessageSquare, title: "Text Analysis", desc: "Analyze text for credibility", color: "orange" }
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${item.color}-100/50`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Analyses */}
        <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm mb-8 hover:shadow-lg transition-all duration-500">
          <div className="border-b border-slate-200/60 bg-white/40">
            <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              <BarChart3 className="w-5 h-5" />
              Recent Analyses
            </div>
          </div>
          <div className="p-0">
            <div className="divide-y divide-slate-200/60">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-6 hover:bg-white/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/60 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {getTypeIcon(analysis.type)}
                    </div>
                    <div>
                      <div className="text-slate-900 font-medium">{analysis.name}</div>
                      <div className="text-slate-500 text-sm">{analysis.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {analysis.confidence && (
                      <div
                        variant={analysis.confidence > 70 ? "default" : "destructive"}
                        className={`text-sm px-3 py-1 rounded-lg font-medium border backdrop-blur-sm ${
                          analysis.confidence > 70
                            ? "bg-green-100/70 text-green-800 border-green-200/50"
                            : "bg-red-100/70 text-red-800 border-red-200/50"
                        }`}
                      >
                        {analysis.confidence}% confidence
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200/50">
                      {getStatusIcon(analysis.status)}
                      <span className="text-slate-700 capitalize text-sm font-medium">{analysis.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "127", label: "Videos Analyzed", color: "teal" },
            { value: "89", label: "Images Processed", color: "green" },
            { value: "234", label: "Texts Examined", color: "orange" },
            { value: "92%", label: "Avg Accuracy", color: "slate" }
          ].map((stat, index) => (
            <div key={index} className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-lg transition-all duration-500 group">
              <div className="p-6 text-center">
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
