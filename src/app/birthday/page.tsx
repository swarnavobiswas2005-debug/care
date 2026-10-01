"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function BirthdayExperiencePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFE5EC] via-[#FFF3E8] to-[#E8F0FF] text-primary-wine overflow-hidden">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-primary-wine/60 hover:text-primary-wine transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-primary-wine">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6">
        
        {/* Floating background elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/40 blur-3xl rounded-full"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-rose/10 blur-3xl rounded-full"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur-md rounded-2xl mb-8 shadow-sm">
               <Sparkles className="text-accent-rose w-6 h-6" />
            </div>
            <span className="text-accent-rose text-sm tracking-[0.3em] uppercase mb-4 block font-medium">
              Experience 04 — Birthday
            </span>
            <h1 className="text-6xl md:text-8xl font-display leading-[1.1] text-primary-wine mb-8">
              Today is about you.
            </h1>
            <p className="text-xl text-primary-wine/70 font-sans max-w-xl mx-auto mb-12">
              Create a birthday surprise that's more personal than another message.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const isLoggedIn = localStorage.getItem("care_auth") === "true";
                  window.location.href = isLoggedIn ? "/create/birthday" : "/login";
                }
              }}
              className="px-10 py-5 bg-white text-primary-wine rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-xl shadow-accent-rose/10"
            >
              Create Their Birthday →
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
