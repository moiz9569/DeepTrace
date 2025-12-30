"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/AuthModals/LoginModal";
import SignupModal from "@/components/AuthModals/SignupModal";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Listen for custom events to open modals from within modals
  useEffect(() => {
    const openLoginHandler = () => {
      setShowLogin(true);
      setShowSignup(false);
    };
    const openSignupHandler = () => {
      setShowSignup(true);
      setShowLogin(false);
    };

    document.addEventListener("openLoginModal", openLoginHandler);
    document.addEventListener("openSignupModal", openSignupHandler);

    return () => {
      document.removeEventListener("openLoginModal", openLoginHandler);
      document.removeEventListener("openSignupModal", openSignupHandler);
    };
  }, []);


  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault(); 
      setShowLogin(true);
    }
  };

  const handleLogout = async () => {
    await logout();         
    router.push("/home"); 
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full bg-[#152022] px-6 py-3 z-40 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-2xl flex items-center justify-center">
              {/* <Brain className="w-5 h-5 text-white" /> */}
              <img
                src="/image.png"
                alt="Logo"
                className="w-8 h-8 object-cover"
              />
            </div>
            <span className="text-xl font-bold text-slate-200">
              DeepTrace
            </span>
          </Link>

          {/* Nav Links */}
          {
            <div className="flex items-center gap-7">
              <Link href="/" className="hidden md:inline text-slate-200 hover:text-slate-500">Home</Link>
              <Link href="/about" className="hidden md:inline text-slate-200 hover:text-slate-500">About</Link>
              <Link href="/services" className="hidden md:inline text-slate-200 hover:text-slate-500">Services</Link>
              <Link href="/contact" className="hidden md:inline text-slate-200 hover:text-slate-500">Contact</Link>
              <Link href="/dashboard/text-model" onClick={handleProtectedClick} className="hidden md:inline text-slate-200 hover:text-slate-500">Text</Link>
              <Link href="/dashboard/picture-model" onClick={handleProtectedClick} className="hidden md:inline text-slate-200 hover:text-slate-500">Image</Link>
              <Link href="/dashboard/video-model" onClick={handleProtectedClick} className="hidden md:inline text-slate-200 hover:text-slate-500">Video</Link>
            </div>
          }

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {loading ? (
              <span className="text-slate-400">...</span>
            ) : user ? (
              <button
                onClick={handleLogout}
                className="mr-8 px-3 py-1 border rounded text-slate-200 hover:text-slate-500"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-3 py-1 border rounded-lg text-slate-200 hover:text-slate-500"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-3 py-1 bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
      {showSignup && (
        <SignupModal onClose={() => setShowSignup(false)} />
      )}
    </>
  );
}
