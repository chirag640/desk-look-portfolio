"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TimelineNodesProps {
  progress: number;
  isMobile?: boolean;
}

export const TimelineNodes: React.FC<TimelineNodesProps> = ({ progress, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const isTimelineActive = progress >= 0.68 && progress <= 0.88;
    const targetScale = isTimelineActive ? (isMobile ? 0.75 : 1) : 0.001;

    if (groupRef.current) {
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
      // Gentle breathing rotation
      groupRef.current.rotation.y = -0.3 + Math.sin(elapsed * 0.8) * 0.06;
    }

    if (pulseRef.current) {
      const pulseScale = 1 + Math.sin(elapsed * 4.0) * 0.2;
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  const nodes = [
    { y: 1.6, color: "#5B8DEF", label: "2025 - 2026" },
    { y: 0.8, color: "#8B6FE8", label: "2024 - 2025" },
    { y: 0.0, color: "#63C58A", label: "2023 - 2024" }
  ];

  return (
    <group ref={groupRef} position={[-1.2, 0, 0]} scale={0.001}>
      {/* Central Glassy Timeline Rod */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2.2, 16]} />
        <meshStandardMaterial
          color="#94A3B8"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Nodes on Timeline */}
      {nodes.map((node, i) => (
        <group key={i} position={[0, node.y, 0]}>
          {/* Main Node Sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial
              color={node.color}
              roughness={0.2}
              metalness={0.4}
              emissive={node.color}
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Outer Pulsing Ring for current year node */}
          {i === 0 && (
            <mesh ref={pulseRef}>
              <ringGeometry args={[0.16, 0.22, 32]} />
              <meshBasicMaterial
                color={node.color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.6}
              />
            </mesh>
          )}

          {/* Horizontal Connector Arm */}
          <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 12]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
