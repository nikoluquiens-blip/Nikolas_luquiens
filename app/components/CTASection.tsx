"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ConfettiButton from "./ConfettiButton";
import MagneticButton from "./MagneticButton";

const words = "Votre prochain apprenti, c'est peut-être moi.".split(" ");

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-8 md:px-16 py-32 border-t border-white/5 overflow-hidden">
      {/* Layered background glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-[#0a0a0a] to-purple-950/30 pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-purple-500 rounded-full blur-[100px] pointer-events-none"
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">

        {/* Track badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.05 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          {[
            { label: "CFC Informatique", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5", dot: "bg-blue-400" },
            { label: "CFC Médiamatique", color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5", dot: "bg-purple-400" },
          ].map((badge) => (
            <span key={badge.label} className={`inline-flex items-center gap-1.5 text-xs ${badge.color} border ${badge.border} rounded-full px-4 py-1.5 ${badge.bg}`}>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1.5 h-1.5 rounded-full ${badge.dot} inline-block`}
              />
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Word-by-word animated headline */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {words.map((word, i) => {
            const isHighlight = i >= 4;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 22,
                  delay: 0.15 + i * 0.07,
                }}
                className={`inline-block mr-[0.28em] ${
                  isHighlight
                    ? "bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-gray-400 text-lg max-w-xl leading-relaxed"
        >
          Je cherche à apprendre sur le terrain, à grandir avec votre équipe, et à prouver ce que je vaux.
          Rentrée 2027.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 24, delay: 1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <ConfettiButton
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-white text-black font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/15 uppercase tracking-widest text-sm"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
            <span className="relative">Me contacter</span>
            <span className="relative group-hover:translate-x-1 transition-transform inline-block">→</span>
          </ConfettiButton>
          <MagneticButton
            href="/a-propos"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-gray-300 hover:text-white px-7 py-4 rounded-xl transition-all duration-300 text-sm font-medium hover:bg-white/5"
          >
            Mon parcours
          </MagneticButton>
        </motion.div>

        {/* Availability pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-gray-500 text-xs">Disponible pour un contrat d&apos;apprentissage dès 2027</span>
        </motion.div>
      </div>
    </section>
  );
}
