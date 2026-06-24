"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import type { ReactNode } from "react";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityTrack({
  children,
  baseVelocity = 80,
}: {
  children: ReactNode;
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [12, 0, -12]);
  const smoothSkewX = useSpring(skewX, { damping: 30, stiffness: 300 });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap">
      <motion.div style={{ x, skewX: smoothSkewX }} className="flex whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block">{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity() {
  return (
    <div className="bg-gradient-to-r from-[#0d0d10] via-[#111118] to-[#0d0d10] border-y border-white/5 overflow-hidden marquee-mask py-0.5 select-none">
      <VelocityTrack baseVelocity={60}>
        <span className="inline-flex items-center gap-10 pr-10 py-3 text-sm">
          <span className="text-blue-400 font-medium">⟨/⟩ Développement web</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">React &amp; Next.js</span>
          <span className="text-white/10">·</span>
          <span className="text-blue-400 font-medium">Tailwind CSS</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">UI / UX Design</span>
          <span className="text-white/10">·</span>
          <span className="text-blue-400 font-medium">Vercel · TypeScript</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">CFC Informatique 2027</span>
          <span className="text-white/10">·</span>
        </span>
      </VelocityTrack>

      <div className="w-full h-px bg-white/[0.03]" />

      <VelocityTrack baseVelocity={-50}>
        <span className="inline-flex items-center gap-10 pr-10 py-3 text-sm">
          <span className="text-purple-400 font-medium">🎙 Médiamatique</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">Création de contenu</span>
          <span className="text-white/10">·</span>
          <span className="text-purple-400 font-medium">Présentation &amp; prise de parole</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">Canva · Communication</span>
          <span className="text-white/10">·</span>
          <span className="text-purple-400 font-medium">Recherche &amp; rédaction</span>
          <span className="text-white/10">·</span>
          <span className="text-gray-500">CFC Médiamatique 2027</span>
          <span className="text-white/10">·</span>
        </span>
      </VelocityTrack>
    </div>
  );
}
