"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function PublishedApologyPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#110B0D] selection:bg-[#C46D7D] selection:text-white pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544061266-9b5cc1202e84?q=40&w=1000&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/60 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-2xl px-6"
        >
          <span className="text-[#8B5E66] text-xs tracking-[0.4em] uppercase mb-6 block font-medium">For Priya</span>
          <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-[#2B0810] mb-6">
            I am so sorry.
          </h1>
        </motion.div>
      </section>

      {/* Letter Section */}
      <section className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 -mt-10 border border-black/5"
        >
          <p className="font-sans text-lg text-black/80 leading-relaxed mb-6">
            When I look back at yesterday, all I feel is regret. You are the most important person in my life, and I let my stress get the better of me. 
          </p>
          <p className="font-sans text-lg text-black/80 leading-relaxed mb-6">
            I know that a simple "I'm sorry" doesn't fix the hurt I caused. I wanted to make this to show you that I am genuinely reflecting on my actions. You deserve a partner who communicates with patience and love, no matter what.
          </p>
          <p className="font-sans text-lg text-black/80 leading-relaxed mb-10">
            I promise to do better. I love you more than words can say.
          </p>
          
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
               <img src="https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=200&auto=format&fit=crop" alt="Sender" className="w-full h-full object-cover" />
             </div>
             <div>
               <p className="font-display italic text-xl text-[#2B0810]">Yours,</p>
               <p className="font-sans text-sm font-medium text-black/60 tracking-wider uppercase">David</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Memory Gallery */}
      <section className="max-w-4xl mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-display text-[#2B0810] mb-4">What we have is worth fighting for.</h3>
          <p className="text-black/50 font-sans">A few of my favorite moments with you.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {[
             "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=40&w=600&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=40&w=600&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1606213710777-96a5b678c2e0?q=40&w=600&auto=format&fit=crop"
           ].map((src, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               className="aspect-square rounded-2xl overflow-hidden shadow-md"
             >
               <img src={src} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Memory" />
             </motion.div>
           ))}
        </div>
      </section>
      
      {/* Footer Care badge */}
      <div className="mt-32 text-center flex flex-col items-center">
        <Heart size={24} className="text-[#C46D7D] mb-4 opacity-50" />
        <span className="text-xs font-medium uppercase tracking-widest text-black/30">Crafted with CARE</span>
      </div>

    </main>
  );
}
