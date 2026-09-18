"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface Esp32ExplodedBoardProps {
  scrollProgressRef: React.RefObject<number>;
  reduceMotion?: boolean;
}

export default function Esp32ExplodedBoard({
  scrollProgressRef,
  reduceMotion = false,
}: Esp32ExplodedBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Group>(null);
  const leftPinsRef = useRef<THREE.Group>(null);
  const rightPinsRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const powerUsbRef = useRef<THREE.Group>(null);
  const siliconDieRef = useRef<THREE.Group>(null);
  const busLinesRef = useRef<THREE.Group>(null);

  // Reusable materials
  const pcbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c1114",
        roughness: 0.65,
        metalness: 0.15,
      }),
    []
  );

  const shieldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9aa1a8",
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  const dieMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#161b20",
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e6b042",
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  );

  const plasticMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#16181a",
        roughness: 0.85,
        metalness: 0.1,
      }),
    []
  );

  const usbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c2c9d0",
        metalness: 0.95,
        roughness: 0.2,
      }),
    []
  );

  const activeAntennaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f5a623",
        emissive: "#f5a623",
        emissiveIntensity: 0.4,
        metalness: 0.7,
        roughness: 0.25,
      }),
    []
  );

  const activePulseMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f5a623",
        wireframe: true,
      }),
    []
  );

  // Pin positions along dual sides
  const pinCount = 15;
  const pinPositions = useMemo(() => {
    const pins: { z: number }[] = [];
    const step = 0.28;
    const startZ = -1.9;
    for (let i = 0; i < pinCount; i++) {
      pins.push({ z: startZ + i * step });
    }
    return pins;
  }, []);

  useFrame((state) => {
    const p = scrollProgressRef.current ?? 0;
    const t = state.clock.getElapsedTime();

    if (!groupRef.current) return;

    // Base subtle idle floating (disabled if reduced-motion)
    if (!reduceMotion) {
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.04;
      // Slight yaw follow
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.04;
    }

    // --- Exploded view interpolation math ---
    // Explosion starts around p = 0.12 and reaches full separation by p = 0.38
    const explodeT = THREE.MathUtils.clamp((p - 0.12) / 0.26, 0, 1);
    const easedExplode = THREE.MathUtils.smoothstep(explodeT, 0, 1);

    // 1. RF Shield lifts upward along Y and tilts slightly back
    if (shieldRef.current) {
      shieldRef.current.position.y = 0.18 + easedExplode * 1.55;
      shieldRef.current.position.z = -0.65 - easedExplode * 0.2;
      shieldRef.current.rotation.x = easedExplode * 0.22;
    }

    // 2. Silicon Die underneath shield becomes visible and raises slightly
    if (siliconDieRef.current) {
      siliconDieRef.current.position.y = 0.08 + easedExplode * 0.4;
      siliconDieRef.current.scale.setScalar(1 + easedExplode * 0.15);
    }

    // 3. Left pin headers slide leftward (-X)
    if (leftPinsRef.current) {
      leftPinsRef.current.position.x = -1.35 - easedExplode * 0.95;
      leftPinsRef.current.position.y = easedExplode * 0.25;
    }

    // 4. Right pin headers slide rightward (+X)
    if (rightPinsRef.current) {
      rightPinsRef.current.position.x = 1.35 + easedExplode * 0.95;
      rightPinsRef.current.position.y = easedExplode * 0.25;
    }

    // 5. Antenna trace elevates forward/up
    if (antennaRef.current) {
      antennaRef.current.position.y = 0.055 + easedExplode * 0.65;
      antennaRef.current.position.z = -2.1 - easedExplode * 0.45;
    }

    // 6. Power and USB interface slides downward (+Z)
    if (powerUsbRef.current) {
      powerUsbRef.current.position.z = 2.1 + easedExplode * 0.95;
      powerUsbRef.current.position.y = -easedExplode * 0.2;
    }

    // 7. System flow pulse visibility (Stages 5 & 6)
    if (busLinesRef.current) {
      const flowT = THREE.MathUtils.clamp((p - 0.65) / 0.2, 0, 1);
      busLinesRef.current.visible = flowT > 0.05;
      if (busLinesRef.current.visible) {
        busLinesRef.current.position.y = 0.12 + Math.sin(t * 6) * 0.02;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.45, 0.4, 0]}>
      {/* 1. Main PCB Substrate Layer (Anchor) */}
      <mesh material={pcbMaterial} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.1, 5.2]} />
      </mesh>

      {/* Mounting corner eyelets */}
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

      {/* PCB Internal Trace Lines */}
      <group position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((lx, idx) => (
          <mesh key={`trace-${idx}`} position={[lx, 0, 0]}>
            <planeGeometry args={[0.02, 4.2]} />
            <meshBasicMaterial color="#f5a623" opacity={0.25} transparent />
          </mesh>
        ))}
      </group>

      {/* 2. Silicon Microchip Die (Underneath Shield) */}
      <group ref={siliconDieRef} position={[0, 0.08, -0.65]}>
        {/* Silicon package substrate */}
        <mesh material={dieMaterial} castShadow>
          <boxGeometry args={[1.3, 0.08, 1.3]} />
        </mesh>
        {/* Dual-Core CPU Dies */}
        <mesh position={[-0.3, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.7]} />
          <meshStandardMaterial
            color="#2a323d"
            metalness={0.9}
            roughness={0.2}
            emissive="#f5a623"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0.3, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.7]} />
          <meshStandardMaterial
            color="#2a323d"
            metalness={0.9}
            roughness={0.2}
            emissive="#f5a623"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Gold bond wires */}
        {[-0.55, -0.2, 0.2, 0.55].map((bx, i) => (
          <mesh key={`bond-${i}`} position={[bx, 0.045, -0.55]} material={goldMaterial}>
            <boxGeometry args={[0.04, 0.015, 0.15]} />
          </mesh>
        ))}
      </group>

      {/* 3. Exploded RF Metal Shield Can */}
      <group ref={shieldRef} position={[0, 0.18, -0.65]}>
        <mesh material={shieldMaterial} castShadow>
          <boxGeometry args={[1.9, 0.22, 2.0]} />
        </mesh>
        {/* Engraved shielding plate label */}
        <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial
            color="#24282e"
            metalness={0.85}
            roughness={0.35}
          />
        </mesh>
        {/* Laser alignment ring indicator */}
        <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color="#f5a623" opacity={0.7} transparent />
        </mesh>
      </group>

      {/* 4. Left Pin Headers (Separates -X) */}
      <group ref={leftPinsRef} position={[-1.35, 0.14, 0.05]}>
        <mesh material={plasticMaterial}>
          <boxGeometry args={[0.18, 0.18, 4.3]} />
        </mesh>
        {pinPositions.map((p, idx) => (
          <mesh
            key={`lpin-${idx}`}
            position={[0, 0.16, p.z - 0.05]}
            material={goldMaterial}
            castShadow
          >
            <boxGeometry args={[0.06, 0.36, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* 5. Right Pin Headers (Separates +X) */}
      <group ref={rightPinsRef} position={[1.35, 0.14, 0.05]}>
        <mesh material={plasticMaterial}>
          <boxGeometry args={[0.18, 0.18, 4.3]} />
        </mesh>
        {pinPositions.map((p, idx) => (
          <mesh
            key={`rpin-${idx}`}
            position={[0, 0.16, p.z - 0.05]}
            material={goldMaterial}
            castShadow
          >
            <boxGeometry args={[0.06, 0.36, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* 6. Antenna Subsystem (Elevates top) */}
      <group ref={antennaRef} position={[0, 0.055, -2.1]}>
        {/* Antenna substrate backer */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.02, 0.7]} />
          <meshBasicMaterial color="#080c0e" />
        </mesh>
        {/* Inverted-F Copper meander traces */}
        <mesh position={[0, 0.02, 0]} material={activeAntennaMaterial}>
          <boxGeometry args={[2.2, 0.015, 0.08]} />
        </mesh>
        {[-0.9, -0.4, 0.1, 0.6, 1.0].map((mx, idx) => (
          <mesh
            key={`mifa-${idx}`}
            position={[mx, 0.02, idx % 2 === 0 ? -0.15 : -0.12]}
            material={activeAntennaMaterial}
          >
            <boxGeometry args={[0.08, 0.015, idx % 2 === 0 ? 0.38 : 0.32]} />
          </mesh>
        ))}
      </group>

      {/* 7. Power & USB Interface Stage (Separates bottom) */}
      <group ref={powerUsbRef} position={[0, 0, 2.1]}>
        {/* Metal USB port */}
        <mesh position={[0, 0.18, 0.45]} material={usbMaterial} castShadow>
          <boxGeometry args={[0.9, 0.32, 0.7]} />
        </mesh>
        {/* USB socket void */}
        <mesh position={[0, 0.18, 0.81]}>
          <boxGeometry args={[0.65, 0.14, 0.05]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        {/* 3.3V LDO Voltage Regulator */}
        <mesh position={[0.7, 0.11, -0.3]} material={plasticMaterial} castShadow>
          <boxGeometry args={[0.55, 0.12, 0.35]} />
        </mesh>
        {/* USB-UART Bridge IC */}
        <mesh position={[0, 0.1, -0.6]} material={plasticMaterial} castShadow>
          <boxGeometry args={[0.65, 0.08, 0.65]} />
        </mesh>
        {/* Crystal Oscillator */}
        <mesh position={[-0.7, 0.1, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.12, 0.25]} />
          <meshStandardMaterial color="#c0c8d0" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* EN & BOOT Buttons */}
        <mesh position={[-0.8, 0.13, 0.4]} material={plasticMaterial}>
          <boxGeometry args={[0.25, 0.15, 0.25]} />
        </mesh>
        <mesh position={[0.8, 0.13, 0.4]} material={plasticMaterial}>
          <boxGeometry args={[0.25, 0.15, 0.25]} />
        </mesh>
        {/* Status LEDs */}
        <mesh position={[-0.8, 0.09, 0.0]}>
          <boxGeometry args={[0.1, 0.06, 0.12]} />
          <meshBasicMaterial color="#ff9d00" />
        </mesh>
        <mesh position={[0.8, 0.09, 0.0]}>
          <boxGeometry args={[0.1, 0.06, 0.12]} />
          <meshBasicMaterial color="#ff9d00" />
        </mesh>
      </group>

      {/* 8. System Data Flow Field (Active during Stage 5) */}
      <group ref={busLinesRef} visible={false}>
        {[-1.0, -0.5, 0, 0.5, 1.0].map((fx, i) => (
          <mesh key={`flow-${i}`} position={[fx, 0.25, 0]} material={activePulseMaterial}>
            <cylinderGeometry args={[0.02, 0.02, 4.4, 8]} />
          </mesh>
        ))}
      </group>

      {/* Ground Contact Shadow Plate */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
}
