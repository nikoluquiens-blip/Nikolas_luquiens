"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "./MagneticButton";
import TextScramble from "./TextScramble";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Compétences", href: "/competences" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.05 }}
        className="sticky top-0 z-50 flex items-center justify-between border-b transition-colors duration-500"
        style={{
          padding: scrolled ? "12px 64px" : "24px 64px",
          backgroundColor: scrolled ? "rgba(10,10,10,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
          <Link href="/" className="font-bold text-xl inline-block">
            <span className="text-white">Niko</span>
            <motion.span
              className="text-blue-400 inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              .
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm transition-colors ${active ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <TextScramble text={link.label} speed={28} />
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute left-0 -bottom-1 w-full h-px bg-gradient-to-r from-blue-400 to-transparent"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:inline-flex items-center gap-2 text-xs text-gray-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Disponible 2027
          </motion.span>

          <MagneticButton
            href="/contact"
            className="hidden md:inline-flex border border-white/25 rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Me contacter
          </MagneticButton>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-[65px] z-30 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="md:hidden sticky top-[65px] z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-8 py-6 flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-base transition-colors ${pathname === link.href ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="/contact"
                    className="border border-white/25 rounded-full px-5 py-2.5 text-sm text-center hover:bg-white hover:text-black transition-all duration-300 block font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Me contacter
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
