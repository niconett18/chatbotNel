"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="w-full px-4 sm:px-6 pt-4 pb-3 sm:pb-5 bg-gradient-to-t from-[#06060d] via-[#06060d]/95 to-transparent flex-shrink-0 z-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="relative rounded-[22px] bg-[#0e0e18]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl transition-all duration-300 focus-within:border-violet-400/40 focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_4px_rgba(109,40,217,0.1),0_0_0_1px_rgba(255,255,255,0.03)_inset]">
          
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Message NelBOT…"
            className="w-full bg-transparent border-none outline-none text-[#eeeef5] text-[14px] sm:text-[15px] leading-relaxed resize-none py-3.5 sm:py-4 pl-5 sm:pl-6 pr-14 sm:pr-16 max-h-[160px] overflow-y-auto placeholder:text-white/20"
          />

          <button
            onClick={handleSubmit}
            disabled={!canSend}
            aria-label="Send message"
            className={`
              absolute right-2 sm:right-2.5 bottom-2 sm:bottom-2.5 w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-xl flex items-center justify-center transition-all duration-200
              ${!disabled && canSend 
                ? "bg-gradient-to-br from-violet-600 to-indigo-500 shadow-[0_4px_14px_rgba(109,40,217,0.35)] hover:from-violet-500 hover:to-indigo-400 hover:shadow-[0_6px_20px_rgba(109,40,217,0.5)] hover:-translate-y-[1px] active:translate-y-0" 
                : "bg-white/[0.06] cursor-not-allowed"}
            `}
          >
            {disabled ? (
              <Loader2 size={16} className="text-white/40 animate-spin" />
            ) : (
              <ArrowUp
                size={18}
                className={`transition-colors ${canSend ? "text-white" : "text-white/25"}`}
              />
            )}
          </button>
        </div>

        <p className="text-center text-[10px] sm:text-[11px] text-white/25 mt-2.5 tracking-wide select-none">
          NelBOT can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  );
}
