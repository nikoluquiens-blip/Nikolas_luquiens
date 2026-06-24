"use client";
import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

export default function CursorGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(650px circle at ${x}% ${y}%, rgba(59,130,246,0.14), transparent 70%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} className={`relative ${className}`}>
      <motion.div style={{ background }} className="absolute inset-0 pointer-events-none" />
      {children}
    </div>
  );
}
