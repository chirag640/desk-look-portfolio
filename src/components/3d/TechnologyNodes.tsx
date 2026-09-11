"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechnologyNodesProps {
  progress: number;
  isMobile?: boolean;
}

interface NodeData {
  name: string;
  category: string;
  color: string;
  position: [number, number, number];
  type: "cylinder" | "cube" | "octahedron" | "sphere" | "torus";
}

const TECH_NODES: NodeData[] = [
  { name: "Flutter", category: "Mobile", color: "#5B8DEF", position: [1.3, 1.8, 0.4], type: "cylinder" },
  { name: "Dart", category: "Mobile", color: "#56C7D9", position: [2.3, 1.9, -0.2], type: "torus" },
  { name: "NestJS", category: "Backend", color: "#E982B5", position: [2.2, 0.8, 0.3], type: "octahedron" },
  { name: "TypeScript", category: "Full-Stack", color: "#3B82F6", position: [1.2, 0.6, 0.6], type: "cube" },
  { name: "Next.js", category: "Frontend", color: "#151515", position: [1.8, 2.3, -0.4], type: "cylinder" },
  { name: "PostgreSQL", category: "Database", color: "#F4C95D", position: [2.5, 1.3, -0.3], type: "cylinder" },
  { name: "Pub.dev CLI", category: "Tooling", color: "#8B6FE8", position: [1.1, 2.3, 0.1], type: "octahedron" }
];

export const TechnologyNodes: React.FC<TechnologyNodesProps> = ({ progress, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // Active around Screen 2 (vertical screen / skills: 0.28 to 0.52)
    const isSkillsActive = progress >= 0.26 && progress <= 0.54;
    const targetScale = isSkillsActive ? (isMobile ? 0.75 : 1) : 0.001;

    if (groupRef.current) {
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
      groupRef.current.rotation.y = Math.sin(elapsed * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.001}>
      {TECH_NODES.map((node, i) => {
        const isHovered = hoveredIdx === i;
        return (
          <TechNodeItem
            key={node.name}
            node={node}
            index={i}
            isHovered={isHovered}
            onHover={(h) => setHoveredIdx(h ? i : null)}
          />
        );
      })}
    </group>
  );
};

interface TechNodeItemProps {
  node: NodeData;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const TechNodeItem: React.FC<TechNodeItemProps> = ({ node, index, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() + index * 1.4;
    if (meshRef.current) {
      meshRef.current.position.y = node.position[1] + Math.sin(elapsed * 1.8) * 0.07;
      meshRef.current.rotation.x = elapsed * (isHovered ? 1.6 : 0.4);
      meshRef.current.rotation.y = elapsed * (isHovered ? 2.2 : 0.6);
    }
  });

  return (
    <group position={[node.position[0], node.position[1], node.position[2]]}>
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
        scale={isHovered ? 1.3 : 1.0}
      >
        {node.type === "cylinder" && <cylinderGeometry args={[0.18, 0.18, 0.16, 24]} />}
        {node.type === "cube" && <boxGeometry args={[0.26, 0.26, 0.26]} />}
        {node.type === "octahedron" && <octahedronGeometry args={[0.22, 0]} />}
        {node.type === "torus" && <torusGeometry args={[0.18, 0.06, 16, 32]} />}
        {node.type === "sphere" && <sphereGeometry args={[0.18, 24, 24]} />}

        <meshStandardMaterial
          color={node.color}
          roughness={0.25}
          metalness={0.4}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.8 : 0.2}
        />
      </mesh>

      {isHovered && (
        <pointLight position={[0, 0, 0.3]} intensity={1.4} distance={1.8} color={node.color} />
      )}
    </group>
  );
};
