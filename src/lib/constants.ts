export const SYSTEM_META = {
  osName: "ChiragOS",
  osVersion: "2.6.0",
  edition: "Multi-Screen Developer Workstation",
  buildDate: "2026.09",
  owner: "Chirag Chaudhary",
  role: "Software Engineer at TCS",
  title: "Chirag Chaudhary — Software Engineer | 3D Interactive Portfolio",
  description: "Interactive 3D multi-screen developer workstation for Chirag Chaudhary, Software Engineer at Tata Consultancy Services (TCS) and creator of flutter_blueprint on Pub.dev. Specializing in Flutter, Dart, NestJS, and Next.js.",
  url: "https://chirag640.github.io",
  keywords: [
    "Chirag Chaudhary",
    "Software Engineer",
    "Tata Consultancy Services",
    "TCS",
    "flutter_blueprint",
    "Flutter Developer",
    "Dart",
    "NestJS",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Pub.dev",
    "3D Portfolio",
    "Three.js",
    "React Three Fiber"
  ]
};

export const COLOR_TOKENS = {
  background: "#F7F7F5",
  surface: "#FFFFFF",
  surfaceSoft: "#F0F1EE",
  ink: "#151515",
  muted: "#6B6F73",
  blue: "#5B8DEF",
  purple: "#8B6FE8",
  cyan: "#56C7D9",
  green: "#63C58A",
  yellow: "#F4C95D",
  orange: "#F29A5A",
  pink: "#E982B5",
  border: "rgba(21, 21, 21, 0.10)",
  overlay: "rgba(255, 255, 255, 0.72)"
};

export const DOCK_ITEMS = [
  { id: "hero", label: "Desktop", icon: "Monitor", scrollTarget: 0.0 },
  { id: "about", label: "Profile", icon: "User", scrollTarget: 0.22 },
  { id: "skills", label: "Tech Stack", icon: "Cpu", scrollTarget: 0.39 },
  { id: "projects", label: "Projects", icon: "FolderGit2", scrollTarget: 0.60 },
  { id: "experience", label: "Timeline", icon: "Clock", scrollTarget: 0.78 },
  { id: "resume", label: "Resume", icon: "FileText", scrollTarget: 0.88 },
  { id: "contact", label: "Contact", icon: "Mail", scrollTarget: 0.98 }
] as const;
