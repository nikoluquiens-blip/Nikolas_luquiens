"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Si l'appareil demande moins d'animations (réglage d'accessibilité),
// motion supprime les déplacements et ne garde que les fondus.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
