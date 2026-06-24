"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

const colors = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#38bdf8", "#fb923c"];

const pieces = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
  distance: 45 + Math.random() * 40,
  color: colors[i % colors.length],
  size: 4 + Math.random() * 6,
  rotation: Math.random() * 360,
  shape: i % 4 === 0 ? "square" : "circle",
}));

export default function ConfettiButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const [burst, setBurst] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (burst) return;
    setBurst(true);
    setTimeout(() => {
      setBurst(false);
      router.push(href);
    }, 480);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`relative ${className}`}
    >
      {children}
      <AnimatePresence>
        {burst && (
          <span className="absolute inset-0 pointer-events-none overflow-visible">
            {pieces.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(p.angle) * p.distance,
                  y: Math.sin(p.angle) * p.distance,
                  scale: 0.2,
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 0.6,
                  delay: p.id * 0.008,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: p.color,
                  width: p.size,
                  height: p.size,
                  borderRadius: p.shape === "circle" ? "50%" : "2px",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            ))}
          </span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
