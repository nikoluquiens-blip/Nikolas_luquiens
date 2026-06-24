import Link from "next/link";
import Reveal from "./Reveal";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Compétences", href: "/competences" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Hockey", href: "/hockey" },
];

const tracks = [
  { label: "CFC Informatique", color: "text-blue-400", dot: "bg-blue-400" },
  { label: "CFC Médiamatique", color: "text-purple-400", dot: "bg-purple-400" },
];

export default function Footer() {
  return (
    <footer className="relative px-8 md:px-16 py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 via-50% via-purple-400/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />

      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14 max-w-5xl">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-bold text-2xl inline-block">
              <span className="text-white">Niko</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">.</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              15 ans, 11VG. Futur informaticien ou médiamaticien. En préparation active pour la rentrée 2027.
            </p>
            <div className="space-y-2">
              {tracks.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                  <span className={`text-xs font-medium ${t.color}`}>{t.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-green-400 text-xs font-medium">Disponible pour un apprentissage</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-5">Navigation</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest">Me contacter</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Prêt à m&apos;offrir une chance d&apos;apprendre dans votre entreprise pour 2027 ?
            </p>
            <a
              href="mailto:niko.luquiens@icloud.com"
              className="text-gray-300 hover:text-white text-sm transition-colors block"
            >
              niko.luquiens@icloud.com
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Envoyer un message
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-7 border-t border-white/5">
          <p className="text-gray-700 text-xs">
            © 2026 Nikolas Luquiens — Tous droits réservés.
          </p>
          <p className="text-gray-700 text-xs">
            Conçu &amp; développé avec Next.js 15, TypeScript &amp; Motion
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
