"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

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

function determineEmotion(text: string): Emotion {
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

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?]*)/);
  return match ? match[1] : null;
};

// Floating Elements Component
const FloatingElements = ({ emotion }: { emotion: Emotion }) => {
  const [elements, setElements] = useState<{ id: number; left: string; animationDuration: string }[]>([]);

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
            ❤️
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
          className="absolute w-3 h-3 rounded-full"
          style={{ left: el.left, backgroundColor: ['#FCD34D', '#F87171', '#60A5FA', '#34D399'][el.id % 4] }}
        />
      ))}
    </div>
  );
};

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

  const ytId = getYoutubeId(content.youtubeUrl);

  useEffect(() => {
    // Analyze emotion on mount
    const fullText = `${content.title || ""} ${content.message || ""}`;
    setEmotion(determineEmotion(fullText));
  }, [content]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const toggleAudio = () => {
    if (ytId) {
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
    if (!ytId && audioRef.current) {
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
        <FloatingElements emotion={emotion} />
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
      
      {!ytId && (
        <audio 
          ref={audioRef}
          src={config.audioUrl}
          loop
        />
      )}

      {ytId && isPlaying && (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&autohide=1`}
          allow="autoplay"
          className="hidden"
        />
      )}

      <FloatingElements emotion={emotion} />
      
      {/* Audio Control */}
      <button 
        onClick={toggleAudio}
        className={`fixed top-8 right-8 z-50 p-4 rounded-full backdrop-blur-md transition-all ${
          isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'
        }`}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className={`absolute inset-0 bg-gradient-to-b ${config.bg} h-[60vh] pointer-events-none transition-all duration-1000`} />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center relative z-10"
      >
        <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-white shadow-2xl mb-12 overflow-hidden pointer-events-none">
           {/* Fallback image, normally you'd use content.imageUrl */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        
        <p className={`font-display italic text-2xl mb-6 transition-colors duration-1000 ${config.textHighlight}`}>
          For {content.recipient || "Someone Special"}
        </p>
        
        <h1 className={`text-5xl md:text-7xl leading-tight mb-16 max-w-4xl ${emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-bold' : 'font-display'}`}>
          {content.title || "A special message..."}
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className={`w-full max-w-2xl text-left whitespace-pre-wrap text-lg md:text-xl leading-relaxed ${emotion === 'sad' ? 'font-cormorant' : emotion === 'joyful' ? 'font-quicksand font-medium' : 'font-serif'} ${isDark ? 'text-white/80' : 'text-black/80'}`}
        >
          {content.message}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className={`mt-24 text-2xl text-center ${emotion === 'sad' ? 'font-cormorant italic text-slate-500' : emotion === 'joyful' ? 'font-quicksand font-bold text-amber-500' : 'font-display italic text-[#8B5E66]'}`}
        >
          {emotion === 'sad' ? 'Sincerely,' : emotion === 'joyful' ? 'Warmest wishes,' : 'With love,'} <br/> 
          <span className="text-3xl mt-2 block">{content.sender || "Me"}</span>
        </motion.div>
      </motion.div>
    </main>
  );
}
