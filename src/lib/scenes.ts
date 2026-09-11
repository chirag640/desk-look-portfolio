export interface SceneConfig {
  id: "hero" | "about" | "skills" | "projects" | "experience" | "resume" | "contact";
  index: string;
  name: string;
  badge: string;
  start: number;
  end: number;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov?: number;
  };
  lighting: {
    ambientIntensity: number;
    keyLightColor: string;
    keyLightIntensity: number;
  };
}

export const SCENES: SceneConfig[] = [
  {
    id: "hero",
    index: "01",
    name: "Master Workstation",
    badge: "MULTI-SCREEN STUDIO DESK",
    start: 0.0,
    end: 0.15,
    camera: {
      position: [0, 2.1, 4.8],
      target: [0, 0.5, 0],
      fov: 46
    },
    lighting: {
      ambientIntensity: 1.2,
      keyLightColor: "#FFFFFF",
      keyLightIntensity: 2.2
    }
  },
  {
    id: "about",
    index: "02",
    name: "Screen 1: Ultrawide Dive",
    badge: "CHIRAG.SYS · PROFILE",
    start: 0.15,
    end: 0.30,
    camera: {
      position: [0, 1.15, 2.05],
      target: [0, 1.12, -0.2],
      fov: 38
    },
    lighting: {
      ambientIntensity: 1.3,
      keyLightColor: "#EBF3FF",
      keyLightIntensity: 2.4
    }
  },
  {
    id: "skills",
    index: "03",
    name: "Screen 2: Vertical Code Screen",
    badge: "STACK & ARCHITECTURE",
    start: 0.30,
    end: 0.48,
    camera: {
      position: [1.7, 1.35, 2.35],
      target: [1.75, 1.25, -0.1],
      fov: 39
    },
    lighting: {
      ambientIntensity: 1.4,
      keyLightColor: "#F4F7FB",
      keyLightIntensity: 2.5
    }
  },
  {
    id: "projects",
    index: "04",
    name: "Screens 3 & 4: Mobile & Laptop",
    badge: "FLUTTER_BLUEPRINT & APPS",
    start: 0.48,
    end: 0.72,
    camera: {
      position: [-1.4, 0.95, 2.1],
      target: [-1.25, 0.65, 0.2],
      fov: 40
    },
    lighting: {
      ambientIntensity: 1.3,
      keyLightColor: "#F8FBFF",
      keyLightIntensity: 2.4
    }
  },
  {
    id: "experience",
    index: "05",
    name: "Desk Timeline Track",
    badge: "TCS & OPEN SOURCE LOGS",
    start: 0.72,
    end: 0.84,
    camera: {
      position: [0.4, 1.35, 3.1],
      target: [0.2, 0.75, 0],
      fov: 42
    },
    lighting: {
      ambientIntensity: 1.2,
      keyLightColor: "#FFFDF9",
      keyLightIntensity: 2.1
    }
  },
  {
    id: "resume",
    index: "06",
    name: "Document & Repos Station",
    badge: "PUB.DEV & GITHUB 70 REPOS",
    start: 0.84,
    end: 0.92,
    camera: {
      position: [-0.2, 1.25, 2.6],
      target: [0, 0.85, 0],
      fov: 40
    },
    lighting: {
      ambientIntensity: 1.3,
      keyLightColor: "#FFFFFF",
      keyLightIntensity: 2.2
    }
  },
  {
    id: "contact",
    index: "07",
    name: "Studio Night Mode",
    badge: "COMMUNICATION TERMINAL",
    start: 0.92,
    end: 1.0,
    camera: {
      position: [0, 1.9, 4.4],
      target: [0, 0.65, 0],
      fov: 46
    },
    lighting: {
      ambientIntensity: 1.1,
      keyLightColor: "#FFF8F2",
      keyLightIntensity: 2.0
    }
  }
];

export function getActiveScene(progress: number): SceneConfig {
  const clamped = Math.max(0, Math.min(1, progress));
  for (const scene of SCENES) {
    if (clamped >= scene.start && clamped <= scene.end) {
      return scene;
    }
  }
  return SCENES[SCENES.length - 1];
}
