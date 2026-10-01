"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Calendar, MessageCircleHeart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Hero() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent-rose/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Content */}
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blush/30 bg-accent-blush/10 text-xs font-medium tracking-widest uppercase text-accent-blush"
          >
            Make something they&apos;ll never forget
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] tracking-tight text-primary-ivory"
          >
            Craft a little piece of the internet just for them.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-ivory/80 leading-relaxed font-sans max-w-lg"
          >
            Craft a personalized romantic webpage for your partner — whether you&apos;re saying sorry, asking the big question, celebrating a milestone, or simply telling them how much they mean to you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-10 sm:gap-6 mt-8 w-full sm:w-auto items-center sm:items-start"
          >
            <div className="relative group mt-2">
              <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center px-10 py-5 text-sm font-semibold text-primary-ivory bg-transparent border border-primary-ivory uppercase tracking-[0.2em] hover:bg-primary-ivory hover:text-primary-wine transition-colors"
              >
                WRITE MY LETTER
              </Link>
              <div className="absolute -bottom-6 right-0 text-2xl font-handwriting text-accent-blush -rotate-6 opacity-90 group-hover:-rotate-12 transition-transform duration-300">
                for you...
              </div>
            </div>

            <Link
              href="#examples"
              className="inline-flex items-center justify-center px-8 py-5 text-sm font-medium text-primary-ivory/70 hover:text-primary-ivory transition-colors mt-2 sm:mt-2 uppercase tracking-widest"
            >
              See an Example
            </Link>
          </motion.div>
        </div>

        {/* Visual / Product Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[500px] md:h-[600px] perspective-1000"
        >
          <motion.div
            className="absolute inset-0 bg-primary-burgundy rounded-2xl border border-white/20 shadow-2xl overflow-hidden transform-gpu flex flex-col"
            whileHover={{ rotateY: -5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            {/* Browser Header */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-primary-wine">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="mx-auto text-xs text-white/50 font-medium font-sans">
                for-you.care/sarah
              </div>
            </div>
            
            {/* Page Content Preview */}
            <div className="flex-1 relative overflow-hidden bg-[#Fdfbf7] flex flex-col items-center p-8">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#Fdfbf7] via-[#Fdfbf7]/80 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center text-center mt-auto pb-4">
                <p className="font-display italic text-[#4A0E1B] text-2xl mb-2">Hey, Sarah...</p>
                <h2 className="font-display text-4xl text-[#110B0D] mb-4">I wrote you a letter.</h2>
                <div className="text-sm font-sans text-[#110B0D]/60 mb-8 uppercase tracking-widest">
                  14 . 08 . 2024
                </div>
                <button className="px-6 py-3 bg-[#4A0E1B] text-[#F9F6F0] rounded-full font-medium text-sm shadow-xl flex items-center gap-2">
                  <Heart size={16} className="fill-current" /> Open My Letter
                </button>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-8 md:-left-12 bg-primary-wine/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-accent-rose/20 flex items-center justify-center">
              <Heart size={16} className="text-accent-rose fill-accent-rose" />
            </div>
            <div>
              <p className="text-xs text-white/60 font-medium">Memories added</p>
              <p className="text-sm font-semibold text-primary-ivory">12 photos</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 -right-6 md:-right-12 bg-primary-wine/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3"
          >
             <div className="w-8 h-8 rounded-full bg-accent-champagne/20 flex items-center justify-center">
              <Calendar size={16} className="text-accent-champagne" />
            </div>
            <div>
              <p className="text-xs text-white/60 font-medium">Together since</p>
              <p className="text-sm font-semibold text-primary-ivory">14.08.2023</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-4 right-10 bg-primary-wine/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3"
          >
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircleHeart size={16} className="text-primary-ivory" />
            </div>
            <p className="text-sm font-medium text-primary-ivory">A message from David</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

