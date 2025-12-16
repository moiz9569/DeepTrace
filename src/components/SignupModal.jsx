// //scr/components/SignupModal.jsx
// "use client";

// import { useState } from "react";
// import { FiMail, FiLock, FiX, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
// import { useAuth } from "@/components/auth/AuthProvider";
// import { useAuth } from "@/components/auth/AuthProvider";

// import { signup } from "../../lib/auth"; // or '@/lib/auth' if alias works

// export default function SignupModal({ onClose }) {
//     //const { signup } = useAuth(); // make sure your AuthProvider has a signup function

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             setLoading(false);
//             return;
//         }

//         const res = await signup({ name, email, password });
//         if (!res || !res.success) {
//             setError(res?.error || "Failed to create account");
//         } else {
//             onClose(); // ✅ close modal after signup
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             {/* BLUR OVERLAY */}
//             <div
//                 className="absolute inset-0 bg-black/30 backdrop-blur-md"
//                 onClick={onClose}
//             ></div>

//             {/* MODAL */}
//             <div className="relative z-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
//                 {/* CLOSE */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/20 hover:bg-black/60 text-white flex items-center justify-center"
//                 >
//                     <FiX />
//                 </button>

//                 {/* HEADER */}
//                 <div className="text-center mb-4">
//                     <img
//                         src="/hashfor-new-logo.png"
//                         className="w-16 mx-auto mb-3"
//                         alt="logo"
//                     />
//                     <h2 className="text-2xl font-bold text-teal-900 bg-clip-text">
//                         Create Account
//                     </h2>
//                     <p className="text-gray-700 text-sm">
//                         Sign up for a DeepTrace account
//                     </p>
//                 </div>

//                 {/* FORM */}
//                 <form onSubmit={handleSignup} className="space-y-4">
//                     <div className="relative">
//                         <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                             required
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="w-full pl-12 py-3 rounded-2xl bg-white/40 text-black outline-none border border-white/20 focus:border-teal-900"
//                         />
//                     </div>

//                     <div className="relative">
//                         <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full pl-12 py-3 rounded-2xl bg-white/40 text-black outline-none border border-white/20 focus:border-teal-900"
//                         />
//                     </div>

//                     <div className="relative">
//                         <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black outline-none border border-white/20 focus:border-teal-900"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-900"
//                         >
//                             {showPassword ? <FiEyeOff /> : <FiEye />}
//                         </button>
//                     </div>

//                     <div className="relative">
//                         <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Confirm Password"
//                             required
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black outline-none border border-white/20 focus:border-teal-900"
//                         />
//                     </div>

//                     {error && <p className="text-red-500 text-sm">{error}</p>}

//                     <button
//                         type="submit"
//                         className="w-full py-3 rounded-2xl bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white font-semibold"
//                     >
//                         {loading ? "Creating Account..." : "Sign Up"}
//                     </button>
//                 </form>

//                 <div className="text-center font-exo-2 mt-5 pt-5 border-t border-white/10">
//                     <p className="text-gray-700">
//                         Already have an account?{" "}
//                         <button
//                             onClick={() => {
//                                 onClose(); // close signup
//                                 document.dispatchEvent(new CustomEvent("openLoginModal"));
//                             }}
//                             className="cursor-pointer text-teal-900 font-semibold hover:text-black transition"
//                         >
//                             Sign In
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }



// src/components/SignupModal.jsx
"use client";

import { useState } from "react";
import { FiMail, FiLock, FiX, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SignupModal({ onClose }) {
  const { register } = useAuth(); // ✅ AuthProvider wala signup (register)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // ✅ IMPORTANT: same order as AuthProvider
    const res = await register(name, email, password);

    if (!res || !res.user) {
      setError(res?.error || "Failed to create account");
      setLoading(false);
      return;
    }

    // ✅ redirect AuthProvider ke andar ho chuka hai
    onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/20 hover:bg-black/60 text-white flex items-center justify-center"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <img src="/hashfor-new-logo.png" className="w-16 mx-auto mb-3" alt="logo" />
          <h2 className="text-2xl font-bold text-teal-900">
            Create Account
          </h2>
          <p className="text-gray-700 text-sm">
            Sign up for a DeepTrace account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black
               outline-none focus:outline-none
               ring-0 focus:ring-0
               border border-white/20 focus:border-teal-900"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black
               outline-none focus:outline-none
               ring-0 focus:ring-0
               border border-white/20 focus:border-teal-900"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black
               outline-none focus:outline-none
               ring-0 focus:ring-0
               border border-white/20 focus:border-teal-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-900"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/40 text-black
               outline-none focus:outline-none
               ring-0 focus:ring-0
               border border-white/20 focus:border-teal-900"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-5 pt-5 border-t border-white/10">
          <p className="text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose();
                document.dispatchEvent(new CustomEvent("openLoginModal"));
              }}
              className="cursor-pointer text-teal-900  bg-clip-text font-semibold hover:text-black transition"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
