"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingObjectsProps {
  isMobile?: boolean;
}

export const FloatingObjects: React.FC<FloatingObjectsProps> = ({ isMobile = false }) => {
  const count = isMobile ? 18 : 36;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate deterministic floating positions
  const particles = useMemo(() => {
    const temp: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
      speed: number;
    }> = [];

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 5) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = -0.2 + (i % 7) * 0.45;
      const z = Math.sin(angle) * radius - 0.5;

      const scale = 0.04 + (i % 3) * 0.025;
      const speed = 0.4 + (i % 4) * 0.2;

      temp.push({
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale,
        speed
      });

      dummy.position.set(x, y, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
    }

    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const curY = p.pos[1] + Math.sin(elapsed * p.speed + i) * 0.12;
      dummy.position.set(p.pos[0], curY, p.pos[2]);
      dummy.rotation.set(
        p.rot[0] + elapsed * 0.1 * p.speed,
        p.rot[1] + elapsed * 0.15 * p.speed,
        p.rot[2]
      );
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8B6FE8"
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.45}
      />
    </instancedMesh>
  );
};
