"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Minus, ArrowUp, Loader2 } from "lucide-react";

type CareAIProps = {
  context: {
    type: string;
    recipient: string;
    sender: string;
    title: string;
    message: string;
  };
  selectedText: string;
  onInsert: (text: string) => void;
  onReplace: (text: string) => void;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  isSuggestion?: boolean;
};

const QUICK_ACTIONS = [
  "Make it more heartfelt",
  "Make it more romantic",
  "Make it sound natural",
  "Make it shorter",
  "Help me finish this",
  "Fix my grammar",
];

export function CareAI({ context, selectedText, onInsert, onReplace }: CareAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Namaste. I am your Royal Muse, here to help you craft the perfect words for your beloved.",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, context, selectedText }),
      });
      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: data.reply,
          isSuggestion: true
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "I couldn't generate that right now. Try again?"
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "I couldn't generate that right now. Try again?"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#731C2D] to-[#59111F] border-2 border-[#C5A059]/70 text-[#FDFBF7] rounded-full shadow-[0_8px_30px_rgba(115,28,45,0.3)] hover:shadow-[0_8px_40px_rgba(197,160,89,0.25)] transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/0 to-[#C5A059]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles size={18} className="text-[#C5A059] group-hover:scale-110 transition-transform duration-500 relative z-10" />
            <span className="font-display font-medium text-[16px] tracking-wide relative z-10 text-[#F3E5AB]">Care AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[400px] h-[85vh] md:h-[580px] bg-[#FDFBF7]/95 backdrop-blur-xl md:rounded-[24px] shadow-[0_20px_60px_rgba(89,17,31,0.25)] border-2 border-[#C5A059]/40 flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-[#C5A059]/30 bg-[#731C2D] shrink-0 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full border border-[#C5A059]/50 bg-gradient-to-br from-[#8A2438] to-[#59111F] flex items-center justify-center shadow-inner">
                  <Sparkles size={20} className="text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="font-display text-[#F3E5AB] text-[22px] leading-none tracking-wide">Care AI</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/80 font-medium mt-1">Royal Muse</p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#C5A059]/70 hover:text-[#F3E5AB] hover:bg-[#59111F]/50 rounded-xl transition-colors">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#C5A059]/70 hover:text-[#F3E5AB] hover:bg-[#59111F]/50 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Context Indicator */}
            {selectedText && (
              <div className="bg-[#FAF4E8] px-4 py-2.5 text-xs font-medium text-[#731C2D] border-b border-[#C5A059]/20 flex items-center gap-2 shadow-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
                Working with selected text
              </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar bg-[#FDFBF7] relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-flourish.png')] opacity-5 pointer-events-none" />
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed font-serif relative z-10 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-[#731C2D] to-[#59111F] text-[#FDFBF7] rounded-tr-sm shadow-md border border-[#C5A059]/30' 
                        : 'bg-[#FCF9F2] border-2 border-[#C5A059]/40 text-[#3D1B1B] rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {msg.role === 'assistant' && msg.isSuggestion && (
                    <div className="flex flex-wrap gap-2 mt-2.5 relative z-10">
                      <button 
                        onClick={() => onInsert(msg.text)}
                        className="px-3.5 py-1.5 bg-[#F3E5AB]/30 hover:bg-[#F3E5AB]/60 text-[#731C2D] text-[13px] font-medium rounded-lg transition-colors border border-[#C5A059]/50 shadow-sm"
                      >
                        Insert
                      </button>
                      {selectedText && (
                        <button 
                          onClick={() => onReplace(msg.text)}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-[#731C2D] to-[#59111F] hover:from-[#8A2438] hover:to-[#731C2D] text-[#F3E5AB] text-[13px] font-medium rounded-lg transition-colors shadow-sm border border-[#C5A059]/40"
                        >
                          Replace selection
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex items-start relative z-10">
                  <div className="px-5 py-3.5 bg-[#FCF9F2] border-2 border-[#C5A059]/40 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-[#731C2D]/70 text-sm font-serif italic">
                    <Loader2 size={16} className="animate-spin text-[#C5A059]" />
                    Royal Muse is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (only show if no messages besides init, or conditionally) */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar py-3 relative z-10 bg-[#FDFBF7] border-t border-[#C5A059]/20">
                {QUICK_ACTIONS.map(action => (
                  <button 
                    key={action}
                    onClick={() => handleSend(action)}
                    className="whitespace-nowrap px-4 py-2 border border-[#C5A059]/40 bg-[#FAF4E8] rounded-full text-[13px] font-medium text-[#731C2D]/80 hover:border-[#C5A059] hover:text-[#731C2D] hover:bg-[#F3E5AB]/40 transition-colors shadow-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-[#FDFBF7] border-t-2 border-[#C5A059]/30 shrink-0 relative z-10">
              <div className="relative flex items-end bg-[#FCF9F2] border-2 border-[#C5A059]/40 rounded-[1.25rem] shadow-inner focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/20 transition-all">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Royal Muse for writing advice..."
                  className="w-full max-h-32 bg-transparent text-[15px] px-5 py-3.5 rounded-[1.25rem] resize-none focus:outline-none placeholder:text-[#731C2D]/40 font-serif text-[#3D1B1B]"
                  rows={1}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="mb-1.5 mr-1.5 p-2.5 bg-gradient-to-r from-[#731C2D] to-[#59111F] text-[#F3E5AB] rounded-xl hover:from-[#8A2438] hover:to-[#731C2D] transition-all disabled:opacity-50 disabled:hover:from-[#731C2D] disabled:hover:to-[#59111F] shrink-0 shadow-md border border-[#C5A059]/40 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
