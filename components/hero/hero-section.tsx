"use client";

import { useState } from "react";
import Image from "next/image";
import GameTopHud from "@/components/hud/game-top-hud";
import GameMinimap from "@/components/hud/game-minimap";

export default function HeroSection() {
  const [activeItem, setActiveItem] = useState<string>("START GAME");

  const menuItems = [
    { label: "START GAME", href: "#work", isAction: true },
    { label: "ABOUT ME", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#work" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
    { label: "EXIT GAME", href: "#", isExit: true },
  ];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#07090b] text-white select-none"
    >
      {/* 1. Full-Bleed Background — quality=90 to maximise fidelity from the 1024×576 source.
             `priority` is deprecated in Next.js 16; use preload + loading="eager" instead.
             decoding="sync" ensures the LCP element paints atomically with first frame. */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/arham-hero.png"
          alt="Arham Oberoi with supercar at sunset"
          fill
          preload
          loading="eager"
          decoding="sync"
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />

        {/* Cinematic left-to-right gradient scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-transparent" />
        {/* Top & bottom vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />
      </div>

      {/* 2. Top-Perimeter GTA-Inspired HUD */}
      <GameTopHud />

      {/* 3. Main Stage Container */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-16 pb-6 md:px-12 md:pt-20 lg:px-16 lg:pt-24">

        {/* Left column: Masthead sits near top-third; menu hangs immediately below */}
        <div className="flex flex-col items-start mt-8 md:mt-12">

          {/* Masthead — larger and tighter leading to match reference */}
          <div className="flex flex-col items-start leading-[0.82]">
            <h1 className="text-[clamp(4rem,11vw,9.5rem)] font-black uppercase tracking-[-0.03em] text-white gta-title-shadow">
              ARHAM
              <br />
              BUILDS
            </h1>
            <span className="font-script text-[clamp(2rem,5.5vw,5rem)] text-[#ff2a85] gta-neon-pink -mt-2 ml-1 transform -rotate-3">
              Portfolio
            </span>
          </div>

          {/* Interactive Menu Navigation Stack — directly under masthead */}
          <nav
            className="mt-5 flex flex-col gap-[2px] w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px]"
            aria-label="Main Menu"
          >
            {menuItems.map((item) => {
              const isActive = activeItem === item.label;

              if (item.isAction || isActive) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className="flex items-center justify-between bg-[#ff2a85] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(255,42,133,0.5)] transition-transform hover:scale-[1.02] sm:text-xs md:text-[13px] md:px-4 md:py-2"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px]">›</span>
                  </a>
                );
              }

              if (item.isExit) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveItem(item.label)}
                    className="text-left px-3 py-[3px] text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 transition-all hover:text-white hover:translate-x-1 sm:text-xs md:text-[13px] md:px-4 cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className="px-3 py-[3px] text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition-all hover:text-white hover:translate-x-1 sm:text-xs md:text-[13px] md:px-4"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Spacer pushes bottom HUD to the very bottom */}
        <div className="flex-1" />

        {/* 4. Bottom Perimeter Layer — flush to viewport bottom edge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Bottom Left: Tactical Radar Minimap */}
          <GameMinimap
            objectiveTitle="BUILD NEXT LEVEL DIGITAL EXPERIENCES"
            objectiveCategory="CURRENT OBJECTIVE"
            subline="Vice City Inspired · Build Different · Stay Legendary"
          />

          {/* Bottom Right: Signature Cursive Quote */}
          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <p className="font-script text-base sm:text-lg text-white/85 drop-shadow-md">
              &ldquo;Code is my weapon. Creativity is my world.&rdquo;
            </p>
            <span className="font-script text-sm text-[#ff2a85] mt-0.5">
              &mdash; Arham
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
