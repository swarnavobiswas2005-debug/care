import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Edit3, Send, Heart } from "lucide-react";

export default function DemoPage() {
  const steps = [
    {
      title: "1. Choose Your Emotion",
      description: "Start by selecting the right feeling for your message. Whether you're apologizing, proposing, or just saying 'I love you', our AI sets the perfect tone and layout.",
      image: "/demo-step-1.jpg",
      icon: <Heart size={24} className="text-accent-rose" />
    },
    {
      title: "2. Write with AI Magic",
      description: "Don't know what to say? Highlight any text and let CareAI rewrite it, make it more romantic, or fix the grammar. It's like having a professional poet by your side.",
      image: "/demo-step-2.jpg",
      icon: <Sparkles size={24} className="text-accent-blush" />
    },
    {
      title: "3. Craft the Visuals",
      description: "Add your favorite photos, YouTube music, and special dates. Watch as the editor instantly updates to show you exactly what your partner will see.",
      image: "/demo-step-3.jpg",
      icon: <Edit3 size={24} className="text-primary-wine" />
    },
    {
      title: "4. Send the Secret Link",
      description: "Once published, you get a beautiful, secure, uncopiable link. Send it to them via text or email and give them an experience they will never forget.",
      image: "/demo-step-4.jpg",
      icon: <Send size={24} className="text-amber-700" />
    }
  ];

  return (
    <main className="min-h-screen bg-primary-ivory text-primary-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display text-primary-wine mb-6">How It Works</h1>
        <p className="text-lg md:text-xl font-sans text-primary-black/70">
          A full walkthrough of how to craft a beautiful, cinematic romantic experience for your special someone in less than 3 minutes.
        </p>
      </section>

      {/* Walkthrough Steps */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-24">
        {steps.map((step, index) => (
          <div key={index} className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-black/5">
                {step.icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-primary-wine">{step.title}</h2>
              <p className="text-lg font-sans text-primary-black/70 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="flex-1 w-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* We use standard img to avoid next/image domain configuration issues since these are unsplash external images */}
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-primary-wine rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-display text-primary-ivory mb-6">Ready to create yours?</h2>
          <p className="text-primary-ivory/80 mb-10 font-sans">
            Start building your private romantic experience right now. It&apos;s completely free to start.
          </p>
          <Link 
            href="/experiences"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-primary-wine bg-primary-ivory rounded-full hover:scale-105 transition-transform"
          >
            Start Crafting
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
