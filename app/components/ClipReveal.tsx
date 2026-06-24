"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Slides content up from behind an invisible clip line.
 * The "text wipe" effect used by Linear, Vercel, Figma.
 */
export default function ClipReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once, margin: "-30px" }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 20,
          delay,
          opacity: { duration: 0.15, delay },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
