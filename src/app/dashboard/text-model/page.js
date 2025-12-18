"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

import {
  MessageSquare,
  FileText,
  Download,
  RotateCcw,
  Zap,
  CheckCircle,
  Sparkles,
  User,
  Cpu,
  AlertCircle,
  BarChart3,
  Clock,
  Loader2,
} from "lucide-react";

import { Client } from "@gradio/client";

export default function TextModel() {
  // 🔹 HOOKS MUST BE AT THE TOP
  const { user, loading } = useAuth();

  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analyzedText, setAnalyzedText] = useState("");
  const [history, setHistory] = useState([]);

  // 🔒 AUTH REDIRECT
  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);

  // 🔹 AUTH LOADING STATE
  if (loading || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p className="text-slate-600 font-medium">Verifying authentication...</p>
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);
    setAnalyzedText(inputText);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    try {
      const client = await Client.connect("MohitAI24/ai-text-detector");

      const result = await client.predict("/classify_text", {
        text: inputText,
      });

      clearInterval(interval);
      setAnalysisProgress(100);
      
      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsAnalyzing(false);

      const output = result.data[0];
      const aiConfidence = Math.round(output.confidence * 100);
      const authenticity = 100 - aiConfidence;

      const newResult = {
        prediction: output.label === "AI" ? "AI Generated" : "Human Written",
        confidence: aiConfidence,
        authenticity: authenticity,
        aiGenerated: aiConfidence,
        timestamp: new Date().toLocaleTimeString(),
        wordCount: inputText.split(" ").filter(word => word.length > 0).length
      };

      setAnalysisResults(newResult);
      setHistory(prev => [newResult, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error(error);
      clearInterval(interval);
      setIsAnalyzing(false);
      
      // Show error toast style
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50';
      errorDiv.textContent = '❌ Failed to analyze text. Please try again.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }
  };

  const handleReset = () => {
    setInputText("");
    setAnalysisResults(null);
    setAnalyzedText("");
  };

  const handleExport = () => {
    if (!analysisResults) return;
    
    const report = `
Text Analysis Report
────────────────────
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Prediction: ${analysisResults.prediction}
AI Confidence: ${analysisResults.confidence}%
Human Authenticity: ${analysisResults.authenticity}%
Word Count: ${analyzedText.split(" ").filter(word => word.length > 0).length}
Character Count: ${analyzedText.length}

─── Analysis Summary ───
${analysisResults.prediction === "AI Generated" 
  ? "This text shows characteristics of AI-generated content."
  : "This text appears to be human-written with natural language patterns."
}

─── Analyzed Text ───
"${analyzedText.substring(0, 200)}${analyzedText.length > 200 ? '...' : ''}"
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl p-6 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-2 bg-teal-600 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-emerald-800 font-semibold">AI Text Detector</span>
              <p className="text-sm text-slate-600">Advanced NLP Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Text <span className="bg-gradient-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">Authenticity</span> Analyzer
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Detect AI-generated content with advanced natural language processing. 
                Analyze text patterns, writing style, and authenticity metrics.
              </p>
            </div>
            {/* <div className="hidden lg:block p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Accuracy</p>
                  <p className="text-xl font-bold text-slate-900">94.7%</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/80 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Text Input</h2>
                      <p className="text-sm text-slate-500">Enter or paste your text for analysis</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <textarea
                    placeholder="Paste your text here for analysis. The model will examine writing patterns, style consistency, and language characteristics to determine authenticity..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full min-h-[280px] p-4 bg-white/90 border-2 border-slate-300/60 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 resize-none transition-all duration-300 text-base leading-relaxed"
                    rows={8}
                  />

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 bg-white/50 rounded-xl p-4 border border-slate-200/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Characters: <strong className="text-slate-900">{inputText.length}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Words: <strong className="text-slate-900">
                        {inputText.split(" ").filter((word) => word.length > 0).length}
                      </strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Sentences: <strong className="text-slate-900">
                        {inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length}
                      </strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputText.trim()}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isAnalyzing || !inputText.trim()
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 hover:scale-105 transition shadow-lg shadow-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/40 transform hover:-translate-y-0.5'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Text...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Start AI Analysis
                    </>
                  )}
                </button>

                {isAnalyzing && (
                  <div className="space-y-3 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Processing Analysis</p>
                          <p className="text-sm text-slate-500">Analyzing text patterns and linguistic features</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-800 to-teal-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Tokenizing</span>
                      <span>Feature Extraction</span>
                      <span>Pattern Analysis</span>
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
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Recent Analysis</h2>
                      <p className="text-sm text-slate-500">Previous text analysis results</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {history.slice(0, 2).map((item, index) => (
                      <div key={index} className="bg-white border border-slate-200/60 rounded-xl p-4 hover:border-slate-300 transition-colors duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            item.prediction === "AI Generated" 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.prediction}
                          </span>
                          <span className="text-xs text-slate-500">{item.timestamp}</span>
                        </div>
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
                    <p className="text-sm text-slate-500">Detailed authenticity metrics</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {!analysisResults ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-slate-100 rounded-2xl mb-6">
                      <FileText className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No Analysis Yet</h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                      Enter text and run analysis to see detailed authenticity metrics and AI detection results.
                    </p>
                    <div className="space-y-3 text-sm text-slate-600 bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Detect AI-generated content patterns</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Analyze writing style consistency</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Generate authenticity score</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Main Prediction */}
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-3 bg-white border border-slate-200/60 rounded-full px-6 py-3">
                        <div className={`p-2 rounded-full ${analysisResults.prediction === "AI Generated" ? 'bg-red-100' : 'bg-emerald-100'}`}>
                          {analysisResults.prediction === "AI Generated" ? 
                            <Cpu className="w-5 h-5 text-red-600" /> : 
                            <User className="w-5 h-5 text-emerald-600" />
                          }
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Prediction</p>
                          <p className={`text-2xl font-bold ${analysisResults.prediction === "AI Generated" ? 'text-red-600' : 'text-emerald-600'}`}>
                            {analysisResults.prediction}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-600 bg-white/60 rounded-xl p-4 border border-slate-200/50">
                        {analysisResults.prediction === "AI Generated" 
                          ? "The text shows patterns commonly associated with AI-generated content, including consistent structure and predictable phrasing."
                          : "The text exhibits natural variations and stylistic elements characteristic of human writing."
                        }
                      </div>
                    </div>

                    {/* Confidence Meters */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-teal-600" />
                            <span className="font-medium text-slate-900">Confidence Score</span>
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

                      {/* <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium text-slate-900">Human Authenticity</span>
                          </div>
                          <span className="text-xl font-bold text-slate-900">{analysisResults.authenticity}%</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${analysisResults.authenticity}%` }}
                          ></div>
                        </div>
                      </div> */}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                        <p className="text-sm text-slate-500 mb-1">Word Count</p>
                        <p className="text-2xl font-bold text-slate-900">{analyzedText.split(" ").filter(word => word.length > 0).length}</p>
                      </div>
                      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                        <p className="text-sm text-slate-500 mb-1">Character Count</p>
                        <p className="text-2xl font-bold text-slate-900">{analyzedText.length}</p>
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
                        onClick={handleAnalyze}
                        className="flex-1 py-3 px-4 border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
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
                  <span>For best results, use text with at least 50 words</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>AI-generated text often shows consistent structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Human writing typically has more stylistic variation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Longer texts provide more accurate analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 text-center">
          <p className="text-slate-500 text-sm">
            Powered by advanced NLP models • Analysis accuracy may vary based on text length and complexity
          </p>
        </div>
      </div>
    </div>
  );
}














// "use client";

// import { useState, useEffect } from "react";
// import { redirect } from "next/navigation";
// import { useAuth } from "@/components/auth/AuthProvider";



// import {
//   MessageSquare,
//   FileText,
//   Download,
//   RotateCcw,
//   Zap,
//   CheckCircle,
//   Sparkles,
// } from "lucide-react";

// import { Client } from "@gradio/client";

// export default function TextModel() {
//   // 🔹 HOOKS MUST BE AT THE TOP
//   const { user, loading } = useAuth();

//   const [inputText, setInputText] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisProgress, setAnalysisProgress] = useState(0);
//   const [analysisResults, setAnalysisResults] = useState(null);

//   useEffect(() => {
//     if (!loading && !user) {
//       setShowLogin(true);
//     }
//   }, [loading, user]);

//   // 🔹 AUTH LOADING STATE
//   if (loading || !user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-slate-500 text-xl">
//         Checking authentication...
//       </div>
//     );
//   }

//   const handleAnalyze = async () => {
//     if (!inputText.trim()) return;

//     setIsAnalyzing(true);
//     setAnalysisProgress(0);
//     setAnalysisResults(null);

//     const interval = setInterval(() => {
//       setAnalysisProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + Math.random() * 10;
//       });
//     }, 180);

//     try {
//       const client = await Client.connect("MohitAI24/ai-text-detector");

//       const result = await client.predict("/classify_text", {
//         text: inputText,
//       });

//       clearInterval(interval);
//       setIsAnalyzing(false);
//       setAnalysisProgress(100);

//       const output = result.data[0];
//       const aiConfidence = Math.round(output.confidence * 100);
//       const authenticity = 100 - aiConfidence;

//       setAnalysisResults({
//         prediction: output.label === "AI" ? "AI Generated" : "Human Written",
//         confidence: aiConfidence,
//         authenticity: authenticity,
//         aiGenerated: aiConfidence,
//       });
//     } catch (error) {
//       console.error(error);
//       clearInterval(interval);
//       setIsAnalyzing(false);
//       alert("❌ Failed to analyze text.");
//     }
//   };

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
//           <div className="border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//             <div className="border-b border-slate-200/60 bg-white/40">
//               <div className="text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <MessageSquare className="w-5 h-5 text-green-700" />
//                 Text Input
//               </div>
//             </div>
//             <div className="p-6 space-y-6">
//               <div className="space-y-4">
//                 <textarea
//                   placeholder="Paste your text here for analysis..."
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   className="min-h-[200px] bg-white/70 focus:border-green-600 text-slate-900 placeholder:text-slate-500 resize-none backdrop-blur-sm 
//              focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
//                 />

//                 <div className="flex justify-between text-sm text-slate-600 bg-white/50 rounded-lg p-2 border border-slate-200/50">
//                   <span>Characters: {inputText.length}</span>
//                   <span>
//                     Words:{" "}
//                     {
//                       inputText.split(" ").filter((word) => word.length > 0)
//                         .length
//                     }
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing || !inputText.trim()}
//                 className="w-full bg-green-700 hover:from-green-700 text-white shadow-lg shadow-green-500/25 hover:bg-green-800 transition-all duration-300"
//               >
//                 <Zap className="w-4 h-4 mr-2" />
//                 {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//               </button>

//               {isAnalyzing && (
//                 <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
//                   <div className="flex justify-between text-sm text-slate-600">
//                     <span>Processing text...</span>
//                     <span>{Math.round(analysisProgress)}%</span>
//                   </div>
//                   <progress
//                     value={analysisProgress}
//                     className="bg-slate-200/50"
//                   />
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
//                   <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500">
//                     Enter text and analyze to see results
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-900 font-medium">
//                         Model Prediction
//                       </span>
//                       <div
//                         className={`text-base px-4 py-1.5 rounded-xl font-semibold border backdrop-blur-sm ${
//                           analysisResults.prediction === "AI Generated"
//                             ? "bg-red-100/70 text-red-800 border-red-200/50"
//                             : "bg-green-100/70 text-green-800 border-green-200/50"
//                         }`}
//                       >
//                         {analysisResults.prediction}
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

