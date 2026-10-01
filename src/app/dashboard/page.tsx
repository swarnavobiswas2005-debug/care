"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Plus, MoreHorizontal, ExternalLink, Edit2, Share2, Copy, Trash2, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch("/api/experiences");
        if (res.ok) {
          const data = await res.json();
          setExperiences(data);
        }
      } catch (err) {} finally {
        setLoading(false);
      }
    }
    if (user) fetchExperiences();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience? This cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading || loading) return <div className="min-h-screen bg-[#Fdfbf7] flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#Fdfbf7] text-primary-wine">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-primary-wine">
            Welcome, {user?.name.split(" ")[0]}
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-wine text-primary-ivory rounded-full hover:bg-primary-burgundy transition-colors shadow-lg font-medium text-sm"
          >
            <Plus size={18} />
            Create New Experience
          </button>
        </div>

        {/* Existing Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {experiences.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-black/10 rounded-3xl">
              <p className="text-black/50 mb-4 font-sans">You haven't crafted any experiences yet.</p>
              <button onClick={() => setIsModalOpen(true)} className="text-primary-burgundy font-medium hover:underline">Start crafting now →</button>
            </div>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${exp.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {exp.status}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display text-primary-wine mb-1 capitalize">{exp.type} Experience</h3>
                <p className="text-sm font-sans text-black/50 mb-6 flex-1">Last edited: {new Date(exp.updatedAt).toLocaleDateString()}</p>
                
                {exp.status === 'published' ? (
                  <div className="p-3 bg-[#Fdfbf7] rounded-xl border border-black/5 flex items-center justify-between mb-8 group-hover:border-primary-burgundy/20 transition-colors">
                    <span className="text-sm font-sans text-primary-burgundy truncate pr-4">care.love/e/{exp.slug}</span>
                    <button className="text-primary-wine hover:text-accent-rose transition-colors shrink-0">
                      <Copy size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="h-12 mb-8" />
                )}

                <div className="flex justify-between border-t border-black/5 pt-6 divide-x divide-black/5">
                  {exp.status === 'published' && (
                    <Link href={`/e/${exp.slug}`} target="_blank" className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-black/60 hover:text-primary-wine transition-colors flex-1">
                      <ExternalLink size={18} /> Open
                    </Link>
                  )}
                  <Link href={`/create/${exp.type}?id=${exp.id}`} className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-black/60 hover:text-primary-wine transition-colors flex-1">
                    <Edit2 size={18} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(exp.id)} className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-black/40 hover:text-red-600 transition-colors flex-1">
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Create New Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary-wine/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 border-b border-black/5 flex justify-between items-center bg-[#Fdfbf7]">
                <div>
                  <h2 className="text-3xl font-display text-primary-wine mb-2">What do you want to create?</h2>
                  <p className="text-black/60 font-sans text-sm">Select an experience to begin crafting your message.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/apology" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-accent-rose hover:bg-accent-rose/5 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">❤️</span>
                  <span className="font-medium text-primary-wine">Apology</span>
                </Link>
                <Link href="/proposal" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-accent-champagne hover:bg-accent-champagne/10 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">💍</span>
                  <span className="font-medium text-primary-wine">Proposal</span>
                </Link>
                <Link href="/anniversary" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-primary-burgundy hover:bg-primary-burgundy/5 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
                  <span className="font-medium text-primary-wine">Anniversary</span>
                </Link>
                <Link href="/birthday" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-accent-blush hover:bg-accent-blush/10 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎂</span>
                  <span className="font-medium text-primary-wine">Birthday</span>
                </Link>
                <Link href="/love-letter" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-primary-wine hover:bg-primary-wine/5 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">💌</span>
                  <span className="font-medium text-primary-wine">Love Letter</span>
                </Link>
                <Link href="/just-because" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-black hover:bg-black/5 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🌙</span>
                  <span className="font-medium text-primary-wine">Just Because</span>
                </Link>
                
                <Link href="/durga-puja" className="col-span-1 sm:col-span-2 mt-2 flex items-center gap-4 p-5 rounded-2xl border-2 border-[#8B0000]/30 bg-[#8B0000]/5 hover:bg-[#8B0000]/10 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">Limited Edition</div>
                  <span className="text-3xl group-hover:scale-110 transition-transform">🌸</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#8B0000] text-lg">Durga Puja</span>
                    <span className="text-sm text-[#8B0000]/70">For your permanent Ashtami partner</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
