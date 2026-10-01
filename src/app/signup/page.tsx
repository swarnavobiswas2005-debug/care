"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.user);
        router.push("/dashboard");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#FDFBF7] text-primary-black">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 relative z-10">
        <Link href="/" className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 text-black/50 hover:text-black transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <span className="text-primary-burgundy text-xs tracking-widest uppercase mb-4 block font-semibold">Join CARE</span>
          <h1 className="text-4xl font-display mb-2 text-primary-wine">Craft your first experience.</h1>
          <p className="text-black/60 font-sans mb-10">Create an account to start building.</p>
          
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/80">Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/80">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/80">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy transition-all"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-primary-wine text-white rounded-xl font-medium hover:bg-primary-burgundy transition-colors shadow-lg shadow-primary-wine/10 mt-4 disabled:opacity-50">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-black/60 font-sans">
            Already have an account? <Link href="/login" className="text-primary-burgundy font-medium hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:block w-1/2 relative bg-primary-burgundy overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-wine via-primary-wine/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-24 text-center">
          <div className="text-6xl font-display text-white mb-6">CARE</div>
          <h2 className="text-2xl font-sans text-white/80 font-light max-w-sm">
            Craft something they'll never forget.
          </h2>
        </div>
      </div>
    </main>
  );
}

