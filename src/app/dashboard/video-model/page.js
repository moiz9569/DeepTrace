"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/LoginModal";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  Download,
  CheckCircle,
  Video,
  Sparkles,
} from "lucide-react";

export default function VideoModel() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);


  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);


  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setAnalysisResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 10;
      });
    }, 200);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://mohitai24-image-detector-model.hf.space/predict_video",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(100);

      const aiConfidence = Math.round((result?.average_AI_Probability || 0) * 100);
      const humanConfidence = Math.round(
        (result?.average_Human_Probability || 0) * 100
      );
      const verdict = result?.predicted_label || "Unknown";

      setAnalysisResults({
        confidence: aiConfidence,
        authenticity: humanConfidence,
        verdict,
      });
    } catch (error) {
      clearInterval(interval);
      setIsAnalyzing(false);
      console.error("Video analysis error:", error);
      alert("❌ Failed to analyze video. Try again later.");
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  {
    showLogin && !user && (
      <LoginModal onClose={() => setShowLogin(false)} />
    )
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/20">
      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 text-teal-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Video Analysis</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Video Analysis
          </h1>
          <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
            Upload a video to analyze its authenticity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="border-b border-slate-200/60 bg-white/40">
              <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <Video className="w-5 h-5 text-teal-600" />
                Video Upload
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div
                className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
                <p className="text-slate-500 text-sm">MP4, AVI, MOV up to 500MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-900 font-medium">{selectedFile.name}</span>
                      <div className="bg-teal-100/70 text-teal-800 border-teal-200/50 backdrop-blur-sm">
                        {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                    <video
                      ref={videoRef}
                      src={URL.createObjectURL(selectedFile)}
                      className="w-full rounded-lg border border-slate-200/50 bg-slate-100/50"
                      controls={false}
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        size="sm"
                        variant="outline"
                        onClick={togglePlayPause}
                        className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300"
                  >
                    {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                  </button>

                  {isAnalyzing && (
                    <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Processing video...</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <div value={analysisProgress} className="bg-slate-200/50" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="border-b border-slate-200/60 bg-white/40">
              <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Analysis Results
              </div>
            </div>
            <div className="p-6">
              {!analysisResults ? (
                <div className="text-center py-12 bg-white/30 rounded-xl border border-slate-200/50">
                  <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Upload and analyze a video to see results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-900 font-medium">Model Verdict</span>
                      <div
                        className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${analysisResults.verdict === "AI Generated"
                          ? "bg-red-100/70 text-red-800 border-red-200/50"
                          : "bg-green-100/70 text-green-800 border-green-200/50"
                          }`}
                      >
                        {analysisResults.verdict}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      variant="outline"
                      className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </button>
                    <button
                      variant="outline"
                      className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
                      onClick={handleAnalyze}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Re-analyze
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}















// "use client"

// import { useState, useRef } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   Upload,
//   Play,
//   Pause,
//   RotateCcw,
//   Download,
//   CheckCircle,
//   Video,
//   Sparkles,
// } from "lucide-react"

// export default function VideoModel() {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const fileInputRef = useRef(null)
//   const videoRef = useRef(null)

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0]
//     if (file && file.type.startsWith("video/")) {
//       setSelectedFile(file)
//       setAnalysisResults(null)
//     }
//   }

//   const handleAnalyze = async () => {
//     if (!selectedFile) return

//     setIsAnalyzing(true)
//     setAnalysisProgress(0)
//     setAnalysisResults(null)

//     const interval = setInterval(() => {
//       setAnalysisProgress((prev) => {
//         if (prev >= 95) return 95
//         return prev + Math.random() * 10
//       })
//     }, 200)

//     const formData = new FormData()
//     formData.append("file", selectedFile)

//     try {
//       const response = await fetch("https://mohitai24-image-detector-model.hf.space/predict_video", {
//         method: "POST",
//         body: formData,
//       })

//       const result = await response.json()
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       setAnalysisProgress(100)

//       const aiConfidence = Math.round((result?.average_AI_Probability || 0) * 100)
//       const humanConfidence = Math.round((result?.average_Human_Probability || 0) * 100)
//       const verdict = result?.predicted_label || "Unknown"

//       setAnalysisResults({
//         confidence: aiConfidence,
//         authenticity: humanConfidence,
//         verdict,
//       })
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       console.error("Video analysis error:", error)
//       alert("❌ Failed to analyze video. Try again later.")
//     }
//   }

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       isPlaying ? videoRef.current.pause() : videoRef.current.play()
//       setIsPlaying(!isPlaying)
//     }
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
//           <Card className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <CardHeader className="border-b border-slate-200/60 bg-white/40">
//               <CardTitle className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <Video className="w-5 h-5 text-teal-600" />
//                 Video Upload
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div
//                 className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm group"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
//                 <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
//                 <p className="text-slate-500 text-sm">MP4, AVI, MOV up to 500MB</p>
//                 <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
//               </div>

//               {selectedFile && (
//                 <div className="space-y-4">
//                   <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-slate-900 font-medium">{selectedFile.name}</span>
//                       <Badge className="bg-teal-100/70 text-teal-800 border-teal-200/50 backdrop-blur-sm">
//                         {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
//                       </Badge>
//                     </div>
//                     <video
//                       ref={videoRef}
//                       src={URL.createObjectURL(selectedFile)}
//                       className="w-full rounded-lg border border-slate-200/50 bg-slate-100/50"
//                       controls={false}
//                     />
//                     <div className="flex items-center gap-2 mt-3">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={togglePlayPause}
//                         className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
//                       >
//                         {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing}
//                     className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300"
//                   >
//                     {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                   </Button>

//                   {isAnalyzing && (
//                     <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                       <div className="flex justify-between text-sm text-slate-600">
//                         <span>Processing video...</span>
//                         <span>{Math.round(analysisProgress)}%</span>
//                       </div>
//                       <Progress value={analysisProgress} className="bg-slate-200/50" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Results Section */}
//           <Card className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <CardHeader className="border-b border-slate-200/60 bg-white/40">
//               <CardTitle className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 Analysis Results
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
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
//                       <Badge
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${
//                           analysisResults.verdict === "AI Generated"
//                             ? "bg-red-100/70 text-red-800 border-red-200/50"
//                             : "bg-green-100/70 text-green-800 border-green-200/50"
//                         }`}
//                       >
//                         {analysisResults.verdict}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4">
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300" onClick={handleAnalyze}>
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Re-analyze
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
































// "use client"

// import { useState, useRef } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   Upload,
//   Play,
//   Pause,
//   RotateCcw,
//   Download,
//   CheckCircle,
//   Video,
// } from "lucide-react"

// export default function VideoModel() {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const fileInputRef = useRef(null)
//   const videoRef = useRef(null)

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0]
//     if (file && file.type.startsWith("video/")) {
//       setSelectedFile(file)
//       setAnalysisResults(null)
//     }
//   }

//   const handleAnalyze = async () => {
//     if (!selectedFile) return

//     setIsAnalyzing(true)
//     setAnalysisProgress(0)
//     setAnalysisResults(null)

//     const interval = setInterval(() => {
//       setAnalysisProgress((prev) => {
//         if (prev >= 95) return 95
//         return prev + Math.random() * 10
//       })
//     }, 200)

//     const formData = new FormData()
//     formData.append("file", selectedFile)

//     try {
//       const response = await fetch("https://mohitai24-image-detector-model.hf.space/predict_video", {
//         method: "POST",
//         body: formData,
//       })

//       const result = await response.json()
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       setAnalysisProgress(100)

//       const aiConfidence = Math.round((result?.average_AI_Probability || 0) * 100)
//       const humanConfidence = Math.round((result?.average_Human_Probability || 0) * 100)
//       const verdict = result?.predicted_label || "Unknown"

//       setAnalysisResults({
//         confidence: aiConfidence,
//         authenticity: humanConfidence,
//         verdict,
//       })
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       console.error("Video analysis error:", error)
//       alert("❌ Failed to analyze video. Try again later.")
//     }
//   }

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       isPlaying ? videoRef.current.pause() : videoRef.current.play()
//       setIsPlaying(!isPlaying)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Video Analysis</h1>
//           <p className="text-slate-600">Upload a video to analyze its authenticity</p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <Card className="border border-slate-200">
//             <CardHeader className="border-b border-slate-200">
//               <CardTitle className="text-slate-900 flex items-center gap-2">
//                 <Video className="w-5 h-5 text-teal-600" />
//                 Video Upload
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div
//                 className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/50 transition-colors cursor-pointer"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
//                 <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
//                 <p className="text-slate-500 text-sm">MP4, AVI, MOV up to 500MB</p>
//                 <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
//               </div>

//               {selectedFile && (
//                 <div className="space-y-4">
//                   <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-slate-900 font-medium">{selectedFile.name}</span>
//                       <Badge className="bg-teal-100 text-teal-800 border-teal-200">
//                         {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
//                       </Badge>
//                     </div>
//                     <video
//                       ref={videoRef}
//                       src={URL.createObjectURL(selectedFile)}
//                       className="w-full rounded-lg border border-slate-200"
//                       controls={false}
//                     />
//                     <div className="flex items-center gap-2 mt-3">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={togglePlayPause}
//                         className="border-slate-300 text-slate-700 hover:bg-slate-100"
//                       >
//                         {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing}
//                     className="w-full bg-teal-600 hover:bg-teal-700 text-white"
//                   >
//                     {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                   </Button>

//                   {isAnalyzing && (
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm text-slate-600">
//                         <span>Processing video...</span>
//                         <span>{Math.round(analysisProgress)}%</span>
//                       </div>
//                       <Progress value={analysisProgress} className="bg-slate-200" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Results Section */}
//           <Card className="border border-slate-200">
//             <CardHeader className="border-b border-slate-200">
//               <CardTitle className="text-slate-900 flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 Analysis Results
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               {!analysisResults ? (
//                 <div className="text-center py-12">
//                   <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Upload and analyze a video to see results</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {/* Verdict */}
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Verdict</span>
//                       <Badge
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border ${
//                           analysisResults.verdict === "AI Generated"
//                             ? "bg-red-100 text-red-800 border-red-200"
//                             : "bg-green-100 text-green-800 border-green-200"
//                         }`}
//                       >
//                         {analysisResults.verdict}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Confidence */}
//                   {/* <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">AI Confidence</span>
//                       <Badge className="bg-orange-100 text-orange-800 border-orange-200">
//                         {analysisResults.confidence}%
//                       </Badge>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Human Confidence</span>
//                       <Badge className="bg-blue-100 text-blue-800 border-blue-200">
//                         {analysisResults.authenticity}%
//                       </Badge>
//                     </div>
//                     <Progress value={analysisResults.confidence} className="bg-slate-200" />
//                   </div> */}

//                   {/* Buttons */}
//                   <div className="flex gap-3 pt-4">
//                     <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                     <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={handleAnalyze}>
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Re-analyze
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }







// "use client"

// import { useState, useRef } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   Upload,
//   Play,
//   Pause,
//   RotateCcw,
//   Download,
//   CheckCircle,
//   Video,
// } from "lucide-react"

// export default function VideoModel() {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const fileInputRef = useRef(null)
//   const videoRef = useRef(null)

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0]
//     if (file && file.type.startsWith("video/")) {
//       setSelectedFile(file)
//       setAnalysisResults(null)
//     }
//   }

//   const handleAnalyze = () => {
//     if (!selectedFile) return

//     setIsAnalyzing(true)
//     setAnalysisProgress(0)

//     const interval = setInterval(() => {
//       setAnalysisProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsAnalyzing(false)

//           const confidence = 86 // example: AI detected 86% confidence
//           const authenticity = 100 - confidence
//           const verdict = confidence > 70 ? "AI Generated" : "Human Generated"

//           setAnalysisResults({
//             confidence,
//             authenticity,
//             verdict,
//           })

//           return 100
//         }
//         return prev + Math.random() * 15
//       })
//     }, 200)
//   }

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       isPlaying ? videoRef.current.pause() : videoRef.current.play()
//       setIsPlaying(!isPlaying)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Video Analysis</h1>
//           <p className="text-slate-600">Upload a video to analyze its authenticity</p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <Card className="border border-slate-200">
//             <CardHeader className="border-b border-slate-200">
//               <CardTitle className="text-slate-900 flex items-center gap-2">
//                 <Video className="w-5 h-5 text-teal-600" />
//                 Video Upload
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div
//                 className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/50 transition-colors cursor-pointer"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
//                 <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
//                 <p className="text-slate-500 text-sm">MP4, AVI, MOV up to 500MB</p>
//                 <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
//               </div>

//               {selectedFile && (
//                 <div className="space-y-4">
//                   <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-slate-900 font-medium">{selectedFile.name}</span>
//                       <Badge className="bg-teal-100 text-teal-800 border-teal-200">
//                         {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
//                       </Badge>
//                     </div>
//                     <video
//                       ref={videoRef}
//                       src={URL.createObjectURL(selectedFile)}
//                       className="w-full rounded-lg border border-slate-200"
//                       controls={false}
//                     />
//                     <div className="flex items-center gap-2 mt-3">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={togglePlayPause}
//                         className="border-slate-300 text-slate-700 hover:bg-slate-100"
//                       >
//                         {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing}
//                     className="w-full bg-teal-600 hover:bg-teal-700 text-white"
//                   >
//                     {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                   </Button>

//                   {isAnalyzing && (
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm text-slate-600">
//                         <span>Processing video...</span>
//                         <span>{Math.round(analysisProgress)}%</span>
//                       </div>
//                       <Progress value={analysisProgress} className="bg-slate-200" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Results Section */}
//           <Card className="border border-slate-200">
//             <CardHeader className="border-b border-slate-200">
//               <CardTitle className="text-slate-900 flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 Analysis Results
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               {!analysisResults ? (
//                 <div className="text-center py-12">
//                   <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Upload and analyze a video to see results</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                                     {/* Verdict */}
//                                     <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Verdict</span>
//                       <Badge
//                         className={
//                           analysisResults.verdict === "AI Generated"
//                             ? "bg-red-100 text-red-800 border-red-200"
//                             : "bg-green-100 text-green-800 border-green-200"
//                         }
//                       >
//                         {analysisResults.verdict}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Confidence */}
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Confidence</span>
//                       <Badge className="bg-orange-100 text-orange-800 border-orange-200">
//                         {analysisResults.confidence}%
//                       </Badge>
//                     </div>
//                     <Progress value={analysisResults.confidence} className="bg-slate-200" />
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex gap-3 pt-4">
//                     <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                     <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Re-analyze
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }