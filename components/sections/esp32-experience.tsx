"use client";

import Esp32Viewer from "@/components/canvas/esp32-viewer";
import Eyebrow from "@/components/ui/eyebrow";
import Heading from "@/components/ui/heading";
import Panel from "@/components/ui/panel";
import Reveal from "@/components/reveal";

export default function Esp32Experience() {
  const hardwareSpecs = [
    {
      label: "Platform Microcontroller",
      spec: "Espressif ESP32 (Tensilica Xtensa Dual-Core 32-bit LX6)",
      status: "Verified Platform Architecture",
    },
    {
      label: "Wireless Transceiver",
      spec: "2.4 GHz Wi-Fi (802.11 b/g/n) & Bluetooth v4.2 BR/EDR + BLE",
      status: "Verified Platform Architecture",
    },
    {
      label: "Clock Frequency",
      spec: "Adjustable up to 240 MHz dual-core processing",
      status: "Verified Platform Architecture",
    },
    {
      label: "Internal Memory",
      spec: "520 KB SRAM with external SPI flash memory",
      status: "Verified Platform Architecture",
    },
    {
      label: "Target Firmware Stack",
      spec: "Custom C++ / ESP-IDF / FreeRTOS security routines",
      status: "Pending Lab Verification",
    },
    {
      label: "Hardware Intercept / Analysis",
      spec: "Wireless frame analysis & hardware bus observation",
      status: "Pending Lab Verification",
    },
  ];

  return (
    <div className="space-y-20">
      {/* 1. Project Title & Mission Briefing */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>Embedded / Cybersecurity // EXP-01</Eyebrow>
          <span className="mono border border-[#f5a623]/30 bg-[#f5a623]/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f5a623]">
            INTERACTIVE SYSTEM INSPECTION
          </span>
        </div>

        <Heading level={1} className="mt-4 text-4xl md:text-6xl lg:text-7xl">
          ESP32 Security System
        </Heading>

        <Reveal delay={0.1} className="mt-6 max-w-3xl text-base leading-8 text-white/60 md:text-lg">
          An embedded cybersecurity exploration centered on microcontroller
          architecture, wireless attack/defense surfaces, and hardware bus
          integrity. This experience visualizes the core hardware platform and
          its subsystems before diving into verified firmware analysis.
        </Reveal>
      </div>

      {/* 2. Interactive 3D Hardware Inspection Theater */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <Eyebrow>Hardware Inspection</Eyebrow>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              Procedural System Viewport
            </h3>
          </div>
          <div className="mono text-[10px] text-white/40">
            PLATFORM: ESP-WROOM-32 // INTERACTIVE 3D
          </div>
        </div>

        {/* 3D Viewer component */}
        <Esp32Viewer />
      </section>

      {/* 3. System Subsystem Deep Dive */}
      <section className="space-y-8">
        <div>
          <Eyebrow>Architecture Breakdown</Eyebrow>
          <h3 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
            Subsystem Roles & Security Surfaces
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            Each subsystem on the physical board corresponds to distinct attack
            vectors and telemetry pathways explored in embedded security.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="01 // Compute Core & Firmware Isolation">
            The dual-core Xtensa architecture enables dedicated separation of
            tasks. One core can manage standard communication protocols while
            the second core operates security monitors, cryptographic routines,
            or telemetry integrity checks.
            <div className="mono mt-4 text-[10px] text-[#f5a623]">
              STATUS: Architectural principle verified. Specific task isolation
              benchmarks pending verification.
            </div>
          </Panel>

          <Panel title="02 // 2.4 GHz RF & Air Interface">
            Wireless microcontrollers face packet injection, beacon spoofing,
            and deauthentication vectors. Research focuses on analyzing raw 802.11
            management frames and detecting anomalies directly at the radio
            interface.
            <div className="mono mt-4 text-[10px] text-[#f5a623]">
              STATUS: Frame analysis methods under verification. No unverified
              capture figures published.
            </div>
          </Panel>

          <Panel title="03 // Bus Integrity & Hardware Debug Lines">
            UART serial lines and JTAG/flash pins are critical physical access
            points. Securing hardware implies auditing bootloader outputs,
            disabling debug channels in deployment, and verifying flash
            encryption configurations.
            <div className="mono mt-4 text-[10px] text-[#f5a623]">
              STATUS: Hardware attack surface principles documented. Pinout
              validation in progress.
            </div>
          </Panel>

          <Panel title="04 // Power Regulation & Side-Channel Surfaces">
            Microcontroller power stability impacts clock fidelity and brownout
            behavior. Research considers how power rail fluctuations and reset
            pins can be guarded against physical tampering or glitching.
            <div className="mono mt-4 text-[10px] text-[#f5a623]">
              STATUS: Base power circuitry verified. Lab power traces pending
              verification.
            </div>
          </Panel>
        </div>
      </section>

      {/* 4. Specifications & Verification Matrix */}
      <section className="space-y-6">
        <div>
          <Eyebrow>Integrity & Verification</Eyebrow>
          <h3 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
            System Parameter Matrix
          </h3>
          <p className="mt-2 text-sm text-white/50">
            Distinguishing verified platform architecture from custom
            experimental parameters pending lab verification.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left mono text-xs">
            <thead className="border-b border-white/10 bg-white/[0.03] text-white/40 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-5 py-4">Parameter</th>
                <th className="px-5 py-4">Platform Specification</th>
                <th className="px-5 py-4">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/70">
              {hardwareSpecs.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01]">
                  <td className="px-5 py-4 font-semibold text-white">
                    {row.label}
                  </td>
                  <td className="px-5 py-4 text-white/60">{row.spec}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                        row.status.includes("Verified")
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-[#f5a623]/30 bg-[#f5a623]/10 text-[#f5a623]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Next Milestones & Lab Roadmap */}
      <div className="border border-white/10 bg-[#0c0e12] p-8">
        <Eyebrow>Documentation Roadmap</Eyebrow>
        <h4 className="mt-2 text-xl font-semibold text-white">
          Upcoming Verified Technical Deliverables
        </h4>
        <ul className="mono mt-4 space-y-2 text-xs text-white/50">
          <li className="flex items-start gap-2">
            <span className="text-[#f5a623]">01 /</span>
            <span>Firmware repository verification & public codebase audit.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#f5a623]">02 /</span>
            <span>Logic analyzer capture traces and packet inspection logs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#f5a623]">03 /</span>
            <span>Hardware prototype bench photographs and physical wiring schematics.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
