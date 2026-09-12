"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMusicStore } from "@/hooks/useMusicStore";
import { DeviceFrame } from "./DeviceFrame";

interface StudioDisplayProps {
  progress: number;
  isMobile?: boolean;
  isZoomedIn?: boolean;
}

export const StudioDisplay: React.FC<StudioDisplayProps> = ({ progress, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);
  const screenBarLightRef = useRef<THREE.PointLight>(null);
  const macbookLightRef = useRef<THREE.PointLight>(null);
  const keyboardMeshRef = useRef<THREE.Group>(null);
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

  const { isPlaying: isMusicPlaying, togglePlay: toggleMusicPlay, setPlayerOpen } = useMusicStore();
  const { playClick, playThock, playMug, playPaperRustle } = useSoundEffects();

  const [keyDepressed, setKeyDepressed] = useState(false);
  const [steamPuff, setSteamPuff] = useState(0);

  // Steam particle initial random offsets
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

  // ScreenBar dust motes initial positions
  const dustParticles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      baseX: (Math.random() - 0.5) * 1.6,
      baseY: -0.2 + Math.random() * 1.2,
      baseZ: (Math.random() - 0.5) * 0.8,
      speed: 0.04 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);

  const steamRefs = useRef<THREE.Mesh[]>([]);
  const dustRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. ScreenBar & ambient lights pulse
    if (screenBarLightRef.current) {
      const baseIntensity = lightingMood === "golden" ? 1.9 : lightingMood === "rain" ? 1.3 : 1.6;
      screenBarLightRef.current.intensity = baseIntensity + Math.sin(elapsed * 2.0) * 0.08;
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 0.9 + Math.sin(elapsed * 1.5) * 0.05;
    }
    if (macbookLightRef.current) {
      screenLightRef.current && (macbookLightRef.current.intensity = 0.6 + Math.sin(elapsed * 2.2) * 0.06);
    }

    // 2. Speaker woofers bounce when music is playing
    const wooferBounce = isMusicPlaying ? Math.sin(elapsed * 14) * 0.012 : 0;
    if (leftWooferRef.current) {
      leftWooferRef.current.position.z = 0.275 + wooferBounce;
    }
    if (rightWooferRef.current) {
      rightWooferRef.current.position.z = 0.275 + wooferBounce;
    }

    // 3. Coffee Mug Steam Particles Rising
    steamParticles.forEach((p, i) => {
      const mesh = steamRefs.current[i];
      if (mesh) {
        const cycle = ((elapsed * p.speed + p.phase) % 1.0);
        mesh.position.y = -0.36 + cycle * 0.38 + (steamPuff > 0 ? 0.05 : 0);
        mesh.position.x = 1.8 + p.xOffset + Math.sin(elapsed * p.curlSpeed + p.phase) * 0.035;
        mesh.position.z = 0.35 + p.zOffset + Math.cos(elapsed * p.curlSpeed + p.phase) * 0.035;
        const scale = 0.015 + cycle * 0.04;
        mesh.scale.set(scale, scale, scale);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.sin(cycle * Math.PI) * (steamPuff > 0 ? 0.45 : 0.25);
        }
      }
    });

    // 4. Warm Dust Motes Drifting in ScreenBar Cone
    dustParticles.forEach((d, i) => {
      const mesh = dustRefs.current[i];
      if (mesh) {
        mesh.position.y = d.baseY + Math.sin(elapsed * d.speed + d.phase) * 0.15;
        mesh.position.x = d.baseX + Math.cos(elapsed * d.speed * 0.8 + d.phase) * 0.08;
        mesh.position.z = d.baseZ + Math.sin(elapsed * d.speed * 0.5 + d.phase) * 0.08;
      }
    });

    // 5. Keyboard depression animation on click
    if (keyboardMeshRef.current) {
      const targetY = keyDepressed ? -0.575 : -0.56;
      keyboardMeshRef.current.position.y = THREE.MathUtils.lerp(
        keyboardMeshRef.current.position.y,
        targetY,
        0.35
      );
    }
  });

  const handleKeyboardClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    playThock(keyboardSwitch);
    setKeyDepressed(true);
    setTimeout(() => setKeyDepressed(false), 110);
  };

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

  // Color mappings based on lighting mood
  const screenBarColor =
    lightingMood === "golden" ? "#FDBA74" : lightingMood === "rain" ? "#E0E7FF" : "#FFE8C2";

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

      {/* ── 2. APPLE STUDIO DISPLAY STAND ── */}
      {/* Solid CNC Aluminum Base with Chamfer */}
      <group position={[0, -0.575, -0.3]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.92, 0.025, 0.6]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.28} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.013, 0]}>
          <boxGeometry args={[0.9, 0.002, 0.58]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>

      {/* Counterbalanced Aluminum Stand Arm with Rear Cable Hole */}
      <group position={[0, 0.2, -0.42]} rotation={[-0.04, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 1.55, 0.06]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.28} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.55, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.24, 24]} />
          <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* ── 3. APPLE STUDIO DISPLAY 27-INCH CHASSIS ── */}
      <group
        position={[0, 0.95, -0.36]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraView("screen");
        }}
      >
        {/* Unibody CNC Aluminum Enclosure */}
        <mesh castShadow>
          <boxGeometry args={[3.44, 2.08, 0.075]} />
          <meshStandardMaterial color="#475569" roughness={0.28} metalness={0.85} />
        </mesh>
        {/* Chamfered Bezel Ring */}
        <mesh position={[0, 0, 0.038]}>
          <boxGeometry args={[3.46, 2.1, 0.01]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.9} />
        </mesh>
        {/* Black Glass Border */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.4, 2.04]} />
          <meshStandardMaterial color="#0A0D14" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Integrated Center Camera Lens & Mic */}
        <mesh position={[0, 0.98, 0.045]}>
          <circleGeometry args={[0.016, 16]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.04, 0.98, 0.045]}>
          <circleGeometry args={[0.005, 16]} />
          <meshBasicMaterial color="#34D399" />
        </mesh>

        {/* ── 4. MODERN SCREENBAR LIGHT MOUNTED ON TOP ── */}
        <group position={[0, 1.08, 0.06]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 1.4, 20]} />
            <meshStandardMaterial color="#1E293B" roughness={0.25} metalness={0.85} />
          </mesh>
          <mesh position={[0, -0.04, -0.06]} castShadow>
            <boxGeometry args={[0.16, 0.09, 0.12]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
          </mesh>
          <pointLight
            ref={screenBarLightRef}
            position={[0, -0.15, 0.25]}
            intensity={1.6}
            distance={3.4}
            color={screenBarColor}
          />
        </group>

        {/* Soft Screen Ambient Light */}
        <pointLight
          ref={screenLightRef}
          position={[0, 0, 0.6]}
          intensity={0.9}
          distance={2.8}
          color="#93C5FD"
        />
      </group>

      {/* ── 5. OPEN MACBOOK PRO M3 MAX SIDECAR (INTERACTIVE FOCUS) ── */}
      <group
        position={[-2.3, -0.12, -0.08]}
        rotation={[0, 0.36, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setCameraView(cameraView === "macbook" ? "screen" : "macbook");
        }}
      >
        {/* Riser Stand */}
        <group position={[0, -0.32, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.82, 0.015, 0.58]} />
            <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.15, -0.1]} rotation={[-0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.26, 0.35, 0.02]} />
            <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.85} />
          </mesh>
        </group>

        {/* MacBook Base Chassis */}
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.05, 0.028, 0.72]} />
            <meshStandardMaterial color="#475569" roughness={0.28} metalness={0.85} />
          </mesh>
          {/* Keyboard Well */}
          <mesh position={[0, 0.015, -0.06]}>
            <boxGeometry args={[0.94, 0.005, 0.42]} />
            <meshStandardMaterial color="#0B0F17" roughness={0.5} />
          </mesh>
          {/* Force Touch Trackpad */}
          <mesh position={[0, 0.015, 0.23]}>
            <boxGeometry args={[0.38, 0.003, 0.24]} />
            <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.7} />
          </mesh>
        </group>

        {/* MacBook Open Display Lid (115 degrees) */}
        <group position={[0, 0.02, -0.36]} rotation={[-0.42, 0, 0]}>
          <mesh position={[0, 0.34, -0.008]} castShadow>
            <boxGeometry args={[1.05, 0.68, 0.016]} />
            <meshStandardMaterial color="#475569" roughness={0.28} metalness={0.85} />
          </mesh>
          {/* Screen Display with Terminal Code Glow */}
          <mesh position={[0, 0.34, 0.001]}>
            <planeGeometry args={[1.02, 0.65]} />
            <meshStandardMaterial
              color="#050C1A"
              emissive="#0284C7"
              emissiveIntensity={0.32}
              roughness={0.15}
            />
          </mesh>
          {/* Screen Camera Notch */}
          <mesh position={[0, 0.65, 0.003]}>
            <boxGeometry args={[0.1, 0.02, 0.002]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          {/* Ambient Screen Glow */}
          <pointLight
            ref={macbookLightRef}
            position={[0, 0.3, 0.3]}
            intensity={0.6}
            distance={2.0}
            color="#38BDF8"
          />
        </group>
      </group>

      {/* ── 6. REFERENCE STUDIO MONITORS (CLICK TO TOGGLE LOFI) ── */}
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

      {/* ── 7. CERAMIC COFFEE MUG & RISING STEAM PARTICLES ── */}
      <group position={[1.8, -0.47, 0.35]} onClick={handleMugClick}>
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
          position={[1.8, -0.35, 0.35]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
        </mesh>
      ))}

      {/* ── 8. SCREENBAR LIGHT DUST MOTES (COZY FLOATING PARTICLES) ── */}
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

      {/* ── 9. CUSTOM 75% MECHANICAL KEYBOARD & MOUSE (CLICK FOR THOCK) ── */}
      <group
        ref={keyboardMeshRef}
        position={[0, -0.56, 0.52]}
        rotation={[-0.05, 0, 0]}
        onClick={handleKeyboardClick}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.36, 0.035, 0.48]} />
          <meshStandardMaterial color="#1E2433" roughness={0.28} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.3, 0.015, 0.42]} />
          <meshStandardMaterial color="#334155" roughness={0.65} />
        </mesh>
        <mesh position={[0.55, 0.022, 0.02]}>
          <boxGeometry args={[0.1, 0.018, 0.06]} />
          <meshStandardMaterial color="#0284C7" roughness={0.4} />
        </mesh>
        <mesh position={[-0.56, 0.022, -0.15]}>
          <boxGeometry args={[0.06, 0.018, 0.06]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.01, 0.32]} castShadow receiveShadow>
          <boxGeometry args={[1.36, 0.022, 0.14]} />
          <meshStandardMaterial color="#161B26" roughness={0.6} />
        </mesh>
      </group>

      {/* Precision Wireless Mouse */}
      <group position={[1.05, -0.56, 0.52]} onClick={handleKeyboardClick}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.052, 0.12, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[-0.03, -0.01, 0]}>
          <boxGeometry args={[0.025, 0.04, 0.09]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
      </group>

      {/* ── 10. 3M YELLOW STICKY NOTE ON DESK (CLICK TO OPEN SCRATCHPAD) ── */}
      <group
        position={[1.36, -0.575, 0.42]}
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

      {/* ── 11. MECHANICAL KEYBOARD ACOUSTIC SWITCH PROFILE TOGGLE ── */}
      <group
        position={[-0.88, -0.565, 0.52]}
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
            keyboardSwitch === "cherry_blue" ? -0.048 : keyboardSwitch === "gateron_yellow" ? 0 : 0.048,
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

      {/* ── 12. 3D MACBOOK PRO SIDECAR LAPTOP ON DESK ── */}
      <group
        position={[-2.05, -0.565, 0.08]}
        rotation={[0, 0.28, 0]}
        onClick={(e) => {
          e.stopPropagation();
          playClick();
          setCameraView(cameraView === "macbook" ? "screen" : "macbook");
        }}
      >
        {/* Laptop Aluminum Lower Chassis Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.74, 0.02, 0.52]} />
          <meshStandardMaterial color="#1E2430" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Keyboard Well */}
        <mesh position={[0, 0.011, -0.06]}>
          <boxGeometry args={[0.64, 0.004, 0.28]} />
          <meshStandardMaterial color="#0B0F19" roughness={0.7} />
        </mesh>

        {/* Individual Key Row Accents */}
        <mesh position={[0, 0.013, -0.06]}>
          <planeGeometry args={[0.62, 0.26]} />
          <meshStandardMaterial color="#182030" roughness={0.6} />
        </mesh>

        {/* Force Touch Trackpad */}
        <mesh position={[0, 0.011, 0.14]}>
          <boxGeometry args={[0.22, 0.002, 0.15]} />
          <meshStandardMaterial color="#232B3E" roughness={0.35} metalness={0.5} />
        </mesh>

        {/* Open Display Lid (Hinged at back) */}
        <group position={[0, 0.01, -0.26]} rotation={[-0.28, 0, 0]}>
          {/* Display Aluminum Enclosure Back */}
          <mesh position={[0, 0.23, 0]} castShadow>
            <boxGeometry args={[0.74, 0.46, 0.012]} />
            <meshStandardMaterial color="#1E2430" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Glowing Retina Display Screen (Live Code Preview Indicator) */}
          <mesh position={[0, 0.23, 0.007]}>
            <planeGeometry args={[0.7, 0.42]} />
            <meshBasicMaterial color="#0B132B" />
          </mesh>

          {/* Emissive Code Lines on Screen */}
          <mesh position={[0, 0.23, 0.008]}>
            <planeGeometry args={[0.64, 0.36]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0284C7"
              emissiveIntensity={0.65}
              roughness={0.2}
            />
          </mesh>

          {/* Display Notch */}
          <mesh position={[0, 0.43, 0.009]}>
            <planeGeometry args={[0.08, 0.018]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      </group>

      {/* ── 13. MAGSAFE IPHONE ON DESK STAND MIRRORING FLUTTER UI ── */}
      <DeviceFrame progress={progress} isMobile={isMobile} />
    </group>
  );
};
