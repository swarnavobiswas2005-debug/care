"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function CtaSection() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="py-40 px-6 md:px-12 bg-primary-wine relative overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-rose/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-primary-ivory leading-[1.1] tracking-tight mb-6"
        >
          Someone special is waiting.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-sans text-primary-ivory/80 mb-12"
        >
          Give them something they can keep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-primary-wine bg-primary-ivory rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(249,246,240,0.2)]"
          >
            Craft Your Love Page <span className="ml-2">→</span>
          </Link>
          <Link
            href="#experiences"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-primary-ivory border border-primary-ivory/30 rounded-full hover:bg-primary-ivory/10 transition-colors"
          >
            Explore Experiences
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
