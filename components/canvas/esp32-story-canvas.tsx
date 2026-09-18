"use client";

import { useMemo, useSyncExternalStore, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import Esp32ExplodedBoard from "./esp32-exploded-board";
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

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
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

interface CameraRigProps {
  scrollProgressRef: React.RefObject<number>;
  reduceMotion?: boolean;
}

function CameraRig({ scrollProgressRef, reduceMotion = false }: CameraRigProps) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useMemo(() => new THREE.Vector3(0, 3.8, 5.4), []);
  const targetLook = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    if (reduceMotion) {
      state.camera.position.set(0, 4.2, 5.2);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    const p = scrollProgressRef.current ?? 0;

    // Cinematic waypoint choreography tied to scroll sequence:
    if (p < 0.18) {
      // Stage 1: INTRO — Heroic front perspective
      const t = p / 0.18;
      targetPos.set(
        THREE.MathUtils.lerp(0, 0.4, t),
        THREE.MathUtils.lerp(3.6, 4.0, t),
        THREE.MathUtils.lerp(5.4, 5.0, t)
      );
      targetLook.set(0, 0, 0);
    } else if (p < 0.38) {
      // Stage 2: EXPLODED VIEW — Elevation tracking upward
      const t = (p - 0.18) / 0.2;
      targetPos.set(
        THREE.MathUtils.lerp(0.4, 1.4, t),
        THREE.MathUtils.lerp(4.0, 5.2, t),
        THREE.MathUtils.lerp(5.0, 4.5, t)
      );
      targetLook.set(0, THREE.MathUtils.lerp(0, 0.4, t), 0);
    } else if (p < 0.55) {
      // Stage 3: COMPONENT REVEAL — Macro zoom in on silicon die & antenna
      const t = (p - 0.38) / 0.17;
      targetPos.set(
        THREE.MathUtils.lerp(1.4, 0.2, t),
        THREE.MathUtils.lerp(5.2, 2.9, t),
        THREE.MathUtils.lerp(4.5, 2.8, t)
      );
      targetLook.set(
        0,
        THREE.MathUtils.lerp(0.4, 0.65, t),
        THREE.MathUtils.lerp(0, -0.45, t)
      );
    } else if (p < 0.72) {
      // Stage 4: TECHNICAL EXPLANATION — Suspended exploded overview
      const t = (p - 0.55) / 0.17;
      targetPos.set(
        THREE.MathUtils.lerp(0.2, -1.6, t),
        THREE.MathUtils.lerp(2.9, 4.5, t),
        THREE.MathUtils.lerp(2.8, 4.3, t)
      );
      targetLook.set(0, THREE.MathUtils.lerp(0.65, 0.3, t), 0);
    } else if (p < 0.88) {
      // Stage 5: SYSTEM FLOW — Planar high-angle telemetry perspective
      const t = (p - 0.72) / 0.16;
      targetPos.set(
        THREE.MathUtils.lerp(-1.6, 0, t),
        THREE.MathUtils.lerp(4.5, 5.2, t),
        THREE.MathUtils.lerp(4.3, 3.7, t)
      );
      targetLook.set(0, 0, 0);
    } else {
      // Stage 6: PROJECT REVEAL — Grounded final framing
      const t = (p - 0.88) / 0.12;
      targetPos.set(
        0,
        THREE.MathUtils.lerp(5.2, 4.0, t),
        THREE.MathUtils.lerp(3.7, 5.2, t)
      );
      targetLook.set(0, 0, 0);
    }

    // Smooth camera damping
    const lerpRate = Math.min(delta * 4.5, 0.18);
    state.camera.position.lerp(targetPos, lerpRate);
    currentLookAt.current.lerp(targetLook, lerpRate);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

interface Esp32StoryCanvasProps {
  scrollProgressRef: React.RefObject<number>;
}

export default function Esp32StoryCanvas({
  scrollProgressRef,
}: Esp32StoryCanvasProps) {
  const mounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  const webglSupported = useMemo(() => {
    if (!mounted) return true;
    return checkWebGL();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#07090b] mono text-xs text-white/30">
        LOADING HARDWARE ENVIRONMENT...
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <Esp32Fallback />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,166,35,0.06)_0%,_transparent_70%)]" />

      <Canvas
        shadows
        camera={{ position: [0, 3.8, 5.4], fov: 40 }}
        dpr={[1, 1.5]}
        className="touch-none"
      >
        <CameraRig
          scrollProgressRef={scrollProgressRef}
          reduceMotion={prefersReducedMotion}
        />

        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.5}
          color="#fbf8f0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-6, 4, -4]}
          intensity={0.55}
          color="#527899"
        />
        <pointLight
          position={[0, 3.5, 0]}
          intensity={1.2}
          color="#f5a623"
          distance={9}
        />

        <Suspense fallback={null}>
          <Esp32ExplodedBoard
            scrollProgressRef={scrollProgressRef}
            reduceMotion={prefersReducedMotion}
          />
          <ContactShadows
            position={[0, -0.75, 0]}
            opacity={0.45}
            scale={12}
            blur={2}
            far={3.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
