import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-wine pt-24 pb-12 border-t border-white/10 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
        
        <div className="md:col-span-5 flex flex-col items-start">
          <Link href="/" className="text-3xl font-display font-medium tracking-wide text-primary-ivory mb-6">
            CARE
          </Link>
          <p className="text-primary-ivory/60 font-sans text-lg max-w-sm">
            Craft something they&apos;ll never forget.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="text-primary-ivory font-display text-lg tracking-wide mb-2">Product</h5>
          <Link href="#experiences" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Experiences</Link>
          <Link href="#how-it-works" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">How It Works</Link>
          <Link href="#examples" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Examples</Link>
          <Link href="/pricing" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Pricing</Link>
          <Link href="/faq" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">FAQ</Link>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="text-primary-ivory font-display text-lg tracking-wide mb-2">Account</h5>
          <Link href="/login" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Log In</Link>
          <Link href="/signup" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Create Account</Link>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h5 className="text-primary-ivory font-display text-lg tracking-wide mb-2">Legal</h5>
          <Link href="/privacy" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Terms of Service</Link>
          <Link href="/cookie" className="text-primary-ivory/60 hover:text-primary-ivory text-sm font-sans transition-colors">Cookie Policy</Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
        <p className="text-primary-ivory/40 text-sm font-sans flex items-center gap-1">
          &copy; {new Date().getFullYear()} CARE. All rights reserved. Built with <Heart size={14} className="text-accent-rose mx-1" />
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-primary-ivory/40 hover:text-primary-ivory transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-primary-ivory/40 hover:text-primary-ivory transition-colors" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
