"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/AuthModals/LoginModal";
import SignupModal from "@/components/AuthModals/SignupModal";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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

  // Close mobile menu when modal opens
  useEffect(() => {
    if (showLogin || showSignup) {
      setIsMenuOpen(false);
    }
  }, [showLogin, showSignup]);

  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbar");
      const menuButton = document.getElementById("menu-button");
      if (
        navbar &&
        !navbar.contains(event.target) &&
        menuButton &&
        !menuButton.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        id="navbar"
        className="absolute top-0 left-0 w-full bg-[#011107] px-6 py-3 z-40 shadow-sm"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-2xl flex items-center justify-center">
              <img
                src="/Deeptrace-new-logo.png"
                alt="Logo"
                className="w-10 h-10 object-cover"
              />
            </div>
            <span className="text-xl font-bold text-slate-200">
              DeepTrace
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            <Link href="/" className="text-slate-200 hover:text-slate-300">
              Home
            </Link>
            <Link href="/about" className="text-slate-200 hover:text-slate-300">
              About
            </Link>
            <Link
              href="/services"
              className="text-slate-200 hover:text-slate-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-slate-200 hover:text-slate-300"
            >
              Contact
            </Link>
            <Link
              href="/dashboard/text-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300"
            >
              Text
            </Link>
            <Link
              href="/dashboard/picture-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300"
            >
              Image
            </Link>
            <Link
              href="/dashboard/video-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300"
            >
              Video
            </Link>
          </div>

          {/* Mobile Menu Button and Desktop Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
           

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 md:ml-4 lg:ml-0">
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
                    className="px-3 py-1 border cursor-pointer rounded-lg text-slate-200 bg-transparent hover:bg-teal-800 hover:border-none hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="px-3 py-1 w-22 cursor-pointer bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

             <button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8"
              aria-label="Toggle menu"
            >
              <span
                className={`bg-slate-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-slate-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-slate-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </button>

            {/* Mobile Auth Button (only when menu is open) */}
            {isMenuOpen && !loading && user && (
              <div className="md:hidden">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border rounded text-slate-200 hover:text-slate-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden container mx-auto transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="text-slate-200 hover:text-slate-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-200 hover:text-slate-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-slate-200 hover:text-slate-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-slate-200 hover:text-slate-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/dashboard/text-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300 py-2"
            >
              Text
            </Link>
            <Link
              href="/dashboard/picture-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300 py-2"
            >
              Image
            </Link>
            <Link
              href="/dashboard/video-model"
              onClick={handleProtectedClick}
              className="text-slate-200 hover:text-slate-300 py-2"
            >
              Video
            </Link>

            {/* Mobile Auth Buttons (only for non-logged in users) */}
            {!loading && !user && (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 border cursor-pointer rounded-lg text-slate-200 bg-transparent hover:bg-teal-800 hover:border-none hover:text-white text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer bg-linear-to-r from-teal-800 via-teal-700 to-teal-800 text-white rounded-lg text-left"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}