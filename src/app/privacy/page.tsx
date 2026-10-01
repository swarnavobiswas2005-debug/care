import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function PrivacyMemePage() {
  const memes = [
    { title: "When you're mad but they bring food", url: "https://giphy.com/embed/11s7Ke7jcNxCHS" },
    { title: "Listening to them vent about work", url: "https://giphy.com/embed/l0HlPtbQaR2W6KcvC" },
    { title: "\"I'm not hungry, I'll just have some of yours\"", url: "https://giphy.com/embed/l41lPVMmb30JO72WA" },
    { title: "Trying to decide where to eat for dinner", url: "https://giphy.com/embed/xT0BKhunZWsqGLRsNG" },
    { title: "When they fall asleep 5 minutes into the movie", url: "https://giphy.com/embed/3o7TKRwpzc23ZMNehy" },
    { title: "When you successfully assemble IKEA furniture without fighting", url: "https://giphy.com/embed/l0He0B1237tKb5fWg" }
  ];

  return (
    <main className="min-h-screen bg-primary-ivory text-primary-black">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-accent-rose/10 rounded-full animate-bounce">
            <Sparkles size={32} className="text-accent-rose" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-display text-primary-wine mb-6">Privacy Policy?</h1>
        <p className="text-xl md:text-2xl font-sans text-primary-black/70 italic">
          Wait... did you really think we had a boring 40-page legal document here? 
        </p>
        <p className="text-lg font-sans text-primary-black/60 mt-4">
          Congratulations! You found the <strong>Secret Couple Meme Stash</strong>. Enjoy! 🤫
        </p>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memes.map((meme, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border border-black/5 hover:scale-105 transition-transform duration-300">
              <h3 className="font-display text-xl text-primary-wine mb-4 h-14">{meme.title}</h3>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <iframe 
                  src={meme.url}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  className="absolute inset-0 w-full h-full" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center">
         <p className="text-lg text-primary-black/60 font-sans mb-8">Okay, okay, back to romance...</p>
         <Link 
            href="/create/love-letter"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary-wine rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Create a Love Letter
          </Link>
      </section>

      <Footer />
    </main>
  );
}
