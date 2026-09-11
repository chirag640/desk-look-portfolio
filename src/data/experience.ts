export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  accentColor: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "tcs-swe",
    year: "Present",
    period: "Current Role",
    role: "Software Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "Gandhinagar, Gujarat, India",
    description: "Developing scalable enterprise software applications, mobile solutions, and full-stack systems with strong emphasis on code quality, automated testing, and performance optimization.",
    technologies: ["Flutter", "Dart", "TypeScript", "Node.js", "React", "Next.js", "NestJS", "Git"],
    achievements: [
      "Building enterprise-grade software with rigorous architecture guidelines and strict type safety",
      "Collaborating across cross-functional engineering teams to implement modern mobile and web capabilities",
      "Contributing to continuous delivery pipelines and high-reliability production standards"
    ],
    accentColor: "#5B8DEF"
  },
  {
    id: "flutter-blueprint-creator",
    year: "2024 – Present",
    period: "Open Source Initiative",
    role: "Creator & Maintainer — flutter_blueprint",
    company: "Pub.dev Open Source Ecosystem",
    location: "Global",
    description: "Architected and published flutter_blueprint (v3.0.0 on Pub.dev), an enterprise Flutter CLI generator with 20 GitHub stars, empowering developers to scaffold clean architecture apps instantly.",
    technologies: ["Dart", "Flutter", "CLI", "Code Generation", "Pub.dev", "GitHub Actions"],
    achievements: [
      "Published v3.0.0 to official Dart package registry (Pub.dev) with 20 GitHub stars",
      "Engineered automated scaffolding supporting 4 major state management frameworks: BLoC, Riverpod, Provider, and GetX",
      "Created comprehensive documentation portal with Next.js and TypeScript"
    ],
    accentColor: "#8B6FE8"
  },
  {
    id: "btech-cse",
    year: "Graduation",
    period: "Academic Degree",
    role: "B.Tech in Computer Science & Engineering",
    company: "Engineering University",
    location: "Gujarat, India",
    description: "Specialized in Computer Science & Engineering with core coursework in Data Structures, Object-Oriented Systems, Distributed Computing, Database Management, and Mobile Application Development.",
    technologies: ["Algorithms", "Data Structures", "Java", "C++", "Database Systems", "Operating Systems"],
    achievements: [
      "Built 70+ public software repositories across Flutter, mobile apps, web systems, and CLI tools",
      "Led student developer technical workshops on modern Flutter architecture and state management"
    ],
    accentColor: "#63C58A"
  }
];
