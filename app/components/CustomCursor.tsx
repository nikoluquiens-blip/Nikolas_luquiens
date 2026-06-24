"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Main dot — very snappy
  const dotX = useSpring(x, { stiffness: 800, damping: 45 });
  const dotY = useSpring(y, { stiffness: 800, damping: 45 });

  // Ring — slightly behind for a trailing feel
  const ringX = useSpring(x, { stiffness: 280, damping: 28 });
  const ringY = useSpring(y, { stiffness: 280, damping: 28 });

  const handleMove = useCallback((e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    setVisible(true);
    const target = e.target as HTMLElement;
    const labelEl = target.closest("[data-cursor-text]") as HTMLElement | null;
    setLabel(labelEl?.dataset.cursorText ?? null);
    setPointer(!!target.closest("a, button, [role='button']"));
  }, [x, y]);

  const handleLeave = useCallback(() => setVisible(false), []);
  const handleDown = useCallback(() => setClicking(true), []);
  const handleUp = useCallback(() => setClicking(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [handleMove, handleLeave, handleDown, handleUp]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        animate={{
          scale: clicking ? 0.4 : pointer ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed z-[101] w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-400 pointer-events-none hidden md:block mix-blend-screen"
      />

      {/* Outer ring */}
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: label ? 80 : pointer ? 52 : clicking ? 28 : 36,
          height: label ? 80 : pointer ? 52 : clicking ? 28 : 36,
          opacity: visible ? 1 : 0,
          borderColor: pointer
            ? "rgba(96,165,250,0.9)"
            : "rgba(96,165,250,0.55)",
          backgroundColor: clicking
            ? "rgba(96,165,250,0.08)"
            : pointer
            ? "rgba(96,165,250,0.04)"
            : "transparent",
        }}
        transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none hidden md:flex items-center justify-center backdrop-blur-[1px]"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-semibold text-white uppercase tracking-wider whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click burst ring */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="burst"
            style={{ left: dotX, top: dotY }}
            initial={{ width: 16, height: 16, opacity: 0.8, x: "-50%", y: "-50%" }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed z-[99] rounded-full border border-blue-400/60 pointer-events-none hidden md:block"
          />
        )}
      </AnimatePresence>
    </>
  );
}
