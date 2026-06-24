"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Particle = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  color: string;
};

const COLORS = [
  "rgba(96,165,250,0.7)",   // blue
  "rgba(167,139,250,0.6)",  // violet
  "rgba(56,189,248,0.6)",   // sky
  "rgba(255,255,255,0.4)",  // white
];

export default function ParticleField({ count = 36 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 0.8 + Math.random() * 3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 7 + Math.random() * 10,
        delay: Math.random() * 6,
        drift: 18 + Math.random() * 32,
        opacity: 0.3 + Math.random() * 0.6,
        color: COLORS[i % COLORS.length],
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            background: p.color,
            boxShadow: p.size > 2 ? `0 0 ${p.size * 3}px ${p.color}` : "none",
          }}
          animate={{
            y: [0, -p.drift, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0, p.opacity, p.opacity * 0.4, p.opacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
