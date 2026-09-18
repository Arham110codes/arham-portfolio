"use client";

interface Esp32FallbackProps {
  activeSubsystem?: string;
  onSelectSubsystem?: (id: string) => void;
}

export default function Esp32Fallback({
  activeSubsystem,
  onSelectSubsystem,
}: Esp32FallbackProps) {
  const subsystems = [
    { id: "antenna", label: "PCB Antenna (2.4 GHz)", x: "50%", y: "12%" },
    { id: "soc-rf", label: "RF Shield / SoC", x: "50%", y: "36%" },
    { id: "power-usb", label: "Power & USB-UART", x: "50%", y: "82%" },
    { id: "gpio-headers", label: "GPIO Matrix Bus", x: "12%", y: "50%" },
  ];

  return (
    <div className="relative flex h-full min-h-[380px] w-full flex-col items-center justify-center border border-white/10 bg-[#0c0d10] p-6 text-center">
      {/* Schematic SVG Vector */}
      <div className="relative w-full max-w-[280px] aspect-[28/50] rounded border border-white/20 bg-[#121619] shadow-2xl">
        {/* Antenna traces */}
        <div className="absolute top-2 left-6 right-6 h-8 border-b-2 border-amber-500/40">
          <div className="h-4 border-l border-r border-t border-amber-500/30" />
        </div>

        {/* RF Shield */}
        <div
          onClick={() => onSelectSubsystem?.("soc-rf")}
          className={`absolute top-14 left-7 right-7 h-24 cursor-pointer rounded border transition ${
            activeSubsystem === "soc-rf"
              ? "border-[#f5a623] bg-[#f5a623]/15 shadow-[0_0_15px_rgba(245,166,35,0.3)]"
              : "border-white/20 bg-white/5 hover:border-white/40"
          } flex flex-col items-center justify-center text-[10px] mono text-white/70`}
        >
          <span className="font-semibold text-white">ESP32</span>
          <span className="text-[8px] text-white/40">WROOM-32</span>
        </div>

        {/* Pin Headers */}
        <div className="absolute top-8 bottom-8 left-1 w-2 flex flex-col justify-between py-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`l-${i}`} className="h-1 w-2 rounded-xs bg-[#f5a623]/60" />
          ))}
        </div>
        <div className="absolute top-8 bottom-8 right-1 w-2 flex flex-col justify-between py-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`r-${i}`} className="h-1 w-2 rounded-xs bg-[#f5a623]/60" />
          ))}
        </div>

        {/* USB Port */}
        <div className="absolute bottom-0 left-1/2 h-5 w-8 -translate-x-1/2 rounded-t border-t border-x border-white/30 bg-white/10" />

        {/* Power LED */}
        <div className="absolute bottom-8 right-5 h-2 w-2 rounded-full bg-[#f5a623] shadow-[0_0_8px_#f5a623]" />
      </div>

      <div className="mono mt-6 text-[11px] text-white/50">
        HARDWARE SCHEMATIC VIEWPORT // 2D MODE
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {subsystems.map((sub) => (
          <button
            key={sub.id}
            type="button"
            onClick={() => onSelectSubsystem?.(sub.id)}
            className={`mono px-2 py-1 text-[9px] uppercase tracking-wider transition ${
              activeSubsystem === sub.id
                ? "bg-[#f5a623] text-black font-semibold"
                : "border border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>
    </div>
  );
}
