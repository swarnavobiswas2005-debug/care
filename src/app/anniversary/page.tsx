"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnniversaryExperiencePage() {
  return (
    <main className="min-h-screen bg-[#EBE5D9] text-primary-wine selection:bg-accent-rose selection:text-white">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-primary-wine/60 hover:text-primary-wine transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-primary-wine">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-[0.15] mix-blend-multiply filter sepia-[0.3]"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606213710777-96a5b678c2e0?q=40&w=1000&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#EBE5D9] via-[#EBE5D9]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#8B5E66] text-sm tracking-[0.3em] uppercase mb-8 block font-medium">
              Experience 03 — Anniversary
            </span>
            <h1 className="text-6xl md:text-8xl font-display leading-[1] text-primary-wine mb-8 italic">
              Another year of us.
            </h1>
            <p className="text-xl text-primary-wine/70 font-sans max-w-xl mx-auto mb-12">
              Turn your memories into something you can revisit together.
            </p>
            <div className="relative inline-block group">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const isLoggedIn = localStorage.getItem("care_auth") === "true";
                    window.location.href = isLoggedIn ? "/create/anniversary" : "/login";
                  }
                }}
                className="inline-flex items-center justify-center px-10 py-5 text-sm font-semibold text-[#4A0E1B] bg-transparent border border-[#4A0E1B] uppercase tracking-[0.2em] hover:bg-[#4A0E1B] hover:text-[#FDFBF7] transition-colors"
              >
                CREATE OUR ANNIVERSARY
              </button>
              <div className="absolute -bottom-6 right-0 text-2xl font-handwriting text-[#8B5E66] -rotate-6 opacity-90 group-hover:-rotate-12 transition-transform duration-300">
                for you...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

