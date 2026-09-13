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

  const COUNT = 80;

  // Initial random properties for each raindrop streak
  const rainData = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => ({
      x: (Math.random() - 0.5) * 11.5,
      y: 0.2 + Math.random() * 5.0,
      speed: 0.9 + Math.random() * 1.7,
      length: 0.12 + Math.random() * 0.24,
      wobbleSpeed: 2 + Math.random() * 3,
      wobblePhase: Math.random() * Math.PI * 2
    }));
  }, []);

  // Distant city night bokeh lights
  const bokehLights = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 10.5,
      y: -0.4 + Math.random() * 3.6,
      radius: 0.04 + Math.random() * 0.08,
      color: i % 4 === 0 ? "#38BDF8" : i % 3 === 0 ? "#FBBF24" : i % 2 === 0 ? "#F43F5E" : "#A78BFA",
      twinkleSpeed: 0.8 + Math.random() * 1.5,
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (!streaksRef.current || !dropletsRef.current) return;

    // Smooth visibility fade
    const targetOpacity = isRainy ? 0.8 : 0.15;
    const currentMat = streaksRef.current.material as THREE.MeshBasicMaterial;
    if (currentMat) {
      currentMat.opacity = THREE.MathUtils.lerp(currentMat.opacity, targetOpacity, 0.08);
    }
    const dropMat = dropletsRef.current.material as THREE.MeshBasicMaterial;
    if (dropMat) {
      dropMat.opacity = THREE.MathUtils.lerp(dropMat.opacity, targetOpacity * 0.9, 0.08);
    }

    // Animate each raindrop streak sliding down the glass
    rainData.forEach((d, i) => {
      const curY = (d.y - elapsed * d.speed) % 5.2;
      const actualY = (curY < 0 ? curY + 5.2 : curY) - 0.4;
      const actualX = d.x + Math.sin(elapsed * d.wobbleSpeed + d.wobblePhase) * 0.02;

      // 1. Vertical streak cylinder
      dummy.position.set(actualX, actualY, 0.01);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, d.length, 1);
      dummy.updateMatrix();
      streaksRef.current?.setMatrixAt(i, dummy.matrix);

      // 2. Leading water drop bead
      dummy.position.set(actualX, actualY - d.length * 0.5, 0.012);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      dropletsRef.current?.setMatrixAt(i, dummy.matrix);
    });

    streaksRef.current.instanceMatrix.needsUpdate = true;
    dropletsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 2.0, -4.6]}>
      {/* ── 1. MOODY OUTDOOR NIGHT SKY & MISTY GRADIENT ── */}
      <mesh position={[0, 0.4, -0.2]}>
        <planeGeometry args={[16, 7.5]} />
        <meshBasicMaterial
          color={isRainy ? "#080E1A" : "#04070E"}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Distant City Skyline Bokeh Points */}
      <group position={[0, 0, -0.15]}>
        {bokehLights.map((b) => (
          <mesh key={b.id} position={[b.x, b.y, 0]}>
            <circleGeometry args={[b.radius, 16]} />
            <meshBasicMaterial
              color={b.color}
              transparent
              opacity={isRainy ? 0.35 : 0.65}
            />
          </mesh>
        ))}
      </group>

      {/* ── 2. ARCHITECTURAL PANORAMIC WINDOW FRAME ── */}
      {/* Outer Border Frame */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[12.2, 5.8, 0.1]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Translucent Window Glass Pane */}
      <mesh position={[0, 0.4, 0.005]}>
        <planeGeometry args={[11.8, 5.5]} />
        <meshStandardMaterial
          color={isRainy ? "#7DD3FC" : "#38BDF8"}
          transparent
          opacity={isRainy ? 0.24 : 0.09}
          roughness={0.08}
          metalness={0.25}
        />
      </mesh>

      {/* Modern Slim Architectural Mullions */}
      {[-3.9, -1.3, 1.3, 3.9].map((x, idx) => (
        <mesh key={`v-mullion-${idx}`} position={[x, 0.4, 0.015]}>
          <boxGeometry args={[0.06, 5.5, 0.06]} />
          <meshStandardMaterial color="#0D131F" roughness={0.35} metalness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.4, 0.015]}>
        <boxGeometry args={[11.8, 0.06, 0.06]} />
        <meshStandardMaterial color="#0D131F" roughness={0.35} metalness={0.9} />
      </mesh>

      {/* ── 3. INSTANCED WATER STREAKS & DROPLETS ── */}
      <instancedMesh
        ref={streaksRef}
        args={[undefined, undefined, COUNT]}
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 1, 8]} />
        <meshBasicMaterial color="#BAE6FD" transparent opacity={0.65} />
      </instancedMesh>

      <instancedMesh
        ref={dropletsRef}
        args={[undefined, undefined, COUNT]}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#E0F2FE" transparent opacity={0.75} />
      </instancedMesh>
    </group>
  );
};
