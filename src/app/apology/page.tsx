"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApologyExperiencePage() {
  return (
    <main className="min-h-screen bg-primary-wine text-primary-ivory selection:bg-accent-rose selection:text-white">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-primary-ivory/70 hover:text-primary-ivory transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-primary-ivory">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544061266-9b5cc1202e84?q=40&w=1000&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-primary-wine via-primary-wine/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-rose text-sm tracking-[0.3em] uppercase mb-8 block font-medium">
              Experience 01 — Apology
            </span>
            <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-primary-ivory mb-8">
              Sometimes "I'm sorry" deserves more than two words.
            </h1>
            <p className="text-xl text-primary-ivory/70 font-sans max-w-xl mx-auto mb-12">
              Create a personal experience that says what a text message can't.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const isLoggedIn = localStorage.getItem("care_auth") === "true";
                  window.location.href = isLoggedIn ? "/create/apology" : "/login";
                }
              }}
              className="px-10 py-5 bg-primary-burgundy text-primary-ivory rounded-full text-lg font-medium hover:bg-white hover:text-primary-wine transition-colors shadow-2xl border border-white/20"
            >
              Create My Apology →
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

