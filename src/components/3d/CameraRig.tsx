"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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
  const currentLookAt = useRef(new THREE.Vector3(0, 0.95, -0.36));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.95, -0.36));
  const targetCamPos = useRef(new THREE.Vector3(0, 0.95, 2.25));

  useFrame((_, delta) => {
    // 1. Determine base camera position and target based on zoom state
    let basePosX = 0;
    let basePosY = 0.95;
    let basePosZ = isMobile ? 2.8 : 2.25;

    let baseTarX = 0;
    let baseTarY = 0.95;
    let baseTarZ = -0.36;
    let targetFov = isMobile ? 48 : 38;

    if (!isZoomedIn) {
      // Wide Cinematic 3D Studio Desk View: reveals MacBook Pro, studio speakers, mug, keyboard
      basePosX = isMobile ? 0.3 : 0.95;
      basePosY = isMobile ? 1.5 : 1.35;
      basePosZ = isMobile ? 4.2 : 3.5;

      baseTarX = -0.15;
      baseTarY = 0.45;
      baseTarZ = -0.15;
      targetFov = isMobile ? 52 : 44;
    }

    // Apply mobile distance scaling
    const mobileZOffset = isMobile ? 0.3 : 0;

    // Apply subtle pointer parallax (disabled if reduced motion)
    const parallaxX = reducedMotion ? 0 : pointer.x * (isMobile ? 0.04 : 0.22);
    const parallaxY = reducedMotion ? 0 : pointer.y * (isMobile ? 0.04 : 0.14);

    targetCamPos.current.set(
      basePosX + parallaxX,
      basePosY + parallaxY,
      basePosZ + mobileZOffset
    );

    targetLookAt.current.set(baseTarX, baseTarY, baseTarZ);

    // Dynamic FOV interpolation
    const persCam = camera as THREE.PerspectiveCamera;
    if (persCam.fov !== undefined) {
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, delta * 3.5);
      persCam.updateProjectionMatrix();
    }

    // Smooth lerp camera
    const lerpFactor = Math.min(1, delta * (reducedMotion ? 12 : 3.2));
    camera.position.lerp(targetCamPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
