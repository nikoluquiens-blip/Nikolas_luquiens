"use client";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * Comportement de survol unique pour toutes les cartes du site :
 * un reflet suit le curseur, le bord s'allume là où il se trouve,
 * la carte monte légèrement.
 *
 * La position du curseur est écrite dans des variables CSS (--mx / --my)
 * plutôt que dans un état React : aucun re-rendu à chaque mouvement de souris.
 * Les styles sont dans globals.css (.hover-card).
 */
export default function HoverCard({
  children,
  className = "",
  accent = "blue",
  rounded = "2xl",
}: {
  children: ReactNode;
  className?: string;
  accent?: "blue" | "purple";
  rounded?: "xl" | "2xl";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    // Au toucher il n'y a pas de survol : on ne réagit qu'à la souris.
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      data-accent={accent}
      className={`hover-card group relative ${rounded === "xl" ? "rounded-xl" : "rounded-2xl"} ${className}`}
    >
      {children}
      <span aria-hidden className="hover-card__spot" />
      <span aria-hidden className="hover-card__edge" />
    </div>
  );
}
