"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const experiencesList = [
  {
    id: "apology",
    name: "I'm Sorry",
    description: "Sometimes 'I'm sorry' deserves more than two words.",
    cta: "Create My Apology",
    path: "/apology",
    color: "from-primary-burgundy to-primary-wine",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop", // Moody leaf
  },
  {
    id: "proposal",
    name: "Proposal",
    description: "Ready to ask the biggest question?",
    cta: "Create My Proposal",
    path: "/proposal",
    color: "from-[#F9F6F0] to-[#EEDCBE]",
    textColor: "text-primary-wine",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop", // Rings
  },
  {
    id: "anniversary",
    name: "Anniversary",
    description: "Another year of us. Turn memories into something you can revisit.",
    cta: "Create Our Anniversary",
    path: "/anniversary",
    color: "from-[#4A0E1B] to-[#2B0810]",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", // Couple
  },
  {
    id: "birthday",
    name: "Birthday",
    description: "Today is about you. A surprise more personal than a message.",
    cta: "Create Their Birthday",
    path: "/birthday",
    color: "from-[#E2B6C0] to-[#C46D7D]",
    textColor: "text-primary-wine",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop", // Party/Sparkler
  },
  {
    id: "love-letter",
    name: "Love Letter",
    description: "Some things are easier to write than say.",
    cta: "Write My Letter",
    path: "/love-letter",
    color: "from-[#Fdfbf7] to-[#F5F2F0]",
    textColor: "text-primary-wine",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop", // Envelope/Letter
  },
  {
    id: "just-because",
    name: "Just Because",
    description: "You don't need a reason to tell someone you love them.",
    cta: "Create Something",
    path: "/just-because",
    color: "from-[#3D0A14] to-primary-wine",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop", // Hands heart
  }
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-primary-wine text-primary-ivory selection:bg-accent-rose selection:text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-rose/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display text-primary-ivory mb-6"
          >
            What are you creating for them?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-primary-ivory/80 font-sans max-w-2xl"
          >
            Choose a moment. We&apos;ll help you turn it into something unforgettable.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiencesList.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={exp.path} className="group block h-full">
                <div className={`relative h-[450px] rounded-3xl overflow-hidden bg-gradient-to-b ${exp.color} border border-white/10 shadow-xl shadow-black/20 transform group-hover:-translate-y-2 transition-all duration-500 ease-out`}>
                  
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${exp.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${exp.textColor === 'text-primary-wine' ? 'from-white/90 via-white/10' : 'from-primary-wine via-primary-wine/10'} to-transparent`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    <h3 className={`text-3xl font-display font-medium ${exp.textColor || 'text-primary-ivory'} mb-3 transform group-hover:-translate-y-1 transition-transform duration-500`}>
                      {exp.name}
                    </h3>
                    <p className={`${exp.textColor ? 'text-primary-wine/80' : 'text-primary-ivory/80'} font-sans mb-8 transform group-hover:-translate-y-1 transition-transform duration-500 delay-75`}>
                      {exp.description}
                    </p>
                    
                    <div className={`flex items-center gap-2 ${exp.textColor ? 'text-primary-burgundy' : 'text-accent-blush'} font-medium text-sm tracking-wide uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100`}>
                      {exp.cta} <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
