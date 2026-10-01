"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import Link from "next/link";

type Emotion = "romantic" | "sad" | "joyful";

const EMOTION_CONFIG = {
  romantic: {
    bg: "from-[#2B0810]/20 to-transparent",
    textHighlight: "text-[#8B5E66]",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112135.mp3", // romantic piano
  },
  sad: {
    bg: "from-slate-900/20 to-transparent",
    textHighlight: "text-slate-500",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_a161ed8087.mp3?filename=sad-piano-107722.mp3", // sad piano
  },
  joyful: {
    bg: "from-amber-200/20 to-transparent",
    textHighlight: "text-amber-600",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/11/24/audio_3d1a84f553.mp3?filename=upbeat-acoustic-96265.mp3", // joyful acoustic
  }
};

function determineEmotion(text: string, type?: string): Emotion {
  if (type === "apology") return "sad";
  if (type === "birthday" || type === "durga-puja") return "joyful";
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

const getYoutubeData = (url: string, explicitStart?: string | number, explicitEnd?: string | number) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?]*)/);
  if (!match) return null;
  
  const id = match[1];
  let start = explicitStart ? parseInt(explicitStart.toString(), 10) : 0;
  let end = explicitEnd ? parseInt(explicitEnd.toString(), 10) : 0;

  // URL params override explicit fields for backward compatibility
  const tMatch = url.match(/[?&](?:t|start)=([^&]+)/);
  if (tMatch) {
    const timeStr = tMatch[1];
    start = 0;
    if (timeStr.includes('m') || timeStr.includes('s')) {
      const min = timeStr.match(/(\d+)m/);
      const sec = timeStr.match(/(\d+)s/);
      if (min) start += parseInt(min[1]) * 60;
      if (sec) start += parseInt(sec[1]);
    } else {
      start = parseInt(timeStr, 10);
    }
  }
  
  return { id, start, end };
};

const getSpotifyData = (url: string) => {
  if (!url) return null;
  const match = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
  return match ? { type: match[1], id: match[2] } : null;
};

// Floating Elements Component
const FloatingElements = ({ emotion, type }: { emotion: Emotion, type?: string }) => {
  const [elements, setElements] = useState<{ id: number; left: string; animationDuration: string; delay?: string }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 5}s`
    }));
    setElements(newElements);
  }, [emotion]);

  if (emotion === 'romantic') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {elements.map(el => (
          <motion.div
            key={el.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
            transition={{ duration: parseFloat(el.animationDuration), repeat: Infinity, delay: parseFloat(el.delay as string) }}
            className="absolute text-accent-rose text-2xl"
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
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {elements.map((el, i) => (
          <motion.div
            key={el.id}
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 0.5, 0] }}
            transition={{ duration: parseFloat(el.animationDuration) * 0.5, repeat: Infinity, delay: parseFloat(el.delay as string) }}
            className="absolute w-[1px] h-12 bg-blue-400/30"
            style={{ left: el.left }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(el => (
        <motion.div
          key={el.id}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: parseFloat(el.animationDuration), repeat: Infinity, delay: parseFloat(el.delay as string) }}
          className={type === 'durga-puja' ? "absolute text-2xl" : "absolute w-3 h-3 rounded-full"}
          style={type === 'durga-puja' ? { left: el.left } : { left: el.left, backgroundColor: ['#FCD34D', '#F87171', '#60A5FA', '#34D399'][el.id % 4] }}
        >
          {type === 'durga-puja' && (el.id % 2 === 0 ? '🌸' : '🪔')}
        </motion.div>
      ))}
    </div>
  );
};

import { useNetworkQuality } from "@/hooks/useNetworkQuality";

export default function PublicExperienceClient({ 
  content, 
  template 
}: { 
  content: any, 
  template: string 
}) {
  const [emotion, setEmotion] = useState<Emotion>("romantic");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isHighSpeed = useNetworkQuality();

  const ytData = getYoutubeData(content.youtubeUrl, content.youtubeStart, content.youtubeEnd);
  const spotifyData = getSpotifyData(content.youtubeUrl);

  useEffect(() => {
    // Analyze emotion on mount
    const fullText = `${content.title || ""} ${content.message || ""}`;
    setEmotion(determineEmotion(fullText, content.experienceType));
  }, [content]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const toggleAudio = () => {
    if (ytData || spotifyData) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (!ytData && !spotifyData && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Audio autoplay prevented", err);
      });
    }
  };

  const config = EMOTION_CONFIG[emotion];
  const isCinematic = template === 'cinematic';
  const isDark = isCinematic || emotion === 'sad';

  // The landing cover to require user interaction for audio playback
  if (!hasStarted) {
    return (
      <main 
        className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden select-none ${isCinematic ? 'bg-[#110B0D] text-white' : 'bg-[#FDFBF7] text-[#110B0D]'}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {isCinematic && (
          <>
            {isHighSpeed ? (
              <div className="fixed inset-0 pointer-events-none z-30 opacity-5 mix-blend-screen bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" style={{ backgroundSize: '100px 100px' }} />
            ) : (
              <div className="fixed inset-0 pointer-events-none z-30 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]" />
            )}
          </>
        )}
        <FloatingElements emotion={emotion} type={content.experienceType} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="font-display italic text-2xl mb-8 opacity-70">A message for {content.recipient || "you"}</div>
          <button 
            onClick={startExperience}
            className={`px-10 py-5 rounded-full text-lg font-medium shadow-xl flex items-center gap-3 mx-auto transition-transform hover:scale-105 ${
              isCinematic ? 'bg-white text-black' : 'bg-primary-wine text-white'
            }`}
          >
            <Play size={20} /> Open Experience
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main 
      className={`min-h-screen transition-colors duration-1000 overflow-hidden relative select-none ${isCinematic ? 'bg-[#110B0D] text-white' : 'bg-[#FDFBF7] text-[#110B0D]'}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {!ytData && !spotifyData && (
        <audio 
          ref={audioRef}
          src={config.audioUrl}
          loop
        />
      )}

      {ytData && isPlaying && (
        <iframe
          src={`https://www.youtube.com/embed/${ytData.id}?autoplay=1&loop=1&playlist=${ytData.id}&controls=0&showinfo=0&autohide=1${ytData.start ? `&start=${ytData.start}` : ''}${ytData.end ? `&end=${ytData.end}` : ''}`}
          allow="autoplay"
          className="hidden"
        />
      )}

      {spotifyData && isPlaying && (
        <div className="fixed bottom-6 right-6 z-50 w-[300px] shadow-2xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105">
          <iframe 
            src={`https://open.spotify.com/embed/${spotifyData.type}/${spotifyData.id}?utm_source=generator&theme=0`} 
            width="100%" 
            height="80" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="block"
          />
        </div>
      )}

      <FloatingElements emotion={emotion} type={content.experienceType} />
      
      {/* Audio Control */}
      <button 
        onClick={toggleAudio}
        className={`fixed top-8 right-8 z-50 p-4 rounded-full backdrop-blur-md transition-all ${
          isCinematic ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'
        }`}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className={`absolute inset-0 bg-gradient-to-b ${config.bg} h-[60vh] pointer-events-none transition-all duration-1000`} />
      
      {isCinematic && (
        <>
          {isHighSpeed ? (
            <div className="fixed inset-0 pointer-events-none z-30 opacity-5 mix-blend-screen bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" style={{ backgroundSize: '100px 100px' }} />
          ) : (
            <div className="fixed inset-0 pointer-events-none z-30 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]" />
          )}
        </>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center relative z-20"
      >
        <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl mb-12 relative pointer-events-none bg-white">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
             {content.uploadedImage && (!content.imageExpiresAt || Date.now() < content.imageExpiresAt) ? (
               <motion.img 
                 animate={isCinematic ? { scale: [1, 1.15], filter: ['brightness(1)', 'brightness(0.85)'] } : {}}
                 transition={isCinematic ? { duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" } : {}}
                 src={content.uploadedImage} 
                 alt="Profile" 
                 className="w-full h-full object-cover" 
               />
             ) : (
               <motion.div 
                 animate={isCinematic ? { scale: [1, 1.15], filter: ['brightness(1)', 'brightness(0.85)'] } : {}}
                 transition={isCinematic ? { duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" } : {}}
                 className={`w-full h-full ${isHighSpeed ? "bg-[url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=40&w=400&auto=format&fit=crop')] bg-cover bg-center" : "bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CC]"}`} 
               />
             )}
          </div>
        </div>
        
        <p className={`font-display italic text-2xl mb-6 transition-colors duration-1000 ${config.textHighlight}`}>
          For {content.recipient || "Someone Special"}
        </p>
        
        <h1 className={`text-5xl md:text-7xl leading-tight mb-16 max-w-4xl ${content.experienceType === 'durga-puja' ? 'font-bengali italic' : emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-bold' : 'font-display'} ${isCinematic ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' : ''}`}>
          {content.title || "A special message..."}
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className={`w-full max-w-2xl text-left whitespace-pre-wrap text-lg md:text-xl leading-relaxed ${content.experienceType === 'durga-puja' ? 'font-bengali text-xl md:text-2xl' : emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-medium' : 'font-serif'} ${isCinematic ? 'text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-black/80'}`}
        >
          {content.message}
        </motion.div>

        {content.messageImage && (!content.imageExpiresAt || Date.now() < content.imageExpiresAt) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
            className={`w-full max-w-xl mt-16 relative rounded-2xl overflow-hidden shadow-2xl ${isCinematic ? 'ring-4 ring-white/10' : 'border-4 border-white'}`}
          >
            <img src={content.messageImage} alt="Special memory" className="w-full h-auto object-cover" />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className={`mt-24 text-2xl text-center ${content.experienceType === 'durga-puja' ? 'font-bengali text-[#8B0000]' : emotion === 'sad' ? 'font-cormorant italic text-slate-500' : emotion === 'joyful' ? 'font-quicksand font-bold text-amber-500' : 'font-display italic text-[#8B5E66]'}`}
        >
          {content.experienceType === 'apology' ? 'I am so sorry,' :
           content.experienceType === 'anniversary' ? 'Forever yours,' :
           content.experienceType === 'proposal' ? 'Yours eternally,' :
           content.experienceType === 'birthday' ? 'Warmest wishes,' :
           content.experienceType === 'durga-puja' ? 'পার্মানেন্ট অষ্টমীতে তোমার হাত ধরার পার্টনার' :
           content.experienceType === 'just-because' ? 'Thinking of you,' :
           'With love,'} <br/> 
          <span className="text-3xl mt-2 block">{content.sender || "Me"}</span>
        </motion.div>

        {/* Viral Growth Loop CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
          className={`mt-32 pt-16 border-t ${isCinematic ? 'border-white/10' : 'border-black/10'} w-full max-w-xl mx-auto flex flex-col items-center text-center`}
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-6 font-medium ${isCinematic ? 'text-white/40' : 'text-black/40'}`}>
            Make them smile too
          </p>
          <div className="relative inline-block group">
            <Link
              href="/"
              className={`inline-flex items-center justify-center px-8 py-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] transition-colors border ${
                isCinematic 
                  ? 'bg-transparent border-white text-white hover:bg-white hover:text-black' 
                  : 'bg-transparent border-[#4A0E1B] text-[#4A0E1B] hover:bg-[#4A0E1B] hover:text-[#FDFBF7]'
              }`}
            >
              CRAFT FOR YOUR PARTNER ALSO
            </Link>
            <div className={`absolute -bottom-6 right-0 text-xl md:text-2xl font-handwriting -rotate-6 opacity-90 group-hover:-rotate-12 transition-transform duration-300 ${isCinematic ? 'text-white/70' : 'text-[#8B5E66]'}`}>
              it's free...
            </div>
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}
