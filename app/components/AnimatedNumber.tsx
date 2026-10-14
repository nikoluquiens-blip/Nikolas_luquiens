"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useInView } from "motion/react";

export default function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  const raw = useMotionValue(0);
  const spring = useSpring(raw, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.5,
  });

  useEffect(() => {
    if (!inView) return;
    raw.set(value);
  }, [inView, value, raw]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}
