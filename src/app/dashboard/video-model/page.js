"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/LoginModal";

import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  Download,
  CheckCircle,
  Video as VideoIcon,
  Sparkles,
  Zap,
  AlertCircle,
  BarChart3,
  Film,
  Shield,
  Loader2,
  Calendar,
  Cpu,
  User,
  Clock,
  FileVideo,
  X,
  PlayCircle,
  PauseCircle,
} from "lucide-react";

export default function VideoModel() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file (MP4, AVI, MOV, etc.)");
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        setError("Video size should be less than 500MB");
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      setSelectedFile(file);
      setAnalysisResults(null);
      setError(null);
      
      // Create video URL
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setIsPlaying(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        const event = { target: { files: [file] } };
        handleFileSelect(event);
      }
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a video first");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);
    setError(null);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://mohitai24-image-detector-model.hf.space/predict_video",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsAnalyzing(false);

      const aiConfidence = Math.round((result?.average_AI_Probability || 0) * 100);
      const humanConfidence = Math.round(
        (result?.average_Human_Probability || 0) * 100
      );
      const verdict = result?.predicted_label || "Unknown";
      
      const newResult = {
        verdict: verdict,
        confidence: aiConfidence,
        authenticity: humanConfidence,
        rawData: result,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB",
        fileType: selectedFile.type.split('/')[1].toUpperCase(),
        duration: formatTime(videoDuration),
      };

      setAnalysisResults(newResult);
      setHistory(prev => [newResult, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error("Video analysis error:", error);
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setError("Failed to analyze video. Please try again.");
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setIsPlaying(false);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    setError(null);
  };

  const handleExport = () => {
    if (!analysisResults) return;
    
    const report = `
🎬 AI Video Detection Report
═══════════════════════════
📅 Date: ${analysisResults.date}
⏰ Time: ${analysisResults.timestamp}
🎯 Verdict: ${analysisResults.verdict}
🤖 AI Probability: ${analysisResults.confidence}%
👤 Human Probability: ${analysisResults.authenticity}%
📁 File: ${analysisResults.fileName}
📊 Size: ${analysisResults.fileSize}
🎥 Type: ${analysisResults.fileType}
⏱️ Duration: ${analysisResults.duration}

─── Raw Analysis Data ───
• Average AI Probability: ${(analysisResults.rawData?.average_AI_Probability || 0) * 100}%
• Average Human Probability: ${(analysisResults.rawData?.average_Human_Probability || 0) * 100}%
• Frame Count: ${analysisResults.rawData?.frame_count || 'N/A'}
• Processing Time: ${analysisResults.rawData?.processing_time || 'N/A'}s

─── Analysis Summary ───
${analysisResults.verdict === "AI Generated" 
  ? "• Video shows characteristics of AI-generated content\n• Frame-by-frame analysis detected AI patterns\n• High probability of artificial video generation"
  : "• Video exhibits characteristics of authentic footage\n• Natural motion and variations detected\n• High probability of human-created video"
}

─── Model Information ───
• Endpoint: https://mohitai24-image-detector-model.hf.space/predict_video
• Model: Video Forensics AI Detector
• Analysis: Frame-by-frame deep learning analysis
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-detection-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleReanalyze = () => {
    if (selectedFile) {
      handleAnalyze();
    }
  };

  const handleRemoveVideo = () => {
    handleReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      videoRef.current.currentTime = percentage * videoDuration;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
        <p className="text-slate-600 font-medium">Verifying authentication...</p>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 LOGIN MODAL */}
      {showLogin && !user && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        {/* Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 z-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl p-6 relative z-10">
          {/* Error Message */}
          {error && (
            <div className="mb-6 animate-fade-in">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-2 bg-teal-600 rounded-xl">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-emerald-800 font-semibold">AI Video Detector</span>
                <p className="text-sm text-slate-600">Advanced Video Forensics</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                  Video <span className="bg-gradient-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">Authenticity</span> Analyzer
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                  Detect AI-generated videos using advanced computer vision models. 
                  Analyze video frames, motion patterns, and authenticity metrics.
                </p>
              </div>
              <div className="hidden lg:block p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Supported</p>
                    <p className="text-xl font-bold text-slate-900">MP4, AVI, MOV</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg">
                        <Upload className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">Video Upload</h2>
                        <p className="text-sm text-slate-500">Upload or drop your video for analysis</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedFile && (
                        <button
                          onClick={handleRemoveVideo}
                          className="px-4 py-2 text-sm border border-red-300/80 bg-white text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    {!selectedFile ? (
                      <div
                        className="border-3 border-dashed border-slate-300/60 rounded-2xl p-12 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <div className="inline-flex p-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl mb-6">
                          <VideoIcon className="w-12 h-12 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          Drop your video here
                        </h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                          Supports MP4, AVI, MOV videos up to 500MB
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
                          Browse Files
                        </button>
                        <p className="text-sm text-slate-400 mt-4">
                          or drag and drop your video
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border-2 border-slate-200/60">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-teal-100 rounded-lg">
                                <FileVideo className="w-5 h-5 text-teal-700" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900">{selectedFile.name}</h3>
                                <p className="text-sm text-slate-500">
                                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.split('/')[1].toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video Player */}
                          <div className="relative rounded-xl overflow-hidden border border-slate-200/60 bg-black/5">
                            <video
                              ref={videoRef}
                              src={videoUrl}
                              className="w-full h-auto max-h-96 object-contain mx-auto"
                              onLoadedMetadata={handleVideoLoaded}
                              onTimeUpdate={handleTimeUpdate}
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                            />
                            
                            {/* Play/Pause Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={togglePlayPause}
                                className="p-4 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
                              >
                                {isPlaying ? (
                                  <PauseCircle className="w-16 h-16 text-white/90" />
                                ) : (
                                  <PlayCircle className="w-16 h-16 text-white/90" />
                                )}
                              </button>
                            </div>
                            
                            {/* Progress Bar */}
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/30 cursor-pointer"
                              onClick={handleSeek}
                            >
                              <div 
                                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                                style={{ width: `${(videoCurrentTime / videoDuration) * 100}%` }}
                              ></div>
                            </div>
                            
                            {/* Time Display */}
                            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs text-white/90">
                              <span>{formatTime(videoCurrentTime)}</span>
                              <span>{formatTime(videoDuration)}</span>
                            </div>
                          </div>
                          
                          {/* Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <button
                              onClick={togglePlayPause}
                              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 flex items-center gap-2"
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" />
                                  Play
                                </>
                              )}
                            </button>
                            
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>Duration: {formatTime(videoDuration)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 bg-white/50 rounded-xl p-4 border border-slate-200/50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>File: <strong className="text-slate-900">{selectedFile.name}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Size: <strong className="text-slate-900">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Duration: <strong className="text-slate-900">{formatTime(videoDuration)}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      disabled={isAnalyzing || !selectedFile}
                      className="px-6 py-3 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear All
                    </button>
                    
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedFile}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        isAnalyzing || !selectedFile
                          ? 'bg-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 hover:scale-105 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-0.5'
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing Video...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Start AI Analysis
                        </>
                      )}
                    </button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-3 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200/60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg">
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">Processing Video Analysis</p>
                            <p className="text-sm text-slate-500">Extracting frames and running inference</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-slate-900">{Math.round(analysisProgress)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 transition-all duration-300 ease-out rounded-full"
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Uploading</span>
                        <span>Frame Extraction</span>
                        <span>Model Inference</span>
                        <span>Results</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* History Section */}
              {history.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
                  <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">Analysis History</h2>
                        <p className="text-sm text-slate-500">Recent video analysis results</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {history.map((item, index) => (
                        <div 
                          key={index} 
                          className="bg-white border border-slate-200/60 rounded-xl p-4 hover:border-slate-300 transition-all duration-200 hover:shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                              item.verdict === "AI Generated" 
                                ? 'bg-red-100 text-red-700 border border-red-200' 
                                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            }`}>
                              {item.verdict}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              {item.timestamp}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-600">AI: {item.confidence}%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-600">Human: {item.authenticity}%</span>
                              </div>
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {item.fileName} • {item.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section - Takes 1 column */}
            <div className="space-y-8">
              {/* Results Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-600 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
                      <p className="text-sm text-slate-500">Detailed video authenticity metrics</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {!analysisResults ? (
                    <div className="text-center py-12">
                      <div className="inline-flex p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6">
                        <VideoIcon className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">No Analysis Yet</h3>
                      <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                        Upload a video and run analysis to see detailed authenticity metrics and AI detection results.
                      </p>
                      <div className="space-y-3 text-sm text-slate-600 bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                          <span>Frame-by-frame AI detection</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span>Motion pattern analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Authenticity confidence scores</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Main Verdict */}
                      <div className="text-center space-y-4">
                        <div className={`inline-flex items-center gap-4 bg-gradient-to-r ${
                          analysisResults.verdict === "AI Generated" 
                            ? 'from-red-50 to-orange-50 border-red-200' 
                            : 'from-emerald-50 to-teal-50 border-emerald-200'
                        } border rounded-2xl px-8 py-6`}>
                          <div className={`p-3 rounded-full ${
                            analysisResults.verdict === "AI Generated" 
                              ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                              : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                          }`}>
                            {analysisResults.verdict === "AI Generated" ? 
                              <Cpu className="w-6 h-6 text-white" /> : 
                              <User className="w-6 h-6 text-white" />
                            }
                          </div>
                          <div className="text-left">
                            <p className="text-sm text-slate-500 mb-1">Model Prediction</p>
                            <p className={`text-2xl font-bold ${
                              analysisResults.verdict === "AI Generated" ? 'text-red-600' : 'text-emerald-600'
                            }`}>
                              {analysisResults.verdict}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              Video: {analysisResults.fileName.split('.')[0].substring(0, 12)}...
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-600 bg-white/60 rounded-xl p-4 border border-slate-200/50">
                          {analysisResults.verdict === "AI Generated" 
                            ? "The video shows patterns consistent with AI-generated content across multiple frames and motion sequences."
                            : "The video exhibits characteristics of authentic footage with natural motion and variations."
                          }
                        </div>
                      </div>

                      {/* Confidence Meters */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-teal-600" />
                              <span className="font-medium text-slate-900">AI Probability</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">{analysisResults.confidence}%</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${analysisResults.confidence}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-emerald-600" />
                              <span className="font-medium text-slate-900">Human Probability</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">{analysisResults.authenticity}%</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${analysisResults.authenticity}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Video Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                          <div className="flex items-center gap-2 mb-1">
                            <FileVideo className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-500">Video Type</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900">{analysisResults.fileType}</p>
                        </div>
                        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-500">Duration</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900">{analysisResults.duration}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleExport}
                          className="flex-1 py-3 px-4 border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Export Report
                        </button>
                        <button
                          onClick={handleReanalyze}
                          disabled={isAnalyzing || !selectedFile}
                          className="flex-1 py-3 px-4 border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Re-analyze
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-900">Analysis Tips</h3>
                </div>
                <ul className="space-y-3 text-sm text-emerald-800/80">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>For best results, use videos with clear visuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>AI videos often have unnatural motion patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Authentic videos may have natural camera movements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Longer videos provide more accurate analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 text-center">
            <p className="text-slate-500 text-sm">
              Powered by advanced Computer Vision models • Frame-by-frame analysis for video authenticity
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Endpoint: <code className="bg-slate-100 px-2 py-1 rounded">mohitai24-image-detector-model.hf.space/predict_video</code>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}




















// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "@/components/auth/AuthProvider";
// import LoginModal from "@/components/LoginModal";

// import {
//   Upload,
//   Play,
//   Pause,
//   RotateCcw,
//   Download,
//   CheckCircle,
//   Video,
//   Sparkles,
// } from "lucide-react";

// export default function VideoModel() {
//   const { user, loading } = useAuth();
//   const [showLogin, setShowLogin] = useState(false);


//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisProgress, setAnalysisProgress] = useState(0);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (!loading && !user) {
//       setShowLogin(true);
//     }
//   }, [loading, user]);


//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("video/")) {
//       setSelectedFile(file);
//       setAnalysisResults(null);
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!selectedFile) return;

//     setIsAnalyzing(true);
//     setAnalysisProgress(0);
//     setAnalysisResults(null);

//     const interval = setInterval(() => {
//       setAnalysisProgress((prev) => {
//         if (prev >= 95) return 95;
//         return prev + Math.random() * 10;
//       });
//     }, 200);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch(
//         "https://mohitai24-image-detector-model.hf.space/predict_video",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       clearInterval(interval);
//       setIsAnalyzing(false);
//       setAnalysisProgress(100);

//       const aiConfidence = Math.round((result?.average_AI_Probability || 0) * 100);
//       const humanConfidence = Math.round(
//         (result?.average_Human_Probability || 0) * 100
//       );
//       const verdict = result?.predicted_label || "Unknown";

//       setAnalysisResults({
//         confidence: aiConfidence,
//         authenticity: humanConfidence,
//         verdict,
//       });
//     } catch (error) {
//       clearInterval(interval);
//       setIsAnalyzing(false);
//       console.error("Video analysis error:", error);
//       alert("❌ Failed to analyze video. Try again later.");
//     }
//   };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       isPlaying ? videoRef.current.pause() : videoRef.current.play();
//       setIsPlaying(!isPlaying);
//     }
//   };

//   {
//     showLogin && !user && (
//       <LoginModal onClose={() => setShowLogin(false)} />
//     )
//   }
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-600">
//         Loading...
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/20">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-4">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Video Analysis</span>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Video Analysis
//           </h1>
//           <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
//             Upload a video to analyze its authenticity
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <div className="border-b border-slate-200/60 bg-white/40">
//               <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <Video className="w-5 h-5 text-teal-600" />
//                 Video Upload
//               </div>
//             </div>
//             <div className="p-6 space-y-6">
//               <div
//                 className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm group"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
//                 <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
//                 <p className="text-slate-500 text-sm">MP4, AVI, MOV up to 500MB</p>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="video/*"
//                   onChange={handleFileSelect}
//                   className="hidden"
//                 />
//               </div>

//               {selectedFile && (
//                 <div className="space-y-4">
//                   <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-slate-900 font-medium">{selectedFile.name}</span>
//                       <div className="bg-teal-100/70 text-teal-800 border-teal-200/50 backdrop-blur-sm">
//                         {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
//                       </div>
//                     </div>
//                     <video
//                       ref={videoRef}
//                       src={URL.createObjectURL(selectedFile)}
//                       className="w-full rounded-lg border border-slate-200/50 bg-slate-100/50"
//                       controls={false}
//                     />
//                     <div className="flex items-center gap-2 mt-3">
//                       <button
//                         size="sm"
//                         variant="outline"
//                         onClick={togglePlayPause}
//                         className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
//                       >
//                         {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing}
//                     className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300"
//                   >
//                     {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                   </button>

//                   {isAnalyzing && (
//                     <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                       <div className="flex justify-between text-sm text-slate-600">
//                         <span>Processing video...</span>
//                         <span>{Math.round(analysisProgress)}%</span>
//                       </div>
//                       <div value={analysisProgress} className="bg-slate-200/50" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <div className="border-b border-slate-200/60 bg-white/40">
//               <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 Analysis Results
//               </div>
//             </div>
//             <div className="p-6">
//               {!analysisResults ? (
//                 <div className="text-center py-12 bg-white/30 rounded-xl border border-slate-200/50">
//                   <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Upload and analyze a video to see results</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Verdict</span>
//                       <div
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${analysisResults.verdict === "AI Generated"
//                           ? "bg-red-100/70 text-red-800 border-red-200/50"
//                           : "bg-green-100/70 text-green-800 border-green-200/50"
//                           }`}
//                       >
//                         {analysisResults.verdict}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4">
//                     <button
//                       variant="outline"
//                       className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </button>
//                     <button
//                       variant="outline"
//                       className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
//                       onClick={handleAnalyze}
//                     >
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Re-analyze
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


