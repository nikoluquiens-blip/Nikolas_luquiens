"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Fait défiler une liste de mots au même emplacement.
 * Tous les mots sont rendus invisibles dans la même cellule de grille : la largeur
 * réservée est donc exactement celle du mot le plus long (pas d'estimation en
 * caractères), et la mise en page ne saute pas quand le mot change.
 */
export default function CyclicText({
  words,
  className = "",
  interval = 3200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {words.map((w) => (
        <span key={w} aria-hidden className={`invisible [grid-area:1/1] whitespace-nowrap ${className}`}>
          {w}
        </span>
      ))}
      {/* Lecteurs d'écran : tous les mots, une seule fois */}
      <span className="sr-only">{words.join(" ou ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className={`[grid-area:1/1] whitespace-nowrap ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
