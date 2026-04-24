"use client";

import { Zap, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex-shrink-0 sticky top-0 w-full bg-[#08081499]/90 backdrop-blur-2xl border-b border-white/[0.06] z-50">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-[14px] bg-gradient-to-br from-violet-600/30 to-indigo-500/20 border border-violet-400/25 flex items-center justify-center shadow-[0_0_18px_rgba(124,58,237,0.22)]">
            <Zap size={16} className="text-violet-300 drop-shadow-[0_0_6px_rgba(167,139,250,0.9)]" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080814] status-dot" />
          </div>

          <div className="flex flex-col gap-0.5">
            <h1 className="text-[15px] sm:text-base font-bold tracking-tight text-white/95 leading-none">
              Nel<span className="gradient-text">BOT</span>
            </h1>
            <span className="text-[10px] sm:text-[11px] text-white/30 font-medium leading-none tracking-wide">
              AI-powered assistant
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20">
          <Sparkles size={11} className="text-emerald-300/90 hidden sm:block" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-300/90 tracking-wide">
            Gemini
          </span>
        </div>

      </div>
    </header>
  );
}
