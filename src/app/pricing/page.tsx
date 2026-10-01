import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Pizza, Heart, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-primary-ivory text-primary-black">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display text-primary-wine mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl md:text-2xl font-sans text-primary-black/70 max-w-2xl mx-auto">
          No subscriptions. No hidden fees. Just true love.
        </p>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto mb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-black/5 flex flex-col items-center text-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Pizza size={200} className="text-accent-rose rotate-12" />
          </div>

          <div className="w-20 h-20 bg-accent-rose/10 rounded-full flex items-center justify-center mb-8 relative z-10">
            <Gift size={40} className="text-accent-rose" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display text-primary-wine mb-4 relative z-10">
            The "Best Friend" Tier
          </h2>
          
          <div className="text-6xl md:text-7xl font-display text-primary-wine mb-8 relative z-10">
            $0
            <span className="text-xl text-primary-black/50 font-sans tracking-wide uppercase block mt-2">Forever</span>
          </div>
          
          <div className="space-y-6 text-lg md:text-xl font-sans text-primary-black/70 mb-12 relative z-10 max-w-2xl">
            <p>
              That's right, using CARE is completely free! However, if you feel incredibly generous and insist on paying for this masterpiece, the accepted currencies are:
            </p>
            
            <div className="bg-primary-wine/5 p-8 rounded-2xl border border-primary-wine/10 text-left space-y-4">
               <div className="flex items-start gap-4">
                 <div className="p-2 bg-primary-wine rounded-full text-white shrink-0 mt-1">
                   <Pizza size={20} />
                 </div>
                 <p className="font-medium text-xl text-primary-wine">JUST GIFT FOOD 🍕🍔</p>
               </div>
               
               <div className="flex items-center gap-4 py-2 opacity-50">
                  <div className="flex-1 h-px bg-primary-wine/20"></div>
                  <span className="font-display italic text-primary-wine">OR</span>
                  <div className="flex-1 h-px bg-primary-wine/20"></div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-2 bg-accent-rose rounded-full text-white shrink-0 mt-1">
                   <Heart size={20} />
                 </div>
                 <p className="font-medium text-xl text-primary-wine">
                   A PARTNER! <br/>
                   <span className="text-base text-primary-black/70 font-normal italic mt-2 block">
                     (Seriously, if any of your female friends are single in their 20s... asking for a friend. 😉)
                   </span>
                 </p>
               </div>
            </div>
          </div>

          <Link 
            href="/create/love-letter"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-wine rounded-full hover:scale-105 transition-transform shadow-xl relative z-10 w-full md:w-auto"
          >
            Start Creating for Free
          </Link>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
