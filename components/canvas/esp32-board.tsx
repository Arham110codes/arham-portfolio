"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface Esp32BoardProps {
  activeSubsystem?: string;
  onSelectSubsystem?: (id: string) => void;
  reduceMotion?: boolean;
}

export default function Esp32Board({
  activeSubsystem,
  onSelectSubsystem,
  reduceMotion = false,
}: Esp32BoardProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating oscillation
  useFrame((state) => {
    if (reduceMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
  });

  // Reusable materials
  const pcbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c1114",
        roughness: 0.6,
        metalness: 0.15,
      }),
    []
  );

  const shieldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: activeSubsystem === "soc-rf" ? "#f5a623" : "#8a9199",
        metalness: 0.9,
        roughness: 0.25,
      }),
    [activeSubsystem]
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e6b042",
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  const antennaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: activeSubsystem === "antenna" ? "#f5a623" : "#d99330",
        metalness: 0.7,
        roughness: 0.3,
        emissive: activeSubsystem === "antenna" ? "#f5a623" : "#000000",
        emissiveIntensity: activeSubsystem === "antenna" ? 0.4 : 0,
      }),
    [activeSubsystem]
  );

  const plasticMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#181a1c",
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  const usbShellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: activeSubsystem === "power-usb" ? "#f5a623" : "#b0b8c0",
        metalness: 0.95,
        roughness: 0.2,
      }),
    [activeSubsystem]
  );

  const ledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff9d00",
        emissive: "#ff9d00",
        emissiveIntensity: 1.5,
        roughness: 0.2,
      }),
    []
  );

  // Pin positions
  const pinCount = 15;
  const pinPositions = useMemo(() => {
    const pins: { x: number; z: number }[] = [];
    const step = 0.28;
    const startZ = -1.9;
    for (let i = 0; i < pinCount; i++) {
      const z = startZ + i * step;
      pins.push({ x: -1.35, z });
      pins.push({ x: 1.35, z });
    }
    return pins;
  }, []);

  return (
    <group ref={groupRef} rotation={[-0.4, 0.45, 0]}>
      {/* 1. Main PCB Substrate */}
      <mesh material={pcbMaterial} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.1, 5.2]} />
      </mesh>

      {/* PCB Corner mounting holes */}
      {[
        [-1.2, -2.3],
        [1.2, -2.3],
        [-1.2, 2.3],
        [1.2, 2.3],
      ].map(([hx, hz], idx) => (
        <mesh
          key={`hole-${idx}`}
          position={[hx, 0.051, hz]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.08, 0.16, 16]} />
          <meshBasicMaterial color="#b39750" />
        </mesh>
      ))}

      {/* 2. Antenna Subsystem (Top Area) */}
      <group
        position={[0, 0.055, -2.1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSubsystem?.("antenna");
        }}
      >
        {/* Ground clearance zone */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.6, 0.7]} />
          <meshBasicMaterial color="#080c0e" />
        </mesh>
        {/* Inverted-F Meander traces */}
        <mesh position={[0, 0.002, 0]} material={antennaMaterial}>
          <boxGeometry args={[2.2, 0.01, 0.08]} />
        </mesh>
        <mesh position={[-0.9, 0.002, -0.15]} material={antennaMaterial}>
          <boxGeometry args={[0.08, 0.01, 0.38]} />
        </mesh>
        <mesh position={[-0.4, 0.002, -0.12]} material={antennaMaterial}>
          <boxGeometry args={[0.08, 0.01, 0.32]} />
        </mesh>
        <mesh position={[0.1, 0.002, -0.15]} material={antennaMaterial}>
          <boxGeometry args={[0.08, 0.01, 0.38]} />
        </mesh>
        <mesh position={[0.6, 0.002, -0.12]} material={antennaMaterial}>
          <boxGeometry args={[0.08, 0.01, 0.32]} />
        </mesh>
        <mesh position={[1.0, 0.002, -0.15]} material={antennaMaterial}>
          <boxGeometry args={[0.08, 0.01, 0.38]} />
        </mesh>
      </group>

      {/* 3. RF Shield Can (ESP-WROOM-32 / SoC) */}
      <group
        position={[0, 0.18, -0.65]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSubsystem?.("soc-rf");
        }}
      >
        <mesh material={shieldMaterial} castShadow>
          <boxGeometry args={[1.9, 0.22, 2.0]} />
        </mesh>
        {/* Engraved style module label plate */}
        <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial
            color="#2a3036"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* 4. Dual Inline Header Pin Strips (Left & Right) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelectSubsystem?.("gpio-headers");
        }}
      >
        {/* Header plastic bases */}
        <mesh position={[-1.35, 0.14, 0.05]} material={plasticMaterial}>
          <boxGeometry args={[0.18, 0.18, 4.3]} />
        </mesh>
        <mesh position={[1.35, 0.14, 0.05]} material={plasticMaterial}>
          <boxGeometry args={[0.18, 0.18, 4.3]} />
        </mesh>

        {/* Gold contact pins */}
        {pinPositions.map((p, idx) => (
          <mesh
            key={`pin-${idx}`}
            position={[p.x, 0.3, p.z]}
            material={goldMaterial}
            castShadow
          >
            <boxGeometry args={[0.06, 0.36, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* 5. Power & USB Subsystem (Bottom Area) */}
      <group
        position={[0, 0, 2.1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSubsystem?.("power-usb");
        }}
      >
        {/* Micro-USB / USB-C Port metal shell */}
        <mesh position={[0, 0.18, 0.45]} material={usbShellMaterial} castShadow>
          <boxGeometry args={[0.9, 0.32, 0.7]} />
        </mesh>
        {/* USB connector slot */}
        <mesh position={[0, 0.18, 0.81]}>
          <boxGeometry args={[0.65, 0.14, 0.05]} />
          <meshBasicMaterial color="#050505" />
        </mesh>

        {/* AMS1117 3.3V Voltage Regulator IC */}
        <mesh position={[0.7, 0.11, -0.3]} material={plasticMaterial} castShadow>
          <boxGeometry args={[0.55, 0.12, 0.35]} />
        </mesh>
        {/* Tab & pins of regulator */}
        <mesh position={[0.7, 0.08, -0.52]} material={goldMaterial}>
          <boxGeometry args={[0.3, 0.04, 0.1]} />
        </mesh>

        {/* USB-UART Bridge IC (CP2102) */}
        <mesh position={[0, 0.1, -0.6]} material={plasticMaterial} castShadow>
          <boxGeometry args={[0.65, 0.08, 0.65]} />
        </mesh>

        {/* Crystal Oscillator (Silver pill) */}
        <mesh position={[-0.7, 0.1, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.12, 0.25]} />
          <meshStandardMaterial color="#c0c8d0" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Tactile Switches: EN & BOOT */}
        <mesh position={[-0.8, 0.13, 0.4]} material={plasticMaterial}>
          <boxGeometry args={[0.25, 0.15, 0.25]} />
        </mesh>
        <mesh position={[0.8, 0.13, 0.4]} material={plasticMaterial}>
          <boxGeometry args={[0.25, 0.15, 0.25]} />
        </mesh>

        {/* Status & Power LEDs */}
        <mesh position={[-0.8, 0.08, 0.0]} material={ledMaterial}>
          <boxGeometry args={[0.1, 0.06, 0.12]} />
        </mesh>
        <mesh position={[0.8, 0.08, 0.0]} material={ledMaterial}>
          <boxGeometry args={[0.1, 0.06, 0.12]} />
        </mesh>
      </group>

      {/* Ground shadow receiver plate */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}
