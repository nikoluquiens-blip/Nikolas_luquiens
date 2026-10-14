"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} className="relative px-8 md:px-16 py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 via-50% via-purple-400/40 to-transparent" />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/6 rounded-full blur-3xl pointer-events-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14 max-w-5xl">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="space-y-4"
        >
          <Link href="/" className="font-bold text-2xl inline-block group">
            <span className="text-white">Niko</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              .
            </motion.span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            15 ans, 11VG. Futur informaticien ou médiamaticien. En préparation active pour la rentrée 2027.
          </p>
          <div className="space-y-2">
            {tracks.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                <span className={`text-xs font-medium ${t.color}`}>{t.label}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 pt-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-green-400 text-xs font-medium">Disponible pour un apprentissage</span>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">Navigation</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.15 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-500 hover:text-white text-sm transition-colors group flex items-center gap-1"
                >
                  <motion.span
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="space-y-5"
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest">Me contacter</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Prêt à m&apos;offrir une chance d&apos;apprendre dans votre entreprise pour 2027 ?
          </p>
          <motion.a
            href="mailto:niko.luquiens@icloud.com"
            whileHover={{ x: 3, color: "#ffffff" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="text-gray-400 text-sm transition-colors block"
          >
            niko.luquiens@icloud.com
          </motion.a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Envoyer un message
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-7 border-t border-white/5"
      >
        <p className="text-gray-400 text-xs">
          © 2026 Nikolas Luquiens — Tous droits réservés.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/mentions-legales" className="text-gray-400 hover:text-white text-xs transition-colors">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="text-gray-400 hover:text-white text-xs transition-colors">
            Confidentialité
          </Link>
        </div>
        <p className="text-gray-400 text-xs">
          Conçu avec Claude Code · Next.js 15, TypeScript &amp; Motion
        </p>
      </motion.div>
    </footer>
  );
}
