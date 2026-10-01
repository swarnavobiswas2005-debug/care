"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const experiences = [
  {
    id: "apology",
    title: "SAY I'M SORRY",
    description: "For when \"I'm sorry\" isn't enough.",
    cta: "Craft an Apology",
    color: "from-primary-burgundy to-primary-wine",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=40&w=600&auto=format&fit=crop", // Moody leaf
  },
  {
    id: "proposal",
    title: "ASK THE BIG QUESTION",
    description: "Craft a proposal experience they'll remember.",
    cta: "Craft a Proposal",
    color: "from-[#631425] to-primary-wine",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=40&w=600&auto=format&fit=crop", // Rings
  },
  {
    id: "anniversary",
    title: "CELEBRATE US",
    description: "Anniversary, relationship milestones and special moments.",
    cta: "Craft an Anniversary",
    color: "from-[#57101E] to-primary-wine",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=40&w=600&auto=format&fit=crop", // Couple
  },
  {
    id: "just-because",
    title: "JUST BECAUSE",
    description: "Sometimes you don't need a reason.",
    cta: "Craft Something",
    color: "from-[#3D0A14] to-primary-wine",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=40&w=600&auto=format&fit=crop", // Hands heart
  },
  {
    id: "durga-puja",
    title: "DURGA PUJA (SPECIAL)",
    description: "For your permanent Ashtami partner.",
    cta: "Craft Ashtami Letter",
    color: "from-[#8B0000] to-primary-wine",
    image: "/durga-puja-couple.jpg",
  }
];

import { useAuth } from "@/contexts/AuthContext";

export function ExperienceTypes() {
  const { isLoggedIn } = useAuth();
  
  return (
    <section id="experiences" className="py-32 px-6 md:px-12 bg-primary-wine relative border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display text-primary-ivory mb-6"
          >
            What are you trying to say?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-accent-rose"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={isLoggedIn ? `/create/${exp.id}` : `/login`} className="group block h-full experience-card-hover">
                <div className={`relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b ${exp.color} border border-white/10 shadow-xl shadow-primary-black/50`}>
                  
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 ease-out experience-img"
                      style={{ backgroundImage: `url(${exp.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-wine via-primary-wine/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-end">
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-primary-ivory mb-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                      {exp.title}
                    </h3>
                    <p className="text-primary-ivory/80 font-sans mb-8 transform group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                      {exp.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-accent-blush font-medium text-sm tracking-wide uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {exp.cta} <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

