import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import IntroLoader from "./components/IntroLoader";
import ConditionalCTA from "./components/ConditionalCTA";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nikolas Luquiens — Futur apprenti informaticien & médiamaticien | Portfolio",
    template: "%s — Nikolas Luquiens",
  },
  description:
    "Portfolio de Nikolas Luquiens, 15 ans, basé en Suisse. Futur apprenti CFC informatique ou médiamatique pour la rentrée 2027. Conçoit des projets web (React, Next.js, TypeScript) avec Claude Code.",
  keywords: [
    "Nikolas Luquiens",
    "Luquiens Nikolas",
    "Nikolas Luquiens portfolio",
    "Nikolas Luquiens développeur",
    "apprenti informatique Suisse 2027",
    "CFC informatique apprentissage",
    "CFC médiamatique apprentissage",
    "apprenti développeur web Suisse",
    "apprenti React Next.js",
    "médiamaticien apprenti Suisse",
    "portfolio développeur junior Suisse",
    "développeur web React Next.js Suisse",
    "apprentissage CFC informatique 2027",
    "apprentissage CFC médiamatique 2027",
    "portfolio web junior",
  ],
  authors: [{ name: "Nikolas Luquiens", url: siteUrl }],
  creator: "Nikolas Luquiens",
  publisher: "Nikolas Luquiens",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nikolas Luquiens — Futur apprenti informaticien & médiamaticien",
    description:
      "15 ans, Suisse. Conçoit des projets React & Next.js avec Claude Code, à la recherche d'un apprentissage CFC informatique ou médiamatique pour 2027.",
    url: siteUrl,
    siteName: "Portfolio Nikolas Luquiens",
    locale: "fr_CH",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nikolas Luquiens — Futur apprenti informaticien & médiamaticien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikolas Luquiens — Portfolio",
    description:
      "Futur apprenti CFC informatique ou médiamatique 2027. React, Next.js, TypeScript.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikolas Luquiens",
  url: siteUrl,
  description:
    "Futur apprenti CFC informatique ou médiamatique pour la rentrée 2027. Conçoit des projets web avec Claude Code (React, Next.js, TypeScript), basé en Suisse.",
  jobTitle: "Futur apprenti CFC Informatique / Médiamatique",
  nationality: { "@type": "Country", name: "Switzerland" },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Git",
    "Figma",
    "Développement web",
    "UI / UX Design",
    "Médiamatique",
    "Communication digitale",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Futur développeur web",
    occupationLocation: { "@type": "Country", name: "Switzerland" },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio Nikolas Luquiens",
  url: siteUrl,
  description:
    "Portfolio de Nikolas Luquiens — futur apprenti CFC informatique ou médiamatique 2027.",
  author: { "@type": "Person", name: "Nikolas Luquiens" },
  inLanguage: "fr-CH",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="fixed inset-0 z-50 pointer-events-none noise-overlay" />
        <div className="ambient-glow" aria-hidden />
        <IntroLoader />
        <CustomCursor />
        <ScrollProgress />
        <NavBar />
        {children}
        <ConditionalCTA />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
