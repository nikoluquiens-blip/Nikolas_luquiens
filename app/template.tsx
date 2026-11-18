"use client";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

// Courbe "expo in-out" : départ et arrivée doux, mouvement franc au milieu.
// Partagée par le rideau, le titre et le contenu pour qu'ils bougent comme un seul geste.
const EASE = [0.76, 0, 0.24, 1] as const;

const PAGE_TITLES: Record<string, string> = {
  "/": "Accueil",
  "/competences": "Compétences",
  "/projets": "Projets",
  "/a-propos": "À propos",
  "/blog": "Blog",
  "/hockey": "Hockey",
  "/contact": "Contact",
  "/mentions-legales": "Mentions légales",
  "/confidentialite": "Confidentialité",
};

function titleFor(pathname: string) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const section = "/" + pathname.split("/")[1];
  return PAGE_TITLES[section] ?? null;
}

// Durées (s) — le titre entre, tient un instant, puis le rideau se lève et l'emporte.
const TITLE_IN = 0.4;
const LIFT_AT = 0.5;
const LIFT = 0.75;

/**
 * Transition entre les pages, façon carton de générique : le nom de la page
 * apparaît sur un rideau sombre, puis le rideau se lève sur le contenu.
 * Au premier chargement, IntroLoader fait déjà l'entrée : le rideau ne
 * s'affiche qu'à partir de la deuxième page visitée.
 */
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [withCurtain] = useState(() => hasNavigated);
  const title = titleFor(pathname);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {withCurtain && (
        <motion.div
          aria-hidden
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: LIFT, ease: EASE, delay: LIFT_AT }}
          className="fixed inset-0 z-[150] bg-[#0d0d12] pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {title && (
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: TITLE_IN, ease: EASE }}
                  className="font-mono text-[11px] uppercase tracking-[0.35em] text-purple-300/70"
                >
                  Nikolas Luquiens
                </motion.p>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: TITLE_IN, ease: EASE, delay: 0.05 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight text-white"
                >
                  {title}
                </motion.p>
              </div>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: LIFT_AT, ease: EASE }}
                className="block h-px w-24 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
              />
            </div>
          )}
          {/* Bord inférieur lumineux : souligne le mouvement du rideau qui se lève */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
        </motion.div>
      )}
      <motion.div
        initial={withCurtain ? { opacity: 0, y: 64 } : { opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          withCurtain
            ? { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: LIFT_AT + 0.15 }
            : { duration: 0.4 }
        }
      >
        {children}
      </motion.div>
    </>
  );
}
