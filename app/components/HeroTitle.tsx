"use client";
import { motion } from "motion/react";
import CyclicText from "./CyclicText";

const techStack = [
  "Canva", "Identité visuelle", "Réseaux sociaux", "Photo & vidéo", "Claude Code", "Communication",
];

function CharReveal({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            delay: delay + i * 0.025,
          }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
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

      {/* Line 2 — futur [cycling] */}
      <div className="overflow-hidden">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.32 }}
            className="inline-block text-white"
          >
            futur&nbsp;
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.2 }}
            className="relative inline-block"
          >
            <CyclicText
              words={["médiamaticien"]}
              className="bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400 bg-clip-text text-transparent"
              interval={3500}
            />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1.05, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400/70 via-purple-400/50 to-transparent origin-left rounded-full"
            />
          </motion.span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="overflow-hidden mt-1">
        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 22, delay: 0.7 }}
          className="text-gray-500 text-base md:text-lg font-light"
        >
          Je construis des interfaces web qui font la différence.
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
              delay: 0.95 + i * 0.07,
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
