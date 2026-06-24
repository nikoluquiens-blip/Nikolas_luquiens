"use client";
import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 300, damping: 28 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 300, damping: 28 });
  const liftY = useSpring(0, { stiffness: 300, damping: 28 });
  const shadowOpacity = useSpring(0, { stiffness: 300, damping: 28 });

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX} ${glareY}, rgba(96,165,250,0.18), transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(300px circle at ${glareX} ${glareY}, rgba(96,165,250,0.35), transparent 60%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleEnter() {
    liftY.set(-6);
    shadowOpacity.set(1);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    liftY.set(0);
    shadowOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        y: liftY,
        transformPerspective: 900,
      }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {/* Glare overlay */}
      <motion.div style={{ background: glare }} className="absolute inset-0 rounded-2xl pointer-events-none z-10" />
      {/* Animated border glow */}
      <motion.div
        style={{ background: borderGlow, opacity: shadowOpacity }}
        className="absolute -inset-px rounded-2xl pointer-events-none z-0"
      />
      {children}
    </motion.div>
  );
}
