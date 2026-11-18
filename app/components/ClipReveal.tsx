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
  // Le déclencheur est le conteneur (toujours visible), pas le contenu masqué
  // sous la ligne de découpe, qui pour le navigateur n'est jamais « à l'écran ».
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px" }}
    >
      <motion.div
        variants={{ hidden: { y: "105%", opacity: 0 }, visible: { y: "0%", opacity: 1 } }}
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
    </motion.div>
  );
}
