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
  highlight?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlight?.split(" ").includes(word);
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              initial={{ y: "110%", opacity: 0, rotate: 2 }}
              whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 18,
                delay: delay + i * 0.07,
              }}
              className={`inline-block ${isHighlighted ? "text-blue-400" : ""}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
