import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Sparkles, Edit3, Send, Heart, Shield, Clock, Users, Gift, Infinity as InfinityIcon } from "lucide-react";

export default function DemoPage() {
  const steps = [
    {
      title: "1. Choose Your Emotion",
      description: "Start by selecting the right feeling for your message. Whether you're apologizing, proposing, or just saying 'I love you', our AI sets the perfect tone and layout.",
      image: "/step1.jpg",
      icon: <Heart size={24} className="text-accent-rose" />
    },
    {
      title: "2. Write with AI Magic",
      description: "Don't know what to say? Highlight any text and let CareAI rewrite it, make it more romantic, or fix the grammar. It's like having a professional poet by your side.",
      image: "/step2.jpg",
      icon: <Sparkles size={24} className="text-accent-blush" />
    },
    {
      title: "3. Craft the Visuals",
      description: "Add your favorite photos, YouTube music, and special dates. Watch as the editor instantly updates to show you exactly what your partner will see.",
      image: "https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=600&auto=format&fit=crop",
      icon: <Edit3 size={24} className="text-primary-wine" />
    },
    {
      title: "4. Send the Secret Link",
      description: "Once published, you get a beautiful, secure, uncopiable link. Send it to them via text or email and give them an experience they will never forget.",
      image: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=40&w=600&auto=format&fit=crop",
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

      {/* Why Use CARE? */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-primary-wine mb-4">Why use CARE?</h2>
            <p className="text-lg text-primary-black/60 font-sans max-w-2xl mx-auto">
              Because a WhatsApp message gets buried, and a paper card gets lost in a drawer. CARE creates a permanent, cinematic digital memory.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
              <Shield className="text-accent-rose mb-6" size={32} />
              <h3 className="text-2xl font-display text-primary-wine mb-3">100% Private</h3>
              <p className="text-primary-black/60 font-sans leading-relaxed">
                Your letters are uncopiable, hidden from search engines, and can only be accessed by the exact secret link you share.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
              <Clock className="text-accent-blush mb-6" size={32} />
              <h3 className="text-2xl font-display text-primary-wine mb-3">Instant Delivery</h3>
              <p className="text-primary-black/60 font-sans leading-relaxed">
                No waiting for shipping or postal delays. Craft it at midnight, send it at 12:01 AM. Perfect for last-minute romantic gestures.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
              <InfinityIcon className="text-accent-rose mb-6" size={32} />
              <h3 className="text-2xl font-display text-primary-wine mb-3">Lasts Forever</h3>
              <p className="text-primary-black/60 font-sans leading-relaxed">
                Unlike social media stories that disappear in 24 hours, your CARE experience stays online forever, ready to be revisited anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for? */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
             <h2 className="text-4xl md:text-5xl font-display text-primary-wine mb-6">Who is this for?</h2>
             <p className="text-lg text-primary-black/70 font-sans mb-8 leading-relaxed">
               CARE is designed for anyone who wants to make someone feel truly special, seen, and deeply appreciated.
             </p>
             
             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <div className="p-2 bg-accent-rose/10 rounded-lg shrink-0 mt-1"><Heart size={20} className="text-accent-rose" /></div>
                 <div>
                   <h4 className="text-xl font-display text-primary-wine font-medium">Couples in Long-Distance</h4>
                   <p className="text-primary-black/60 font-sans text-sm mt-1">Bridge the physical gap with a digital space that feels incredibly intimate.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="p-2 bg-accent-blush/20 rounded-lg shrink-0 mt-1"><Gift size={20} className="text-accent-rose" /></div>
                 <div>
                   <h4 className="text-xl font-display text-primary-wine font-medium">Anniversary & Birthday Gifters</h4>
                   <p className="text-primary-black/60 font-sans text-sm mt-1">Elevate a standard physical gift by pairing it with a beautiful digital love letter.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="p-2 bg-primary-wine/10 rounded-lg shrink-0 mt-1"><Users size={20} className="text-primary-wine" /></div>
                 <div>
                   <h4 className="text-xl font-display text-primary-wine font-medium">People seeking forgiveness</h4>
                   <p className="text-primary-black/60 font-sans text-sm mt-1">A carefully crafted, emotional digital apology speaks louder than a quick text message.</p>
                 </div>
               </li>
             </ul>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=40&w=600&auto=format&fit=crop" alt="Couple holding hands" className="w-full h-full object-cover" />
          </div>
        </div>
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

