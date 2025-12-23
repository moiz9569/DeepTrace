"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="h-screen pt-20">
      {/* BACKGROUND IMAGE */}
      <img
        src="/Gemini_Generated_Image_o1fd84o1fd84o1fd.png"
        alt="Hero Background"
        className="absolute inset-0 z-0 bg-black h-screen w-full object-cover opacity-100"
      />

      {/* HERO WRAPPER */}
      <div className="relative px-16">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900/25 p-24">
          {/* CONTENT */}
          <div className="relative z-10 space-y-8">
            <div className="">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-300 leading-tight">
                Verify Content. Defend Trust.
              </h1>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-300 leading-tight">
                AI Content Analysis Platform
              </h1>
            </div>

            <div className="">
              <p className="text-lg text-slate-300 leading-relaxed">
                Detect AI-generated text, images, and video with high-precision
                models built for
              </p>
              <p className="text-lg text-slate-200">
                publishers, researchers, and security teams. Get clear,
                explainable results {""}
                <span className="block">you can trust.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-left pt-4">
              <Link href="/dashboard">
                <button className="inline-flex items-left gap-2 rounded-xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-8 py-4 text-lg text-white shadow-lg shadow-teal-500/25 transition hover:shadow-teal-500/40">
                  Start Analysis
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>

              <Link href="/about">
                <button className="rounded-xl border border-slate-300/80 bg-white/60 px-8 py-4 text-lg text-slate-700 backdrop-blur transition hover:bg-white">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
