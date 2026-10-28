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
    default: "Nikolas Luquiens — Futur médiamaticien | Portfolio",
    template: "%s — Nikolas Luquiens",
  },
  description:
    "Portfolio de Nikolas Luquiens, 15 ans, basé en Suisse. Futur apprenti CFC médiamatique pour la rentrée 2027. Création de contenu, identité visuelle, communication digitale.",
  keywords: [
    "Nikolas Luquiens",
    "Luquiens Nikolas",
    "Nikolas Luquiens portfolio",
    "Nikolas Luquiens médiamaticien",
    "apprenti médiamaticien Suisse 2027",
    "CFC médiamatique apprentissage",
    "médiamaticien apprenti Suisse",
    "portfolio médiamaticien junior Suisse",
    "apprentissage CFC médiamatique 2027",
    "communication digitale apprenti",
    "création de contenu Suisse",
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
    title: "Nikolas Luquiens — Futur apprenti médiamaticien",
    description:
      "15 ans, Suisse. Création de contenu, identité visuelle et communication digitale, à la recherche d'un apprentissage CFC médiamatique pour 2027.",
    url: siteUrl,
    siteName: "Portfolio Nikolas Luquiens",
    locale: "fr_CH",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nikolas Luquiens — Futur apprenti médiamaticien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikolas Luquiens — Portfolio",
    description:
      "Futur apprenti CFC médiamatique 2027. Création de contenu, communication, identité visuelle.",
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
    "Futur apprenti CFC médiamatique pour la rentrée 2027. Création de contenu, identité visuelle et communication digitale, basé en Suisse.",
  jobTitle: "Futur apprenti CFC Médiamatique",
  nationality: { "@type": "Country", name: "Switzerland" },
  knowsAbout: [
    "Médiamatique",
    "Communication digitale",
    "Création de contenu",
    "Identité visuelle",
    "Réseaux sociaux",
    "Canva",
    "Photo & vidéo",
    "UI / UX Design",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Futur médiamaticien",
    occupationLocation: { "@type": "Country", name: "Switzerland" },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio Nikolas Luquiens",
  url: siteUrl,
  description:
    "Portfolio de Nikolas Luquiens — futur apprenti CFC médiamatique 2027.",
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
