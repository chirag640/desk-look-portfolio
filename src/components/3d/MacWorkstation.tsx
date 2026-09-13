"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface MacWorkstationProps {
  progress: number;
  isMobile?: boolean;
}

// Active space accents matching ChiragOS
const SPACE_GLOWS = [
  "#38BDF8", // 1. FinFlow & Cloud
  "#0284C7", // 2. Profile
  "#10B981", // 3. Tech Stack
  "#F59E0B", // 4. Flutter Blueprint
  "#8B5CF6", // 5. History
  "#EC4899", // 6. 70 Repos
  "#14B8A6"  // 7. Contact / Terminal
];

export const MacWorkstation: React.FC<MacWorkstationProps> = ({
  progress,
  isMobile = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenGlowLightRef = useRef<THREE.PointLight>(null);
  const { cameraView, setCameraView } = useAtmosphereStore();
  const { playClick, playThock } = useSoundEffects();

  // Load the authentic Apple MacBook Pro M3 Max 16-inch model with local Draco WASM decoding
  const { scene } = useGLTF("/models/macbook-transformed.glb", "/draco/");

  const activeSpace = Math.max(0, Math.min(6, Math.round(progress * 6)));
  const glowColor = SPACE_GLOWS[activeSpace];

  // Subtle breathing pulse on the Retina display glow
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (screenGlowLightRef.current) {
      screenGlowLightRef.current.intensity =
        cameraView === "screen" ? 0.3 : 0.95 + Math.sin(t * 2.2) * 0.12;
    }
  });

  const handleMacClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    playThock("cherry_blue");
    playClick();
    setCameraView("screen");
  };

  return (
    <group
      ref={groupRef}
      position={[0, -0.56, -0.15]}
      rotation={[0, 0, 0]}
      onClick={handleMacClick}
    >
      {/* ── 1. AUTHENTIC 3D APPLE MACBOOK PRO M3 MAX UNIBODY ── */}
      <group
        scale={isMobile ? [0.058, 0.058, 0.058] : [0.068, 0.068, 0.068]}
        position={[0, 0.012, 0]}
      >
        <primitive object={scene.clone(true)} />
      </group>

      {/* ── 2. RETINA DISPLAY AMBIENT GLOW ONTO KEYBOARD & DESK MAT ── */}
      <pointLight
        ref={screenGlowLightRef}
        position={[0, 0.55, 0.25]}
        distance={2.5}
        intensity={1.0}
        color={glowColor}
      />

      {/* Screen face directional soft bounce */}
      <rectAreaLight
        position={[0, 0.5, 0.15]}
        width={1.4}
        height={0.9}
        intensity={1.2}
        color={glowColor}
      />
    </group>
  );
};

// Preload model with local Draco WASM decoding
useGLTF.preload("/models/macbook-transformed.glb", "/draco/");
