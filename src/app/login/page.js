"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { FiMail, FiLock, FiX, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    router.push("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(email, password);
    if (!res || !res.success) {
      setError(res?.error || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md mx-auto bg-white/40 rounded-3xl shadow-2xl p-6 z-10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/60 text-white transition"
        >
          <FiX className="text-lg" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src="/hashfor-new-logo.png"
            alt="Logo"
            className="w-16 h-16 mb-3 object-contain"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-700 text-sm">
            Access your Hashfor portfolio securely
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/40 border border-white/10 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 border border-white/10 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-cyan-400 transition"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-700 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/AuthProvider";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Force back to home on close
//   const handleClose = () => {
//     router.push("/");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const res = await login(email, password);
//     if (!res || !res.success) {
//       setError(res?.error || "Invalid email or password");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-200 to-white relative">
//       <div className="w-full max-w-xl h-auto shadow-lg border border-slate-200 rounded-2xl p-6 mx-auto bg-white">
//         {/* Close Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleClose}
//             className="text-slate-500 hover:text-slate-700 text-2xl"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Header */}
//         <div className="text-center mt-2 mb-6">
//           <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
//           <p className="text-slate-600 mt-2">
//             Welcome back! Enter your details to access your account.
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold shadow-md hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-slate-500 mt-4 text-center">
//           Don&apos;t have an account?{" "}
//           <Link href="/signup" className="text-teal-600 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>

//     </div>
//   );
// }
