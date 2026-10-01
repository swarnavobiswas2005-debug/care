"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProposalExperiencePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-primary-wine selection:bg-accent-champagne selection:text-primary-wine">
      <nav className="absolute top-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <Link href="/experiences" className="flex items-center gap-2 text-primary-wine/60 hover:text-primary-wine transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>
        <span className="font-display text-xl tracking-widest text-primary-wine">CARE</span>
      </nav>

      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-10"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=40&w=1000&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#BFA15F] text-sm tracking-[0.3em] uppercase mb-8 block font-medium">
              Experience 02 — Proposal
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] text-primary-wine mb-8">
              Ready to ask the biggest question?
            </h1>
            <p className="text-xl text-primary-wine/70 font-sans max-w-2xl mx-auto mb-12">
              Turn the moment you've imagined into an experience they'll never forget.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const isLoggedIn = localStorage.getItem("care_auth") === "true";
                  window.location.href = isLoggedIn ? "/create/proposal" : "/login";
                }
              }}
              className="px-10 py-5 bg-primary-wine text-white rounded-full text-lg font-medium hover:bg-primary-burgundy transition-colors shadow-xl shadow-primary-wine/10"
            >
              Create My Proposal →
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

