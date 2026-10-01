"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function PublishedProposalPage() {
  const [answered, setAnswered] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2B0810] selection:bg-[#BFA15F] selection:text-white pb-32">
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-30"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=40&w=1000&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/40 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center"
        >
          <span className="text-[#BFA15F] text-sm tracking-[0.5em] uppercase mb-8 block font-medium">To My Forever</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[1] text-[#2B0810] mb-8">
            Priya & David
          </h1>
          <p className="text-xl md:text-2xl font-display italic text-black/60">
            A journey that started on 14 August 2023.
          </p>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/30"
        >
          Scroll softly ↓
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto px-6 mt-32 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-display mb-10">Our Beginning</h2>
          <p className="font-sans text-lg md:text-xl text-black/70 leading-relaxed mb-6 font-light">
            I still remember the exact moment I saw you. The world seemed to slow down, and for the first time in my life, everything just made sense. 
          </p>
          <p className="font-sans text-lg md:text-xl text-black/70 leading-relaxed mb-16 font-light">
            Every day since then has been the best day of my life. You are my best friend, my confidant, and the only person I want to wake up next to.
          </p>
        </motion.div>
      </section>

      {/* The Question */}
      <section className="max-w-2xl mx-auto px-6 mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl border border-[#BFA15F]/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#BFA15F]/5 to-transparent pointer-events-none" />
          
          <h3 className="text-5xl md:text-7xl font-display text-[#2B0810] mb-12 relative z-10">
            Will you marry me?
          </h3>

          {!answered ? (
            <div className="flex flex-col gap-4 relative z-10">
              <button 
                onClick={() => setAnswered(true)}
                className="w-full py-5 bg-[#2B0810] text-[#F9F6F0] rounded-full text-lg font-medium hover:bg-[#4A0E1B] transition-colors shadow-lg"
              >
                YES ❤️
              </button>
              <button 
                onClick={() => setAnswered(true)}
                className="w-full py-5 bg-[#F9F6F0] text-[#2B0810] border border-[#2B0810]/10 rounded-full text-lg font-medium hover:bg-[#BFA15F]/10 transition-colors"
              >
                YES, OBVIOUSLY ❤️
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <Heart size={48} className="text-[#C46D7D] mx-auto mb-6 fill-current animate-pulse" />
              <p className="text-2xl font-display italic text-[#2B0810]">
                I can't wait for forever with you.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

    </main>
  );
}
