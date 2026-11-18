"use client";
import { useEffect, useRef } from "react";

/**
 * Fond de l'accueil : un signal radio.
 * Clin d'œil au point de départ de Nikolas (l'envie de faire de la radio) :
 * au chargement, une ligne plate se trace puis « s'allume » en onde ;
 * la souris joue le rôle du bouton de réglage — l'onde s'amplifie sous le
 * curseur et l'afficheur FM suit sa position.
 *
 * Dessiné en canvas (pas en DOM) : ~1500 points recalculés à chaque image,
 * impossible à animer proprement avec des éléments HTML/SVG.
 */

const LINES = 6;
const STEP = 4; // px entre deux points : assez fin pour une courbe lisse, assez large pour rester léger
const FM_MIN = 87.5;
const FM_MAX = 108;

const BLUE = [96, 165, 250];
const PURPLE = [167, 139, 250];

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

export default function SignalWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    const start = performance.now();

    // Position du « bouton de réglage » (0 → 1), lissée pour un mouvement souple.
    let target = 0.5;
    let tuner = 0.5;
    let boost = 0; // amplification sous le curseur, retombe quand la souris s'arrête
    let lastPointer = -Infinity;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onPointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      target = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      lastPointer = performance.now();
    }

    function draw(now: number) {
      if (!ctx) return;
      const t = (now - start) / 1000;

      // Séquence d'allumage : la ligne se trace (0.3 → 1.2 s), puis l'onde monte (1.0 → 2.6 s).
      const trace = reduceMotion ? 1 : easeOutCubic((t - 0.3) / 0.9);
      const power = reduceMotion ? 1 : easeOutCubic((t - 1.0) / 1.6);

      // Sans souris (mobile, ou souris immobile), le réglage balaie lentement tout seul.
      const idle = now - lastPointer > 2500;
      if (idle && !reduceMotion) target = 0.5 + Math.sin(t * 0.25) * 0.32;
      tuner += (target - tuner) * 0.06;
      boost += ((idle ? 0.35 : 1) - boost) * 0.04;

      if (readoutRef.current) {
        readoutRef.current.textContent = (FM_MIN + tuner * (FM_MAX - FM_MIN)).toFixed(1);
      }

      ctx.clearRect(0, 0, width, height);
      const baseY = height * (width < 768 ? 0.78 : 0.62);
      const maxAmp = Math.min(height * 0.11, 90);
      const tunerX = tuner * width;
      const sigma = Math.max(width * 0.12, 120);
      const end = width * trace;

      for (let l = 0; l < LINES; l++) {
        const k = l / (LINES - 1);
        const phase = l * 0.9;
        const [r, g, b] = mix(BLUE, PURPLE, k);
        // La ligne centrale est la plus nette ; les autres forment l'« écho ».
        const centre = 1 - Math.abs(k - 0.5) * 2;
        const alpha = 0.1 + centre * 0.32;

        ctx.beginPath();
        for (let x = 0; x <= end; x += STEP) {
          const u = x / width;
          // Enveloppe : nulle sur les bords, comme une forme d'onde audio.
          const envelope = Math.pow(Math.sin(Math.PI * u), 1.4);
          const dx = x - tunerX;
          const focus = 1 + 1.6 * boost * Math.exp(-(dx * dx) / (2 * sigma * sigma));
          const wave =
            Math.sin(x * 0.011 + t * 1.3 + phase) * 0.6 +
            Math.sin(x * 0.027 - t * 2.1 + phase * 1.7) * 0.3 +
            Math.sin(x * 0.053 + t * 3.4 + phase * 0.5) * 0.1;
          const y = baseY + wave * maxAmp * envelope * focus * power * (0.45 + centre * 0.55);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Sur grand écran, le texte occupe la moitié gauche : l'onde s'y efface
        // pour ne jamais gêner la lecture, et prend toute sa force côté photo.
        const stroke = ctx.createLinearGradient(0, 0, width, 0);
        const textSide = width >= 1024 ? 0.12 : 1;
        for (const u of [0, 0.3, 0.45, 0.6, 1]) {
          const a = alpha * (textSide + (1 - textSide) * smoothstep(0.3, 0.6, u));
          stroke.addColorStop(u, `rgba(${r},${g},${b},${a})`);
        }
        ctx.strokeStyle = stroke;
        ctx.lineWidth = l === Math.floor(LINES / 2) ? 1.6 : 1;
        ctx.stroke();
      }

      // Tête de lecture pendant le tracé initial.
      if (trace > 0 && trace < 1) {
        ctx.fillStyle = "rgba(196,181,253,0.9)";
        ctx.beginPath();
        ctx.arc(end, baseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Aiguille du tuner.
      if (power > 0) {
        const grad = ctx.createLinearGradient(0, baseY - maxAmp * 2.4, 0, baseY + maxAmp * 2.4);
        grad.addColorStop(0, "rgba(167,139,250,0)");
        grad.addColorStop(0.5, `rgba(167,139,250,${0.35 * power})`);
        grad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(tunerX - 0.5, baseY - maxAmp * 2.4, 1, maxAmp * 4.8);
      }
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function play() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function pause() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(canvas);

    // Économie de batterie : rien n'est calculé quand l'accueil n'est pas à l'écran.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (reduceMotion) draw(performance.now());

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        aria-hidden
        className="absolute bottom-10 left-8 md:left-16 z-10 hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gray-500 pointer-events-none"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-400" />
        </span>
        FM <span ref={readoutRef} className="text-purple-300 tabular-nums w-[3.2em] text-right">97.8</span> MHz
      </div>
    </>
  );
}
