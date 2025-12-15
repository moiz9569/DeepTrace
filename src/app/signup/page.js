"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Force back to home on close
  const handleClose = () => {
    router.push("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await register(name, email, password);
    if (!res || !res.success) {
      setError(res?.error || "Failed to create account");
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
          <div className="text-2xl font-bold">Create Account</div>
          <div className="text-slate-600">
            Start your journey with Truth Seeker today.
          </div>
        </div>

        <div>
          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
