"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DurgaPujaExperiencePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#8B0000] selection:bg-[#8B0000] selection:text-white">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-[#8B0000]/60 hover:text-[#8B0000] transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-[#8B0000]">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-[0.15] mix-blend-multiply filter sepia-[0.3]"
             style={{ backgroundImage: "url('/durga-puja-couple.jpg')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#8B0000] text-sm tracking-[0.3em] uppercase mb-8 block font-medium">
              Limited Edition — Durga Puja
            </span>
            <h1 className="text-5xl md:text-7xl font-display leading-[1] text-[#8B0000] mb-8 italic">
              শুভ শারদীয়া
            </h1>
            <p className="text-xl text-[#8B0000]/70 font-sans max-w-xl mx-auto mb-12">
              For that special person you want to hold hands with on Ashtami.
            </p>
            <div className="relative inline-block group">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const isLoggedIn = localStorage.getItem("care_auth") === "true";
                    window.location.href = isLoggedIn ? "/create/durga-puja" : "/login";
                  }
                }}
                className="inline-flex items-center justify-center px-10 py-5 text-sm font-semibold text-[#8B0000] bg-transparent border border-[#8B0000] uppercase tracking-[0.2em] hover:bg-[#8B0000] hover:text-[#FDFBF7] transition-colors"
              >
                CRAFT ASHTAMI LETTER
              </button>
              <div className="absolute -bottom-6 right-0 text-2xl font-handwriting text-[#8B0000]/70 -rotate-6 opacity-90 group-hover:-rotate-12 transition-transform duration-300">
                for you...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

