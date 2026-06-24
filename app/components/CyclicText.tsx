"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CyclicText({
  words,
  className = "",
  interval = 3200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  if (!mounted) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={`relative inline-flex overflow-hidden ${className}`}
      style={{ minWidth: `${Math.max(...words.map((w) => w.length)) * 0.6}em` }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "110%", opacity: 0, filter: "blur(10px)", rotateX: -25 }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0 }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(10px)", rotateX: 25 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
            opacity: { duration: 0.25 },
            filter: { duration: 0.3 },
          }}
          className="inline-block"
          style={{ transformOrigin: "50% 50%" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
