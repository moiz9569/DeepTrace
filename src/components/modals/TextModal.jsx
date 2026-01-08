// "use client";

// import { useState } from "react";
// import { X, Loader2, Zap, Cpu, User } from "lucide-react";
// import { Client } from "@gradio/client";
// import { useAuth } from "../auth/AuthProvider";
// import { useRouter } from "next/navigation";
// import LoginModal from "../LoginModal";

// export default function TextModal({ onClose }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const { user } = useAuth();
//     const router = useRouter();
//   const handleAnalyze = async () => {
//     // ✅ Logged in
//   if (user) {
//     router.push('/dashboard/text-model');
//     return;
//   }
//   // ❌ Not logged in → ask backend
//   const res = await fetch("/api/auth/check-free-access", {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ type: "text" }),
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
//     if (!text.trim()) return;
//     setLoading(true);
//     setResult(null);

//     try {
//       const client = await Client.connect("MohitAI24/ai-text-detector");

//       const res = await client.predict("/classify_text", {
//         text,
//       });

//       const output = res.data[0];
//       const ai = Math.round(output.confidence * 100);

//       setResult({
//         label: output.label === "AI" ? "AI Generated" : "Human Written",
//         confidence: ai,
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Analysis failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>

//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative">

//         {/* ❌ Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
//         >
//           <X />
//         </button>

//         {/* Header */}
//         <div className="p-6 border-b">
//           <h2 className="text-2xl font-bold text-slate-900">
//             AI Text Analysis
//           </h2>
//           <p className="text-slate-600 text-sm">
//             Paste text to detect AI or Human writing
//           </p>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-4">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Paste your text here..."
//             className="w-full min-h-[150px] text-black border rounded-xl p-4 focus:ring-2 focus:ring-teal-500 outline-none"
//           />

//           <button
//             onClick={handleAnalyze}
//             disabled={loading || !text.trim()}
//             className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2
//               ${loading
//                 ? "bg-slate-400"
//                 : "bg-gradient-to-r from-teal-700 to-teal-800 hover:scale-[1.02]"
//               }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin w-5 h-5" />
//                 Analyzing...
//               </>
//             ) : (
//               <>
//                 <Zap className="w-5 h-5" />
//                 Analyze Text
//               </>
//             )}
//           </button>

//           {/* Result */}
//           {result && (
//             <div className="mt-4 p-4 rounded-xl border bg-slate-50 text-center">
//               <div className="flex justify-center mb-2">
//                 {result.label === "AI Generated" ? (
//                   <Cpu className="text-red-600" />
//                 ) : (
//                   <User className="text-emerald-600" />
//                 )}
//               </div>
//               <p className="font-bold text-black text-lg">{result.label}</p>
//               <p className="text-black text-sm">
//              <span className="text-emerald-600">
//                 Confidence
//                 </span>   : {result.confidence}%
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

import { useState } from "react";
import { X, Loader2, Zap, Cpu, User, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { Client } from "@gradio/client";
import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function TextModal({ onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleAnalyze = async () => {
    // ✅ Logged in
    if (user) {
      router.push('/dashboard/text-model');
      return;
    }
    
    // ❌ Not logged in → ask backend
    const res = await fetch("/api/auth/check-free-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "text" }),
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
    if (!text.trim()) {
      alert("Please enter some text to analyze");
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
      const client = await Client.connect("MohitAI24/ai-text-detector");
      const res = await client.predict("/classify_text", { text });
      const output = res.data[0];
      const ai = Math.round(output.confidence * 100);

      setResult({
        label: output.label === "AI" ? "AI Generated" : "Human Written",
        confidence: ai,
      });
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden border border-slate-200">
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-100/30 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100/20 rounded-full translate-x-20 translate-y-20"></div>
          
          {/* Header */}
          <div className="relative p-8 border-b border-slate-100 bg-linear-to-r from-teal-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    AI Text Analyzer
                  </h2>
                  <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
                    <span>Detect AI or Human writing</span>
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                      Free Trial
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 cursor-pointer hover:bg-slate-100 rounded-full transition-colors"
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

          {/* Body */}
          <div className="p-8 space-y-6">
            {/* Text area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Enter your text
              </label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your text here to analyze whether it's AI-generated or human-written..."
                  className="w-full min-h-45 text-slate-900 border-2 border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none hover:border-slate-300"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {text.length} characters
                </div>
              </div>
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all relative overflow-hidden
                ${loading || !text.trim()
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 hover:from-teal-700 hover:to-teal-700 hover:shadow-lg active:scale-[0.99] shadow-md"
                }`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Analyze Text</span>
                </>
              )}
            </button>

            {/* Result display */}
            {result && (
              <div className={`mt-4 p-6 rounded-2xl border-2 transition-all ${result.label === "AI Generated" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.label === "AI Generated" ? "bg-red-100" : "bg-emerald-100"}`}>
                      {result.label === "AI Generated" ? (
                        <Cpu className="w-6 h-6 text-red-600" />
                      ) : (
                        <User className="w-6 h-6 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{result.label}</h3>
                      <p className="text-slate-600 text-sm">Analysis Result</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${result.label === "AI Generated" ? "text-red-700" : "text-emerald-700"}`}>
                      {result.confidence}%
                    </div>
                    <div className="text-xs text-slate-500">confidence</div>
                  </div>
                </div>
                
                {/* Confidence bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>0%</span>
                    <span>Confidence Level</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${result.label === "AI Generated" ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add this to your CSS or Tailwind config for shimmer effect */}
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