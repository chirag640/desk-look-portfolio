export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "mobile" | "web" | "backend" | "ai" | "tools";
  technologies: string[];
  year: string;
  status: "Published" | "Active" | "Completed";
  featured?: boolean;
  accentColor: string;
  metrics?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  packageUrl?: string;
  features: string[];
}

export const projectsData: Project[] = [
  {
    id: "flutter-blueprint-package",
    title: "flutter_blueprint (CLI & Package)",
    shortDescription: "Enterprise Flutter CLI generator for production clean architecture apps with BLoC, Riverpod, Provider, or GetX.",
    fullDescription: "Published on Pub.dev (v3.0.0) with 20 GitHub stars. flutter_blueprint scaffolds robust architectural foundations for enterprise Flutter teams, including API presets, security guardrails, automated test harness, and release pipelines.",
    category: "tools",
    technologies: ["Dart", "Flutter", "CLI", "Code Generation", "Pub.dev", "YAML"],
    year: "2025 – 2026",
    status: "Published",
    featured: true,
    accentColor: "#5B8DEF",
    metrics: "20+ GitHub Stars · v3.0.0 on Pub.dev",
    role: "Creator & Lead Maintainer",
    liveUrl: "https://pub.dev/packages/flutter_blueprint",
    githubUrl: "https://github.com/chirag640/flutter_blueprint-Package",
    packageUrl: "https://pub.dev/packages/flutter_blueprint",
    features: [
      "Multi-state management generators: Clean Architecture with BLoC, Riverpod, Provider, or GetX",
      "Automated API client integration with Dio, secure interceptors, and error envelope handling",
      "Built-in environment flavor scaffolding (dev, staging, prod) with secure configuration injection",
      "Preconfigured GitHub Actions CI/CD workflows for linting, testing, and automated builds"
    ]
  },
  {
    id: "finflow-ecosystem",
    title: "FinFlow — Personal & Group Finance",
    shortDescription: "Cross-platform personal finance and group budgeting ecosystem with secure NestJS cloud sync.",
    fullDescription: "A full-stack financial management ecosystem comprising a reactive Flutter mobile app and a NestJS REST API microservice. Supports multi-currency expense tracking, group bill splitting, investment analytics, and real-time synchronization.",
    category: "mobile",
    technologies: ["Flutter", "Dart", "NestJS", "TypeScript", "PostgreSQL", "JWT", "Docker"],
    year: "2025",
    status: "Active",
    featured: false,
    accentColor: "#63C58A",
    metrics: "Full-Stack Mobile + Microservice Architecture",
    role: "Full-Stack Mobile Architect",
    githubUrl: "https://github.com/chirag640/FinFlow-Frontend",
    liveUrl: "https://github.com/chirag640/FinFlow-Backend",
    features: [
      "Modular NestJS backend with class-validator DTOs, JWT tokens, and PostgreSQL transactions",
      "Interactive Flutter financial dashboard with custom chart painters and transaction categorization",
      "Group expense settlement engine with minimal-debt transaction calculation",
      "Offline-first local caching layer with background delta synchronization"
    ]
  },
  {
    id: "flutter-blueprint-website",
    title: "Flutter Blueprint Portal",
    shortDescription: "Modern interactive documentation and landing portal for the flutter_blueprint CLI tool.",
    fullDescription: "High-performance web documentation portal for the flutter_blueprint CLI package, built with Next.js, TypeScript, and modern design tokens.",
    category: "web",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
    year: "2025",
    status: "Active",
    featured: false,
    accentColor: "#8B6FE8",
    metrics: "100/100 Lighthouse Performance & SEO",
    role: "Frontend Engineer",
    githubUrl: "https://github.com/chirag640/Flutter_Blueprint_Website",
    features: [
      "Interactive interactive CLI command generator with live terminal preview",
      "Searchable architectural documentation and pattern comparison guides",
      "Full responsive layout optimized for mobile, tablet, and widescreen monitors",
      "Fast static generation with dynamic open-graph social previews"
    ]
  },
  {
    id: "collabstream",
    title: "CollabStream Workspace",
    shortDescription: "Real-time collaborative canvas and streaming workspace platform in TypeScript.",
    fullDescription: "High-concurrency collaborative platform enabling distributed teams to brainstorm, stream audio/video telemetry, and synchronize interactive canvas state with low latency.",
    category: "web",
    technologies: ["TypeScript", "WebSockets", "Node.js", "Canvas API", "Redis"],
    year: "2025",
    status: "Completed",
    featured: false,
    accentColor: "#56C7D9",
    metrics: "Sub-40ms WebSocket state sync",
    role: "Full-Stack Engineer",
    githubUrl: "https://github.com/chirag640/CollabStream",
    features: [
      "Multi-user concurrent canvas manipulation with conflict-free cursors",
      "WebSocket room clustering with Redis pub/sub backplane",
      "Zero-dependency custom binary framing for high-frequency drawing points"
    ]
  },
  {
    id: "flutter-splitwise-clone",
    title: "Splitwise Flutter Clone",
    shortDescription: "Group expense manager with Firebase real-time sync and debt simplification algorithms.",
    fullDescription: "Flutter mobile application replicating core Splitwise functionalities, enabling friends and housemates to track shared expenses, compute minimal transfers, and log settlements.",
    category: "mobile",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Auth"],
    year: "2024",
    status: "Completed",
    featured: false,
    accentColor: "#F4C95D",
    metrics: "Production-ready Firebase Auth & Cloud Firestore",
    role: "Mobile Developer",
    githubUrl: "https://github.com/chirag640/Flutter-splitWiseClone",
    features: [
      "Real-time Firestore listeners for immediate group expense balance recalculations",
      "Multi-party split types (equal, percentage, exact amounts)",
      "Push notification integration on new transaction creation"
    ]
  },
  {
    id: "truck-expense-tracker",
    title: "Truck Expense Logistics",
    shortDescription: "Fleet logistics management application for tracking commercial freight expenses.",
    fullDescription: "Logistics and vehicle operations tracker designed for commercial transport operators to monitor fuel, toll, maintenance, and route costs efficiently.",
    category: "mobile",
    technologies: ["Flutter", "Dart", "C++ Native Bindings", "SQLite"],
    year: "2024",
    status: "Completed",
    featured: false,
    accentColor: "#F29A5A",
    metrics: "1 Star · Optimized local SQLite storage",
    role: "Mobile Developer",
    githubUrl: "https://github.com/chirag640/Flutter-truck-expense",
    features: [
      "Offline-first vehicle logbook with automatic mileage calculations",
      "Exportable PDF expense summaries for fleet tax reporting",
      "Receipt snapshot attachment and localized SQLite indexing"
    ]
  }
];

export const projectCategories = [
  { id: "all", label: "ALL" },
  { id: "mobile", label: "FLUTTER/MOBILE" },
  { id: "tools", label: "CLI & PACKAGES" },
  { id: "backend", label: "NESTJS/BACKEND" },
  { id: "web", label: "WEB/NEXT.JS" }
] as const;
