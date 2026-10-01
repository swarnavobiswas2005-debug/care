"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, Clock, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    icon: <ShieldCheck size={24} className="text-accent-blush mb-4" />,
    title: "Your story. Your photos.",
    desc: "You retain full ownership of all your content.",
  },
  {
    icon: <Lock size={24} className="text-accent-blush mb-4" />,
    title: "Private by design.",
    desc: "Pages are hidden from search engines by default.",
  },
  {
    icon: <Sparkles size={24} className="text-accent-blush mb-4" />,
    title: "No coding required.",
    desc: "Our premium builder handles the design for you.",
  },
  {
    icon: <Clock size={24} className="text-accent-blush mb-4" />,
    title: "Create in minutes.",
    desc: "From idea to a published experience instantly.",
  }
];

export function TrustSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-primary-burgundy relative border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              {item.icon}
              <h4 className="text-lg font-display text-primary-ivory mb-2">{item.title}</h4>
              <p className="text-sm font-sans text-primary-ivory/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
