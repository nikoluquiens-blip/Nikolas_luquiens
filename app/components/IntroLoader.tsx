"use client";
import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const letters = ["N", "I", "K", "O"];

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("intro-seen")) return;
    sessionStorage.setItem("intro-seen", "1");
    setShow(true);
    const t1 = setTimeout(() => setExit(true), 1200);
    const t2 = setTimeout(() => setShow(false), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* Scan line sweep */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0.7 }}
            animate={{ scaleX: exit ? 0 : 1, opacity: exit ? 0 : 0.7 }}
            transition={{ duration: 0.5, delay: exit ? 0 : 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent origin-left"
          />

          {/* Letters */}
          <div className="flex items-end gap-1">
            {letters.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={
                  exit
                    ? { opacity: 0, y: -30, filter: "blur(12px)" }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                transition={{
                  duration: 0.5,
                  delay: exit ? i * 0.04 : 0.1 + i * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="font-black text-5xl md:text-7xl leading-none tracking-tighter"
                style={{ color: i === letters.length - 1 ? "#60a5fa" : "white" }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Blinking dot */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-blue-400 font-black text-5xl md:text-7xl leading-none ml-0.5 mb-1"
            >
              .
            </motion.span>
          </div>

          {/* Subtle grid lines for depth */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
