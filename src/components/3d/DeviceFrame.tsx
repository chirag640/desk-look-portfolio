"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface DeviceFrameProps {
  progress: number;
  isMobile?: boolean;
}

const SPACE_COLORS = [
  { primary: "#5B8DEF", title: "FinFlow Mobile", tag: "● NESTJS CLOUD" },
  { primary: "#38BDF8", title: "Chirag Chaudhary", tag: "● SOFTWARE ENGINEER" },
  { primary: "#34D399", title: "Flutter / Dart Stack", tag: "● PRODUCTION READY" },
  { primary: "#FBBF24", title: "flutter_blueprint", tag: "● PUB.DEV v3.0.0" },
  { primary: "#A78BFA", title: "Engineering History", tag: "● TCS & FINTECH" },
  { primary: "#F43F5E", title: "70 Repositories", tag: "● GITHUB ACTIVE" },
  { primary: "#10B981", title: "Quick Contact", tag: "● AVAILABLE NOW" }
];

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ progress, isMobile = false }) => {
  const phoneGroupRef = useRef<THREE.Group>(null);
  const { playClick } = useSoundEffects();

  const activeSpace = Math.max(0, Math.min(6, Math.round(progress * 6)));

  // Offscreen canvas and texture for dynamic screen drawing
  const { canvas, texture } = useMemo(() => {
    if (typeof window === "undefined") {
      return { canvas: null, texture: null };
    }
    const c = document.createElement("canvas");
    c.width = 480;
    c.height = 960;
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { canvas: c, texture: tex };
  }, []);

  // Redraw canvas texture whenever active space changes
  useEffect(() => {
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const info = SPACE_COLORS[activeSpace];

    // Background
    ctx.fillStyle = "#090D16";
    ctx.fillRect(0, 0, 480, 960);

    // Subtle gradient glow
    const grad = ctx.createRadialGradient(240, 260, 10, 240, 260, 360);
    grad.addColorStop(0, `${info.primary}22`);
    grad.addColorStop(1, "#00000000");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 480, 960);

    // Dynamic Island
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect(160, 16, 160, 36, 18);
    ctx.fill();

    // Top Navigation Header
    ctx.fillStyle = "#121826";
    ctx.roundRect(24, 72, 432, 68, 16);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(info.title, 44, 114);

    ctx.fillStyle = info.primary;
    ctx.font = "bold 11px monospace";
    ctx.fillText(info.tag, 305, 112);

    // Screen Content based on active space
    if (activeSpace === 0) {
      // Space 1: FinFlow Mobile Banking
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 200, 20);
      ctx.fill();
      ctx.strokeStyle = "rgba(91, 141, 239, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#94A3B8";
      ctx.font = "14px sans-serif";
      ctx.fillText("TOTAL NET ASSETS", 48, 205);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 42px monospace";
      ctx.fillText("$28,450.00", 48, 265);

      ctx.fillStyle = "#34D399";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("↑ +14.2% Monthly · Live BLoC Sync", 48, 320);

      // Mini Sparkline Graph
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 380, 432, 220, 20);
      ctx.fill();

      ctx.fillStyle = "#E2E8F0";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("Real-Time Ledger Telemetry", 48, 420);

      const heights = [30, 65, 45, 90, 120, 110, 145, 130];
      heights.forEach((h, i) => {
        ctx.fillStyle = i === heights.length - 1 ? "#5B8DEF" : "#334155";
        ctx.roundRect(48 + i * 48, 560 - h, 34, h, 6);
        ctx.fill();
      });
    } else if (activeSpace === 1) {
      // Space 2: Profile Badge
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 260, 20);
      ctx.fill();

      ctx.fillStyle = "#38BDF8";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("Chirag Chaudhary", 48, 220);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "15px sans-serif";
      ctx.fillText("Software Engineer @ TCS", 48, 255);
      ctx.fillText("Gandhinagar, Gujarat, India", 48, 285);
      ctx.fillText("B.Tech Computer Science", 48, 315);

      ctx.fillStyle = "#34D399";
      ctx.font = "bold 13px monospace";
      ctx.fillText("● OPEN TO HIGH-IMPACT ROLES", 48, 375);
    } else if (activeSpace === 2) {
      // Space 3: Tech Stack
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 380, 20);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("Core Mobile Architecture", 48, 205);

      const techs = [
        { name: "Flutter 3.x / Dart", val: "Enterprise Clean Arch" },
        { name: "State Management", val: "BLoC & Riverpod" },
        { name: "Backend / Cloud", val: "NestJS, TypeScript, Postgres" },
        { name: "Mobile Security", val: "TLS Pinning & AES-256" }
      ];

      techs.forEach((t, i) => {
        ctx.fillStyle = "#0E1524";
        ctx.roundRect(44, 230 + i * 72, 392, 56, 12);
        ctx.fill();
        ctx.fillStyle = "#34D399";
        ctx.font = "bold 14px monospace";
        ctx.fillText(t.name, 60, 265 + i * 72);
        ctx.fillStyle = "#94A3B8";
        ctx.font = "12px sans-serif";
        ctx.fillText(t.val, 245, 265 + i * 72);
      });
    } else if (activeSpace === 3) {
      // Space 4: flutter_blueprint
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 280, 20);
      ctx.fill();

      ctx.fillStyle = "#FBBF24";
      ctx.font = "bold 24px monospace";
      ctx.fillText("flutter_blueprint", 48, 215);

      ctx.fillStyle = "#E2E8F0";
      ctx.font = "15px sans-serif";
      ctx.fillText("Pub.dev Verified Package", 48, 255);
      ctx.fillText("20★ GitHub Stars", 48, 290);
      ctx.fillText("Pub Score: 140/140", 48, 325);

      ctx.fillStyle = "#34D399";
      ctx.font = "bold 13px monospace";
      ctx.fillText("✓ Zero-Config Clean Architecture", 48, 390);
    } else if (activeSpace === 4) {
      // Space 5: History
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 260, 20);
      ctx.fill();

      ctx.fillStyle = "#A78BFA";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("Career Progression", 48, 215);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("• Software Engineer @ TCS (Present)", 48, 265);
      ctx.fillText("• Published flutter_blueprint Engine", 48, 305);
      ctx.fillText("• Distributed High-Scale FinTech", 48, 345);
    } else if (activeSpace === 5) {
      // Space 6: GitHub Repos
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 280, 20);
      ctx.fill();

      ctx.fillStyle = "#F43F5E";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("GitHub Ecosystem", 48, 215);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "14px monospace";
      ctx.fillText("@chirag640 · 70 Public Repos", 48, 260);
      ctx.fillText("540+ Contributions in 2026", 48, 295);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "12px sans-serif";
      ctx.fillText("Top: flutter_blueprint, FinFlow, CollabStream", 48, 345);
    } else {
      // Space 7: Contact
      ctx.fillStyle = "#161F33";
      ctx.roundRect(24, 160, 432, 260, 20);
      ctx.fill();

      ctx.fillStyle = "#10B981";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("Direct Contact", 48, 215);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "13px monospace";
      ctx.fillText("chiragchaudhary1910@gmail.com", 48, 265);
      ctx.fillText("linkedin.com/in/chiragchaudhary1910", 48, 305);
      ctx.fillText("github.com/chirag640", 48, 345);
    }

    // Home Indicator Bar
    ctx.fillStyle = "#64748B";
    ctx.roundRect(170, 925, 140, 6, 3);
    ctx.fill();

    texture.needsUpdate = true;
  }, [activeSpace, canvas, texture]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (phoneGroupRef.current) {
      // Very subtle organic floating breath
      phoneGroupRef.current.position.y = -0.42 + Math.sin(elapsed * 1.8) * 0.004;
    }
  });

  return (
    <group
      ref={phoneGroupRef}
      position={[1.52, -0.42, 0.28]}
      rotation={[-0.15, -0.35, 0]}
      scale={0.34}
      onClick={(e) => {
        e.stopPropagation();
        playClick();
      }}
    >
      {/* ── MAGSAFE ALUMINUM DESK STAND ── */}
      {/* Heavy Circular Base on Desk */}
      <mesh position={[0, -0.42, -0.12]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.38, 0.05, 32]} />
        <meshStandardMaterial color="#0F172A" roughness={0.35} metalness={0.8} />
      </mesh>
      {/* Angled Aluminum Arm */}
      <mesh position={[0, -0.16, -0.18]} rotation={[0.36, 0, 0]} castShadow>
        <boxGeometry args={[0.07, 0.52, 0.04]} />
        <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* MagSafe Magnetic Puck Disc */}
      <mesh position={[0, 0.02, -0.05]} rotation={[-0.24, 0, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.03, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* ── SMARTPHONE CHASSIS (TITANIUM EDGE) ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.86, 1.72, 0.065]} />
        <meshStandardMaterial color="#1E2433" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Outer Titanium Bezel Chamfer */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.88, 1.74, 0.055]} />
        <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ── SCREEN GLASS WITH DYNAMIC FLUTTER UI TEXTURE ── */}
      <mesh position={[0, 0, 0.034]}>
        <planeGeometry args={[0.82, 1.68]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0B0F19" emissive="#3B82F6" roughness={0.1} />
        )}
      </mesh>

      {/* Dynamic Screen Glow */}
      <pointLight
        position={[0, 0, 0.25]}
        intensity={0.45}
        distance={1.4}
        color={SPACE_COLORS[activeSpace].primary}
      />
    </group>
  );
};
