"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JustBecauseExperiencePage() {
  return (
    <main className="min-h-screen bg-[#110B0D] text-[#F9F6F0] selection:bg-white selection:text-black">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-white">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Experimental shapes background */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4A0E1B]/30 to-transparent blur-[100px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#3D0A14]/40 to-transparent blur-[100px] rounded-full pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white/40 text-xs tracking-[0.4em] uppercase mb-12 block font-medium">
              Experience 06 — Just Because
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] text-white mb-8">
              You don't need a reason to tell someone you love them.
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-sans max-w-2xl mx-auto mb-16">
              Create a little surprise for someone who means everything to you. Combine photos, music, interactive memories, and anything else you can imagine.
            </p>
            
            <div className="relative inline-block group">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const isLoggedIn = localStorage.getItem("care_auth") === "true";
                    window.location.href = isLoggedIn ? "/create/just-because" : "/login";
                  }
                }}
                className="inline-flex items-center justify-center px-10 py-5 text-sm font-semibold text-white bg-transparent border border-white uppercase tracking-[0.2em] hover:bg-white hover:text-[#21060C] transition-colors"
              >
                CREATE SOMETHING
              </button>
              <div className="absolute -bottom-6 right-0 text-2xl font-handwriting text-accent-rose -rotate-6 opacity-90 group-hover:-rotate-12 transition-transform duration-300">
                for you...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
