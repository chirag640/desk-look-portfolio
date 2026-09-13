"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";

interface CameraRigProps {
  progress: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
  isZoomedIn?: boolean;
}

export const CameraRig = ({
  isMobile = false,
  reducedMotion = false,
  isZoomedIn = true
}: CameraRigProps) => {
  const { camera, pointer } = useThree();
  const { cameraView } = useAtmosphereStore();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.08, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.08, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 0.08, 1.35));

  useFrame((_, delta) => {
    // 1. Determine camera target and position based on cameraView state
    let basePosX = 0;
    let basePosY = 0.08;
    let basePosZ = isMobile ? 1.6 : 1.35;

    let baseTarX = 0;
    let baseTarY = 0.08;
    let baseTarZ = 0;
    let targetFov = isMobile ? 46 : 38;

    const effectiveView = !isZoomedIn ? "desk" : cameraView;

    if (effectiveView === "desk") {
      // Wide Cinematic 3D Studio Desk View: reveals full MacBook Pro M3, speakers, mug, keyboard, phone
      basePosX = isMobile ? 0.1 : 0.35;
      basePosY = isMobile ? 0.92 : 0.78;
      basePosZ = isMobile ? 3.8 : 3.2;

      baseTarX = 0;
      baseTarY = 0.04;
      baseTarZ = -0.05;
      targetFov = isMobile ? 48 : 38;
    } else if (effectiveView === "macbook") {
      // Sidecar Zoom directly into the MacBook keyboard and trackpad
      basePosX = isMobile ? 0 : 0.15;
      basePosY = 0.04;
      basePosZ = isMobile ? 1.15 : 0.95;

      baseTarX = 0;
      baseTarY = -0.28;
      baseTarZ = 0.15;
      targetFov = isMobile ? 40 : 34;
    }

    // Apply mobile distance scaling
    const mobileZOffset = isMobile ? 0.15 : 0;

    // Apply subtle pointer parallax (disabled if reduced motion)
    const parallaxX = reducedMotion ? 0 : pointer.x * (isMobile ? 0.04 : 0.15);
    const parallaxY = reducedMotion ? 0 : pointer.y * (isMobile ? 0.04 : 0.1);

    targetCamPos.current.set(
      basePosX + parallaxX,
      basePosY + parallaxY,
      basePosZ + mobileZOffset
    );

    targetLookAt.current.set(baseTarX, baseTarY, baseTarZ);

    // Dynamic FOV interpolation
    const persCam = camera as THREE.PerspectiveCamera;
    if (persCam.fov !== undefined) {
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, delta * 3.8);
      persCam.updateProjectionMatrix();
    }

    // Smooth lerp camera with consistent damping
    const lerpFactor = Math.min(1, delta * (reducedMotion ? 12 : 3.6));
    camera.position.lerp(targetCamPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
