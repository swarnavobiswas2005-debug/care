"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Heart, CalendarHeart, Clock } from "lucide-react";

export function ProductPreview() {
  return (
    <section id="examples" className="py-32 px-6 md:px-12 bg-primary-wine relative border-y border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-ivory leading-tight mb-2">
            Not just a message.
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-accent-blush leading-tight italic">
            An experience.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl h-[600px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-primary-ivory flex flex-col items-center"
        >
          {/* Scrollable internal mock page */}
          <div className="absolute inset-0 overflow-hidden transform-gpu group-hover:-translate-y-12 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col bg-[#FAF8F5]">
            
            {/* Hero Image in the preview */}
            <div className="w-full h-80 relative shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=80&w=2000&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
            </div>

            {/* Content inside preview */}
            <div className="px-8 pb-12 flex flex-col items-center text-center shrink-0 -mt-16 relative z-10">
              <div className="text-xs font-sans tracking-widest text-primary-burgundy mb-4 uppercase">Our Story</div>
              <h3 className="text-5xl font-display text-primary-black mb-4">Emma & James</h3>
              <p className="font-sans text-primary-black/60 max-w-md mx-auto mb-8">
                365 days of you and me. Thousands of memories. One person I&apos;d choose again and again.
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto mb-12">
                 <div className="p-4 bg-white rounded-xl shadow-sm border border-black/5 flex flex-col items-center gap-2">
                   <CalendarHeart size={20} className="text-accent-rose" />
                   <span className="text-xs font-sans text-black/60 uppercase">Started</span>
                   <span className="text-sm font-medium text-black">14.08.2023</span>
                 </div>
                 <div className="p-4 bg-white rounded-xl shadow-sm border border-black/5 flex flex-col items-center gap-2">
                   <Clock size={20} className="text-accent-rose" />
                   <span className="text-xs font-sans text-black/60 uppercase">Together</span>
                   <span className="text-sm font-medium text-black">1 Year</span>
                 </div>
              </div>

              {/* Letter section */}
              <div className="max-w-xl mx-auto text-left w-full mb-12">
                <p className="font-display italic text-primary-burgundy text-2xl mb-4">My dear Emma,</p>
                <p className="font-sans text-black/70 leading-relaxed text-sm mb-4">
                  When I first met you, I had no idea you would become this important to me. 
                  Every laugh we&apos;ve shared, every late-night conversation, every quiet moment...
                </p>
                <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-black/20 text-xs">
                  [ Memory Photo Carousel ]
                </div>
              </div>
              
              {/* Final Question */}
              <div className="pt-8 border-t border-black/10 w-full max-w-xl">
                 <h4 className="font-display text-3xl text-black mb-6">Are you ready for year two?</h4>
                 <button className="px-8 py-3 bg-primary-wine text-white rounded-full text-sm font-medium">Yes, always</button>
              </div>

            </div>
          </div>

          {/* Fixed overlay to encourage clicking the demo */}
          <div className="absolute inset-0 bg-primary-wine/20 group-hover:bg-primary-wine/50 transition-colors duration-500 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/20 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
               Click to explore demo <Play size={16} className="fill-current" />
             </div>
          </div>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-wine bg-primary-ivory border border-transparent rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary-ivory/20"
          >
            Try the Demo <span className="ml-2">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
