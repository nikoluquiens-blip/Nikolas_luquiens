"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import TiltCard from "../components/TiltCard";

const seasons = [
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
];

const photos: Record<string, string[]> = {
  "2025-2026": [
    "/hockey/2025-2026/1.png",
    "/hockey/2025-2026/2.png",
    "/hockey/2025-2026/3.png",
  ],
};

export default function HockeyGallery() {
  const [activeSeason, setActiveSeason] = useState("2025-2026");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const currentPhotos = photos[activeSeason] ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % currentPhotos.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + currentPhotos.length) % currentPhotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, currentPhotos.length]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Link href="/a-propos" className="text-gray-500 text-sm hover:text-white transition-colors mb-6 inline-flex items-center gap-2 group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          À propos
        </Link>
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Galerie</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Hockey sur glace" highlight="sur glace" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg">Mes saisons de 2017 à 2026</p>
        </Reveal>
      </section>

      {/* Season tabs */}
      <div className="px-8 md:px-16 pt-10 overflow-x-auto">
        <div className="flex gap-3 whitespace-nowrap pb-2">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeSeason === season
                  ? "text-white"
                  : "border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {activeSeason === season && (
                <motion.span
                  layoutId="season-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {season}
            </button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <section className="px-8 md:px-16 py-10">
        <p className="text-gray-500 text-sm mb-8">Saison {activeSeason}</p>
        <AnimatePresence mode="wait">
          {currentPhotos.length > 0 ? (
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {currentPhotos.map((src, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <TiltCard>
                    <button
                      onClick={() => setLightbox(i)}
                      data-cursor-text="Zoom"
                      className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`Saison ${activeSeason} - photo ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </button>
                  </TiltCard>
                </Reveal>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`${activeSeason}-empty`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-48 border border-white/10 rounded-2xl"
            >
              <p className="text-gray-600 text-sm">Photos à venir pour cette saison</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + currentPhotos.length) % currentPhotos.length); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentPhotos[lightbox]}
                alt={`Photo ${lightbox + 1}`}
                fill
                sizes="90vw"
                className="object-contain rounded-xl"
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % currentPhotos.length); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <p className="absolute bottom-6 text-gray-400 text-sm">{lightbox + 1} / {currentPhotos.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
