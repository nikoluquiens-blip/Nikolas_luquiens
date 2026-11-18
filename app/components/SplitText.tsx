"use client";
import { motion, type Variants } from "motion/react";

const word: Variants = {
  hidden: { y: "110%", opacity: 0, rotate: 2 },
  visible: { y: "0%", opacity: 1, rotate: 0 },
};

export default function SplitText({
  text,
  className = "",
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string;
}) {
  const words = text.split(" ");

  // La détection « visible à l'écran » se fait sur le conteneur, pas sur chaque mot :
  // un mot démarre caché sous son masque (overflow-hidden), il n'est donc jamais
  // « visible » pour le navigateur et son animation ne se déclencherait jamais.
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => {
        const isHighlighted = highlight?.split(" ").includes(w);
        return (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              variants={word}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className={`inline-block ${isHighlighted ? "text-blue-400" : ""}`}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
