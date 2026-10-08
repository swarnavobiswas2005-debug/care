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
      text: "Hey! I'm here if you need help finding the right words. ❤️",
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
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FFF5F7] to-[#FFEBF0] backdrop-blur-md border border-rose-200/60 text-[#8B2E42] rounded-full shadow-[0_8px_30px_rgba(225,29,72,0.15)] hover:shadow-[0_8px_40px_rgba(225,29,72,0.25)] transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles size={18} className="text-rose-500 group-hover:scale-110 transition-transform relative z-10" />
            <span className="font-display font-medium text-[17px] tracking-wide relative z-10 italic">Ask Care AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-[85vh] md:h-[540px] bg-[#FFFBFB]/95 backdrop-blur-xl md:rounded-[2rem] shadow-[0_20px_60px_rgba(225,29,72,0.15)] border border-rose-100 flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-rose-100/50 bg-[#FFF5F7]/80 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center shadow-inner">
                  <Sparkles size={18} className="text-rose-600" />
                </div>
                <div>
                  <h3 className="font-display italic text-[#8B2E42] text-xl leading-none">Care AI</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-rose-900/40 font-bold mt-1.5">Your Writing Muse</p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button onClick={() => setIsOpen(false)} className="p-2 text-rose-900/40 hover:text-rose-700 hover:bg-rose-100/50 rounded-xl transition-colors">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-rose-900/40 hover:text-rose-700 hover:bg-rose-100/50 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Context Indicator */}
            {selectedText && (
              <div className="bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-700 border-b border-rose-100 flex items-center gap-2 shadow-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                Working with selected text
              </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-[#FFFBFB] to-rose-50/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed font-serif ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-tr-sm shadow-md' 
                        : 'bg-white/80 border border-rose-100 text-[#5C1B29] rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {msg.role === 'assistant' && msg.isSuggestion && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      <button 
                        onClick={() => onInsert(msg.text)}
                        className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[13px] font-medium rounded-lg transition-colors border border-rose-100/50 shadow-sm"
                      >
                        Insert
                      </button>
                      {selectedText && (
                        <button 
                          onClick={() => onReplace(msg.text)}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 text-[#8B2E42] text-[13px] font-medium rounded-lg transition-colors shadow-sm"
                        >
                          Replace selection
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex items-start">
                  <div className="px-5 py-3.5 bg-white/80 border border-rose-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-rose-900/60 text-sm font-serif italic">
                    <Loader2 size={16} className="animate-spin text-rose-400" />
                    Care AI is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (only show if no messages besides init, or conditionally) */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar py-2">
                {QUICK_ACTIONS.map(action => (
                  <button 
                    key={action}
                    onClick={() => handleSend(action)}
                    className="whitespace-nowrap px-4 py-2 border border-rose-200/60 bg-white/50 rounded-full text-[13px] font-medium text-rose-900/60 hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 transition-colors shadow-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-gradient-to-b from-white/40 to-white/95 border-t border-rose-100/60 shrink-0 relative z-10 backdrop-blur-sm">
              <div className="relative flex items-end bg-white border border-rose-200 rounded-[1.25rem] shadow-[0_2px_15px_rgba(225,29,72,0.06)] focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100/50 transition-all">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Care AI for writing advice..."
                  className="w-full max-h-32 bg-transparent text-[15px] px-5 py-3.5 rounded-[1.25rem] resize-none focus:outline-none placeholder:text-rose-900/30 font-serif"
                  rows={1}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="mb-1.5 mr-1.5 p-2.5 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl hover:from-rose-600 hover:to-rose-500 transition-all disabled:opacity-50 disabled:hover:from-rose-500 disabled:hover:to-rose-400 shrink-0 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
