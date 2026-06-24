"use client";
import { motion, useScroll, useTransform } from "motion/react";

export default function ParallaxBlobs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -90]);
  const y3 = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <div className="absolute right-0 top-0 w-full md:w-2/3 h-full pointer-events-none overflow-hidden">
      {/* Main gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-700/30 via-purple-900/20 to-transparent" />

      {/* Blue blob — upper right */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/5 right-1/4 w-80 h-80 bg-blue-600/22 rounded-full blur-[80px] animate-blob"
      />
      {/* Purple blob — lower right */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-600/18 rounded-full blur-[70px] animate-blob delay-2"
      />
      {/* Accent violet — center */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 right-1/2 w-48 h-48 bg-violet-500/10 rounded-full blur-[60px] animate-blob delay-4"
      />
    </div>
  );
}
