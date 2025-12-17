"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Download,
  RotateCcw,
  Zap,
  CheckCircle,
  Sparkles,
} from "lucide-react";

import { Client } from "@gradio/client";

export default function TextModel() {
  // 🔹 HOOKS MUST BE AT THE TOP
  const { user, loading } = useAuth();

  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);

  // 🔒 AUTH REDIRECT
  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [loading, user]);

  // 🔹 AUTH LOADING STATE
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500 text-xl">
        Checking authentication...
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 180);

    try {
      const client = await Client.connect("MohitAI24/ai-text-detector");

      const result = await client.predict("/classify_text", {
        text: inputText,
      });

      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(100);

      const output = result.data[0];
      const aiConfidence = Math.round(output.confidence * 100);
      const authenticity = 100 - aiConfidence;

      setAnalysisResults({
        prediction: output.label === "AI" ? "AI Generated" : "Human Written",
        confidence: aiConfidence,
        authenticity: authenticity,
        aiGenerated: aiConfidence,
      });
    } catch (error) {
      console.error(error);
      clearInterval(interval);
      setIsAnalyzing(false);
      alert("❌ Failed to analyze text.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/20">
      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-green-200/50 rounded-full px-4 py-2 text-green-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Text Analysis</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Text Analysis
          </h1>
          <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
            Natural Language Processing for credibility detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="border-b border-slate-200/60 bg-white/40">
              <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <MessageSquare className="w-5 h-5 text-green-700" />
                Text Input
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <textarea
                  placeholder="Paste your text here for analysis..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] bg-white/70 focus:border-green-600 text-slate-900 placeholder:text-slate-500 resize-none backdrop-blur-sm 
             focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                />

                <div className="flex justify-between text-sm text-slate-600 bg-white/50 rounded-lg p-2 border border-slate-200/50">
                  <span>Characters: {inputText.length}</span>
                  <span>
                    Words:{" "}
                    {
                      inputText.split(" ").filter((word) => word.length > 0)
                        .length
                    }
                  </span>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full bg-green-700 hover:from-green-700 text-white shadow-lg shadow-green-500/25 hover:bg-green-800 transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
              </button>

              {isAnalyzing && (
                <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Processing text...</span>
                    <span>{Math.round(analysisProgress)}%</span>
                  </div>
                  <progress
                    value={analysisProgress}
                    className="bg-slate-200/50"
                  />
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
                  <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    Enter text and analyze to see results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-900 font-medium">
                        Model Prediction
                      </span>
                      <div
                        className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${
                          analysisResults.prediction === "AI Generated"
                            ? "bg-red-100/70 text-red-800 border-red-200/50"
                            : "bg-green-100/70 text-green-800 border-green-200/50"
                        }`}
                      >
                        {analysisResults.prediction}
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

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   MessageSquare,
//   FileText,
//   Download,
//   RotateCcw,
//   Zap,
//   CheckCircle,
//   Sparkles,
// } from "lucide-react"

// import { Client } from "@gradio/client"

// export default function TextModel() {
//   const [inputText, setInputText] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)

//   const handleAnalyze = async () => {
//     if (!inputText.trim()) return

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

//     try {
//       // Connect to your huggingface space
//       const client = await Client.connect("MohitAI24/ai-text-detector")

//       // Call the prediction API
//       const result = await client.predict("/classify_text", {
//         text: inputText,
//       })

//       clearInterval(interval)
//       setIsAnalyzing(false)
//       setAnalysisProgress(100)

//       // Format: [{ label: "...", confidence: 0.92 }]
//       const output = result.data[0]

//       const aiConfidence = Math.round(output.confidence * 100)
//       const authenticity = 100 - aiConfidence

//       setAnalysisResults({
//         prediction: output.label === "AI" ? "AI Generated" : "Human Written",
//         confidence: aiConfidence,
//         authenticity: authenticity,
//         aiGenerated: aiConfidence,
//       })
//     } catch (error) {
//       console.error(error)
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       alert("❌ Failed to analyze text.")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/20">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-green-200/50 rounded-full px-4 py-2 text-green-700 mb-4">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Text Analysis</span>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Text Analysis
//           </h1>
//           <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
//             Natural Language Processing for credibility detection
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Section */}
//           <Card className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <CardHeader className="border-b border-slate-200/60 bg-white/40">
//               <CardTitle className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <MessageSquare className="w-5 h-5 text-green-700" />
//                 Text Input
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div className="space-y-4">
//               <Textarea
//   placeholder="Paste your text here for analysis..."
//   value={inputText}
//   onChange={(e) => setInputText(e.target.value)}
//   className="min-h-[200px] bg-white/70 focus:border-green-600 text-slate-900 placeholder:text-slate-500 resize-none backdrop-blur-sm
//              focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
// />

//                 <div className="flex justify-between text-sm text-slate-600 bg-white/50 rounded-lg p-2 border border-slate-200/50">
//                   <span>Characters: {inputText.length}</span>
//                   <span>Words: {inputText.split(" ").filter((word) => word.length > 0).length}</span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing || !inputText.trim()}
//                 className="w-full bg-green-700 hover:from-green-700 text-white shadow-lg shadow-green-500/25 hover:bg-green-800 transition-all duration-300"
//               >
//                 <Zap className="w-4 h-4 mr-2" />
//                 {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//               </Button>

//               {isAnalyzing && (
//                 <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                   <div className="flex justify-between text-sm text-slate-600">
//                     <span>Processing text...</span>
//                     <span>{Math.round(analysisProgress)}%</span>
//                   </div>
//                   <Progress value={analysisProgress} className="bg-slate-200/50" />
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
//                   <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Enter text and analyze to see results</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Prediction</span>
//                       <Badge
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${
//                           analysisResults.prediction === "AI Generated"
//                             ? "bg-red-100/70 text-red-800 border-red-200/50"
//                             : "bg-green-100/70 text-green-800 border-green-200/50"
//                         }`}
//                       >
//                         {analysisResults.prediction}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4">
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300">
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

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   MessageSquare,
//   FileText,
//   Download,
//   RotateCcw,
//   Zap,
//   CheckCircle,
//   Sparkles,
// } from "lucide-react"

// export default function TextModel() {
//   const [inputText, setInputText] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [analysisResults, setAnalysisResults] = useState(null)

//   const handleAnalyze = async () => {
//     if (!inputText.trim()) return

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

//     try {
//       const response = await fetch("https://syedabdulmoizshah-text-model.hf.space/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: inputText }),
//       })

//       const result = await response.json()
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       setAnalysisProgress(100)

//       const aiConfidence = Math.round(result.confidence * 100)
//       const authenticity = 100 - aiConfidence

//       setAnalysisResults({
//         prediction: result.prediction,
//         confidence: aiConfidence,
//         authenticity: authenticity,
//         aiGenerated: aiConfidence,
//       })
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       alert("❌ Failed to analyze text.")
//     }
//   }

//   const sampleTexts = [
//     "Breaking: Revolutionary AI breakthrough promises to change everything we know about machine learning.",
//     "According to recent studies, climate change continues to be a significant global challenge.",
//     "The stock market experienced volatility today due to new economic data.",
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/20">
//       <div className="container mx-auto max-w-6xl p-6">
//         <div className="mb-8">
//           <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-full px-4 py-2 text-orange-700 mb-4">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Text Analysis</span>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//             Text Analysis
//           </h1>
//           <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/50 max-w-md">
//             Advanced natural language processing for credibility detection
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Section */}
//           <Card className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <CardHeader className="border-b border-slate-200/60 bg-white/40">
//               <CardTitle className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <MessageSquare className="w-5 h-5 text-orange-600" />
//                 Text Input
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               <div className="space-y-4">
//                 <Textarea
//                   placeholder="Paste your text here for analysis..."
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   className="min-h-[200px] bg-white/70 border-slate-300/80 text-slate-900 placeholder:text-slate-500 resize-none focus:border-orange-400 focus:ring-orange-400 backdrop-blur-sm"
//                 />
//                 <div className="flex justify-between text-sm text-slate-600 bg-white/50 rounded-lg p-2 border border-slate-200/50">
//                   <span>Characters: {inputText.length}</span>
//                   <span>Words: {inputText.split(" ").filter((word) => word.length > 0).length}</span>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h4 className="text-slate-900 font-medium text-sm bg-white/50 rounded-lg p-2 border border-slate-200/50">Sample Texts:</h4>
//                 {sampleTexts.map((sample, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="w-full text-left justify-start h-auto p-3 border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 text-sm transition-all duration-300 group"
//                     onClick={() => setInputText(sample)}
//                   >
//                     <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-slate-500 group-hover:scale-110 transition-transform duration-300" />
//                     <span className="truncate">{sample}</span>
//                   </Button>
//                 ))}
//               </div>

//               <Button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing || !inputText.trim()}
//                 className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
//               >
//                 <Zap className="w-4 h-4 mr-2" />
//                 {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//               </Button>

//               {isAnalyzing && (
//                 <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                   <div className="flex justify-between text-sm text-slate-600">
//                     <span>Processing text...</span>
//                     <span>{Math.round(analysisProgress)}%</span>
//                   </div>
//                   <Progress value={analysisProgress} className="bg-slate-200/50" />
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
//                   <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">Enter text and analyze to see results</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">Model Prediction</span>
//                       <Badge
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${
//                           analysisResults.prediction === "AI Generated"
//                             ? "bg-red-100/70 text-red-800 border-red-200/50"
//                             : "bg-green-100/70 text-green-800 border-green-200/50"
//                         }`}>
//                           {analysisResults.prediction}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4">
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Report
//                     </Button>
//                     <Button variant="outline" className="border-slate-300/80 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-300">
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