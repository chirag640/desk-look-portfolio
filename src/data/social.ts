export interface SocialLinks {
  name: string;
  title: string;
  company: string;
  tagline: string;
  bio: string;
  github: string;
  linkedin: string;
  pubDev: string;
  email: string;
  twitter?: string;
  resumeUrl: string;
  location: string;
  status: string;
  education: string;
}

export const personalData: SocialLinks = {
  name: "CHIRAG CHAUDHARY",
  title: "SOFTWARE ENGINEER",
  company: "Tata Consultancy Services (TCS)",
  tagline: "Software Engineer at TCS & creator of flutter_blueprint. Building enterprise mobile architectures, full-stack systems, and developer tooling.",
  bio: "Software Engineer at Tata Consultancy Services (TCS) and dedicated open-source creator with a passion for cross-platform Flutter/Dart engineering and full-stack web development (Next.js, TypeScript, NestJS). Author of flutter_blueprint (v3.0.0 on Pub.dev), an enterprise Flutter CLI generator with 20 GitHub stars.",
  github: "https://github.com/chirag640",
  linkedin: "https://www.linkedin.com/in/chiragchaudhary1910/",
  pubDev: "https://pub.dev/packages/flutter_blueprint",
  email: "chiragchaudhary1910@gmail.com",
  twitter: "https://github.com/chirag640",
  resumeUrl: "/resume/Chirag_Resume.pdf",
  location: "Gandhinagar, Gujarat, India",
  status: "Software Engineer at TCS · Open to High-Impact Engineering",
  education: "B.Tech in Computer Science & Engineering"
};

export const githubRepositories = [
  {
    name: "flutter_blueprint-Package",
    description: "Enterprise Flutter CLI generator for clean architecture apps with Provider/Riverpod/BLoC/GetX, API presets, and security guardrails on Pub.dev.",
    stars: 20,
    forks: 4,
    language: "Dart",
    languageColor: "#56C7D9",
    url: "https://github.com/chirag640/flutter_blueprint-Package",
    isPinned: true,
    isPackage: true
  },
  {
    name: "FinFlow-Frontend",
    description: "Personal finance Flutter application featuring cloud sync, budgeting, expense tracking, group split flows, and analytics.",
    stars: 6,
    forks: 2,
    language: "Dart",
    languageColor: "#56C7D9",
    url: "https://github.com/chirag640/FinFlow-Frontend",
    isPinned: true
  },
  {
    name: "FinFlow-Backend",
    description: "High-concurrency NestJS REST API powering authentication, expenses, budgets, groups, investments, and sync workflows.",
    stars: 5,
    forks: 1,
    language: "TypeScript",
    languageColor: "#5B8DEF",
    url: "https://github.com/chirag640/FinFlow-Backend",
    isPinned: true
  },
  {
    name: "Flutter_Blueprint_Website",
    description: "Modern landing page and documentation portal for the flutter_blueprint CLI tool, built with Next.js and TypeScript.",
    stars: 3,
    forks: 1,
    language: "TypeScript",
    languageColor: "#8B6FE8",
    url: "https://github.com/chirag640/Flutter_Blueprint_Website",
    isPinned: true
  },
  {
    name: "CollabStream",
    description: "Real-time collaborative canvas and streaming workspace platform engineered with modern TypeScript and WebSockets.",
    stars: 4,
    forks: 1,
    language: "TypeScript",
    languageColor: "#63C58A",
    url: "https://github.com/chirag640/CollabStream",
    isPinned: false
  },
  {
    name: "Flutter-splitWiseClone",
    description: "Splitwise Flutter application that helps users manage and split expenses with friends and family, integrated with Firebase.",
    stars: 3,
    forks: 1,
    language: "Dart",
    languageColor: "#56C7D9",
    url: "https://github.com/chirag640/Flutter-splitWiseClone",
    isPinned: false
  }
];
