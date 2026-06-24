"use client";
import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotColor = "rgba(96,165,250,0.18)",
}: {
  children: ReactNode;
  className?: string;
  spotColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  const spotOpacity = useMotionValue(0);

  const spotBg = useMotionTemplate`radial-gradient(
    520px circle at ${mouseX}px ${mouseY}px,
    ${spotColor},
    transparent 75%
  )`;

  const borderGlow = useMotionTemplate`radial-gradient(
    200px circle at ${mouseX}px ${mouseY}px,
    rgba(96,165,250,0.5),
    transparent 65%
  )`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    spotOpacity.set(1);
  }

  function handleLeave() {
    mouseX.set(-999);
    mouseY.set(-999);
    spotOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative group rounded-2xl ${className}`}
    >
      {/* Border glow layer */}
      <motion.div
        style={{ background: borderGlow, opacity: spotOpacity }}
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-300"
      />

      {/* Spotlight layer inside card */}
      <motion.div
        style={{ background: spotBg, opacity: spotOpacity }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
      />

      <div className="relative z-20">{children}</div>
    </div>
  );
}
