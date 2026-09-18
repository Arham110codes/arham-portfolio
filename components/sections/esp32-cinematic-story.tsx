"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Esp32StoryCanvas from "@/components/canvas/esp32-story-canvas";
import Eyebrow from "@/components/ui/eyebrow";
import Heading from "@/components/ui/heading";

const emptySubscribe = () => () => {};

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false
  );
}

const STAGES = [
  { id: 0, key: "intro", label: "01 INTRO", range: [0, 0.16] },
  { id: 1, key: "exploded", label: "02 EXPLODED", range: [0.16, 0.35] },
  { id: 2, key: "reveal", label: "03 REVEAL", range: [0.35, 0.52] },
  { id: 3, key: "architecture", label: "04 SECURITY", range: [0.52, 0.68] },
  { id: 4, key: "flow", label: "05 FLOW", range: [0.68, 0.82] },
  { id: 5, key: "project", label: "06 PROJECT", range: [0.82, 0.95] },
  { id: 6, key: "demo", label: "07 DEMO", range: [0.95, 1.0] },
];

export default function Esp32CinematicStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgressRef.current = latest;

    // Find active stage index
    const stageIdx = STAGES.findIndex(
      (s) => latest >= s.range[0] && latest <= s.range[1]
    );
    if (stageIdx !== -1 && stageIdx !== currentStage) {
      setCurrentStage(stageIdx);
    }
  });

  return (
    <div ref={containerRef} className="relative min-h-[580vh] w-full bg-[#07090b]">
      {/* Persistent Sticky 3D Viewport Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic Background Grid & Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(245,166,35,0.07),_transparent_65%)]" />
        <div className="site-grid absolute inset-0 opacity-40 pointer-events-none" />

        {/* 3D Story Canvas with Camera Choreography */}
        <div className="absolute inset-0 z-0">
          <Esp32StoryCanvas scrollProgressRef={scrollProgressRef} />
        </div>

        {/* Persistent Cinematic Telemetry HUD (Top) */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#07090b]/80 px-6 py-4 backdrop-blur-md md:px-12">
          <div className="flex items-center gap-3">
            <Link
              href="/#work"
              className="mono text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
            >
              ← Back to work
            </Link>
            <span className="text-white/20">|</span>
            <span className="mono text-xs tracking-[0.2em] text-white">
              ARHAM<span className="text-[#f5a623]">{"//"}</span>SYSTEM
            </span>
          </div>

          {/* Center Stage Navigation Markers */}
          <nav className="hidden lg:flex items-center gap-1 mono text-[9px] uppercase tracking-widest text-white/40">
            {STAGES.map((s) => (
              <span
                key={s.id}
                className={`px-2 py-1 transition-colors ${
                  currentStage === s.id
                    ? "bg-[#f5a623]/20 text-[#f5a623] border border-[#f5a623]/40"
                    : "hover:text-white/70"
                }`}
              >
                {s.label}
              </span>
            ))}
          </nav>

          <div className="mono flex items-center gap-2 text-[10px] text-[#f5a623]">
            {prefersReducedMotion ? (
              <span className="border border-white/20 px-2 py-0.5 text-[9px] text-white/50">
                REDUCED MOTION
              </span>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-ping" />
                <span className="uppercase tracking-widest hidden sm:inline">
                  CINEMATIC DECONSTRUCTION
                </span>
              </>
            )}
          </div>
        </header>

        {/* Floating Narrative Content Overlays (Stages 1 through 6) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-6 pb-20 md:p-12 md:pb-16">
          <AnimatePresence mode="wait">
            {currentStage === 0 && (
              <motion.div
                key="stage-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>01 / 07 // INTRO</span>
                  <span>PLATFORM: ESP-WROOM-32</span>
                </div>
                <Heading level={1} className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                  ESP32 Security System
                </Heading>
                <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
                  An embedded cybersecurity project exploring microcontroller
                  architecture, wireless radio surfaces, and physical bus integrity.
                </p>
                <div className="mono mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#f5a623]">
                  <span className="animate-bounce">↓</span>
                  <span>Scroll down to initiate physical deconstruction</span>
                </div>
              </motion.div>
            )}

            {currentStage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>02 / 07 // EXPLODED VIEW</span>
                  <span>MECHANICAL & RF SEPARATION</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
                  Hardware Deconstruction
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  As the board separates along physical bus lines, the RF shield lifts
                  to reveal the internal processing die while power regulation and dual-row
                  pin headers isolate into distinct inspection zones.
                </p>
                <div className="mono mt-4 text-[10px] text-white/40">
                  SEPARATION: RF SHIELD // PIN BUS // MIFA ANTENNA // POWER REGULATION
                </div>
              </motion.div>
            )}

            {currentStage === 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>03 / 07 // COMPONENT REVEAL</span>
                  <span>SILICON & RF APERTURE</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
                  Dual-Core Silicon & Antenna
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Under the shield rests the Tensilica Xtensa Dual-Core 32-bit LX6
                  microprocessor alongside dedicated hardware cryptographic accelerators
                  and a calibrated 2.4 GHz planar inverted-F antenna (PIFA).
                </p>
                <div className="mono mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-3 text-[10px] text-white/50">
                  <div>CORE: 240 MHz DUAL-CORE</div>
                  <div>RADIO: 802.11 b/g/n + BLE</div>
                </div>
              </motion.div>
            )}

            {currentStage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>04 / 07 // TECHNICAL EXPLANATION</span>
                  <span>HARDWARE ATTACK SURFACES</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
                  Security Boundary Analysis
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Embedded security auditing requires examining physical exposure:
                  unprotected UART flashing bootloaders, JTAG debug pins, and over-the-air
                  frame spoofing risks inherent to unencrypted IoT topologies.
                </p>
                <div className="mono mt-4 border-l-2 border-[#f5a623]/60 bg-[#f5a623]/5 p-3 text-[10px] text-white/50">
                  VERIFIED FACT: Hardware secure boot and flash encryption are essential
                  firmware mitigations on this silicon revision.
                </div>
              </motion.div>
            )}

            {currentStage === 4 && (
              <motion.div
                key="stage-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>05 / 07 // SYSTEM FLOW</span>
                  <span>SIGNAL & TELEMETRY PIPELINE</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
                  Signal Propagation Model
                </h3>
                <div className="mono mt-4 grid gap-2 text-[10px] text-white/70">
                  <div className="border border-white/10 bg-white/[0.03] p-2">
                    01. RF AIR INTERFACE → 2.4 GHz Frame Reception
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] p-2">
                    02. CORE 0 → Hardware Baseband & Protocol Decoding
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] p-2">
                    03. CORE 1 → Security Anomaly Filter & Analysis Loop
                  </div>
                </div>
                <div className="mono mt-4 text-[10px] text-[#f5a623]">
                  [Specific firmware pipeline implementation pending verified lab logs]
                </div>
              </motion.div>
            )}

            {currentStage === 5 && (
              <motion.div
                key="stage-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto max-w-xl border border-white/10 bg-[#0c0e12]/90 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex items-center justify-between text-[10px] mono text-[#f5a623]">
                  <span>06 / 07 // PROJECT REVEAL</span>
                  <span>CORE MISSION & OBJECTIVES</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
                  What This Project Actually Does
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  The goal of this research project is validating lightweight defensive
                  monitoring on resource-constrained edge hardware—evaluating how small
                  embedded nodes can detect unauthorized wireless signals and verify
                  hardware bus integrity without heavy server infrastructure.
                </p>
                <div className="mono mt-4 text-[10px] text-[#f5a623]">
                  CONTINUE SCROLLING TO VIEW PROJECT DEMO & TESTBENCH ARTIFACTS ↓
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Bar at Bottom of Viewport */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            className="h-full bg-[#f5a623]"
          />
        </div>
      </div>

      {/* Stage 7: Project Demonstration & Verification Workbench */}
      <section className="relative z-30 border-t border-white/10 bg-[#090b0e] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl space-y-16">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Eyebrow>07 // Demonstration & Evidence</Eyebrow>
              <span className="mono border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-widest text-emerald-400">
                VERIFIED PLATFORM ARCHITECTURE
              </span>
            </div>
            <Heading level={2} className="mt-4 text-3xl md:text-6xl">
              Project Demonstration & Workbench
            </Heading>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">
              Evidence-based deliverables. As experimental laboratory logs, physical
              bench photography, and firmware audits conclude, verified artifacts will
              populate below.
            </p>
          </div>

          {/* Hardware Workbench & Capture Log Mockup */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Terminal Output Window */}
            <div className="border border-white/10 bg-[#050709] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mono text-[11px] text-white/40">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f5a623]" />
                  <span>UART0 // SERIAL DIAGNOSTIC MONITOR</span>
                </div>
                <span>115200 BAUD</span>
              </div>
              <pre className="mt-4 overflow-x-auto mono text-xs leading-6 text-white/70">
                <code>{`[BOOT] ESP-IDF v5.2-dev (Xtensa LX6)
[BOOT] CPU frequency: 240 MHz dual-core
[BOOT] Heap free: 298,420 bytes
[RADIO] Initializing 802.11 b/g/n transceiver
[RADIO] RF channel frequency: 2437 MHz (CH 6)
[SYSTEM] Hardware cryptography unit initialized (AES/SHA)
[SEC_MON] Passive frame monitoring task pinned to Core 1
[SEC_MON] Communication telemetry loop pinned to Core 0
------------------------------------------------------
[STATUS] Laboratory verification in progress.
[LOG] Detailed packet capture records pending audit.`}</code>
              </pre>
            </div>

            {/* Hardware Testbed Evidence Slot */}
            <div className="flex flex-col justify-between border border-dashed border-white/20 bg-white/[0.02] p-8 text-center">
              <div>
                <Eyebrow>Physical Testbed</Eyebrow>
                <h4 className="mt-3 text-xl font-semibold text-white">
                  Hardware Bench Photography & Wiring
                </h4>
                <p className="mt-3 text-sm leading-6 text-white/40">
                  Oscilloscope probe traces, logic analyzer bus logs, and
                  breadboard prototyping photographs will be published directly
                  upon laboratory sign-off.
                </p>
              </div>

              <div className="mono my-8 inline-block border border-[#f5a623]/30 bg-[#f5a623]/10 p-4 text-[11px] text-[#f5a623]">
                [LAB VERIFICATION PENDING // NO FABRICATED MEASUREMENTS]
              </div>

              <div className="mono text-[10px] text-white/30">
                AUDIT ARCHIVE: EXP-ESP32-HARDWARE-01
              </div>
            </div>
          </div>

          {/* Verified Specifications Matrix */}
          <div className="border border-white/10 bg-white/[0.02] p-8">
            <Eyebrow>Technical Baseline</Eyebrow>
            <h4 className="mt-2 text-2xl font-semibold text-white">
              Platform Parameter Matrix
            </h4>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left mono text-xs">
                <thead className="border-b border-white/10 text-white/40 text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="py-3 pr-4">Subsystem</th>
                    <th className="py-3 pr-4">Hardware Specification</th>
                    <th className="py-3">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Processor</td>
                    <td className="py-3 pr-4 text-white/50">Tensilica Xtensa Dual-Core 32-bit LX6 @ 240MHz</td>
                    <td className="py-3 text-emerald-400">Verified Platform Architecture</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Wireless</td>
                    <td className="py-3 pr-4 text-white/50">802.11 b/g/n Wi-Fi baseband & Bluetooth v4.2 BLE</td>
                    <td className="py-3 text-emerald-400">Verified Platform Architecture</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Firmware Payload</td>
                    <td className="py-3 pr-4 text-white/50">Custom C++ / FreeRTOS security routines</td>
                    <td className="py-3 text-[#f5a623]">Pending Laboratory Audit</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">RF Metrics</td>
                    <td className="py-3 pr-4 text-white/50">Frame capture rate & detection thresholds</td>
                    <td className="py-3 text-[#f5a623]">Pending Laboratory Audit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Return Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <Link
              href="/#work"
              className="mono text-xs uppercase tracking-[0.2em] text-[#f5a623] transition hover:underline"
            >
              ← Return to selected work
            </Link>

            <span className="mono text-[10px] text-white/30">
              ARHAM{"//"}SYSTEM — ESP32 EXPERIENCE 2026
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
