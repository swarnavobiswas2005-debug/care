"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Choose your moment",
    desc: "Pick what you want to say. Apology. Proposal. Anniversary. Birthday. Or simply \"I love you.\"",
  },
  {
    num: "02",
    title: "Make it yours",
    desc: "Add their name, your name, photos, dates, messages, memories, music, and personal details.",
  },
  {
    num: "03",
    title: "Send the link",
    desc: "We'll craft your private romantic webpage. Copy the link. Send it to them. Watch what happens.",
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 md:px-12 bg-primary-burgundy relative overflow-hidden">
      {/* Soft background light */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-rose/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-ivory leading-tight mb-8"
            >
              How it works.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-primary-ivory/80 font-sans max-w-md"
            >
              Three simple steps to craft a digital experience they will keep forever. No coding or design skills required.
            </motion.p>
          </div>

          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex gap-6 md:gap-8"
              >
                <div className="text-3xl md:text-4xl font-display text-accent-blush font-light italic mt-1">
                  {step.num}
                  <span className="block w-full h-px bg-accent-blush/30 mt-4" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-primary-ivory mb-3">{step.title}</h3>
                  <p className="text-primary-ivory/70 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
