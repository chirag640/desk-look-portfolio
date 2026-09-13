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

export const StudioDisplay: React.FC<StudioDisplayProps> = ({
  progress,
  isMobile = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenBarLightRef = useRef<THREE.PointLight>(null);
  const leftWooferRef = useRef<THREE.Group>(null);
  const rightWooferRef = useRef<THREE.Group>(null);

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
  const { playClick, playThock, playMug, playPaperRustle } = useSoundEffects();

  const [steamPuff, setSteamPuff] = useState(0);

  // Steam particle initial offsets
  const steamParticles = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      speed: 0.18 + Math.random() * 0.12,
      xOffset: (Math.random() - 0.5) * 0.05,
      zOffset: (Math.random() - 0.5) * 0.05,
      curlSpeed: 1.5 + Math.random() * 1.5,
      phase: i * 0.7
    }));
  }, []);

  // ScreenBar dust motes
  const dustParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      baseX: (Math.random() - 0.5) * 1.8,
      baseY: -0.2 + Math.random() * 1.0,
      baseZ: (Math.random() - 0.5) * 0.8,
      speed: 0.04 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);

  const steamRefs = useRef<THREE.Mesh[]>([]);
  const dustRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. ScreenBar ambient light breathing
    if (screenBarLightRef.current) {
      const baseIntensity =
        lightingMood === "golden" ? 1.8 : lightingMood === "rain" ? 1.2 : 1.5;
      screenBarLightRef.current.intensity =
        baseIntensity + Math.sin(elapsed * 2.0) * 0.08;
    }

    // 2. Speaker woofers bounce when music is playing
    const wooferBounce = isMusicPlaying ? Math.sin(elapsed * 14) * 0.012 : 0;
    if (leftWooferRef.current) {
      leftWooferRef.current.position.z = 0.275 + wooferBounce;
    }
    if (rightWooferRef.current) {
      rightWooferRef.current.position.z = 0.275 + wooferBounce;
    }

    // 3. Steaming Coffee Mug Particles Rising
    steamParticles.forEach((p, i) => {
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

    // 4. Cozy ScreenBar Dust Motes
    dustParticles.forEach((d, i) => {
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
      {/* ── 1. EXECUTIVE DARK WALNUT DESK TOP ── */}
      <mesh
        position={[0, -0.65, 0]}
        receiveShadow
        onClick={() => setCameraView(cameraView === "desk" ? "screen" : "desk")}
      >
        <boxGeometry args={[7.2, 0.12, 3.2]} />
        <meshStandardMaterial color="#0F141C" roughness={0.45} metalness={0.15} />
      </mesh>
      {/* Front Chamfer Trim */}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[7.24, 0.02, 3.24]} />
        <meshStandardMaterial color="#080A0E" roughness={0.7} />
      </mesh>

      {/* Premium Charcoal Leather/Felt Desk Mat */}
      <mesh position={[0, -0.585, 0.35]} receiveShadow>
        <boxGeometry args={[4.2, 0.01, 1.6]} />
        <meshStandardMaterial color="#141822" roughness={0.82} />
      </mesh>
      {/* Desk mat stitched accent rim */}
      <mesh position={[0, -0.585, 0.35]}>
        <boxGeometry args={[4.24, 0.005, 1.64]} />
        <meshStandardMaterial color="#242E42" roughness={0.7} />
      </mesh>

      {/* ── 2. AUTHENTIC 3D APPLE MACBOOK PRO M3 MAX WORKSTATION ── */}
      <MacWorkstation progress={progress} isMobile={isMobile} />

      {/* ── 3. MODERN SLIM SCREENBAR AMBIENT LIGHT ── */}
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

      {/* ── 4. REFERENCE STUDIO MONITORS (CLICK TO TOGGLE MUSIC) ── */}
      {/* Left Speaker */}
      <group
        position={[-2.75, 0.12, -0.65]}
        rotation={[0, 0.32, 0]}
        onClick={handleSpeakerClick}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.82, 0.54]} />
          <meshStandardMaterial color="#13161F" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.272]}>
          <planeGeometry args={[0.46, 0.8]} />
          <meshStandardMaterial color="#1E2330" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0.275]}>
          <circleGeometry args={[0.055, 24]} />
          <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Pulsing Woofer */}
        <group ref={leftWooferRef} position={[0, -0.12, 0.275]}>
          <mesh>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
        </group>
        <mesh position={[0, -0.31, 0.275]}>
          <circleGeometry args={[0.035, 20]} />
          <meshBasicMaterial color="#090B10" />
        </mesh>
        {/* Status LED: Amber when Music is playing, Cyan on standby */}
        <mesh position={[0.17, -0.34, 0.275]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial color={isMusicPlaying ? "#F59E0B" : "#38BDF8"} />
        </mesh>
      </group>

      {/* Right Speaker */}
      <group
        position={[2.75, 0.12, -0.65]}
        rotation={[0, -0.32, 0]}
        onClick={handleSpeakerClick}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.82, 0.54]} />
          <meshStandardMaterial color="#13161F" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.272]}>
          <planeGeometry args={[0.46, 0.8]} />
          <meshStandardMaterial color="#1E2330" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0.275]}>
          <circleGeometry args={[0.055, 24]} />
          <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        </mesh>
        <group ref={rightWooferRef} position={[0, -0.12, 0.275]}>
          <mesh>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
        </group>
        <mesh position={[0, -0.31, 0.275]}>
          <circleGeometry args={[0.035, 20]} />
          <meshBasicMaterial color="#090B10" />
        </mesh>
        <mesh position={[-0.17, -0.34, 0.275]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial color={isMusicPlaying ? "#F59E0B" : "#38BDF8"} />
        </mesh>
      </group>

      {/* ── 5. CERAMIC COFFEE MUG & RISING STEAM PARTICLES ── */}
      <group position={[1.98, -0.47, 0.15]} onClick={handleMugClick}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.22, 24]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.082, 20]} />
          <meshStandardMaterial color="#29150B" roughness={0.2} />
        </mesh>
        <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.055, 0.016, 12, 20, Math.PI]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* Steam Particles Rising from Coffee */}
      {steamParticles.map((p, i) => (
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

      {/* ── 6. SCREENBAR LIGHT DUST MOTES (COZY FLOATING PARTICLES) ── */}
      {dustParticles.map((d, i) => (
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

      {/* ── 7. PRECISION WIRELESS MAGIC MOUSE ON DESK MAT ── */}
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

      {/* ── 8. 3M YELLOW STICKY NOTE ON DESK (CLICK TO OPEN SCRATCHPAD) ── */}
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
            color="#FEF08A"
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

      {/* ── 9. MECHANICAL SWITCH ACOUSTIC PROFILE TOGGLE ── */}
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

      {/* ── 10. MAGSAFE IPHONE ON DESK STAND MIRRORING FLUTTER UI ── */}
      <DeviceFrame progress={progress} isMobile={isMobile} />
    </group>
  );
};
