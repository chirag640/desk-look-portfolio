import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SYSTEM_META } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F7F7F5"
};

export const metadata: Metadata = {
  title: SYSTEM_META.title,
  description: SYSTEM_META.description,
  keywords: SYSTEM_META.keywords,
  authors: [{ name: "Chirag" }],
  creator: "Chirag",
  metadataBase: new URL(SYSTEM_META.url),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SYSTEM_META.url,
    title: SYSTEM_META.title,
    description: SYSTEM_META.description,
    siteName: "Chirag — 3D Portfolio",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Chirag — Software Engineer Interactive 3D Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SYSTEM_META.title,
    description: SYSTEM_META.description,
    creator: "@chirag_dev"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Chirag Chaudhary",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Tata Consultancy Services"
    },
    "description": SYSTEM_META.description,
    "knowsAbout": [
      "Flutter",
      "Dart",
      "flutter_blueprint",
      "NestJS",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Clean Architecture",
      "BLoC",
      "Riverpod"
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)] font-sans antialiased selection:bg-[#5B8DEF26]">
        {children}
      </body>
    </html>
  );
}
