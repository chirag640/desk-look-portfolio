"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";

export const RainWindow: React.FC = () => {
  const { lightingMood } = useAtmosphereStore();
  const isRainy = lightingMood === "rain";

  const groupRef = useRef<THREE.Group>(null);
  const streaksRef = useRef<THREE.InstancedMesh>(null);
  const dropletsRef = useRef<THREE.InstancedMesh>(null);

  const COUNT = 70;

  // Initial random properties for each raindrop streak
  const rainData = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      x: (Math.random() - 0.5) * 8.2,
      y: 0.2 + Math.random() * 4.2,
      speed: 0.9 + Math.random() * 1.6,
      length: 0.1 + Math.random() * 0.22,
      wobbleSpeed: 2 + Math.random() * 3,
      wobblePhase: Math.random() * Math.PI * 2
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (!streaksRef.current || !dropletsRef.current) return;

    // Smooth visibility fade
    const targetOpacity = isRainy ? 0.75 : 0.0;
    const currentMat = streaksRef.current.material as THREE.MeshBasicMaterial;
    if (currentMat) {
      currentMat.opacity = THREE.MathUtils.lerp(currentMat.opacity, targetOpacity, 0.08);
    }
    const dropMat = dropletsRef.current.material as THREE.MeshBasicMaterial;
    if (dropMat) {
      dropMat.opacity = THREE.MathUtils.lerp(dropMat.opacity, targetOpacity * 0.9, 0.08);
    }

    if (currentMat.opacity < 0.01) return;

    // Animate each raindrop streak sliding down the glass
    rainData.forEach((d, i) => {
      // Calculate continuous falling y
      const curY = ((d.y - elapsed * d.speed) % 4.4);
      const actualY = (curY < 0 ? curY + 4.4 : curY) - 0.2;
      const actualX = d.x + Math.sin(elapsed * d.wobbleSpeed + d.wobblePhase) * 0.02;

      // 1. Vertical streak capsule
      dummy.position.set(actualX, actualY, 0.01);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, d.length, 1);
      dummy.updateMatrix();
      streaksRef.current?.setMatrixAt(i, dummy.matrix);

      // 2. Leading water drop bead at the bottom of the streak
      dummy.position.set(actualX, actualY - d.length * 0.5, 0.012);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      dropletsRef.current?.setMatrixAt(i, dummy.matrix);
    });

    streaksRef.current.instanceMatrix.needsUpdate = true;
    dropletsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 2.2, -4.5]}>
      {/* ── 1. MOODY OUTDOOR RAIN SKY BACKDROP ── */}
      <mesh position={[0, 0.2, -0.2]}>
        <planeGeometry args={[12, 6]} />
        <meshBasicMaterial
          color={isRainy ? "#0D1828" : "#050810"}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* ── 2. ARCHITECTURAL MATTE ALUMINUM WINDOW FRAME ── */}
      {/* Outer Border */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[8.8, 4.6, 0.08]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Glass Pane Cutout / Translucent Window Glass */}
      <mesh position={[0, 0.2, 0.005]}>
        <planeGeometry args={[8.5, 4.3]} />
        <meshPhysicalMaterial
          color={isRainy ? "#7DD3FC" : "#38BDF8"}
          transparent
          opacity={isRainy ? 0.22 : 0.08}
          roughness={0.08}
          metalness={0.1}
          transmission={0.7}
        />
      </mesh>

      {/* Window Mullions Grid (Vertical & Horizontal Dividers) */}
      {/* 3 Vertical Mullions */}
      {[-2.15, 0, 2.15].map((x, idx) => (
        <mesh key={`v-mullion-${idx}`} position={[x, 0.2, 0.015]}>
          <boxGeometry args={[0.07, 4.3, 0.06]} />
          <meshStandardMaterial color="#0D131F" roughness={0.4} metalness={0.85} />
        </mesh>
      ))}
      {/* 1 Horizontal Transom */}
      <mesh position={[0, 0.2, 0.015]}>
        <boxGeometry args={[8.5, 0.07, 0.06]} />
        <meshStandardMaterial color="#0D131F" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* ── 3. INSTANCED RAIN STREAKS & WATER DROPLETS ── */}
      {/* Slender water streaks */}
      <instancedMesh
        ref={streaksRef}
        args={[undefined, undefined, COUNT]}
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.007, 0.007, 1, 8]} />
        <meshBasicMaterial color="#BAE6FD" transparent opacity={0.65} />
      </instancedMesh>

      {/* Droplet beads */}
      <instancedMesh
        ref={dropletsRef}
        args={[undefined, undefined, COUNT]}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshBasicMaterial color="#E0F2FE" transparent opacity={0.75} />
      </instancedMesh>
    </group>
  );
};
