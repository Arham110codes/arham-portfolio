"use client";

interface GameMinimapProps {
  objectiveTitle?: string;
  objectiveCategory?: string;
  subline?: string;
}

export default function GameMinimap({
  objectiveTitle = "BUILD NEXT LEVEL DIGITAL EXPERIENCES",
  objectiveCategory = "CURRENT OBJECTIVE",
  subline = "Vice City Inspired · Build Different · Stay Legendary",
}: GameMinimapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        {/* Radar Minimap Box — slightly smaller to match reference */}
        <div className="relative h-[72px] w-[84px] overflow-hidden border-2 border-white/25 bg-[#080d12]/80 p-1 shadow-2xl backdrop-blur-md md:h-20 md:w-24">
          {/* Radar Grid Graphic */}
          <svg
            viewBox="0 0 100 80"
            className="h-full w-full opacity-60"
            fill="none"
            stroke="currentColor"
          >
            {/* Map Roads / Geometry */}
            <path
              d="M0 40 H100 M50 0 V80 M20 10 L80 70 M80 20 L20 70"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            {/* Radar Sweep Ring */}
            <circle
              cx="45"
              cy="45"
              r="25"
              stroke="rgba(245,166,35,0.4)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            {/* Waypoint Path Vector */}
            <line
              x1="10"
              y1="65"
              x2="75"
              y2="25"
              stroke="#ff2a85"
              strokeWidth="2"
            />
            {/* Player Blip */}
            <circle cx="35" cy="50" r="3.5" fill="#ff2a85" />
            <circle cx="35" cy="50" r="6" stroke="#ff2a85" strokeWidth="0.8" />
          </svg>

          {/* North Indicator */}
          <div className="mono absolute bottom-1 left-1.5 text-[7px] font-bold text-white/45">
            N
          </div>
        </div>

        {/* Objective Text Block */}
        <div className="flex flex-col">
          <span className="mono text-[8px] uppercase tracking-[0.22em] text-[#ff2a85] font-semibold">
            {objectiveCategory}
          </span>
          <span className="mt-0.5 text-xs font-black uppercase tracking-tight text-white drop-shadow-md sm:text-sm md:text-base leading-tight max-w-[200px] md:max-w-xs">
            {objectiveTitle}
          </span>
        </div>
      </div>

      {/* Subline Under Minimap */}
      <div className="mono text-[8px] uppercase tracking-wider text-white/35">
        {subline}
      </div>
    </div>
  );
}
