"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/LoginModal";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  RotateCcw,
  Eye,
  Zap,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function PictureModel() {
  const { user, loading } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);

  const fileInputRef = useRef(null);

  // 🔥 Open login modal instead of redirect
  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
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
      setAnalysisProgress((prev) =>
        prev >= 100 ? 100 : prev + Math.random() * 10
      );
    }, 180);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://mohitai24-image-detector-model.hf.space/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(100);

      setAnalysisResults({
        aiGenerated: Math.round((result["AI Generated"] || 0) * 100),
        authenticity: Math.round((result["Human Generated"] || 0) * 100),
        verdict: result.predicted_label,
      });
    } catch (error) {
      clearInterval(interval);
      setIsAnalyzing(false);
      alert("❌ Failed to analyze image.");
    }
  };

  // ⛔ Block UI until auth resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
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
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-green-50/20">
        <div className="container mx-auto max-w-6xl p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border rounded-full px-4 py-2 text-green-700 mb-4">
              <Sparkles className="w-4 h-4" />
              Image Analysis
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Image Analysis
            </h1>
            <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 max-w-md">
              Advanced image forensics and authenticity detection
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload */}
            <div className="bg-white/40 backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Image Upload
                </div>
              </div>
              <div className="space-y-6">
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-green-400"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>Click to upload image</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {selectedFile && (
                  <>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="rounded-lg max-h-64 mx-auto"
                      alt="preview"
                    />

                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Zap className="mr-2 w-4 h-4" />
                      {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </button>

                    {isAnalyzing && (
                      <div value={analysisProgress} />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="bg-white/40 backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Results
                </div>
              </div>
              <div>
                {!analysisResults ? (
                  <p className="text-slate-500 text-center">
                    No analysis yet
                  </p>
                ) : (
                  <div className="text-lg px-4 py-2">
                    {analysisResults.verdict}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}









// "use client"

// import { useState, useRef } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Upload, Download, RotateCcw, Eye, Zap, CheckCircle, Sparkles } from "lucide-react"

// export default function PictureModel() {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)

//   const fileInputRef = useRef(null)

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0]
//     if (file && file.type.startsWith("image/")) {
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
//         if (prev >= 100) {
//           clearInterval(interval)
//           return 100
//         }
//         return prev + Math.random() * 10
//       })
//     }, 180)

//     const formData = new FormData()
//     formData.append("file", selectedFile)

//     try {
//       const response = await fetch("https://mohitai24-image-detector-model.hf.space/predict", {
//         method: "POST",
//         body: formData,
//       })

//       const result = await response.json()
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       setAnalysisProgress(100)

//       const aiConfidence = Math.round((result["AI Generated"] || 0) * 100)
//       const humanConfidence = Math.round((result["Human Generated"] || 0) * 100)
//       const verdict = result.predicted_label

//       setAnalysisResults({
//         aiGenerated: aiConfidence,
//         authenticity: humanConfidence,
//         verdict,
//       })
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       console.error("Image analysis error:", error)
//       alert("❌ Failed to analyze image. Try again later.")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-green-50/20">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-green-200/50 rounded-full px-4 py-2 text-green-700 mb-4">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Image Analysis</span>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Image Analysis
//           </h1>
//           <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
//             Advanced image forensics and authenticity detection
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <Card className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <CardHeader className="border-b border-slate-200/60 bg-white/40">
//               <CardTitle className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <Eye className="w-5 h-5 text-green-600" />
//                 Image Upload
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div
//                 className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50/30 transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm group"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
//                 <p className="text-slate-600 mb-2 font-medium">Click to upload or drag and drop</p>
//                 <p className="text-slate-500 text-sm">JPG, PNG, WEBP up to 50MB</p>
//                 <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
//               </div>

//               {selectedFile && (
//                 <div className="space-y-4">
//                   <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-slate-900 font-medium">{selectedFile.name}</span>
//                       <Badge className="bg-green-100/70 text-green-800 border-green-200/50 backdrop-blur-sm">
//                         {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
//                       </Badge>
//                     </div>
//                     <img
//                       src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
//                       alt="Selected image"
//                       className="w-full rounded-lg max-h-64 object-contain bg-slate-100/50 border border-slate-200/50"
//                     />
//                   </div>

//                   <Button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing}
//                     className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
//                   >
//                     <Zap className="w-4 h-4 mr-2" />
//                     {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                   </Button>

//                   {isAnalyzing && (
//                     <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                       <div className="flex justify-between text-sm text-slate-600">
//                         <span>Processing image...</span>
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
//                   <Eye className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Upload and analyze an image to see results</p>
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
//                     <Button
//                       variant="outline"
//                       className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300"
//                       onClick={handleAnalyze}
//                     >
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

