"use client";
import { motion } from "motion/react";
import CyclicText from "./CyclicText";

const techStack = [
  "Canva", "Identité visuelle", "Réseaux sociaux", "Photo & vidéo", "Claude Code", "Communication",
];

function CharReveal({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  // Lettres groupées par mot (chaque mot insécable) : sur petit écran la ligne
  // passe à la ligne entre deux mots, jamais au milieu d'un mot.
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: delay + i * 0.025 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && (charIndex++, "\u00A0")}
        </span>
      ))}
    </span>
  );
}

export default function HeroTitle() {
  return (
    <div className="flex flex-col gap-3">

      {/* Line 1 */}
      <div className="overflow-hidden">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
          <span className="text-gray-400 font-light">
            <CharReveal text="Je suis " delay={0.06} />
          </span>
          <CharReveal text="Nikolas," delay={0.06 + 8 * 0.025} className="text-white" />
        </h1>
      </div>

      {/* Line 2 */}
      <div className="overflow-hidden">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
          <span className="text-gray-400 font-light">
            <CharReveal text="votre " delay={0.3} />
          </span>
          <CharReveal text="futur apprenti" delay={0.3 + 6 * 0.025} className="text-white" />
        </h1>
      </div>

      {/* Line 3 — les deux métiers visés, à égalité, en alternance.
          Taille fluide : « interactive media designer » doit tenir sur une ligne, même sur mobile. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.2 }}
        className="relative self-start font-bold leading-[1.15] tracking-tight text-[clamp(1.1rem,6.2vw,2.25rem)] xl:text-[2.75rem]"
      >
        <CyclicText
          words={["médiamaticien", "interactive media designer"]}
          className="bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400 bg-clip-text text-transparent pb-1"
          interval={3200}
        />
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400/70 via-purple-400/50 to-transparent origin-left rounded-full"
        />
      </motion.div>

      {/* Tagline */}
      <div className="overflow-hidden mt-2">
        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 22, delay: 0.85 }}
          className="text-gray-400 text-base md:text-lg font-light max-w-md"
        >
          Je cherche une place d&apos;apprentissage CFC pour la rentrée 2027.
        </motion.p>
      </div>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {techStack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 12, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: 1.0 + i * 0.06,
            }}
            whileHover={{ scale: 1.08, borderColor: "rgba(96,165,250,0.5)" }}
            className="text-xs text-gray-400 border border-white/10 bg-white/[0.03] px-3 py-1.5 rounded-full font-medium cursor-default transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
