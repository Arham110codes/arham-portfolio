"use client";

import { motion } from "framer-motion";

export default function SystemCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[8%] rounded-full border border-[#f5a623]/25"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[18%] rounded-full border border-dashed border-white/20"
      />

      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[30%] rounded-full border border-[#f5a623]/50 bg-[#f5a623]/5 shadow-[0_0_100px_rgba(245,166,35,0.12)]"
      />

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5a623] shadow-[0_0_70px_rgba(245,166,35,0.45)]">
        <div className="absolute inset-3 rounded-full border border-black/30" />
      </div>

      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[#f5a623]/50 to-transparent" />

      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

      <div className="mono absolute left-[8%] top-[16%] text-[9px] leading-5 text-white/40">
        <div>CORE_01</div>
        <div className="text-[#f5a623]">ACTIVE</div>
      </div>

      <div className="mono absolute bottom-[14%] right-[4%] text-right text-[9px] leading-5 text-white/40">
        <div>ENCRYPTED NODE</div>
        <div>STATUS / STABLE</div>
      </div>

      <div className="absolute bottom-[4%] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#f5a623]" />
    </div>
  );
}
