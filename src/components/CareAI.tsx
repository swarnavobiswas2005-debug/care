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
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-md border border-black/5 text-primary-wine rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all group"
          >
            <Sparkles size={18} className="text-accent-rose group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">CARE AI</span>
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
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-[85vh] md:h-[520px] bg-white/90 backdrop-blur-xl md:rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.2)] border border-white flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/5 bg-white/50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-wine/5 flex items-center justify-center">
                  <Sparkles size={16} className="text-accent-rose" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-primary-wine text-lg leading-none">CARE AI</h3>
                  <p className="text-[10px] uppercase tracking-wider text-black/40 font-semibold mt-1">Your writing companion</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-lg transition-colors">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Context Indicator */}
            {selectedText && (
              <div className="bg-accent-rose/10 px-4 py-2 text-xs font-medium text-primary-wine border-b border-accent-rose/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-rose animate-pulse" />
                Working with selected text
              </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary-wine text-white rounded-tr-sm' 
                        : 'bg-white border border-black/5 text-black/80 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {msg.role === 'assistant' && msg.isSuggestion && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button 
                        onClick={() => onInsert(msg.text)}
                        className="px-3 py-1.5 bg-black/5 hover:bg-black/10 text-black text-xs font-medium rounded-lg transition-colors"
                      >
                        Insert
                      </button>
                      {selectedText && (
                        <button 
                          onClick={() => onReplace(msg.text)}
                          className="px-3 py-1.5 bg-accent-rose/10 hover:bg-accent-rose/20 text-primary-wine text-xs font-medium rounded-lg transition-colors"
                        >
                          Replace
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex items-start">
                  <div className="px-4 py-3 bg-white border border-black/5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-black/50 text-sm">
                    <Loader2 size={14} className="animate-spin" />
                    CARE AI is thinking...
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
                    className="whitespace-nowrap px-3 py-1.5 border border-black/10 rounded-full text-xs text-black/60 hover:border-black/30 hover:text-black transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-black/5 shrink-0">
              <div className="relative flex items-end bg-white border border-black/10 rounded-2xl shadow-sm focus-within:border-primary-burgundy focus-within:ring-1 focus-within:ring-primary-burgundy transition-all">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask CARE AI..."
                  className="w-full max-h-32 bg-transparent text-sm px-4 py-3 rounded-2xl resize-none focus:outline-none placeholder:text-black/30"
                  rows={1}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="mb-1.5 mr-1.5 p-2 bg-primary-wine text-white rounded-xl hover:bg-primary-burgundy transition-colors disabled:opacity-50 disabled:hover:bg-primary-wine shrink-0"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
