import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import IntroLoader from "./components/IntroLoader";
import CTASection from "./components/CTASection";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
    default: "Nikolas Luquiens — Futur informaticien ou médiamaticien",
    template: "%s — Nikolas Luquiens",
  },
  description:
    "Portfolio de Nikolas Luquiens, 15 ans, à la recherche d'un contrat d'apprentissage (CFC) en informatique ou en médiamatique pour la rentrée 2027.",
  openGraph: {
    title: "Nikolas Luquiens — Futur informaticien ou médiamaticien",
    description:
      "À la recherche d'un contrat d'apprentissage (CFC) en informatique ou en médiamatique pour la rentrée 2027.",
    locale: "fr_FR",
    type: "website",
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
        <div className="fixed inset-0 z-50 pointer-events-none noise-overlay" />
        <div className="ambient-glow" aria-hidden />
        <IntroLoader />
        <CustomCursor />
        <ScrollProgress />
        <NavBar />
        {children}
        <CTASection />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
