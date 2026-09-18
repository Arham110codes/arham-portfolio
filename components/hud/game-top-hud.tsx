"use client";

import { useState, useEffect } from "react";

export default function GameTopHud() {
  const [timeString, setTimeString] = useState<string>("16:13");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute top-3 left-4 right-4 z-30 flex items-start justify-between text-white md:top-5 md:left-8 md:right-8">
      {/* Top Left: Platform Identification */}
      <div className="hidden sm:flex flex-col">
        <span className="mono text-[9px] tracking-[0.22em] text-white/45">
          ARHAM<span className="text-[#f5a623]">{"//"}</span>SYSTEM
        </span>
        <span className="mono text-[7px] uppercase tracking-widest text-[#f5a623]">
          VERSION 2026.01
        </span>
      </div>

      {/* Top Center: Radio Station Pill */}
      <div className="mx-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-0.5 shadow-lg backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
        <span className="mono text-[9px] font-semibold tracking-widest text-white/75">
          98.4
        </span>
        <span className="mono text-[7px] uppercase tracking-wider text-white/35">
          NIGHT FM
        </span>
      </div>

      {/* Top Right: GTA-inspired HUD Stats */}
      <div className="flex flex-col items-end gap-0.5">
        {/* Row 1: Clock & Inventory Slot */}
        <div className="flex items-center gap-2">
          <div className="mono text-lg font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-xl">
            {timeString}
          </div>
          <div className="flex h-6 w-6 items-center justify-center border border-white/25 bg-black/50 mono text-[10px] font-bold text-white shadow-md">
            S
          </div>
        </div>

        {/* Row 2: Game Currency Counter */}
        <div className="mono text-sm font-black tracking-tight text-[#34d399] gta-cash-shadow md:text-base">
          $1,425,000
        </div>

        {/* Row 3: Armor / Health Bars */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <div className="h-1 w-10 rounded-xs bg-white/20 overflow-hidden">
              <div className="h-full w-full bg-[#00e5ff]" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1 w-10 rounded-xs bg-white/20 overflow-hidden">
              <div className="h-full w-full bg-[#2ecc71]" />
            </div>
            <span className="mono text-[8px] font-bold text-white/60">100</span>
          </div>
        </div>

        {/* Row 4: Wanted Star Rating */}
        <div className="flex items-center gap-0.5 text-[10px] text-white/20">
          <span className="text-[#f5a623]">★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}
