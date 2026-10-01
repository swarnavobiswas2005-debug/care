"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Play, Settings, Image as ImageIcon, Type, Layout, Share } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CareAI } from "@/components/CareAI";
import { useNetworkQuality } from "@/hooks/useNetworkQuality";

type Emotion = "romantic" | "sad" | "joyful";

function determineEmotion(text: string, type?: string): Emotion {
  if (type === "apology") return "sad";
  if (type === "birthday") return "joyful";
  if (type === "proposal" || type === "anniversary" || type === "love-letter") return "romantic";
  
  if (!text) return "romantic";
  const t = text.toLowerCase();
  
  const sadWords = ["sorry", "forgive", "regret", "hurt", "mistake", "wrong", "sad", "apologize", "pain"];
  const joyfulWords = ["happy", "birthday", "celebrate", "party", "joy", "laugh", "amazing", "cheers", "fun", "congrats"];
  
  let sadScore = sadWords.filter(w => t.includes(w)).length;
  let joyScore = joyfulWords.filter(w => t.includes(w)).length;
  
  if (sadScore > joyScore && sadScore > 0) return "sad";
  if (joyScore > sadScore && joyScore > 0) return "joyful";
  return "romantic";
}

const getYoutubeData = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?]*)/);
  if (!match) return null;
  const id = match[1];
  return { id };
};

const FloatingElements = ({ emotion, type }: { emotion: Emotion, type?: string }) => {
  const [elements, setElements] = useState<{ id: number; left: string; animationDuration: string; delay: string }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 5}s`
    }));
    setElements(newElements);
  }, [emotion]);

  if (emotion === 'romantic') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {elements.map(el => (
          <motion.div
            key={el.id}
            initial={{ y: "800px", opacity: 0 }}
            animate={{ y: "-100px", opacity: [0, 0.6, 0] }}
            transition={{ duration: parseFloat(el.animationDuration), repeat: Infinity, delay: parseFloat(el.delay) }}
            className="absolute text-accent-rose text-xl"
            style={{ left: el.left }}
          >
            {type === 'proposal' ? '💍' : type === 'anniversary' ? '✨' : '❤️'}
          </motion.div>
        ))}
      </div>
    );
  }

  if (emotion === 'sad') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {elements.map(el => (
          <motion.div
            key={el.id}
            initial={{ y: "-100px", opacity: 0 }}
            animate={{ y: "800px", opacity: [0, 0.4, 0] }}
            transition={{ duration: parseFloat(el.animationDuration) * 0.5, repeat: Infinity, delay: parseFloat(el.delay) }}
            className="absolute w-[1px] h-10 bg-blue-400/30"
            style={{ left: el.left }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(el => (
        <motion.div
          key={el.id}
          initial={{ y: "-100px", opacity: 0, rotate: 0 }}
          animate={{ y: "800px", opacity: [0, 0.8, 0], rotate: 360 }}
          transition={{ duration: parseFloat(el.animationDuration), repeat: Infinity, delay: parseFloat(el.delay) }}
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{ left: el.left, backgroundColor: ['#FCD34D', '#F87171', '#60A5FA', '#34D399'][el.id % 4] }}
        />
      ))}
    </div>
  );
};

function ExperienceBuilderContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = params.type as string;
  const id = searchParams.get("id");

  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");

  // States
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState(type === "apology" ? "I am so sorry..." : "Our Story");
  const [message, setMessage] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeStart, setYoutubeStart] = useState("");
  const [youtubeEnd, setYoutubeEnd] = useState("");
  const [template, setTemplate] = useState("classic");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [messageImage, setMessageImage] = useState<string | null>(null);
  const isHighSpeed = useNetworkQuality();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/experiences/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            const content = JSON.parse(data.content || "{}");
            setRecipient(content.recipient || "");
            setSender(content.sender || "");
            setTitle(content.title || "");
            setMessage(content.message || "");
            setYoutubeUrl(content.youtubeUrl || "");
            setYoutubeStart(content.youtubeStart || "");
            setYoutubeEnd(content.youtubeEnd || "");
            setTemplate(data.template || "classic");
            setUploadedImage(content.uploadedImage || null);
            setMessageImage(content.messageImage || null);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    const payload = {
      type,
      template,
      status,
      content: { 
        recipient, 
        sender, 
        title, 
        message, 
        youtubeUrl,
        youtubeStart,
        youtubeEnd, 
        experienceType: type,
        uploadedImage,
        messageImage,
        imageExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 week
      }
    };

    try {
      if (id) {
        const res = await fetch(`/api/experiences/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (status === 'published') setPublishedSlug(data.slug);
      } else {
        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.id) {
          if (status === 'published') {
            setPublishedSlug(data.slug);
          } else {
            router.push(`/create/${type}?id=${data.id}`);
          }
        }
      }
    } catch (e) {} finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload a picture smaller than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // smaller for profile
        let scaleSize = 1;
        if (img.width > MAX_WIDTH) {
          scaleSize = MAX_WIDTH / img.width;
        }
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        setUploadedImage(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleMessageImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload a picture smaller than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // larger for message body
        let scaleSize = 1;
        if (img.width > MAX_WIDTH) {
          scaleSize = MAX_WIDTH / img.width;
        }
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        setMessageImage(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Selection tracking
  const [selectedText, setSelectedText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSelect = () => {
    if (!textRef.current) return;
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    setSelectedText(message.substring(start, end));
  };

  const handleInsert = (text: string) => {
    if (!textRef.current) return;
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const newMsg = message.substring(0, start) + "\n\n" + text + "\n\n" + message.substring(end);
    setMessage(newMsg);
  };

  const handleReplace = (text: string) => {
    if (!textRef.current) return;
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const newMsg = message.substring(0, start) + text + message.substring(end);
    setMessage(newMsg);
    setSelectedText("");
  };

  const emotion = determineEmotion(`${title} ${message}`, type as string);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-gray-50">Loading...</div>;

  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-gray-50 text-black">
      
      {/* Sidebar Editor */}
      <aside className={`w-full md:w-80 bg-white border-r border-black/10 h-full shrink-0 z-20 shadow-xl ${showMobilePreview ? 'hidden md:flex' : 'flex'} flex-col`}>
        <div className="h-16 flex items-center px-4 border-b border-black/5 justify-between shrink-0 bg-primary-wine text-white">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="font-display font-medium text-sm capitalize tracking-wider">{type} Builder</span>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Settings">
            <Settings size={18} />
          </button>
        </div>

        <div className="flex border-b border-black/5 shrink-0 bg-[#Fdfbf7]">
          <button 
            className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider ${activeTab === 'content' ? 'text-primary-wine border-b-2 border-primary-wine' : 'text-black/40 hover:text-black/60'}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button 
            className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider ${activeTab === 'design' ? 'text-primary-wine border-b-2 border-primary-wine' : 'text-black/40 hover:text-black/60'}`}
            onClick={() => setActiveTab("design")}
          >
            Design
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#Fdfbf7]">
          {activeTab === "content" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Recipient Name</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Headline</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Background Music</label>
                  <input 
                    type="text" 
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/... or https://open.spotify.com/track/..."
                    className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                  />
                </div>
                
                {getYoutubeData(youtubeUrl) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Start Time (sec)</label>
                      <input 
                        type="number" 
                        value={youtubeStart}
                        onChange={(e) => setYoutubeStart(e.target.value)}
                        placeholder="e.g. 60"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-black/40 uppercase tracking-widest">End Time (sec)</label>
                      <input 
                        type="number" 
                        value={youtubeEnd}
                        onChange={(e) => setYoutubeEnd(e.target.value)}
                        placeholder="e.g. 90"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors"
                      />
                    </div>
                    
                    <div className="col-span-2 mt-2">
                       <label className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2 block">Song Preview</label>
                       <div className="rounded-lg overflow-hidden border border-black/10 shadow-sm">
                         <iframe
                            width="100%"
                            height="120"
                            src={`https://www.youtube.com/embed/${getYoutubeData(youtubeUrl)?.id}?start=${youtubeStart || ''}&end=${youtubeEnd || ''}`}
                            allow="autoplay"
                            className="w-full"
                          />
                       </div>
                    </div>
                  </div>
                )}
                
                {!getYoutubeData(youtubeUrl) && (
                  <p className="text-[11px] text-black/40 font-medium">
                    * <strong className="text-black/60">YouTube is highly recommended</strong> for full song playback. Spotify only allows 30-second previews.
                  </p>
                )}
                
                {type === "durga-puja" && (
                  <div className="bg-[#8B0000]/5 p-3 rounded-lg border border-[#8B0000]/10 mt-2 space-y-1">
                    <p className="text-xs font-bold text-[#8B0000]">🎶 Ashtami Special Song Suggestions:</p>
                    <p className="text-[11px] text-black/60 font-medium">For Male Friend: <span className="text-[#8B0000] cursor-pointer underline" onClick={() => { setYoutubeUrl('https://www.youtube.com/watch?v=yD0dpeS1eak'); setYoutubeStart('90'); setYoutubeEnd('120'); }}>Click to use (1:30)</span></p>
                    <p className="text-[11px] text-black/60 font-medium">For Female Friend: <span className="text-[#8B0000] cursor-pointer underline" onClick={() => { setYoutubeUrl('https://www.youtube.com/watch?v=yD0dpeS1eak'); setYoutubeStart('172'); setYoutubeEnd('200'); }}>Click to use (2:52)</span></p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest flex items-center justify-between">
                  <span>Profile Picture (Optional)</span>
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Deletes in 1 week</span>
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-black/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-wine/5 file:text-primary-wine hover:file:bg-primary-wine/10 transition-colors"
                  />
                  {uploadedImage && (
                    <button onClick={() => setUploadedImage(null)} className="text-xs text-red-500 font-medium whitespace-nowrap hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Primary Message</label>
                <textarea 
                  ref={textRef}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onSelect={handleSelect}
                  onKeyUp={handleSelect}
                  onMouseUp={handleSelect}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-primary-burgundy transition-colors resize-none"
                  placeholder="Write your heart out..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest flex items-center justify-between">
                  <span>Message Picture (Optional)</span>
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Deletes in 1 week</span>
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleMessageImageUpload}
                    className="w-full text-sm text-black/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-wine/5 file:text-primary-wine hover:file:bg-primary-wine/10 transition-colors"
                  />
                  {messageImage && (
                    <button onClick={() => setMessageImage(null)} className="text-xs text-red-500 font-medium whitespace-nowrap hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest block">Theme Template</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setTemplate("classic")} className={`h-20 rounded-lg border-2 ${template === 'classic' ? 'border-primary-wine' : 'border-black/10'} bg-white flex items-center justify-center relative overflow-hidden`}>
                     {template === 'classic' && <span className="absolute inset-x-0 top-0 h-8 bg-primary-wine/10" />}
                     <span className={`text-xs font-medium ${template === 'classic' ? 'text-primary-wine mt-2' : 'text-black/60'} relative z-10`}>Classic</span>
                  </button>
                  <button onClick={() => setTemplate("cinematic")} className={`h-20 rounded-lg border-2 ${template === 'cinematic' ? 'border-primary-wine' : 'border-black/10'} bg-white flex items-center justify-center relative overflow-hidden`}>
                     {template === 'cinematic' && <span className="absolute inset-x-0 top-0 h-8 bg-primary-wine/10" />}
                     <span className={`text-xs font-medium ${template === 'cinematic' ? 'text-primary-wine mt-2' : 'text-black/60'} relative z-10`}>Cinematic</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-black/10 shrink-0 bg-white grid grid-cols-2 md:grid-cols-2 gap-2 pb-8 md:pb-4 relative">
          <button onClick={() => handleSave('draft')} disabled={saving} className="py-2.5 rounded-lg bg-gray-100 text-black/70 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50">
            <Save size={16} /> Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="py-2.5 rounded-lg bg-primary-wine text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary-burgundy transition-colors shadow-md disabled:opacity-50">
            <Share size={16} /> Publish
          </button>
          {/* Mobile Preview Button */}
          <button 
            onClick={() => setShowMobilePreview(true)} 
            className="md:hidden col-span-2 py-3 rounded-lg bg-black text-white font-medium text-sm flex items-center justify-center gap-2 mt-2 shadow-xl"
          >
            <Play size={16} /> View Preview
          </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <div className={`flex-1 bg-[#EBE5D9] relative flex-col items-center overflow-hidden ${showMobilePreview ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Mobile Back to Edit Button */}
        {showMobilePreview && (
          <button 
            onClick={() => setShowMobilePreview(false)}
            className="md:hidden absolute top-6 left-6 z-40 bg-white text-black px-4 py-2 rounded-full shadow-lg font-medium text-sm flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Edit
          </button>
        )}
        
        {/* Preview Toolbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-black/5">
          <button 
            onClick={() => setPreviewMode("mobile")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${previewMode === 'mobile' ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5'}`}
          >
            Mobile
          </button>
          <button 
            onClick={() => setPreviewMode("desktop")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${previewMode === 'desktop' ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5'}`}
          >
            Desktop
          </button>
        </div>

        {/* Device Frame */}
        <div className="w-full h-full p-6 pt-24 pb-12 flex justify-center overflow-y-auto custom-scrollbar">
          <motion.div 
            layout
            initial={false}
            animate={{ 
              width: previewMode === 'mobile' ? 390 : '100%',
              maxWidth: previewMode === 'desktop' ? 1024 : 390,
              borderRadius: previewMode === 'mobile' ? 40 : 16
            }}
            className={`h-fit min-h-[844px] shadow-2xl border-[8px] border-white relative overflow-hidden transform origin-top shrink-0 transition-colors duration-1000 ${template === 'cinematic' ? 'bg-[#110B0D] text-white' : 'bg-[#FDFBF7] text-[#110B0D]'}`}
          >
             {template === 'cinematic' && (
               <>
                 {isHighSpeed ? (
                   <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-screen bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" style={{ backgroundSize: '100px 100px' }} />
                 ) : (
                   <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]" />
                 )}
               </>
             )}
             
             {/* Mock Content based on state */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#2B0810]/5 to-transparent h-64 pointer-events-none z-0" />
             
             <FloatingElements emotion={emotion} type={type as string} />

             <div className="p-8 flex flex-col items-center text-center mt-12 relative z-10">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-6 relative bg-white">
                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full ${isHighSpeed ? "bg-[url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=400&auto=format&fit=crop')] bg-cover bg-center" : "bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CC]"}`} />
                    )}
                 </div>
               </div>
               
               <p className={`font-display italic text-xl mb-2 ${template === 'cinematic' ? 'text-white/60' : 'text-[#4A0E1B]'}`}>For {recipient || "Someone Special"}</p>
               <h1 className={`text-4xl leading-tight mb-8 ${emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-bold' : 'font-display'} ${template === 'cinematic' ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-[#110B0D]'}`}>
                 {title || "A special message..."}
               </h1>

               <div className={`w-full space-y-4 text-left whitespace-pre-wrap text-lg ${emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-medium' : 'font-serif'} ${template === 'cinematic' ? 'text-white/80' : 'text-black/70'}`}>
                 {message || (
                   <>
                    <div className="h-4 bg-black/5 rounded w-3/4" />
                    <div className="h-4 bg-black/5 rounded w-full" />
                    <div className="h-4 bg-black/5 rounded w-5/6" />
                   </>
                 )}
               </div>

               {messageImage && (
                 <div className="w-full mt-12 relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/10">
                   <img src={messageImage} alt="Uploaded message" className="w-full h-auto object-cover" />
                 </div>
               )}

               <div className={`mt-12 text-lg text-center ${emotion === 'sad' ? 'font-cormorant italic text-slate-500' : emotion === 'joyful' ? 'font-quicksand font-bold text-amber-600' : 'font-display italic text-[#8B5E66]'}`}>
                 {type === 'apology' ? 'I am so sorry,' :
                  type === 'anniversary' ? 'Forever yours,' :
                  type === 'proposal' ? 'Yours eternally,' :
                  type === 'birthday' ? 'Warmest wishes,' :
                  type === 'durga-puja' ? 'পার্মানেন্ট অষ্টমীতে তোমার হাত ধরার পার্টনার' :
                  type === 'just-because' ? 'Thinking of you,' :
                  'With love,'} <br/> 
                 <span className="text-xl mt-1 block">{sender || "Me"}</span>
               </div>
             </div>

          </motion.div>
        </div>

      </div>
      
      <CareAI 
        context={{ type, recipient, sender, title, message }} 
        selectedText={selectedText}
        onInsert={handleInsert}
        onReplace={handleReplace}
      />
      
      {/* Publish Success Modal */}
      <AnimatePresence>
        {publishedSlug && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-wine/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Share className="text-green-600" size={32} />
              </div>
              <h2 className="text-3xl font-display text-primary-wine mb-2">It's Ready.</h2>
              <p className="text-black/60 font-sans text-sm mb-8">
                Your experience has been beautifully crafted and published. It is now live at the link below.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-black/5 flex flex-col items-center gap-3 mb-8">
                <span className="font-sans font-medium text-primary-wine select-all text-sm sm:text-base break-all">
                  {window.location.origin}/e/{publishedSlug}
                </span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/e/${publishedSlug}`);
                    alert("Link copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black/80 transition-colors flex items-center gap-2"
                >
                  <Share size={14} /> Copy Link
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => window.open(`/e/${publishedSlug}`, '_blank')}
                  className="w-full py-3 bg-primary-wine text-white rounded-xl font-medium hover:bg-primary-burgundy transition-colors"
                >
                  View Live Experience
                </button>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-3 bg-white text-black/60 border border-black/10 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ExperienceBuilder() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-gray-50 flex items-center justify-center">Loading editor...</div>}>
      <ExperienceBuilderContent />
    </Suspense>
  );
}
