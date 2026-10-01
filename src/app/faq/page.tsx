"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly is CARE?",
    answer: "CARE is a premium platform for crafting deeply personal, digital emotional experiences. Instead of a quick text message, you send a beautifully designed, cinematic web experience that your recipient will remember forever."
  },
  {
    question: "How long do the pictures stay in the message?",
    answer: "For your privacy, any pictures you upload into the letters self-destruct after exactly 7 days. Make sure your recipient opens it before then!"
  },
  {
    question: "Can I use Spotify instead of YouTube for the background music?",
    answer: "You can, but Spotify severely limits third-party embeds to 30-second previews. We highly recommend using YouTube links if you want the full song to play."
  },
  {
    question: "What happens if they don't cry when reading my letter?",
    answer: "Then our Cinematic mode failed us! Just kidding. But seriously, if they don't get at least a little misty-eyed, you might want to check if they're a robot. Beep boop."
  },
  {
    question: "Are these letters actually free to send?",
    answer: "Currently, yes! You can craft and send these premium experiences for free while we are in beta."
  },
  {
    question: "My partner broke up with me anyway after I sent the Apology letter. Can I get a refund?",
    answer: "Since it was free, we can offer you a 100% refund of $0.00. We also offer a complimentary virtual hug. (Sorry about that, maybe try the 'Just Because' template next time?)"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-primary-wine text-primary-ivory selection:bg-accent-rose selection:text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-rose text-sm tracking-[0.3em] uppercase mb-4 block font-medium">
              Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-display leading-[1.1] mb-6">
              Frequently Asked <span className="italic text-accent-rose">Questions</span>
            </h1>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-primary-ivory/10 rounded-2xl overflow-hidden bg-primary-ivory/5"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-ivory/5 transition-colors"
                >
                  <span className="font-display text-xl">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-accent-rose transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-primary-ivory/70 font-sans leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
