"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StudioDisplayProps {
  progress: number;
  isMobile?: boolean;
  isZoomedIn?: boolean;
}

export const StudioDisplay: React.FC<StudioDisplayProps> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);
  const screenBarLightRef = useRef<THREE.PointLight>(null);
  const macbookLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (screenBarLightRef.current) {
      screenBarLightRef.current.intensity = 1.6 + Math.sin(elapsed * 2.0) * 0.08;
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 0.9 + Math.sin(elapsed * 1.5) * 0.05;
    }
    if (macbookLightRef.current) {
      macbookLightRef.current.intensity = 0.5 + Math.sin(elapsed * 1.8) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* ── 1. EXECUTIVE DARK WALNUT DESK TOP ── */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
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
          <meshStandardMaterial
            color="#94A3B8"
            roughness={0.28}
            metalness={0.88}
          />
        </mesh>
        <mesh position={[0, 0.013, 0]}>
          <boxGeometry args={[0.9, 0.002, 0.58]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>

      {/* Counterbalanced Aluminum Stand Arm with Rear Cable Hole */}
      <group position={[0, 0.2, -0.42]} rotation={[-0.04, 0, 0]}>
        {/* Main Aluminum Upright */}
        <mesh castShadow>
          <boxGeometry args={[0.22, 1.55, 0.06]} />
          <meshStandardMaterial
            color="#94A3B8"
            roughness={0.28}
            metalness={0.88}
          />
        </mesh>

        {/* Counterbalance Tilt Hinge on Back */}
        <mesh position={[0, 0.55, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.24, 24]} />
          <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* ── 3. APPLE STUDIO DISPLAY 27-INCH CHASSIS ── */}
      <group position={[0, 0.95, -0.36]}>
        {/* Unibody CNC Aluminum Enclosure (Space Gray) */}
        <mesh castShadow>
          <boxGeometry args={[3.44, 2.08, 0.075]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.28}
            metalness={0.85}
          />
        </mesh>

        {/* Front Edge Chamfered Aluminum Bezel Ring */}
        <mesh position={[0, 0, 0.038]}>
          <boxGeometry args={[3.46, 2.1, 0.01]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.9} />
        </mesh>

        {/* Razor-Thin Black Glass Border (Inside Bezel) */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.4, 2.04]} />
          <meshStandardMaterial color="#0A0D14" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Integrated 12MP Center Camera Lens & Mic */}
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
          {/* Anodized Aluminum Fixture */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 1.4, 20]} />
            <meshStandardMaterial color="#1E293B" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Monitor Mount Clip */}
          <mesh position={[0, -0.04, -0.06]} castShadow>
            <boxGeometry args={[0.16, 0.09, 0.12]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Downward Warm LED Illumination */}
          <pointLight
            ref={screenBarLightRef}
            position={[0, -0.15, 0.25]}
            intensity={1.6}
            distance={3.2}
            color="#FFE8C2"
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

      {/* ── 5. OPEN MACBOOK PRO M3 MAX SIDECAR (ON ALUMINUM STAND) ── */}
      <group position={[-2.3, -0.12, -0.08]} rotation={[0, 0.36, 0]}>
        {/* Aluminum Laptop Riser Stand */}
        <group position={[0, -0.32, 0]}>
          {/* Base plate */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.82, 0.015, 0.58]} />
            <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Angled Neck */}
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

        {/* MacBook Open Display Lid (Angled at 115 degrees) */}
        <group position={[0, 0.02, -0.36]} rotation={[-0.42, 0, 0]}>
          {/* Aluminum Display Shell */}
          <mesh position={[0, 0.34, -0.008]} castShadow>
            <boxGeometry args={[1.05, 0.68, 0.016]} />
            <meshStandardMaterial color="#475569" roughness={0.28} metalness={0.85} />
          </mesh>
          {/* Display Glass / Screen */}
          <mesh position={[0, 0.34, 0.001]}>
            <planeGeometry args={[1.02, 0.65]} />
            <meshStandardMaterial
              color="#0B132B"
              emissive="#0052CC"
              emissiveIntensity={0.25}
              roughness={0.2}
            />
          </mesh>
          {/* Screen Camera Notch */}
          <mesh position={[0, 0.65, 0.003]}>
            <boxGeometry args={[0.1, 0.02, 0.002]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          {/* Subtle Ambient Light from MacBook Screen */}
          <pointLight
            ref={macbookLightRef}
            position={[0, 0.3, 0.3]}
            intensity={0.5}
            distance={1.8}
            color="#38BDF8"
          />
        </group>
      </group>

      {/* ── 6. PAIR OF REFERENCE STUDIO MONITOR SPEAKERS ── */}
      {/* Left Speaker */}
      <group position={[-2.75, 0.12, -0.65]} rotation={[0, 0.32, 0]}>
        {/* Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.82, 0.54]} />
          <meshStandardMaterial color="#13161F" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Front Baffle */}
        <mesh position={[0, 0, 0.272]}>
          <planeGeometry args={[0.46, 0.8]} />
          <meshStandardMaterial color="#1E2330" roughness={0.6} />
        </mesh>
        {/* 1" Silk Dome Tweeter */}
        <mesh position={[0, 0.22, 0.275]}>
          <circleGeometry args={[0.055, 24]} />
          <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* 5" Woven Kevlar Woofer with Gold Trim */}
        <group position={[0, -0.12, 0.275]}>
          <mesh>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.3} />
          </mesh>
          {/* Dust Cap */}
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
        </group>
        {/* Bass Port Tube */}
        <mesh position={[0, -0.31, 0.275]}>
          <circleGeometry args={[0.035, 20]} />
          <meshBasicMaterial color="#090B10" />
        </mesh>
        {/* Power LED Indicator */}
        <mesh position={[0.17, -0.34, 0.275]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* Right Speaker */}
      <group position={[2.75, 0.12, -0.65]} rotation={[0, -0.32, 0]}>
        {/* Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.82, 0.54]} />
          <meshStandardMaterial color="#13161F" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Front Baffle */}
        <mesh position={[0, 0, 0.272]}>
          <planeGeometry args={[0.46, 0.8]} />
          <meshStandardMaterial color="#1E2330" roughness={0.6} />
        </mesh>
        {/* 1" Silk Dome Tweeter */}
        <mesh position={[0, 0.22, 0.275]}>
          <circleGeometry args={[0.055, 24]} />
          <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* 5" Woven Kevlar Woofer with Gold Trim */}
        <group position={[0, -0.12, 0.275]}>
          <mesh>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.35} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
        </group>
        {/* Bass Port Tube */}
        <mesh position={[0, -0.31, 0.275]}>
          <circleGeometry args={[0.035, 20]} />
          <meshBasicMaterial color="#090B10" />
        </mesh>
        {/* Power LED Indicator */}
        <mesh position={[-0.17, -0.34, 0.275]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* ── 7. CERAMIC COFFEE MUG ── */}
      <group position={[1.8, -0.47, 0.35]}>
        {/* Ceramic Mug Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.22, 24]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Dark Roast Coffee Liquid Top */}
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.082, 20]} />
          <meshStandardMaterial color="#29150B" roughness={0.2} />
        </mesh>
        {/* Ceramic Curved Handle */}
        <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.055, 0.016, 12, 20, Math.PI]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* ── 8. CUSTOM 75% MECHANICAL KEYBOARD & MOUSE ── */}
      {/* 75% High-Profile CNC Aluminum Keyboard */}
      <group position={[0, -0.56, 0.52]} rotation={[-0.05, 0, 0]}>
        {/* Aluminum Case */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.36, 0.035, 0.48]} />
          <meshStandardMaterial color="#1E2433" roughness={0.28} metalness={0.8} />
        </mesh>
        {/* Keycaps Plate */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.3, 0.015, 0.42]} />
          <meshStandardMaterial color="#334155" roughness={0.65} />
        </mesh>
        {/* Cyan Accent Enter/Esc Keys */}
        <mesh position={[0.55, 0.022, 0.02]}>
          <boxGeometry args={[0.1, 0.018, 0.06]} />
          <meshStandardMaterial color="#0284C7" roughness={0.4} />
        </mesh>
        <mesh position={[-0.56, 0.022, -0.15]}>
          <boxGeometry args={[0.06, 0.018, 0.06]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.4} />
        </mesh>
        {/* Walnut Wrist Rest */}
        <mesh position={[0, -0.01, 0.32]} castShadow receiveShadow>
          <boxGeometry args={[1.36, 0.022, 0.14]} />
          <meshStandardMaterial color="#161B26" roughness={0.6} />
        </mesh>
      </group>

      {/* Ergonomic Precision Wireless Mouse */}
      <group position={[1.05, -0.56, 0.52]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.052, 0.12, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.3} />
        </mesh>
        {/* Mouse Thumb Rest */}
        <mesh position={[-0.03, -0.01, 0]}>
          <boxGeometry args={[0.025, 0.04, 0.09]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
