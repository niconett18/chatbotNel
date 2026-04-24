"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Zap, Sparkles, Code, BookOpen, Lightbulb, MessageCircle } from "lucide-react";
import Header from "./Header";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    // If deployed and NEXT_PUBLIC_API_URL is missing, use the backend proxy path
    return "/_/backend";
  }
  return "http://localhost:8000";
};
const API_URL = getApiUrl();

const SUGGESTIONS = [
  {
    icon: Lightbulb,
    label: "Brainstorm ideas",
    desc: "Generate creative concepts",
    prompt: "Help me brainstorm creative ideas for a weekend project",
  },
  {
    icon: Code,
    label: "Write some code",
    desc: "Generate or debug code",
    prompt: "Write a Python function that generates Fibonacci numbers",
  },
  {
    icon: BookOpen,
    label: "Explain a concept",
    desc: "Break down complex topics",
    prompt: "Explain quantum computing in simple terms",
  },
  {
    icon: MessageCircle,
    label: "Just chat",
    desc: "Open conversation",
    prompt: "Hey! What can you help me with today?",
  },
];

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim() || isLoading) return;

      const userMessage = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            history: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't reach the server. Please make sure the backend is running.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <div className="fixed inset-0 w-full bg-[#06060d] text-[#eeeef5] font-sans overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.14)_0%,rgba(67,56,202,0.08)_40%,transparent_70%)] blur-[80px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06)_0%,transparent_65%)] blur-[80px]" />
      </div>
      
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-[90px] opacity-60 bg-[radial-gradient(circle,rgba(139,92,246,0.15),transparent_70%)]" />
      <div className="absolute bottom-[-5%] left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none z-0 blur-[90px] opacity-60 bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="sticky top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#06060d] to-transparent pointer-events-none z-20" />

          <div className="max-w-4xl mx-auto w-full min-h-full flex flex-col px-0 sm:px-4 pb-2">
            
            {showWelcome && (
              <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 sm:px-10">
                <div className="relative mb-6 sm:mb-8">
                  <div className="relative w-[72px] h-[72px] rounded-[22px] bg-gradient-to-br from-violet-700/25 to-indigo-700/20 border border-violet-400/25 flex items-center justify-center shadow-[0_12px_40px_rgba(109,40,217,0.3),0_0_0_1px_rgba(167,139,250,0.1)_inset]">
                    <div className="absolute -inset-[1px] rounded-[23px] bg-gradient-to-br from-violet-400/20 via-transparent to-blue-400/15 -z-10" />
                    <Zap size={32} className="text-violet-300 drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                  </div>
                  <div className="absolute -top-1.5 -right-2">
                    <Sparkles size={18} className="text-violet-300/80 animate-pulse" />
                  </div>
                </div>

                <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight text-center mb-3 sm:mb-4 leading-tight">
                  Build faster with <span className="gradient-text">NelBOT</span>
                </h2>
                <p className="text-white/40 text-[14px] sm:text-[15px] text-center max-w-[420px] leading-relaxed mb-10">
                  Ask anything. Generate code, explore ideas, and get smart answers — all in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-[600px]">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s.prompt)}
                      className="group relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-violet-400/25 rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="flex items-center gap-3.5 relative z-10">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-700/20 to-indigo-700/15 border border-violet-400/15 flex items-center justify-center flex-shrink-0 group-hover:from-violet-700/35 group-hover:to-indigo-700/25 transition-colors duration-300">
                          <s.icon size={16} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] sm:text-[14px] font-semibold text-[#d4d4e8] group-hover:text-white transition-colors">
                            {s.label}
                          </span>
                          <span className="text-[11px] sm:text-[12px] text-white/30 font-medium group-hover:text-white/40 transition-colors">
                            {s.desc}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.length > 0 && (
              <div className="flex flex-col gap-5 sm:gap-6 py-6 sm:py-8">
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    message={msg}
                    isLatest={idx === messages.length - 1}
                  />
                ))}

                {isLoading && (
                  <div className="flex w-full justify-start animate-msg-in px-4 sm:px-6 mb-1">
                    <div className="flex items-start gap-3 sm:gap-4 max-w-[85%]">
                      <div className="mt-6 flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-500/15 border border-violet-400/20 flex items-center justify-center avatar-loading">
                        <Zap size={14} className="text-violet-300" />
                      </div>
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/60 ml-2">
                          NelBOT
                        </span>
                        <div className="flex items-center gap-1.5 px-4 py-3 sm:px-5 sm:py-4 rounded-[22px] rounded-tl-[8px] bg-gradient-to-br from-[#12121e]/95 to-[#161624]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                          <span className="w-[6px] h-[6px] rounded-full bg-violet-400/70 dot-1" />
                          <span className="w-[6px] h-[6px] rounded-full bg-violet-400/70 dot-2" />
                          <span className="w-[6px] h-[6px] rounded-full bg-violet-400/70 dot-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div ref={bottomRef} className="h-4 sm:h-8" />
          </div>
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
