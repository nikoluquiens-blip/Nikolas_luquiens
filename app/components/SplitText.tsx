"use client";
import { motion } from "motion/react";

export default function SplitText({
  text,
  className = "",
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Optional word(s) to render in blue, matched case-sensitively */
  highlight?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlight?.split(" ").includes(word);
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`inline-block mr-[0.25em] ${isHighlighted ? "text-blue-400" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
