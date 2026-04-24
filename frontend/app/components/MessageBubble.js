"use client";

import { Zap } from "lucide-react";

export default function MessageBubble({ message, isLatest }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end animate-msg-in px-4 sm:px-6 mb-1">
        <div className="flex flex-col items-end gap-1.5 max-w-[85%] sm:max-w-[75%]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300/40 mr-1.5">
            You
          </span>
          <div
            className={`
              rounded-[22px] rounded-br-[8px] px-4 py-3 sm:px-5 sm:py-3.5
              bg-gradient-to-br from-[#2b1f52] via-[#241a4a] to-[#1a1435]
              border border-violet-300/15
              shadow-[0_8px_24px_rgba(76,29,149,0.2),0_0_0_1px_rgba(196,181,253,0.05)_inset]
              transition-all duration-200 break-words
              ${isLatest ? "ring-1 ring-violet-400/20 shadow-[0_12px_32px_rgba(76,29,149,0.3)]" : ""}
            `}
          >
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#f0eeff] whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start animate-msg-in px-4 sm:px-6 mb-1">
      <div className="flex items-start gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%]">
        <div className="mt-6 flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-500/15 border border-violet-400/20 flex items-center justify-center shadow-[0_4px_16px_rgba(109,40,217,0.15)]">
          <Zap size={14} className="text-violet-300 drop-shadow-[0_0_4px_rgba(167,139,250,0.5)]" />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/60 ml-2">
            NelBOT
          </span>
          <div
            className={`
              rounded-[22px] rounded-tl-[8px] px-4 py-3 sm:px-5 sm:py-4
              bg-gradient-to-br from-[#12121e]/95 to-[#161624]/90
              backdrop-blur-md
              border border-white/10
              shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.02)_inset]
              break-words
              ${isLatest ? "border-violet-400/20" : ""}
            `}
          >
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#d8d8ee] whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
