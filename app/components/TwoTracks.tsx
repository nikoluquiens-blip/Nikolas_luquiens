"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

/* ── Syntax-highlighted code lines ── */
const codeLines = [
  <span key="0"><span className="text-purple-400">const</span>{" "}<span className="text-blue-300">Nikolas</span>{" "}<span className="text-white/50">=</span>{" "}<span className="text-yellow-300">{"{"}</span></span>,
  <span key="1"><span className="pl-5 block"><span className="text-green-300">cfc</span><span className="text-white/50">:{" "}</span><span className="text-orange-300">&ldquo;informatique&rdquo;</span><span className="text-white/40">,</span></span></span>,
  <span key="2"><span className="pl-5 block"><span className="text-green-300">stack</span><span className="text-white/50">:{" "}</span><span className="text-yellow-300">[</span><span className="text-orange-300">&ldquo;React&rdquo;</span><span className="text-white/40">, </span><span className="text-orange-300">&ldquo;Next.js&rdquo;</span><span className="text-yellow-300">]</span><span className="text-white/40">,</span></span></span>,
  <span key="3"><span className="pl-5 block"><span className="text-green-300">disponible</span><span className="text-white/50">:{" "}</span><span className="text-sky-300">2027</span><span className="text-white/40">,</span></span></span>,
  <span key="4"><span className="text-yellow-300">{"}"}</span></span>,
];

const mediaItems = [
  { emoji: "🎙️", label: "Prise de parole" },
  { emoji: "✨", label: "Canva" },
  { emoji: "📝", label: "Rédaction" },
  { emoji: "📣", label: "Comm. digitale" },
  { emoji: "🎬", label: "Production" },
  { emoji: "🌐", label: "Stratégie web" },
];

function CodeBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="bg-black/50 rounded-xl p-5 border border-white/8 font-mono text-xs leading-loose select-none"
    >
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.09, ease: "easeOut" }}
        >
          {line}
        </motion.div>
      ))}
      {/* blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-blue-400"
      >
        ▌
      </motion.span>
    </div>
  );
}

export default function TwoTracks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="px-8 md:px-16 py-20 border-b border-white/5" ref={sectionRef}>
      {/* Header */}
      <div className="mb-12 overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="text-gray-500 text-xs uppercase tracking-widest mb-3"
        >
          Ma double préparation
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.08 }}
            className="text-2xl md:text-3xl font-bold"
          >
            Deux CFC,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              une seule ambition
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Split grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl rounded-3xl overflow-hidden border border-white/10">

        {/* ── INFORMATIQUE ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative group p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-600/4 to-transparent transition-all duration-700 group-hover:from-blue-600/18" />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/60 to-transparent" />

          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs text-blue-400 font-medium uppercase tracking-widest">
                <span className="w-4 h-px bg-blue-400 inline-block" /> CFC Informatique
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-4 leading-tight">
                Je code<br />des solutions.
              </h3>
            </div>

            <CodeBlock />

            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Git"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 bg-blue-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/competences"
              className="group/link inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors w-fit"
            >
              Voir mes compétences
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>

        {/* ── MÉDIAMATIQUE ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative group p-10 md:p-12 overflow-hidden"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-purple-600/4 to-transparent transition-all duration-700 group-hover:from-purple-600/18" />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-purple-500/60" />

          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs text-purple-400 font-medium uppercase tracking-widest">
                <span className="w-4 h-px bg-purple-400 inline-block" /> CFC Médiamatique
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-4 leading-tight">
                Je crée<br />des histoires.
              </h3>
            </div>

            {/* Media icons grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {mediaItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                  className="bg-white/5 border border-white/8 rounded-xl p-3 text-center hover:border-purple-500/40 hover:bg-purple-500/8 transition-all duration-300 group/card"
                >
                  <span className="text-2xl block mb-1.5 group-hover/card:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                  <span className="text-xs text-gray-500 leading-tight block">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Canva", "Communication", "Présentation", "Rédaction", "Médias"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 bg-purple-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/competences"
              className="group/link inline-flex items-center gap-2 text-purple-400 text-sm hover:text-purple-300 transition-colors w-fit"
            >
              Voir mes compétences
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
