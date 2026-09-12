"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { StudioEnvironment } from "./Environment";
import { StudioDisplay } from "./StudioDisplay";
import { RainWindow } from "./RainWindow";
import * as THREE from "three";

interface ExperienceProps {
  progress: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
  isZoomedIn?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({
  progress,
  isMobile = false,
  reducedMotion = false,
  isZoomedIn = true
}) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none">
      <Canvas
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.0 : 1.25]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
        camera={{
          position: [0, 0.95, 2.3],
          fov: 38,
          near: 0.1,
          far: 50
        }}
      >
        <Suspense fallback={null}>
          <CameraRig
            progress={progress}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            isZoomedIn={isZoomedIn}
          />
          <StudioEnvironment isMobile={isMobile} />
          <RainWindow />
          <StudioDisplay
            progress={progress}
            isMobile={isMobile}
            isZoomedIn={isZoomedIn}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
