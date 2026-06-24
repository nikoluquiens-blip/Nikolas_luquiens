"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";

const badges = [
  {
    label: "🚀 React & Next.js",
    className: "top-4 -left-6 md:-left-14",
    duration: 5,
    delay: 1.0,
    drift: -9,
  },
  {
    label: "🎙️ Médiamatique",
    className: "bottom-12 -right-4 md:-right-16",
    duration: 6,
    delay: 1.3,
    drift: -7,
  },
  {
    label: "✅ Dispo 2027",
    className: "bottom-0 -left-2 md:-left-10",
    duration: 4.5,
    delay: 1.6,
    drift: -8,
  },
];

export default function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 160, damping: 20 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, x: 40, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.35 }}
      className="hidden md:flex relative z-10 items-center justify-center md:ml-auto mr-4 md:mr-10 my-10 md:my-0 shrink-0"
      style={{ perspective: 900 }}
    >
      {/* Rotating outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-white/8 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-blue-500/10 pointer-events-none"
        style={{
          backgroundImage: "conic-gradient(from 0deg, rgba(96,165,250,0.15), transparent 30%, transparent 70%, rgba(168,85,247,0.10))",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 w-72 h-72 bg-blue-600 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -right-10 w-72 h-72 bg-purple-600 rounded-full blur-[80px] pointer-events-none"
      />

      {/* Portrait with 3D tilt */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX,
          rotateY,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #818cf8, #60a5fa)",
          backgroundSize: "300% 300%",
        }}
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] shadow-2xl shadow-blue-500/25 animate-gradient-shift"
      >
        <div className="w-full h-full rounded-full bg-[#0a0a0a] p-1.5">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/nikolebg.png"
              alt="Nikolas"
              fill
              priority
              sizes="320px"
              className="object-cover scale-[1.35] object-top select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Floating badges */}
        {badges.map((b) => (
          <motion.span
            key={b.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, b.drift, 0],
            }}
            transition={{
              opacity: { duration: 0.4, delay: b.delay },
              scale: { duration: 0.4, delay: b.delay },
              y: { duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay },
            }}
            className={`absolute ${b.className} whitespace-nowrap text-xs font-semibold bg-[#0a0a0a]/80 backdrop-blur-md border border-white/15 text-white px-3.5 py-1.5 rounded-full shadow-xl`}
          >
            {b.label}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
