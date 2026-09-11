"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeviceFrameProps {
  progress: number;
  isMobile?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ progress, isMobile = false }) => {
  const phoneGroupRef = useRef<THREE.Group>(null);

  // High-Res Canvas Texture for Smartphone: FinFlow Mobile App (Flutter)
  const phoneTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 1280;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Dark slate app background
    ctx.fillStyle = "#0B0F19";
    ctx.fillRect(0, 0, 640, 1280);

    // Dynamic Island
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect(220, 20, 200, 44, 22);
    ctx.fill();

    // App Bar
    ctx.fillStyle = "#161D2F";
    ctx.fillRect(0, 84, 640, 100);
    ctx.fillStyle = "#5B8DEF";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("FinFlow Mobile", 40, 148);
    ctx.fillStyle = "#34D399";
    ctx.font = "bold 16px monospace";
    ctx.fillText("● NESTJS CLOUD SYNCED", 370, 146);

    // Card 1: Balance & Cloud Telemetry
    ctx.fillStyle = "#161D2F";
    ctx.roundRect(32, 210, 576, 240, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(91, 141, 239, 0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#94A3B8";
    ctx.font = "18px sans-serif";
    ctx.fillText("TOTAL NET BALANCE", 64, 260);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 52px monospace";
    ctx.fillText("$28,450.00", 64, 330);
    ctx.fillStyle = "#34D399";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("↑ +14.2% Monthly Investments · Cloud Cache 12ms", 64, 395);

    // Card 2: flutter_blueprint Architecture Benchmark
    ctx.fillStyle = "#161D2F";
    ctx.roundRect(32, 480, 576, 320, 24);
    ctx.fill();
    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("flutter_blueprint Benchmark (v3.0.0)", 64, 530);

    const bars = [45, 90, 60, 120, 160, 140, 190, 150, 220, 210, 240];
    bars.forEach((val, i) => {
      ctx.fillStyle = i === bars.length - 1 ? "#5B8DEF" : "#334155";
      ctx.roundRect(64 + i * 46, 750 - val, 32, val, 8);
      ctx.fill();
    });

    // Card 3: Realtime Nodes / Features
    ctx.fillStyle = "#161D2F";
    ctx.roundRect(32, 830, 576, 340, 24);
    ctx.fill();
    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Active Production Modules", 64, 880);

    const modules = [
      { name: "BLoC State Scaffolder", status: "Pub.dev Verified", color: "#34D399" },
      { name: "NestJS JWT Cloud Gateway", status: "AES-256 Encrypted", color: "#38BDF8" },
      { name: "Group Settlement Algorithm", status: "Minimal Debt Graph", color: "#FBBF24" }
    ];

    modules.forEach((mod, idx) => {
      ctx.fillStyle = "#1E293B";
      ctx.roundRect(56, 915 + idx * 72, 528, 56, 12);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(mod.name, 76, 952 + idx * 72);

      ctx.fillStyle = mod.color;
      ctx.font = "bold 14px monospace";
      ctx.fillText(mod.status, 370, 952 + idx * 72);
    });

    // Home indicator bar
    ctx.fillStyle = "#64748B";
    ctx.roundRect(220, 1230, 200, 8, 4);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (phoneGroupRef.current) {
      // Gentle floating micro-motion on smartphone
      phoneGroupRef.current.position.y = 0.38 + Math.sin(elapsed * 1.6) * 0.015;
    }
  });

  return (
    <group
      ref={phoneGroupRef}
      position={[-0.92, 0.38, 0.48]}
      rotation={[-0.32, 0.22, 0]}
    >
      {/* Wireless Charger Angled Stand */}
      <mesh position={[0, -0.22, -0.1]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.05, 24]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.16]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.45, 0.06]} />
        <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Modern Smartphone Chassis */}
      <mesh castShadow>
        <boxGeometry args={[0.82, 1.65, 0.075]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Outer Titanium Trim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.85, 1.68, 0.065]} />
        <meshStandardMaterial color="#60A5FA" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Screen Glass */}
      <mesh position={[0, 0, 0.039]}>
        <planeGeometry args={[0.78, 1.6]} />
        {phoneTexture ? (
          <meshBasicMaterial map={phoneTexture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0B0F19" emissive="#3B82F6" roughness={0.1} />
        )}
      </mesh>

      {/* Soft Blue Screen Glow */}
      <pointLight position={[0, 0, 0.35]} intensity={0.75} distance={1.8} color="#60A5FA" />
    </group>
  );
};
