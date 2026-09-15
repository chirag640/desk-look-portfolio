"use client";
/* eslint-disable react-hooks/immutability */

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";

interface CameraRigProps {
  progress?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
  isZoomedIn?: boolean;
}

// 5 Waypoints corresponding to the 5 narrative chapters
interface Waypoint {
  camPos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export const CameraRig = ({
  progress = 0,
  isMobile = false,
  reducedMotion = false,
  isZoomedIn = false
}: CameraRigProps) => {
  const { camera, pointer } = useThree();
  const { cameraView } = useAtmosphereStore();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.08, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.08, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 0.8, 3.4));

  useFrame((_, delta) => {
    // 1. If user has explicitly opened ChiragOS full-screen MacBook sandbox mode
    if (isZoomedIn || cameraView === "screen") {
      const basePosX = 0;
      const basePosY = 0.08;
      const basePosZ = isMobile ? 1.6 : 1.35;
      const targetFov = isMobile ? 44 : 36;

      targetCamPos.current.set(basePosX, basePosY, basePosZ);
      targetLookAt.current.set(0, 0.08, 0);

      const persCam = camera as THREE.PerspectiveCamera;
      if (persCam.fov !== undefined) {
        persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, delta * 4.0);
        persCam.updateProjectionMatrix();
      }

      camera.position.lerp(targetCamPos.current, Math.min(1, delta * 4.0));
      currentLookAt.current.lerp(targetLookAt.current, Math.min(1, delta * 4.0));
      camera.lookAt(currentLookAt.current);
      return;
    }

    // 2. Cinematic Scroll Waypoints (5 Chapters)
    // Progress is normalized 0.0 to 1.0
    const p = Math.max(0, Math.min(1, progress));

    // Chapter waypoints: 0.0 (Hero), 0.25 (About), 0.50 (Projects), 0.75 (Architecture), 1.0 (Contact)
    const waypoints: Waypoint[] = [
      // Chapter 0: Hero Studio Wide Angle
      {
        camPos: [isMobile ? 0.05 : 0.35, isMobile ? 0.95 : 0.82, isMobile ? 3.9 : 3.2],
        lookAt: [0, 0.04, -0.05],
        fov: isMobile ? 50 : 38
      },
      // Chapter 1: About & Systems Mindset (3/4 orbital angle)
      {
        camPos: [isMobile ? 0.2 : 0.75, 0.62, isMobile ? 3.2 : 2.65],
        lookAt: [-0.15, 0.04, 0.08],
        fov: isMobile ? 48 : 36
      },
      // Chapter 2: Case Studies & Applications (Focused on screen & phone)
      {
        camPos: [isMobile ? 0.0 : 0.16, 0.22, isMobile ? 1.9 : 1.55],
        lookAt: [0, 0.08, 0],
        fov: isMobile ? 44 : 34
      },
      // Chapter 3: Technical Architecture & Systems Blueprint (Elevated perspective)
      {
        camPos: [isMobile ? 0.1 : 0.25, 1.15, isMobile ? 3.3 : 2.7],
        lookAt: [0, -0.05, 0.05],
        fov: isMobile ? 50 : 39
      },
      // Chapter 4: Terminal & Contact (Frontal grounded focus)
      {
        camPos: [0, 0.45, isMobile ? 3.6 : 2.85],
        lookAt: [0, 0.06, 0],
        fov: isMobile ? 48 : 37
      }
    ];

    // Determine segment between waypoints
    const segmentCount = waypoints.length - 1;
    const scaledP = p * segmentCount;
    const index = Math.min(Math.floor(scaledP), segmentCount - 1);
    const subT = scaledP - index;

    // Smooth cubic easing for waypoint transitions
    const easedT = subT * subT * (3 - 2 * subT);

    const w1 = waypoints[index];
    const w2 = waypoints[index + 1];

    const posX = THREE.MathUtils.lerp(w1.camPos[0], w2.camPos[0], easedT);
    const posY = THREE.MathUtils.lerp(w1.camPos[1], w2.camPos[1], easedT);
    const posZ = THREE.MathUtils.lerp(w1.camPos[2], w2.camPos[2], easedT);

    const tarX = THREE.MathUtils.lerp(w1.lookAt[0], w2.lookAt[0], easedT);
    const tarY = THREE.MathUtils.lerp(w1.lookAt[1], w2.lookAt[1], easedT);
    const tarZ = THREE.MathUtils.lerp(w1.lookAt[2], w2.lookAt[2], easedT);

    const targetFov = THREE.MathUtils.lerp(w1.fov, w2.fov, easedT);

    // Subtle pointer parallax (disabled if reduced motion)
    const parallaxX = reducedMotion ? 0 : pointer.x * (isMobile ? 0.03 : 0.12);
    const parallaxY = reducedMotion ? 0 : pointer.y * (isMobile ? 0.03 : 0.08);

    targetCamPos.current.set(posX + parallaxX, posY + parallaxY, posZ);
    targetLookAt.current.set(tarX, tarY, tarZ);

    // Dynamic FOV interpolation
    const persCam = camera as THREE.PerspectiveCamera;
    if (persCam.fov !== undefined) {
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, delta * 3.5);
      persCam.updateProjectionMatrix();
    }

    // Smooth lerp camera with delta damping
    const lerpFactor = Math.min(1, delta * (reducedMotion ? 12 : 3.5));
    camera.position.lerp(targetCamPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
