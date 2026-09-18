"use client";

import Image from "next/image";
import GameTopHud from "@/components/hud/game-top-hud";
import GameMinimap from "@/components/hud/game-minimap";
import Eyebrow from "@/components/ui/eyebrow";

export default function AboutSection() {
  const profileCards = [
    {
      tag: "EDUCATION",
      value: "Final-year B.Tech CSE (Cyber Security & Privacy)",
    },
    {
      tag: "LOCATION",
      value: "Dehradun, India",
    },
    {
      tag: "STATUS",
      value: "Building software systems & exploring cybersecurity",
    },
  ];

  const experienceItems = [
    {
      period: "2022 — PRESENT",
      title: "Undergraduate Computer Science & Security Research",
      org: "B.Tech CSE — Specialisation in Cyber Security & Privacy",
      description:
        "Coursework and laboratory research focused on network protocols, client-server architectures, embedded security surfaces, and software engineering.",
    },
    {
      period: "2024 — PRESENT",
      title: "Independent Systems, AI & Security Development",
      org: "Personal Projects & Technical Exploration",
      description:
        "Prototyping software systems including local multi-agent ecosystems (ArhamOS), microcontroller security experiments (ESP32 / RP2040), and secure network socket applications.",
    },
  ];

  const verifiedSkills = [
    {
      category: "PROGRAMMING LANGUAGES",
      items: ["Java", "Python", "C / C++ (Embedded)", "TypeScript", "JavaScript"],
    },
    {
      category: "SECURITY & NETWORKING",
      items: [
        "Network Socket Programming",
        "Client-Server Communication",
        "Wireless & Embedded Security Concepts",
        "Cyber Security & Privacy Fundamentals",
      ],
    },
    {
      category: "SYSTEMS & APPLIED AI",
      items: [
        "AI-Assisted Development",
        "Machine Learning Fundamentals",
        "Local Multi-Agent Ecosystems (ArhamOS)",
        "Microcontroller Platforms (ESP32, RP2040)",
      ],
    },
    {
      category: "MODERN WEB & INTERFACES",
      items: ["Next.js (App Router)", "React", "Tailwind CSS", "Three.js / React Three Fiber"],
    },
  ];

  return (
    <div id="about" className="relative w-full bg-[#07090b] text-white">
      {/* 1. Cinematic Full-Bleed About Screen (Blueprint: Reference 1) */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden select-none">
        {/* Coastal Seawall Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arham-about.jpg"
            alt="Arham Oberoi coastal seawall portrait"
            fill
            sizes="100vw"
            className="object-cover object-[70%_center] lg:object-center brightness-[0.95]"
          />

          {/* Directional Gradient Scrim (High text contrast on left, bright beach on right) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent w-full md:w-[70%] lg:w-[55%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
        </div>

        {/* Top GTA-Inspired HUD */}
        <GameTopHud />

        {/* Main Content Stage */}
        <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-20 pb-8 md:px-12 md:pt-24 lg:px-16">
          {/* Left Side: About Me Title, Bio & Frosted Info Cards */}
          <div className="mt-4 flex flex-col items-start max-w-xl">
            {/* Title: Monumental ABOUT + Cursive Me */}
            <div className="flex items-baseline leading-[0.85]">
              <h2 className="text-6xl font-black uppercase tracking-[-0.03em] text-white gta-title-shadow italic sm:text-7xl md:text-8xl">
                ABOUT
              </h2>
              <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#f5a623] gta-neon-amber ml-2 transform -rotate-6">
                Me
              </span>
            </div>

            {/* Introduction Paragraph */}
            <p className="mt-6 text-sm leading-7 text-white/80 sm:text-base md:leading-8 max-w-lg drop-shadow-md">
              Hey, I&rsquo;m Arham. A final-year B.Tech CSE student specialising in
              Cyber Security and Privacy who builds digital experiences that
              aren&rsquo;t just functional &mdash; they&rsquo;re resilient, secure, and memorable.
            </p>

            {/* Frosted Glass Status Cards */}
            <div className="mt-8 flex flex-col gap-2.5 w-full max-w-md">
              {profileCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 border border-white/20 bg-black/50 px-4 py-2.5 shadow-lg backdrop-blur-md transition hover:border-[#f5a623]/60"
                >
                  {/* Glowing Diamond Icon */}
                  <div className="flex h-5 w-5 items-center justify-center rounded-xs bg-[#f5a623]/20 text-[#f5a623]">
                    <span className="text-xs">◆</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {card.tag}
                    </span>
                    <span className="text-xs font-semibold text-white/90 sm:text-sm">
                      {card.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action Button (VIEW JOURNEY >) */}
            <div className="mt-8">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-[#f5a623] px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-transform hover:scale-105 hover:bg-[#ffb53d]"
              >
                <span>VIEW JOURNEY</span>
                <span className="text-sm">›</span>
              </a>
            </div>
          </div>

          {/* Bottom Perimeter Layer (Minimap with Updated Objective & Quote) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <GameMinimap
              objectiveTitle="LEARN WHO YOU ARE DEALING WITH"
              objectiveCategory="CURRENT OBJECTIVE"
              subline="Vice City Inspired · Build Different · Stay Legendary"
            />

            <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
              <p className="font-script text-lg sm:text-xl text-white/90 drop-shadow-md">
                &ldquo;Code is my weapon. Creativity is my world.&rdquo;
              </p>
              <span className="font-script text-base text-[#f5a623] mt-0.5">
                &mdash; Arham
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Technical Dossier (Experience & Skills) */}
      <section id="experience" className="border-t border-white/10 bg-[#07090b] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Experience Section */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Dossier // Academic & Systems Trajectory</Eyebrow>
                <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                  Work & Research Experience
                </h3>
              </div>
              <div className="mono text-[10px] text-white/40">
                STATUS // VERIFIED TIMELINE
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {experienceItems.map((exp, idx) => (
                <div
                  key={idx}
                  className="border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#f5a623]/40"
                >
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#f5a623]">
                    {exp.period}
                  </div>
                  <h4 className="mt-2 text-lg font-bold text-white">
                    {exp.title}
                  </h4>
                  <div className="mono mt-1 text-[11px] text-white/40">
                    {exp.org}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mono mt-6 border-l-2 border-white/20 bg-white/[0.02] p-4 text-[11px] leading-6 text-white/40">
              [VERIFICATION STATUS] Formal internship logs and commercial client releases
              are undergoing documentation audit before publication.
            </div>
          </div>

          {/* Skills Section */}
          <div id="skills">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Technical Arsenal</Eyebrow>
                <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                  Verified Technical Skills
                </h3>
              </div>
              <div className="mono text-[10px] text-white/40">
                PRACTICAL REPOSITORIES
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {verifiedSkills.map((cat, idx) => (
                <div
                  key={idx}
                  className="border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#f5a623]/40"
                >
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#f5a623]">
                    {cat.category}
                  </div>
                  <ul className="mono mt-4 space-y-2 text-xs text-white/70">
                    {cat.items.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="text-[#f5a623]">◆</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mono mt-6 border-l-2 border-[#f5a623]/60 bg-[#f5a623]/5 p-4 text-[11px] leading-6 text-white/50">
              <span className="font-semibold text-[#f5a623]">[VERIFICATION NOTE]</span>{" "}
              Unverified proprietary toolchains and external credentials remain omitted
              until repository evidence is cataloged.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
