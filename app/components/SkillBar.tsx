"use client";
import { motion } from "motion/react";
import AnimatedNumber from "./AnimatedNumber";

type SkillBarProps = {
  name: string;
  level: number;
  delay?: number;
  color?: "blue" | "purple";
};

export default function SkillBar({ name, level, delay = 0, color = "blue" }: SkillBarProps) {
  const bar = color === "purple"
    ? "bg-gradient-to-r from-purple-600 to-purple-400"
    : "bg-gradient-to-r from-blue-600 to-blue-400";
  const dot = color === "purple"
    ? "bg-purple-300 shadow-[0_0_8px_2px_rgba(168,85,247,0.8)]"
    : "bg-blue-300 shadow-[0_0_8px_2px_rgba(96,165,250,0.8)]";
  const numColor = color === "purple" ? "text-purple-400" : "text-blue-400";

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 text-sm">{name}</span>
        <span className={`text-sm ${numColor}`}>
          <AnimatedNumber value={level} />%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`relative h-full rounded-full ${bar}`}
        >
          <span className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${dot}`} />
        </motion.div>
      </div>
    </div>
  );
}
