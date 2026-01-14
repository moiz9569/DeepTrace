"use client";

import { useState } from "react";
import { FiMail, FiLock, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginModal({ onClose }) {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await login(email, password);
        if (!res || !res.success) {
            setError(res?.error || "Invalid email or password");
        } else {
            onClose(); // ✅ close modal after login
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BLUR OVERLAY */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* MODAL */}
            <div className="relative z-10 w-full max-w-md mx-auto bg-gray-400 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-5 right-5 w-8 h-8 rounded-full bg-black/20 hover:bg-black/60 text-white flex items-center justify-center"
                >
                    <FiX />
                </button>

                {/* HEADER */}
                <div className="text-center mb-4">
                    <img
                        src="/DeepTrace-new-logo3.png"
                        className="w-16 mx-auto mb-3"
                        alt="logo"
                    />
                    <h2 className="text-2xl font-bold text-teal-900 bg-clip-text">
                        Welcome Back
                    </h2>
                    <p className="text-gray-700 text-sm">
                        Access your DeepTrace account
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 py-3 rounded-2xl bg-white/40 text-black
               outline-none focus:outline-none
               ring-0 focus:ring-0
               border border-white/20 focus:border-teal-900"
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-900" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 cursor-pointer rounded-2xl bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white font-semibold"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div className="text-center font-exo-2 mt-5 pt-5 border-t border-white/10">
                    <p className="text-gray-700">
                        New to DeepTrace?{" "}
                        <button
                            onClick={() => {
                                onClose();
                                document.dispatchEvent(new CustomEvent("openSignupModal"));
                            }}
                            className="cursor-pointer text-teal-900  bg-clip-text font-semibold hover:text-black transition"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
