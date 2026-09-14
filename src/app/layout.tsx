import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SYSTEM_META } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat"
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
  authors: [{ name: "Chirag Chaudhary", url: SYSTEM_META.url }],
  creator: "Chirag Chaudhary",
  publisher: "Chirag Chaudhary",
  metadataBase: new URL(SYSTEM_META.url),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SYSTEM_META.url,
    title: SYSTEM_META.title,
    description: SYSTEM_META.description,
    siteName: SYSTEM_META.siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Chirag Chaudhary — Software Engineer | 3D Interactive Portfolio Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SYSTEM_META.title,
    description: SYSTEM_META.description,
    creator: "@chirag640",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google640_chirag_studio_verify"
  }
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SYSTEM_META.url}/#person`,
      name: "Chirag Chaudhary",
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Tata Consultancy Services",
        sameAs: "https://www.tcs.com"
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Computer Science & Engineering"
      },
      description: SYSTEM_META.description,
      url: SYSTEM_META.url,
      image: `${SYSTEM_META.url}/og-image.png`,
      email: SYSTEM_META.email,
      sameAs: [
        SYSTEM_META.github,
        SYSTEM_META.linkedin,
        SYSTEM_META.pubDev
      ],
      knowsAbout: [
        "Flutter",
        "Dart",
        "flutter_blueprint",
        "NestJS",
        "Next.js 16",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "Clean Architecture",
        "BLoC Pattern",
        "Riverpod",
        "Three.js",
        "Web Audio API"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SYSTEM_META.url}/#website`,
      url: SYSTEM_META.url,
      name: SYSTEM_META.siteName,
      description: SYSTEM_META.description,
      publisher: {
        "@id": `${SYSTEM_META.url}/#person`
      },
      inLanguage: "en-US"
    },
    {
      "@type": "ProfilePage",
      "@id": `${SYSTEM_META.url}/#webpage`,
      url: SYSTEM_META.url,
      name: SYSTEM_META.title,
      description: SYSTEM_META.description,
      isPartOf: {
        "@id": `${SYSTEM_META.url}/#website`
      },
      about: {
        "@id": `${SYSTEM_META.url}/#person`
      },
      mainEntity: {
        "@id": `${SYSTEM_META.url}/#person`
      },
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().split("T")[0]
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SYSTEM_META.url}/#flutter_blueprint`,
      name: "flutter_blueprint",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform (macOS, Windows, Linux)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      description: "Enterprise Flutter CLI generator for production clean architecture apps with BLoC, Riverpod, Provider, or GetX on Pub.dev.",
      url: SYSTEM_META.pubDev,
      codeRepository: "https://github.com/chirag640/flutter_blueprint-Package",
      programmingLanguage: "Dart",
      author: {
        "@id": `${SYSTEM_META.url}/#person`
      }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)] font-sans antialiased selection:bg-[#5B8DEF26]">
        {children}
      </body>
    </html>
  );
}
