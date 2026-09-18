"use client";

import { useState, useSyncExternalStore, Suspense, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Esp32Board from "./esp32-board";
import Esp32Fallback from "./esp32-fallback";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export interface SubsystemInfo {
  id: string;
  name: string;
  category: string;
  status: string;
  description: string;
  verificationNote: string;
}

export const ESP32_SUBSYSTEMS: Record<string, SubsystemInfo> = {
  "soc-rf": {
    id: "soc-rf",
    name: "ESP-WROOM-32 / Dual-Core SoC",
    category: "Compute & Wireless Engine",
    status: "Verified Platform Architecture",
    description:
      "Dual Tensilica Xtensa 32-bit LX6 microprocessors running up to 240 MHz. Integrated 802.11 b/g/n Wi-Fi MAC/baseband and Bluetooth v4.2 BR/EDR + BLE.",
    verificationNote:
      "Specific firmware implementation, security routines, and exploit/defense payloads are pending lab verification.",
  },
  antenna: {
    id: "antenna",
    name: "Planar Inverted-F PCB Antenna",
    category: "RF Transceiver Path",
    status: "Verified Hardware Design",
    description:
      "Calibrated copper meander trace engineered for 2.4 GHz RF transmission, beacon reception, and raw frame analysis.",
    verificationNote:
      "RF range benchmarking, transmission power figures, and antenna gain metrics are pending verification.",
  },
  "power-usb": {
    id: "power-usb",
    name: "Power Management & USB-UART Interface",
    category: "Power & Diagnostics Bus",
    status: "Verified Bus Interface",
    description:
      "5V USB input regulated to 3.3V system rail via low-dropout regulator (LDO), with dedicated USB-to-UART bridge for firmware flashing and serial monitoring.",
    verificationNote:
      "Power draw profiling and active current consumption benchmarks are pending verification.",
  },
  "gpio-headers": {
    id: "gpio-headers",
    name: "GPIO Matrix & Peripheral Breakout",
    category: "Hardware I/O Interface",
    status: "Verified Pinout Matrix",
    description:
      "Breakout bus exposing general-purpose input/output pins supporting capacitive touch, ADC, DAC, SPI, I2C, and UART serial communication.",
    verificationNote:
      "External hardware wiring schematics and attached sensor/peripheral specifications are pending verification.",
  },
};

export default function Esp32Viewer() {
  const [activeSubsystemId, setActiveSubsystemId] = useState<string>("soc-rf");
  const mounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [autoRotate, setAutoRotate] = useState(true);
  const [forceFallback, setForceFallback] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const webglSupported = useMemo(() => {
    if (!mounted) return true;
    return checkWebGL();
  }, [mounted]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const currentSubsystem = ESP32_SUBSYSTEMS[activeSubsystemId] || ESP32_SUBSYSTEMS["soc-rf"];

  if (!mounted) {
    return (
      <div className="flex h-[480px] w-full items-center justify-center border border-white/10 bg-[#0c0e12] mono text-xs text-white/40">
        INITIALIZING HARDWARE VIEWPORT...
      </div>
    );
  }

  if (!webglSupported || forceFallback) {
    return (
      <div className="space-y-4">
        <Esp32Fallback
          activeSubsystem={activeSubsystemId}
          onSelectSubsystem={setActiveSubsystemId}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setForceFallback(false)}
            className="mono text-[10px] text-[#f5a623] hover:underline"
          >
            [Switch to 3D Viewport]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 3D Scene Viewport */}
      <div className="relative h-[480px] w-full overflow-hidden border border-white/10 bg-[#080b0e] shadow-2xl md:h-[540px]">
        {/* HUD Top Bar */}
        <div className="mono absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] text-white/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-pulse" />
            <span className="text-white/80 uppercase tracking-widest">
              HARDWARE INSPECTION CORE // 3D
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`px-2 py-0.5 uppercase tracking-wider transition ${
                autoRotate
                  ? "bg-[#f5a623]/20 text-[#f5a623] border border-[#f5a623]/40"
                  : "border border-white/20 text-white/40 hover:text-white"
              }`}
            >
              Rotate: {autoRotate ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={handleResetCamera}
              className="border border-white/20 px-2 py-0.5 uppercase tracking-wider text-white/40 transition hover:border-white/50 hover:text-white"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => setForceFallback(true)}
              className="hidden sm:inline-block text-white/30 hover:text-white/70 underline"
            >
              2D Mode
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <Canvas
          shadows
          camera={{ position: [0, 4.2, 5.8], fov: 42 }}
          dpr={[1, 1.5]}
          className="touch-none cursor-grab active:cursor-grabbing"
        >
          {/* Lighting */}
          <ambientLight intensity={0.65} />
          <directionalLight
            position={[5, 7, 5]}
            intensity={1.4}
            color="#f7f3ea"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight
            position={[-5, 4, -4]}
            intensity={0.6}
            color="#5a85aa"
          />
          <pointLight
            position={[0, 3, 0]}
            intensity={1.0}
            color="#f5a623"
            distance={8}
          />

          <Suspense fallback={null}>
            <Esp32Board
              activeSubsystem={activeSubsystemId}
              onSelectSubsystem={setActiveSubsystemId}
              reduceMotion={prefersReducedMotion}
            />
            <ContactShadows
              position={[0, -0.6, 0]}
              opacity={0.5}
              scale={10}
              blur={1.8}
              far={3}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={3.2}
            maxDistance={8.5}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2 + 0.05}
            autoRotate={autoRotate && !prefersReducedMotion}
            autoRotateSpeed={0.8}
            enablePan={false}
          />
        </Canvas>

        {/* Interaction Hint Bottom Left */}
        <div className="mono pointer-events-none absolute bottom-3 left-3 z-10 text-[9px] uppercase tracking-widest text-white/30">
          DRAG TO ORBIT // SCROLL TO ZOOM // CLICK HARDWARE TO INSPECT
        </div>

        {/* Active Node Badge Bottom Right */}
        <div className="mono pointer-events-none absolute bottom-3 right-3 z-10 text-[9px] uppercase tracking-widest text-[#f5a623]">
          ACTIVE: {currentSubsystem.name.split("/")[0]}
        </div>
      </div>

      {/* Subsystem Selection Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.values(ESP32_SUBSYSTEMS).map((sub) => {
          const isSelected = activeSubsystemId === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => setActiveSubsystemId(sub.id)}
              className={`mono p-3 text-left transition border ${
                isSelected
                  ? "border-[#f5a623] bg-[#f5a623]/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              <div className="text-[9px] uppercase tracking-wider text-[#f5a623]">
                {sub.id}
              </div>
              <div className="mt-1 font-semibold text-xs truncate">
                {sub.name.split("/")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subsystem Technical Annotation Card */}
      <div className="border border-white/10 bg-white/[0.02] p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="mono text-[10px] uppercase tracking-widest text-[#f5a623]">
              {currentSubsystem.category}
            </span>
            <h4 className="mt-1 text-xl font-semibold tracking-tight text-white">
              {currentSubsystem.name}
            </h4>
          </div>

          <div className="mono border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
            {currentSubsystem.status}
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-white/60">
          {currentSubsystem.description}
        </p>

        {/* Clearly marked verification notice */}
        <div className="mt-4 border-l-2 border-[#f5a623]/60 bg-[#f5a623]/5 p-3 mono text-[11px] leading-6 text-white/60">
          <span className="font-semibold text-[#f5a623]">
            [VERIFICATION STATUS]
          </span>{" "}
          {currentSubsystem.verificationNote}
        </div>
      </div>
    </div>
  );
}
