"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const quoteWords = "Si tu veux quelque chose dans la vie,".split(" ");
const highlightWords = "faut aller le chercher toi-même.".split(" ");

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="px-8 md:px-16 py-28 border-b border-white/5 relative overflow-hidden">
      {/* Parallax glows */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-48 bg-purple-600/8 rounded-full blur-3xl pointer-events-none"
      />

      <div ref={ref} className="relative max-w-4xl">

        {/* Decorative quote mark with fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute -top-14 -left-3 text-[180px] md:text-[220px] font-serif leading-none select-none pointer-events-none"
          style={{ color: "rgba(96,165,250,0.06)" }}
          aria-hidden
        >
          &ldquo;
        </motion.div>

        <div
          className="relative z-10 pl-6"
          style={{ borderLeft: "2px solid", borderImage: "linear-gradient(to bottom, rgba(96,165,250,0.6), rgba(168,85,247,0.4)) 1" }}
        >
          {/* Animated border line reveal */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 to-purple-500/40 origin-top"
          />

          {/* First sentence — word by word */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-snug mb-1">
            {quoteWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 20,
                  delay: 0.2 + i * 0.06,
                }}
                className="inline-block mr-[0.28em]"
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Second sentence — gradient, word by word */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
            {highlightWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 20,
                  delay: 0.2 + (quoteWords.length + i) * 0.06,
                }}
                className="inline-block mr-[0.28em] bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x"
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <span className="text-gray-600 text-xs uppercase tracking-widest">Dit par</span>
            {["Mes coaches", "Mon père", "Mes grands-parents"].map((src, i) => (
              <motion.span
                key={src}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.08 }}
                className="text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1 bg-white/3 hover:border-white/20 transition-colors cursor-default"
              >
                {src}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
