"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMusicStore } from "@/hooks/useMusicStore";
import { DeviceFrame } from "./DeviceFrame";
import { MacWorkstation } from "./MacWorkstation";

interface StudioDisplayProps {
  progress: number;
  isMobile?: boolean;
  isZoomedIn?: boolean;
}

function createPRNG(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const prngSteam = createPRNG(13579);
const STEAM_PARTICLES = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  speed: 0.18 + prngSteam() * 0.12,
  xOffset: (prngSteam() - 0.5) * 0.05,
  zOffset: (prngSteam() - 0.5) * 0.05,
  curlSpeed: 1.5 + prngSteam() * 1.5,
  phase: i * 0.7
}));

const prngDust = createPRNG(24680);
const DUST_PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  baseX: (prngDust() - 0.5) * 2.2,
  baseY: -0.2 + prngDust() * 1.2,
  baseZ: (prngDust() - 0.5) * 0.9,
  speed: 0.04 + prngDust() * 0.05,
  phase: prngDust() * Math.PI * 2
}));

export const StudioDisplay: React.FC<StudioDisplayProps> = ({
  progress,
  isMobile = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenBarLightRef = useRef<THREE.PointLight>(null);
  const wallGrazeLightRef = useRef<THREE.PointLight>(null);
  const leftWooferRef = useRef<THREE.Group>(null);
  const rightWooferRef = useRef<THREE.Group>(null);
  const vuMeterRingRef = useRef<THREE.Group>(null);

  const {
    lightingMood,
    cameraView,
    setCameraView,
    keyboardSwitch,
    setKeyboardSwitch,
    setStickyNoteOpen
  } = useAtmosphereStore();

  const { isPlaying: isMusicPlaying, togglePlay: toggleMusicPlay, setPlayerOpen } =
    useMusicStore();
  const { playThock, playMug, playPaperRustle } = useSoundEffects();

  const [steamPuff, setSteamPuff] = useState(0);


  // Handwritten 3M Post-It texture on desk
  const noteTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Warm yellow post-it background
      ctx.fillStyle = "#FEF08A";
      ctx.fillRect(0, 0, 512, 512);

      // Subtle notebook guideline lines
      ctx.strokeStyle = "rgba(202, 138, 4, 0.22)";
      ctx.lineWidth = 2;
      for (let y = 140; y < 460; y += 50) {
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(482, y);
        ctx.stroke();
      }

      // Handwritten greeting in Caveat
      ctx.fillStyle = "#713F12";
      ctx.font = "italic 32px 'Caveat', cursive, sans-serif";
      ctx.fillText("Hey! Thanks for", 40, 130);
      ctx.fillText("visiting my studio ☕", 40, 180);
      ctx.fillText("Hit [Z] to view display", 40, 230);
      ctx.fillText("or play retro vinyl!", 40, 280);
      ctx.font = "bold 36px 'Caveat', cursive, sans-serif";
      ctx.fillText("— Chirag ✍️", 260, 350);

      // Small hint at bottom
      ctx.fillStyle = "rgba(113, 63, 18, 0.6)";
      ctx.font = "bold 18px monospace";
      ctx.fillText("Click to leave feedback", 40, 440);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Architectural walnut acoustic wall slats data
  const acousticSlats = useMemo(() => {
    const slats = [];
    const count = 36;
    const spacing = 0.28;
    const startX = -((count - 1) * spacing) / 2;
    for (let i = 0; i < count; i++) {
      slats.push({
        id: i,
        x: startX + i * spacing
      });
    }
    return slats;
  }, []);

  const steamRefs = useRef<THREE.Mesh[]>([]);
  const dustRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. ScreenBar ambient light & wall graze breathing
    if (screenBarLightRef.current) {
      const baseIntensity =
        lightingMood === "golden" ? 1.8 : lightingMood === "rain" ? 1.2 : 1.5;
      screenBarLightRef.current.intensity =
        baseIntensity + Math.sin(elapsed * 2.0) * 0.08;
    }
    if (wallGrazeLightRef.current) {
      wallGrazeLightRef.current.intensity =
        0.85 + Math.sin(elapsed * 1.6) * 0.05;
    }

    // 2. Speaker woofers bounce when music is playing
    const wooferBounce = isMusicPlaying ? Math.sin(elapsed * 14) * 0.014 : 0;
    if (leftWooferRef.current) {
      leftWooferRef.current.position.z = 0.24 + wooferBounce;
    }
    if (rightWooferRef.current) {
      rightWooferRef.current.position.z = 0.24 + wooferBounce;
    }

    // 3. Audio interface VU meter LED animation
    if (vuMeterRingRef.current) {
      const pulse = isMusicPlaying
        ? 0.8 + Math.abs(Math.sin(elapsed * 12)) * 0.5
        : 0.25;
      vuMeterRingRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Steaming Coffee Mug Particles Rising
    STEAM_PARTICLES.forEach((p, i) => {
      const mesh = steamRefs.current[i];
      if (mesh) {
        const cycle = (elapsed * p.speed + p.phase) % 1.0;
        mesh.position.y = -0.36 + cycle * 0.38 + (steamPuff > 0 ? 0.05 : 0);
        mesh.position.x =
          1.98 + p.xOffset + Math.sin(elapsed * p.curlSpeed + p.phase) * 0.035;
        mesh.position.z =
          0.15 + p.zOffset + Math.cos(elapsed * p.curlSpeed + p.phase) * 0.035;
        const scale = 0.015 + cycle * 0.04;
        mesh.scale.set(scale, scale, scale);
      }
    });

    // 5. Cozy ScreenBar Dust Motes
    DUST_PARTICLES.forEach((d, i) => {
      const mesh = dustRefs.current[i];
      if (mesh) {
        mesh.position.y =
          d.baseY + Math.sin(elapsed * d.speed * 8 + d.phase) * 0.08;
        mesh.position.x =
          d.baseX + Math.cos(elapsed * d.speed * 4 + d.phase) * 0.05;
      }
    });
  });

  const handleMugClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    playMug();
    setSteamPuff(1);
    setTimeout(() => setSteamPuff(0), 1600);
  };

  const handleSpeakerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    toggleMusicPlay();
    setPlayerOpen(true);
  };

  const screenBarColor =
    lightingMood === "golden"
      ? "#FDBA74"
      : lightingMood === "rain"
      ? "#E0E7FF"
      : "#FFE8C2";

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* ── 1. ARCHITECTURAL WALNUT ACOUSTIC SLAT WALL (STUDIO BACKDROP) ── */}
      <group position={[0, 1.3, -2.4]}>
        {/* Dark Acoustic Felt Backing */}
        <mesh position={[0, 0, -0.03]} receiveShadow>
          <planeGeometry args={[11.5, 4.8]} />
          <meshStandardMaterial color="#070A0F" roughness={0.92} />
        </mesh>

        {/* Vertical American Walnut Wood Slats */}
        {acousticSlats.map((slat) => (
          <mesh key={slat.id} position={[slat.x, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.075, 4.6, 0.04]} />
            <meshStandardMaterial
              color="#2E1D13"
              roughness={0.55}
              metalness={0.08}
            />
          </mesh>
        ))}

        {/* Top Indirect LED Grazing Light Strip */}
        <mesh position={[0, 2.32, 0.05]}>
          <boxGeometry args={[11.2, 0.04, 0.06]} />
          <meshBasicMaterial color="#FED7AA" />
        </mesh>
        <pointLight
          ref={wallGrazeLightRef}
          position={[0, 2.1, 0.35]}
          intensity={0.9}
          distance={5.5}
          color="#FDBA74"
        />
      </group>

      {/* ── 2. EXECUTIVE DARK WALNUT FLOATING DESK ── */}
      <mesh
        position={[0, -0.65, 0]}
        receiveShadow
        onClick={() => setCameraView(cameraView === "desk" ? "screen" : "desk")}
      >
        <boxGeometry args={[7.4, 0.12, 3.2]} />
        <meshStandardMaterial color="#0F141C" roughness={0.45} metalness={0.15} />
      </mesh>
      {/* Front Chamfer Trim */}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[7.44, 0.02, 3.24]} />
        <meshStandardMaterial color="#080A0E" roughness={0.7} />
      </mesh>
      {/* Brushed Aluminum Under-Chassis Beam */}
      <mesh position={[0, -0.76, 0]}>
        <boxGeometry args={[6.8, 0.06, 2.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Premium Charcoal Leather/Felt Desk Mat */}
      <mesh position={[0, -0.585, 0.35]} receiveShadow>
        <boxGeometry args={[4.4, 0.01, 1.65]} />
        <meshStandardMaterial color="#141822" roughness={0.82} />
      </mesh>
      {/* Stitched Accent Rim */}
      <mesh position={[0, -0.585, 0.35]}>
        <boxGeometry args={[4.44, 0.005, 1.69]} />
        <meshStandardMaterial color="#242E42" roughness={0.7} />
      </mesh>

      {/* ── 3. AUTHENTIC 3D APPLE MACBOOK PRO M3 MAX WORKSTATION ── */}
      <MacWorkstation progress={progress} isMobile={isMobile} />

      {/* ── 4. MODERN SLIM ARCHITECTURAL SCREENBAR AMBIENT LIGHT ── */}
      <group position={[0, 1.25, -0.15]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 20]} />
          <meshStandardMaterial color="#1E293B" roughness={0.25} metalness={0.85} />
        </mesh>
        <pointLight
          ref={screenBarLightRef}
          position={[0, -0.15, 0.25]}
          intensity={1.5}
          distance={3.4}
          color={screenBarColor}
        />
      </group>

      {/* ── 5. GENELEC-STYLE PRECISION STUDIO MONITORS (CLICK TO PLAY) ── */}
      {/* Left Studio Monitor */}
      <group
        position={[-2.65, 0.08, -0.55]}
        rotation={[0, 0.28, 0]}
        onClick={handleSpeakerClick}
      >
        {/* Sculpted Die-Cast Aluminum Enclosure */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.52, 0.84, 0.48]} />
          <meshStandardMaterial color="#12151E" roughness={0.32} metalness={0.75} />
        </mesh>
        {/* Waveguide Tweeter Recess */}
        <mesh position={[0, 0.22, 0.242]}>
          <circleGeometry args={[0.065, 32]} />
          <meshStandardMaterial color="#0A0D14" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.22, 0.25]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* Pulsing Bass Woofer Cone */}
        <group ref={leftWooferRef} position={[0, -0.14, 0.24]}>
          <mesh>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.25} />
          </mesh>
        </group>
        {/* Acoustic Port Vent */}
        <mesh position={[0, -0.33, 0.242]}>
          <boxGeometry args={[0.18, 0.03, 0.02]} />
          <meshBasicMaterial color="#05080E" />
        </mesh>
        {/* Power Status LED */}
        <mesh position={[0.18, -0.34, 0.244]}>
          <circleGeometry args={[0.008, 12]} />
          <meshBasicMaterial color={isMusicPlaying ? "#F59E0B" : "#38BDF8"} />
        </mesh>
      </group>

      {/* Right Studio Monitor */}
      <group
        position={[2.65, 0.08, -0.55]}
        rotation={[0, -0.28, 0]}
        onClick={handleSpeakerClick}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.52, 0.84, 0.48]} />
          <meshStandardMaterial color="#12151E" roughness={0.32} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.22, 0.242]}>
          <circleGeometry args={[0.065, 32]} />
          <meshStandardMaterial color="#0A0D14" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.22, 0.25]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.15} metalness={0.95} />
        </mesh>
        <group ref={rightWooferRef} position={[0, -0.14, 0.24]}>
          <mesh>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.25} />
          </mesh>
        </group>
        <mesh position={[0, -0.33, 0.242]}>
          <boxGeometry args={[0.18, 0.03, 0.02]} />
          <meshBasicMaterial color="#05080E" />
        </mesh>
        <mesh position={[-0.18, -0.34, 0.244]}>
          <circleGeometry args={[0.008, 12]} />
          <meshBasicMaterial color={isMusicPlaying ? "#F59E0B" : "#38BDF8"} />
        </mesh>
      </group>

      {/* ── 6. STUDIO AUDIO INTERFACE (UNIVERSAL AUDIO APOLLO STYLE) ── */}
      <group
        position={[-1.95, -0.56, 0.38]}
        rotation={[-0.12, 0.24, 0]}
        onClick={handleSpeakerClick}
      >
        {/* CNC Anodized Aluminum Desktop Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.065, 0.36]} />
          <meshStandardMaterial color="#1E2533" roughness={0.28} metalness={0.88} />
        </mesh>
        {/* Large Precision Knurled Rotary Master Dial */}
        <mesh position={[0, 0.045, -0.02]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.035, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.92} />
        </mesh>
        {/* Glowing LED VU Meter Ring Around Master Knob */}
        <group ref={vuMeterRingRef} position={[0, 0.035, -0.02]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.088, 0.098, 32]} />
            <meshBasicMaterial color={isMusicPlaying ? "#10B981" : "#38BDF8"} />
          </mesh>
        </group>
        {/* Dual Input Monitor Knobs */}
        <mesh position={[-0.13, 0.038, 0.1]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.06, 0.038, 0.1]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Front Headphone Jack Socket */}
        <mesh position={[0.13, -0.01, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 16]} />
          <meshBasicMaterial color="#0A0D14" />
        </mesh>
      </group>

      {/* ── 7. ARTISANAL MATTE CERAMIC COFFEE MUG & STEAM ── */}
      <group position={[1.98, -0.47, 0.15]} onClick={handleMugClick}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.22, 24]} />
          <meshStandardMaterial color="#151A24" roughness={0.38} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.082, 20]} />
          <meshStandardMaterial color="#29150B" roughness={0.2} />
        </mesh>
        <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.055, 0.016, 12, 20, Math.PI]} />
          <meshStandardMaterial color="#151A24" roughness={0.38} metalness={0.12} />
        </mesh>
      </group>

      {/* Steam Particles Rising from Coffee */}
      {STEAM_PARTICLES.map((p, i) => (
        <mesh
          key={p.id}
          ref={(el) => {
            if (el) steamRefs.current[i] = el;
          }}
          position={[1.98, -0.35, 0.15]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
        </mesh>
      ))}

      {/* ── 8. SCREENBAR LIGHT DUST MOTES (COZY FLOATING PARTICLES) ── */}
      {DUST_PARTICLES.map((d, i) => (
        <mesh
          key={d.id}
          ref={(el) => {
            if (el) dustRefs.current[i] = el;
          }}
          position={[d.baseX, d.baseY, d.baseZ]}
        >
          <sphereGeometry args={[0.006, 6, 6]} />
          <meshBasicMaterial color="#FEF3C7" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* ── 9. PRECISION WIRELESS MAGIC MOUSE ON DESK MAT ── */}
      <group position={[1.65, -0.56, 0.52]} onClick={() => playThock(keyboardSwitch)}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.048, 0.11, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[-0.025, -0.01, 0]}>
          <boxGeometry args={[0.02, 0.035, 0.08]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
      </group>

      {/* ── 10. 3M YELLOW STICKY NOTE ON DESK (CLICK TO OPEN SCRATCHPAD) ── */}
      <group
        position={[1.25, -0.575, 0.62]}
        rotation={[-Math.PI / 2, 0, 0.18]}
        onClick={(e) => {
          e.stopPropagation();
          playPaperRustle();
          setStickyNoteOpen(true);
        }}
      >
        {/* Yellow Paper Note */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[0.24, 0.24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            map={noteTexture || undefined}
            roughness={0.88}
            metalness={0.0}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
        {/* Translucent Frosted Tape at Top */}
        <mesh position={[0, 0.11, 0.002]}>
          <planeGeometry args={[0.11, 0.032]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.65} />
        </mesh>
        {/* Dog-eared slight corner fold */}
        <mesh position={[0.09, -0.09, 0.001]} rotation={[0, 0, 0.25]}>
          <planeGeometry args={[0.035, 0.035]} />
          <meshBasicMaterial color="#EAB308" />
        </mesh>
      </group>

      {/* ── 11. MECHANICAL SWITCH ACOUSTIC PROFILE TOGGLE ── */}
      <group
        position={[-1.52, -0.565, 0.35]}
        onClick={(e) => {
          e.stopPropagation();
          const next =
            keyboardSwitch === "boba_u4t"
              ? "gateron_yellow"
              : keyboardSwitch === "gateron_yellow"
              ? "cherry_blue"
              : "boba_u4t";
          setKeyboardSwitch(next);
          playThock(next);
        }}
      >
        {/* Toggle Housing Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.024, 0.1]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Switch Slider Button */}
        <mesh
          position={[
            keyboardSwitch === "cherry_blue"
              ? -0.048
              : keyboardSwitch === "gateron_yellow"
              ? 0
              : 0.048,
            0.016,
            0
          ]}
          castShadow
        >
          <boxGeometry args={[0.042, 0.02, 0.07]} />
          <meshStandardMaterial
            color={
              keyboardSwitch === "cherry_blue"
                ? "#0284C7"
                : keyboardSwitch === "gateron_yellow"
                ? "#EAB308"
                : "#D97706"
            }
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        {/* Glow LED Indicator */}
        <mesh position={[0, 0.014, -0.035]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial
            color={
              keyboardSwitch === "cherry_blue"
                ? "#38BDF8"
                : keyboardSwitch === "gateron_yellow"
                ? "#FDE047"
                : "#F59E0B"
            }
          />
        </mesh>
      </group>

      {/* ── 12. MAGSAFE IPHONE ON DESK STAND MIRRORING FLUTTER UI ── */}
      <DeviceFrame progress={progress} isMobile={isMobile} />
    </group>
  );
};
