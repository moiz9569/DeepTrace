"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/AuthModals/LoginModal";
import {
  Upload,
  Download,
  RotateCcw,
  Eye,
  Zap,
  CheckCircle,
  Image as ImageIcon,
  X,
  AlertCircle,
  BarChart3,
  Camera,
  FileImage,
  Shield,
  Loader2,
  Calendar,
  Cpu,
  User,
  Clock,
} from "lucide-react";
import axios from "axios";

export default function PictureModel() {
  const { user, loading } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (JPEG, PNG, WebP, etc.)");
        setTimeout(() => setError(null), 3000);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("Image size should be less than 10MB");
        setTimeout(() => setError(null), 3000);
        return;
      }
      console.log("Selected file:", file);
      setSelectedFile(file);
      setAnalysisResults(null);
      setError(null);

      // Create preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
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
      if (file.type.startsWith("image/")) {
        const event = { target: { files: [file] } };
        handleFileSelect(event);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
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
        "https://mohitai24-image-detector-model.hf.space/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      console.log("image result", result);
      let base64Image = null;
      if (selectedFile) {
        const reader = new FileReader();
        base64Image = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
      }

      // console.log("data",user.id,selectedFile,result.predicted_label,Math.round((result["AI Generated"] || 0) * 100),Math.round((result["Human Generated"] || 0) * 100))
      const imageDetailResponse = await axios.post("/api/user/ImageDeatil", {
        userId: user.id,
        image: base64Image,
        label: result.predicted_label,
        AiGenerated: Math.round((result["AI Generated"] || 0) * 100),
        HumanGenerated: Math.round((result["Human Generated"] || 0) * 100),
      });
      console.log("imageDetailResponse", imageDetailResponse);
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      // Small delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsAnalyzing(false);

      const aiGenerated = Math.round((result["AI Generated"] || 0) * 100);
      const humanGenerated = Math.round((result["Human Generated"] || 0) * 100);

      const newResult = {
        verdict: result.predicted_label,
        aiGenerated: aiGenerated,
        humanGenerated: humanGenerated,
        rawScores: result,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB",
        fileType: selectedFile.type.split("/")[1].toUpperCase(),
      };

      setAnalysisResults(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Analysis error:", error);
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setError("Failed to analyze image. Please try again.");

      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setError(null);
  };

  const handleExport = () => {
    if (!analysisResults) return;

    const report = `
🖼️ AI Image Detection Report
═══════════════════════════
📅 Date: ${analysisResults.date}
⏰ Time: ${analysisResults.timestamp}
🎯 Verdict: ${analysisResults.verdict}
🤖 AI Generated: ${analysisResults.aiGenerated}%
👤 Human Generated: ${analysisResults.humanGenerated}%
📁 File: ${analysisResults.fileName}
📊 Size: ${analysisResults.fileSize}
🖼️ Type: ${analysisResults.fileType}

─── Raw Confidence Scores ───
${Object.entries(analysisResults.rawScores)
  .filter(([key]) => key !== "predicted_label")
  .map(([key, value]) => `• ${key}: ${(value * 100).toFixed(2)}%`)
  .join("\n")}

─── Analysis Summary ───
${
  analysisResults.verdict === "AI Generated"
    ? "• Image shows characteristics of AI-generated content\n• Patterns consistent with generative AI models\n• High probability of artificial origin"
    : "• Image exhibits characteristics of human photography\n• Natural patterns and inconsistencies detected\n• High probability of human creation"
}

─── Model Information ───
• Endpoint: https://mohitai24-image-detector-model.hf.space
• Model: Image Forensics AI Detector
• Analysis: Deep learning image classification
    `.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `image-detection-report-${Date.now()}.txt`;
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

  const handleRemoveImage = () => {
    handleReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ⛔ Block UI until auth resolved
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-slate-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
        <p className="text-slate-600 font-medium">
          Verifying authentication...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 LOGIN MODAL */}
      {showLogin && !user && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/30">
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
          <div className=" flex justify-between items-center">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-4xl font-bold text-slate-900 mb-3">
                  Image{" "}
                  <span className="bg-linear-to-r from-teal-700 to-teal-800 bg-clip-text text-transparent">
                    Authenticity
                  </span>{" "}
                  Analyzer
                </h1>
                <p className="text-base text-slate-600 max-w-2xl">
                  Detect AI-generated images using advanced computer vision
                  models. Analyze image patterns, artifacts, and authenticity
                  metrics.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-2 bg-teal-600 rounded-xl">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-emerald-800 font-semibold">
                  AI Image Detector
                </span>
                <p className="text-sm text-slate-600">
                  Advanced Image Forensics
                </p>
              </div>
            </div>
          </div>

          <div className="hidden w-80 lg:block p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-300 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Supported</p>
                <p className="text-xl font-bold text-slate-900">
                  JPG, PNG, WebP
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Upload Section - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                <div className="border-b border-slate-200/60 bg-linear-to-r from-white to-slate-50/80 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg">
                        <Upload className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          Image Upload
                        </h2>
                        <p className="text-sm text-slate-500">
                          Upload or drop your image for analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedFile && (
                        <button
                          onClick={handleRemoveImage}
                          className="px-4 py-2 cursor-pointer text-sm border border-red-300/80 bg-white text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
                        <div className="inline-flex p-4 bg-linear-to-br from-teal-100 to-emerald-100 rounded-2xl mb-6">
                          <ImageIcon className="w-12 h-12 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          Drop your image here
                        </h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                          Supports JPG, PNG, WebP images up to 10MB
                        </p>
                        <button className="px-6 cursor-pointer py-3 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
                          Browse Files
                        </button>
                        <p className="text-sm text-slate-400 mt-4">
                          or drag and drop your image
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative bg-linear-to-br from-slate-50 to-white rounded-2xl p-4 border-2 border-slate-200/60">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-teal-100 rounded-lg">
                                <FileImage className="w-5 h-5 text-teal-700" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900">
                                  {selectedFile.name}
                                </h3>
                                <p className="text-sm text-slate-500">
                                  {(selectedFile.size / (1024 * 1024)).toFixed(
                                    2
                                  )}{" "}
                                  MB •{" "}
                                  {selectedFile.type
                                    .split("/")[1]
                                    .toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-200/60 bg-white">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-auto max-h-96 object-contain mx-auto"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 bg-white/50 rounded-xl p-4 border border-slate-200/50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>
                              File:{" "}
                              <strong className="text-slate-900">
                                {selectedFile.name}
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>
                              Size:{" "}
                              <strong className="text-slate-900">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                                MB
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>
                              Type:{" "}
                              <strong className="text-slate-900">
                                {selectedFile.type.split("/")[1].toUpperCase()}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      disabled={isAnalyzing || !selectedFile}
                      className="px-6 py-3 cursor-pointer border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear All
                    </button>

                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedFile}
                      className={`flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        isAnalyzing || !selectedFile
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 hover:scale-105 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-0.5"
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing Image...
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
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              Processing Image Analysis
                            </p>
                            <p className="text-sm text-slate-500">
                              Extracting features and running inference
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-slate-900">
                          {Math.round(analysisProgress)}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-teal-800 to-teal-600 transition-all duration-300 ease-out rounded-full"
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Uploading</span>
                        <span>Feature Extraction</span>
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
                  <div className="border-b border-slate-200/60 bg-linear-to-r from-white to-slate-50/80 p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          Analysis History
                        </h2>
                        <p className="text-sm text-slate-500">
                          Recent image analysis results
                        </p>
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
                            <span
                              className={`text-sm font-medium px-3 py-1 rounded-full ${
                                item.verdict === "AI Generated"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              }`}
                            >
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
                                <span className="text-slate-600">
                                  AI: {item.aiGenerated}%
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-600">
                                  Human: {item.humanGenerated}%
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {item.fileName}
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
                <div className="border-b border-slate-200/60 bg-linear-to-r from-white to-slate-50/80 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-600 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        Analysis Results
                      </h2>
                      <p className="text-sm text-slate-500">
                        Detailed image authenticity metrics
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {!analysisResults ? (
                    <div className="py-12">
                      <div className="flex justify-center">
                        <div className="inline-flex p-4 bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl mb-6">
                          <Eye className="w-12 h-12 text-slate-400" />
                        </div>
                      </div>
                      <h3 className="text-lg text-center font-semibold text-slate-700 mb-2">
                        No Analysis Yet
                      </h3>
                      <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                        Upload an image and run analysis to see detailed
                        authenticity metrics and AI detection results.
                      </p>
                      <div className="space-y-3 text-sm text-slate-600 bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                          <span>Detect AI-generated image patterns</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span>Analyze image artifacts and patterns</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Generate authenticity confidence scores</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Main Verdict */}
                      <div className="text-center space-y-4">
                        <div
                          className={`inline-flex items-center gap-4 bg-linear-to-r ${
                            analysisResults.verdict === "AI Generated"
                              ? "from-red-50 to-orange-50 border-red-200"
                              : "from-emerald-50 to-teal-50 border-emerald-200"
                          } border rounded-2xl px-8 py-6`}
                        >
                          <div
                            className={`p-3 rounded-full ${
                              analysisResults.verdict === "AI Generated"
                                ? "bg-linear-to-br from-red-500 to-orange-500"
                                : "bg-linear-to-br from-emerald-500 to-teal-500"
                            }`}
                          >
                            {analysisResults.verdict === "AI Generated" ? (
                              <Cpu className="w-6 h-6 text-white" />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-sm text-slate-500 mb-1">
                              Model Prediction
                            </p>
                            <p
                              className={`text-2xl font-bold ${
                                analysisResults.verdict === "AI Generated"
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {analysisResults.verdict}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              Image:{" "}
                              {analysisResults.fileName
                                .split(".")[0]
                                .substring(0, 12)}
                              ...
                            </p>
                          </div>
                        </div>

                        <div className="text-sm text-slate-600 bg-white/60 rounded-xl p-4 border border-slate-200/50">
                          {analysisResults.verdict === "AI Generated"
                            ? "The image shows patterns consistent with AI-generated content, including characteristic artifacts and patterns."
                            : "The image exhibits characteristics of human photography with natural variations and patterns."}
                        </div>
                      </div>

                      {/* Confidence Meters */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-teal-600" />
                              <span className="font-medium text-slate-900">
                                AI Generated Confidence
                              </span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                              {analysisResults.aiGenerated}%
                            </span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${analysisResults.aiGenerated}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-emerald-600" />
                              <span className="font-medium text-slate-900">
                                Human Generated Confidence
                              </span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                              {analysisResults.humanGenerated}%
                            </span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${analysisResults.humanGenerated}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* File Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                          <div className="flex items-center gap-2 mb-1">
                            <FileImage className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-500">File Type</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900">
                            {analysisResults.fileType}
                          </p>
                        </div>
                        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-500">File Size</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900">
                            {analysisResults.fileSize}
                          </p>
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
              <div className="bg-linear-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-900">
                    Analysis Tips
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-emerald-800/80">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                    <span>For best results, use high-quality images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                    <span>AI images often have perfect symmetry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                    <span>Human photos may have natural imperfections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                    <span>Check image metadata for additional clues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 text-center">
            <p className="text-slate-500 text-sm">
              Powered by advanced Computer Vision models • Analysis accuracy may
              vary based on image quality
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Endpoint:{" "}
              <code className="bg-slate-100 px-2 py-1 rounded">
                mohitai24-image-detector-model.hf.space
              </code>
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
//   Download,
//   RotateCcw,
//   Eye,
//   Zap,
//   CheckCircle,
//   Sparkles,
// } from "lucide-react";

// export default function PictureModel() {
//   const { user, loading } = useAuth();

//   const [showLogin, setShowLogin] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisProgress, setAnalysisProgress] = useState(0);
//   const [analysisResults, setAnalysisResults] = useState(null);

//   const fileInputRef = useRef(null);

//   // 🔥 Open login modal instead of redirect
//   useEffect(() => {
//     if (!loading && !user) {
//       setShowLogin(true);
//     }
//   }, [loading, user]);

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
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
//       setAnalysisProgress((prev) =>
//         prev >= 100 ? 100 : prev + Math.random() * 10
//       );
//     }, 180);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch(
//         "https://mohitai24-image-detector-model.hf.space/predict",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       clearInterval(interval);
//       setIsAnalyzing(false);
//       setAnalysisProgress(100);

//       setAnalysisResults({
//         aiGenerated: Math.round((result["AI Generated"] || 0) * 100),
//         authenticity: Math.round((result["Human Generated"] || 0) * 100),
//         verdict: result.predicted_label,
//       });
//     } catch (error) {
//       clearInterval(interval);
//       setIsAnalyzing(false);
//       alert("❌ Failed to analyze image.");
//     }
//   };

//   // ⛔ Block UI until auth resolved
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-600">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* 🔥 LOGIN MODAL */}
//       {showLogin && !user && (
//         <LoginModal onClose={() => setShowLogin(false)} />
//       )}

//       {/* MAIN CONTENT */}
//       <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-green-50/20">
//         <div className="container mx-auto max-w-6xl p-6">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border rounded-full px-4 py-2 text-green-700 mb-4">
//               <Sparkles className="w-4 h-4" />
//               Image Analysis
//             </div>
//             <h1 className="text-4xl font-bold text-slate-900 mb-2">
//               Image Analysis
//             </h1>
//             <p className="text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl p-3 max-w-md">
//               Advanced image forensics and authenticity detection
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Upload */}
//             <div className="bg-white/40 backdrop-blur-sm">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Eye className="w-5 h-5 text-green-600" />
//                   Image Upload
//                 </div>
//               </div>
//               <div className="space-y-6">
//                 <div
//                   className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-green-400"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
//                   <p>Click to upload image</p>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                   />
//                 </div>

//                 {selectedFile && (
//                   <>
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       className="rounded-lg max-h-64 mx-auto"
//                       alt="preview"
//                     />

//                     <button
//                       onClick={handleAnalyze}
//                       disabled={isAnalyzing}
//                       className="w-full bg-green-600 hover:bg-green-700"
//                     >
//                       <Zap className="mr-2 w-4 h-4" />
//                       {isAnalyzing ? "Analyzing..." : "Start Analysis"}
//                     </button>

//                     {isAnalyzing && (
//                       <div value={analysisProgress} />
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Results */}
//             <div className="bg-white/40 backdrop-blur-sm">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   Results
//                 </div>
//               </div>
//               <div>
//                 {!analysisResults ? (
//                   <p className="text-slate-500 text-center">
//                     No analysis yet
//                   </p>
//                 ) : (
//                   <div className="text-lg px-4 py-2">
//                     {analysisResults.verdict}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
