"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const TARGET = "PAGE INTROUVABLE";
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#0123456789";

function useScramble(target: string, duration = 900) {
  const [text, setText] = useState(target.replace(/[^ ]/g, "_"));

  useEffect(() => {
    let frame = 0;
    const totalFrames = 22;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const charThreshold = (i / target.length) * 0.7;
            if (progress > charThreshold + 0.3) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        setText(target);
        clearInterval(interval);
      }
    }, duration / totalFrames);
    return () => clearInterval(interval);
  }, [target, duration]);

  return text;
}

export default function NotFound() {
  const scrambled = useScramble(TARGET);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        animate={{ x: [0, -3, 4, -2, 0] }}
        transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 3.6 }}
      >
        <h1
          data-text="404"
          className="glitch-text text-[7rem] md:text-[10rem] font-bold text-white leading-none select-none"
        >
          404
        </h1>
      </motion.div>

      <p className="mt-4 text-gray-400 text-sm uppercase tracking-[0.3em] font-mono min-h-[1.5em]">
        {scrambled}
      </p>

      <p className="text-gray-500 mt-6 max-w-md">
        Cette page n&apos;existe pas, a été déplacée, ou n&apos;a pas encore été codée. 😅
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
