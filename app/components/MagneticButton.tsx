"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

const MotionLink = motion.create(Link);

export default function MagneticButton({
  href,
  children,
  className = "",
  download = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Set for static files (PDF, images, …) so a real <a> is used instead of next/link. */
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14 });
  const springY = useSpring(y, { stiffness: 150, damping: 14 });
  const isInternal = href.startsWith("/") && !download;

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  if (isInternal) {
    return (
      <MotionLink
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
