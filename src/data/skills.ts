export interface SkillItem {
  name: string;
  category: "mobile" | "frontend" | "backend" | "databases" | "devops";
  description: string;
  iconName: string;
  color: string;
  level: "Core" | "Advanced" | "Proficient";
}

export interface SkillCategory {
  id: "mobile" | "frontend" | "backend" | "databases" | "devops";
  title: string;
  description: string;
  accentColor: string;
  skills: SkillItem[];
}

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "mobile",
    title: "Flutter & Mobile Engineering",
    description: "Enterprise cross-platform mobile apps with production state management and clean architecture.",
    accentColor: "#5B8DEF",
    skills: [
      { name: "Flutter", category: "mobile", description: "Cross-platform mobile & desktop framework", iconName: "Smartphone", color: "#5B8DEF", level: "Core" },
      { name: "Dart", category: "mobile", description: "Type-safe reactive language & async streams", iconName: "Code2", color: "#56C7D9", level: "Core" },
      { name: "BLoC & Riverpod", category: "mobile", description: "Predictable, testable reactive state management", iconName: "Layers", color: "#8B6FE8", level: "Core" },
      { name: "Provider & GetX", category: "mobile", description: "Lightweight dependency injection & state", iconName: "Zap", color: "#63C58A", level: "Core" },
      { name: "Android & iOS", category: "mobile", description: "Native permissions, platform channels, builds", iconName: "Cpu", color: "#F29A5A", level: "Advanced" }
    ]
  },
  {
    id: "frontend",
    title: "Modern Frontend (Web)",
    description: "High-performance React & Next.js web applications with responsive design tokens.",
    accentColor: "#8B6FE8",
    skills: [
      { name: "React", category: "frontend", description: "Component state, custom hooks, virtual DOM", iconName: "Atom", color: "#56C7D9", level: "Core" },
      { name: "Next.js", category: "frontend", description: "App Router, SSR, SSG, server components", iconName: "Globe", color: "#151515", level: "Core" },
      { name: "TypeScript", category: "frontend", description: "Strict static typing, interfaces & generics", iconName: "FileCode", color: "#5B8DEF", level: "Core" },
      { name: "JavaScript", category: "frontend", description: "Modern ESNext, asynchronous runtime, Web APIs", iconName: "FileCode2", color: "#F4C95D", level: "Core" },
      { name: "Tailwind CSS", category: "frontend", description: "Utility-first responsive tokens & design systems", iconName: "Wind", color: "#56C7D9", level: "Core" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    description: "Structured NestJS REST APIs, microservices, and secure authentication.",
    accentColor: "#63C58A",
    skills: [
      { name: "NestJS", category: "backend", description: "Enterprise TypeScript framework & modular architecture", iconName: "Server", color: "#E982B5", level: "Core" },
      { name: "Node.js", category: "backend", description: "Event-driven runtime & asynchronous I/O", iconName: "Cpu", color: "#63C58A", level: "Core" },
      { name: "REST APIs", category: "backend", description: "Predictable API resource modeling & contracts", iconName: "Network", color: "#5B8DEF", level: "Core" },
      { name: "JWT & Security", category: "backend", description: "Token authorization, password hashing & RBAC", iconName: "ShieldCheck", color: "#F29A5A", level: "Advanced" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Relational persistence and real-time cloud datastores.",
    accentColor: "#F4C95D",
    skills: [
      { name: "PostgreSQL", category: "databases", description: "ACID transactions, relational schemas, indexing", iconName: "Database", color: "#5B8DEF", level: "Core" },
      { name: "MySQL", category: "databases", description: "Relational queries & structured data models", iconName: "Database", color: "#F29A5A", level: "Advanced" },
      { name: "Firebase & Firestore", category: "databases", description: "Real-time sync, cloud auth, NoSQL", iconName: "Flame", color: "#F4C95D", level: "Core" },
      { name: "MongoDB", category: "databases", description: "Document collections & schema design", iconName: "Database", color: "#63C58A", level: "Proficient" }
    ]
  },
  {
    id: "devops",
    title: "Developer Tooling & DevOps",
    description: "Package publication, CLI generators, and automated CI/CD workflows.",
    accentColor: "#F29A5A",
    skills: [
      { name: "Pub.dev Ecosystem", category: "devops", description: "Package authoring & maintenance (flutter_blueprint)", iconName: "Box", color: "#56C7D9", level: "Core" },
      { name: "Git & GitHub", category: "devops", description: "Version control & multi-repo management (70+ repos)", iconName: "GitBranch", color: "#F29A5A", level: "Core" },
      { name: "Docker", category: "devops", description: "Containerized service orchestration", iconName: "Box", color: "#5B8DEF", level: "Advanced" },
      { name: "CI / CD", category: "devops", description: "GitHub Actions automated testing & deployment", iconName: "Workflow", color: "#63C58A", level: "Advanced" },
      { name: "CLI Development", category: "devops", description: "Interactive terminal tooling & code generation", iconName: "Terminal", color: "#8B6FE8", level: "Core" }
    ]
  }
];
