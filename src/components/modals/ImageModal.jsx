// export default function ImageModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-[350px] text-center">
//         <h2 className="text-xl font-bold mb-3">Image Analysis</h2>
//         <p className="text-gray-600 mb-4">
//           Upload an image for forensic analysis.
//         </p>
//         <button
//           onClick={onClose}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
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
} from "lucide-react";

export default function ImageModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const fileInputRef = useRef(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setSelectedFile(file);
    setAnalysisResults(null);

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

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
      alert("Image analysis failed");
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">AI Image Analysis</h2>
          <p className="text-slate-600 text-sm">
            Upload an image to detect AI or Human generated content
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* File Upload */}
          {!selectedFile ? (
            <div
              className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/20 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 mx-auto mb-4 text-teal-600" />
              <p className="text-slate-500 mb-2">Click or drag an image here</p>
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
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 px-4 border border-slate-300 rounded-xl hover:bg-slate-50"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Clear
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 py-2 px-4 bg-teal-700 text-white rounded-xl hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  Analyze
                </button>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResults && (
            <div className="mt-4 p-4 rounded-xl border bg-slate-50 text-center space-y-2">
              <div className="flex justify-center mb-2">
                {analysisResults.verdict === "AI Generated" ? (
                  <Cpu className="text-red-600 w-6 h-6" />
                ) : (
                  <User className="text-emerald-600 w-6 h-6" />
                )}
              </div>
              <p className="font-bold text-black text-lg">{analysisResults.verdict}</p>
              <p className="text-black text-sm">
                AI Confidence: {analysisResults.aiGenerated}% | Human Confidence: {analysisResults.humanGenerated}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
