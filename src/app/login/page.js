"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Force back to home on close
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white relative">
      <div className="w-full max-w-md shadow-lg border border-slate-200">
        {/* Close Button */}
        <div>
          <button
            onClick={handleClose}
            className=" text-slate-500 hover:text-slate-700 text-3xl"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">Sign In</div>
          <div className="text-slate-600">
            Welcome back! Enter your details to access your account.
          </div>
        </div>

        <div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-teal-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
