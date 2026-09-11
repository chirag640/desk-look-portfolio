"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface EnvironmentProps {
  progress?: number;
  isMobile?: boolean;
}

export const StudioEnvironment = ({ isMobile = false }: EnvironmentProps) => {
  const groundGrid = useMemo(() => {
    return new THREE.GridHelper(30, 40, 0x3b82f6, 0x1e293b);
  }, []);

  return (
    <group>
      {/* Soft Ambient Fill for Sleek Dark Studio */}
      <ambientLight intensity={0.9} color="#1E293B" />

      {/* Main Studio Key Light (Soft Warm Directional) */}
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.2}
        color="#F8FAFC"
        castShadow={!isMobile}
        shadow-mapSize-width={isMobile ? 512 : 1024}
        shadow-mapSize-height={isMobile ? 512 : 1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-bias={-0.0001}
      />

      {/* Cool Cyan Rim Light highlighting Aluminum Chamfers */}
      <directionalLight
        position={[-6, 6, -3]}
        intensity={1.2}
        color="#38BDF8"
      />

      {/* Subtle Purple Accent Backlight */}
      <pointLight
        position={[0, 3, -4]}
        intensity={1.5}
        color="#8B6FE8"
        distance={12}
      />

      {/* Warm Downward Desk Fill */}
      <directionalLight
        position={[0, 4, 3]}
        intensity={0.6}
        color="#FEF3C7"
      />

      {/* Ground plane catching soft contact shadows */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        receiveShadow={!isMobile}
      >
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      {/* Architectural Digital Floor Grid */}
      <primitive
        object={groundGrid}
        position={[0, -1.21, 0]}
      />
    </group>
  );
};
