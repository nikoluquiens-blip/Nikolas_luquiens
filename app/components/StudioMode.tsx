"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BAND_COUNT, onStudioChange, resetStudioLevels, setStudioActive, studio } from "../lib/studio";

type MicState = "off" | "asking" | "live" | "denied" | "unsupported";

// Bandes réparties de façon logarithmique (comme l'oreille) entre 80 Hz et 8 kHz.
const MIN_HZ = 80;
const MAX_HZ = 8000;

/**
 * Mode studio — easter egg de l'accueil.
 * Touche S (ou clic sur l'afficheur FM) : le contenu s'estompe, l'onde passe au
 * centre et une console apparaît. Avec le micro, l'onde suit la voix ou la musique.
 * Le son est analysé localement (Web Audio) : rien n'est enregistré ni envoyé.
 */
export default function StudioMode() {
  const [open, setOpen] = useState(false);
  const [mic, setMic] = useState<MicState>("off");
  const meterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const audio = useRef<{ stream: MediaStream; ctx: AudioContext; raf: number } | null>(null);
  const primaryButton = useRef<HTMLButtonElement>(null);

  const stopMic = useCallback(() => {
    const a = audio.current;
    if (a) {
      cancelAnimationFrame(a.raf);
      a.stream.getTracks().forEach((track) => track.stop()); // éteint réellement le micro (voyant du navigateur)
      a.ctx.close().catch(() => {
        /* contexte déjà fermé : rien à faire */
      });
      audio.current = null;
    }
    resetStudioLevels();
    meterRefs.current.forEach((el) => el && (el.style.transform = "scaleY(0.04)"));
    setMic((m) => (m === "live" || m === "asking" ? "off" : m));
  }, []);

  const startMic = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMic("unsupported");
      return;
    }
    setMic("asking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
      });
      // Le studio a pu être fermé pendant la demande d'autorisation.
      if (!studio.active) {
        stream.getTracks().forEach((track) => track.stop());
        setMic("off");
        return;
      }
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      ctx.createMediaStreamSource(stream).connect(analyser);

      const freq = new Uint8Array(analyser.frequencyBinCount);
      const hzPerBin = ctx.sampleRate / analyser.fftSize;
      const edges = Array.from({ length: BAND_COUNT + 1 }, (_, i) =>
        Math.round((MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, i / BAND_COUNT)) / hzPerBin),
      );

      const tick = () => {
        analyser.getByteFrequencyData(freq);
        let total = 0;
        for (let b = 0; b < BAND_COUNT; b++) {
          let sum = 0;
          const from = edges[b];
          const to = Math.max(edges[b + 1], from + 1);
          for (let i = from; i < to; i++) sum += freq[i];
          // Les aigus ont naturellement moins d'énergie : léger rattrapage pour que toutes les lignes bougent.
          const value = Math.min((sum / (to - from) / 255) * (1 + b * 0.25), 1);
          studio.bands[b] = value;
          total += value;
          const el = meterRefs.current[b];
          if (el) el.style.transform = `scaleY(${Math.max(value, 0.04)})`;
        }
        studio.level = total / BAND_COUNT;
        if (audio.current) audio.current.raf = requestAnimationFrame(tick);
      };

      audio.current = { stream, ctx, raf: 0 };
      studio.micLive = true;
      setMic("live");
      audio.current.raf = requestAnimationFrame(tick);
    } catch (err) {
      // NotAllowedError = refus de l'utilisateur ; autre erreur = pas de micro disponible.
      setMic(err instanceof DOMException && err.name === "NotAllowedError" ? "denied" : "unsupported");
    }
  }, []);

  // Ouverture / fermeture, que ce soit par la touche S, l'afficheur FM ou le bouton Quitter.
  useEffect(() => {
    const off = onStudioChange((active) => {
      setOpen(active);
      if (!active) stopMic();
    });
    return () => {
      off();
      stopMic();
      setStudioActive(false);
    };
  }, [stopMic]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && studio.active) {
        setStudioActive(false);
        return;
      }
      if (e.key.toLowerCase() !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
      // Ne pas détourner la touche S pendant qu'on écrit dans un champ.
      const target = e.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;
      setStudioActive(!studio.active);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) primaryButton.current?.focus();
  }, [open]);

  const status: Record<MicState, string> = {
    off: "Parle, chante ou mets de la musique : l'onde suivra le son.",
    asking: "Autorise le micro dans la fenêtre de ton navigateur…",
    live: "En direct — l'onde suit le son.",
    denied: "Micro refusé. Tu peux l'autoriser dans les réglages du navigateur.",
    unsupported: "Aucun micro disponible sur cet appareil.",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Mode studio"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[min(92vw,440px)] glass-card border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">
              <span className={`h-2 w-2 rounded-full ${mic === "live" ? "bg-red-500 animate-pulse" : "bg-gray-600"}`} />
              Studio {mic === "live" && <span className="text-red-400">· On air</span>}
            </p>
            <button
              type="button"
              onClick={() => setStudioActive(false)}
              className="btn-fx text-xs text-gray-400 hover:text-white border border-white/15 hover:border-white/40 rounded-lg px-3 py-1.5"
            >
              Quitter <span className="hidden sm:inline text-gray-600">(Échap)</span>
            </button>
          </div>

          {/* Vumètre : une barre par bande de fréquence, comme sur une table de mixage */}
          <div aria-hidden className="flex items-end gap-1.5 h-14 mb-4">
            {Array.from({ length: BAND_COUNT }, (_, i) => (
              <span key={i} className="flex-1 h-full rounded-sm bg-white/[0.04] overflow-hidden flex items-end">
                <span
                  ref={(el) => {
                    meterRefs.current[i] = el;
                  }}
                  className="block w-full h-full origin-bottom rounded-sm bg-gradient-to-t from-blue-500 via-purple-400 to-fuchsia-300 transition-transform duration-75"
                  style={{ transform: "scaleY(0.04)" }}
                />
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-300 mb-1" aria-live="polite">
            {status[mic]}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Le son reste sur ton appareil : rien n&apos;est enregistré ni envoyé.
          </p>

          {mic === "live" ? (
            <button
              ref={primaryButton}
              type="button"
              onClick={stopMic}
              className="btn-fx w-full border border-white/20 hover:border-white/40 text-gray-200 rounded-xl py-3 text-sm font-medium"
            >
              Couper le micro
            </button>
          ) : (
            <button
              ref={primaryButton}
              type="button"
              onClick={startMic}
              disabled={mic === "asking" || mic === "unsupported"}
              className="btn-fx w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-semibold"
            >
              {mic === "denied" ? "Réessayer le micro" : "Activer le micro"}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
