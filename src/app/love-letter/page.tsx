"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoveLetterExperiencePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#110B0D] selection:bg-black selection:text-white">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
      
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-black/50 hover:text-black transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-black">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-black/40 text-xs tracking-[0.4em] uppercase mb-12 block font-medium">
              Experience 05 — Love Letter
            </span>
            <h1 className="text-5xl md:text-7xl font-display leading-[1.2] text-black mb-8 max-w-3xl mx-auto">
              Some things are easier to write than say.
            </h1>
            <p className="text-lg md:text-xl text-black/60 font-sans max-w-xl mx-auto mb-16 font-light">
              Turn your words into a beautiful experience made just for them.
            </p>
            
            <div className="relative inline-block">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const isLoggedIn = localStorage.getItem("care_auth") === "true";
                    window.location.href = isLoggedIn ? "/create/love-letter" : "/login";
                  }
                }}
                className="px-12 py-4 bg-transparent border border-black text-black rounded-none text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                Write My Letter
              </button>
              {/* Fake handwritten accent */}
              <div className="absolute -bottom-8 -right-8 text-2xl text-[#8B5E66] opacity-80" style={{ fontFamily: "cursive", transform: "rotate(-10deg)" }}>
                for you...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
