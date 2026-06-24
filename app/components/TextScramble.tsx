"use client";
import { useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function TextScramble({
  text,
  className = "",
  speed = 40,
}: {
  text: string;
  className?: string;
  /** ms between each tick */
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (rafRef.current) clearInterval(rafRef.current);
    let iteration = 0;
    const len = text.length;

    rafRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return randomChar();
          })
          .join("")
      );
      iteration += 0.6;
      if (iteration >= len) {
        clearInterval(rafRef.current!);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed]);

  const reset = useCallback(() => {
    if (rafRef.current) clearInterval(rafRef.current);
    setDisplay(text);
  }, [text]);

  return (
    <span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </span>
  );
}
