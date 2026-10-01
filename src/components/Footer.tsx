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

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mt-12 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <span className="text-primary-ivory font-display text-xl tracking-wide">Open Source</span>
        </div>
        <p className="text-primary-ivory/80 font-sans mb-4">
          If you liked this project, please give me a ⭐ on GitHub and follow me!
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/swarnavobiswas2005-debug/care" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/10 flex items-center gap-2">
            Star Repository
          </a>
          <a href="https://github.com/swarnavobiswas2005-debug" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-primary-ivory hover:bg-white text-primary-wine rounded-full text-sm font-medium transition-colors flex items-center gap-2">
            Follow @swarnavobiswas2005-debug
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
        <p className="text-primary-ivory/40 text-sm font-sans flex items-center gap-1">
          &copy; {new Date().getFullYear()} CARE. All rights reserved. Built with <Heart size={14} className="text-accent-rose mx-1" />
        </p>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/swarnavobiswas2005-debug" target="_blank" rel="noopener noreferrer" className="text-primary-ivory/40 hover:text-primary-ivory transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="#" className="text-primary-ivory/40 hover:text-primary-ivory transition-colors" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
