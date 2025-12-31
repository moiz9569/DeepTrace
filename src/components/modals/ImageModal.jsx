// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   X,
//   Upload,
//   RotateCcw,
//   Zap,
//   Loader2,
//   FileImage,
//   Cpu,
//   User,
// } from "lucide-react";
// import { useAuth } from "../auth/AuthProvider";
// import { useRouter } from "next/navigation";
// import LoginModal from "../LoginModal";

// export default function ImageModal({ onClose }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const fileInputRef = useRef(null);
//    const [showLogin, setShowLogin] = useState(false);
//     const { user } = useAuth();
//     const router = useRouter();
//   // Cleanup object URLs
//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//   }, [imagePreview]);

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) return;

//     setSelectedFile(file);
//     setAnalysisResults(null);

//     if (imagePreview) URL.revokeObjectURL(imagePreview);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleAnalyze = async () => {
//     if (!selectedFile) return alert("Please select an image");

//      // ✅ Logged in
//   if (user) {
//     router.push('/dashboard/picture-model');
//     return;
//   }
//   // ❌ Not logged in → ask backend
//   const res = await fetch("/api/auth/check-free-access", {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ type: "image" }),
//   });

//   const data = await res.json();
//   console.log("IPdata",data)
//   if (!data.allowed) {
//   console.log("IP already used", data);
//     setShowLogin(true); // IP already used 
//     onClose();
//     alert("login for further use");
//     return;
//   }
//     console.log("working");
//     setIsAnalyzing(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const response = await fetch(
//         "https://mohitai24-image-detector-model.hf.space/predict",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) throw new Error("Failed to analyze image");

//       const result = await response.json();

//       const aiGenerated = Math.round((result["AI Generated"] || 0) * 100);
//       const humanGenerated = Math.round((result["Human Generated"] || 0) * 100);

//       setAnalysisResults({
//         verdict: result.predicted_label,
//         aiGenerated,
//         humanGenerated,
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Image analysis failed");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleReset = () => {
//     setSelectedFile(null);
//     setAnalysisResults(null);
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//       setImagePreview(null);
//     }
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <>
        
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
//         >
//           <X />
//         </button>

//         {/* Header */}
//         <div className="p-6 border-b">
//           <h2 className="text-2xl font-bold text-slate-900">AI Image Analysis</h2>
//           <p className="text-slate-600 text-sm">
//             Upload an image to detect AI or Human generated content
//           </p>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-4">
//           {/* File Upload */}
//           {!selectedFile ? (
//             <div
//               className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/20 transition-all duration-300"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <Upload className="w-10 h-10 mx-auto mb-4 text-teal-600" />
//               <p className="text-slate-500 mb-2">Click or drag an image here</p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 className="hidden"
//               />
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-auto max-h-96 object-contain"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleReset}
//                   className="flex-1 py-2 px-4 border border-slate-300 rounded-xl hover:bg-slate-50"
//                 >
//                   <RotateCcw className="w-4 h-4 inline mr-2" />
//                   Clear
//                 </button>
//                 <button
//                   onClick={handleAnalyze}
//                   disabled={isAnalyzing}
//                   className="flex-1 py-2 px-4 bg-teal-700 text-white rounded-xl hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
//                   Analyze
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Analysis Results */}
//           {analysisResults && (
//             <div className="mt-4 p-4 rounded-xl border bg-slate-50 text-center space-y-2">
//               <div className="flex justify-center mb-2">
//                 {analysisResults.verdict === "AI Generated" ? (
//                   <Cpu className="text-red-600 w-6 h-6" />
//                 ) : (
//                   <User className="text-emerald-600 w-6 h-6" />
//                 )}
//               </div>
//               <p className="font-bold text-black text-lg">{analysisResults.verdict}</p>
//               <p className="text-black text-sm">
//                 AI Confidence: {analysisResults.aiGenerated}% | Human Confidence: {analysisResults.humanGenerated}%
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }




"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  RotateCcw,
  Zap,
  Loader2,
  FileImage,
  Cpu,
  User,
  Image as ImageIcon,
  AlertCircle,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function ImageModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const fileInputRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Check file size (optional: limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setAnalysisResults(null);

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return alert("Please select an image");

    // ✅ Logged in
    if (user) {
      router.push('/dashboard/picture-model');
      return;
    }
    
    // ❌ Not logged in → ask backend
    const res = await fetch("/api/auth/check-free-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "image" }),
    });

    const data = await res.json();
    console.log("IPdata", data);
    
    if (!data.allowed) {
      console.log("IP already used", data);
      setShowLogin(true);
      onClose();
      alert("Please login for further use");
      return;
    }
    
    console.log("working");
    setIsAnalyzing(true);

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

      if (!response.ok) throw new Error("Failed to analyze image");

      const result = await response.json();

      const aiGenerated = Math.round((result["AI Generated"] || 0) * 100);
      const humanGenerated = Math.round((result["Human Generated"] || 0) * 100);

      setAnalysisResults({
        verdict: result.predicted_label,
        aiGenerated,
        humanGenerated,
      });
    } catch (err) {
      console.error(err);
      alert("Image analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      const event = { target: { files: [file] } };
      handleFileSelect(event);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl w-170 max-w-3xl shadow-2xl relative overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-100/30 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-100/20 rounded-full translate-x-20 translate-y-20"></div>
          
          {/* Header */}
          <div className="relative p-8 border-b border-slate-100 bg-linear-to-r from-teal-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 rounded-xl">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    AI Image Analyzer
                  </h2>
                  <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
                    <span>Detect AI or Human generated images</span>
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                      Free Trial
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            {/* Free usage info */}
            {!user && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Free one-time analysis</span> available. Login for unlimited access and advanced features.
                </p>
              </div>
            )}
          </div>

          {/* Body - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
              {/* Upload Area */}
              {!selectedFile ? (
                <div
                  className="border-3 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 bg-linear-to-b from-white to-slate-50 hover:border-teal-400 hover:bg-teal-50/30 hover:shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="p-4 bg-linear-to-r from-teal-100 to-emerald-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Upload Your Image
                  </h3>
                  <p className="text-slate-600 mb-4 max-w-md mx-auto">
                    Drag & drop or click to browse. Supports JPG, PNG, WebP (max 5MB)
                  </p>
                  <button className="px-6 py-2.5 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all shadow-sm">
                    Choose File
                  </button>
                  <p className="text-xs text-slate-400 mt-4">
                    By uploading, you agree to our Terms of Service
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50">
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                        {selectedFile.name.substring(0, 20)}
                        {selectedFile.name.length > 20 && "..."}
                      </span>
                    </div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto max-h-80 object-contain mx-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center gap-2 text-white">
                        <FileImage className="w-4 h-4" />
                        <span className="text-sm">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleReset}
                      className="py-3 px-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Clear Image</span>
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className={`py-3 px-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all relative overflow-hidden
                        ${isAnalyzing
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-linear-to-r from-teal-700 via-teal-600 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 hover:shadow-lg active:scale-[0.99] shadow-md"
                        }`}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Analyze Image</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Analysis Results */}
              {analysisResults && (
                <div className={`mt-4 p-6 rounded-2xl border-2 transition-all ${analysisResults.verdict === "AI Generated" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${analysisResults.verdict === "AI Generated" ? "bg-red-100" : "bg-emerald-100"}`}>
                        {analysisResults.verdict === "AI Generated" ? (
                          <Cpu className="w-7 h-7 text-red-600" />
                        ) : (
                          <User className="w-7 h-7 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl">{analysisResults.verdict}</h3>
                        <p className="text-slate-600 text-sm">Analysis Result</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${analysisResults.verdict === "AI Generated" ? "text-red-700" : "text-emerald-700"}`}>
                        {analysisResults.verdict === "AI Generated" 
                          ? `${analysisResults.aiGenerated}%`
                          : `${analysisResults.humanGenerated}%`
                        }
                      </div>
                      <div className="text-xs text-slate-500">confidence</div>
                    </div>
                  </div>
                  
                  {/* Confidence Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-slate-700 mb-1">
                        <span className="font-medium">AI Generated</span>
                        <span>{analysisResults.aiGenerated}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-red-500 to-red-600"
                          style={{ width: `${analysisResults.aiGenerated}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-slate-700 mb-1">
                        <span className="font-medium">Human Generated</span>
                        <span>{analysisResults.humanGenerated}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-emerald-500 to-emerald-600"
                          style={{ width: `${analysisResults.humanGenerated}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}