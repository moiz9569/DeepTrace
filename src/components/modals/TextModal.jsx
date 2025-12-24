// export default function TextModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-[350px] text-center">
//         <h2 className="text-xl font-bold mb-3">Text Analysis</h2>
//         <p className="text-gray-600 mb-4">
//           Upload or paste your text for AI analysis.
//         </p>
//         <button
//           onClick={onClose}
//           className="bg-teal-600 text-white px-4 py-2 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { X, Loader2, Zap, Cpu, User } from "lucide-react";
import { Client } from "@gradio/client";

export default function TextModal({ onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const client = await Client.connect("MohitAI24/ai-text-detector");

      const res = await client.predict("/classify_text", {
        text,
      });

      const output = res.data[0];
      const ai = Math.round(output.confidence * 100);

      setResult({
        label: output.label === "AI" ? "AI Generated" : "Human Written",
        confidence: ai,
      });
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">
            AI Text Analysis
          </h2>
          <p className="text-slate-600 text-sm">
            Paste text to detect AI or Human writing
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full min-h-[150px] text-black border rounded-xl p-4 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2
              ${loading
                ? "bg-slate-400"
                : "bg-gradient-to-r from-teal-700 to-teal-800 hover:scale-[1.02]"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Analyze Text
              </>
            )}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-4 p-4 rounded-xl border bg-slate-50 text-center">
              <div className="flex justify-center mb-2">
                {result.label === "AI Generated" ? (
                  <Cpu className="text-red-600" />
                ) : (
                  <User className="text-emerald-600" />
                )}
              </div>
              <p className="font-bold text-black text-lg">{result.label}</p>
              <p className="text-black text-sm">
             <span className="text-emerald-600">
                Confidence
                </span>   : {result.confidence}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
