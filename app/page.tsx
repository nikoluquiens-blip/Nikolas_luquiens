"use client";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Reveal from "./components/Reveal";
import HeroPhoto from "./components/HeroPhoto";
import HeroTitle from "./components/HeroTitle";
import CursorGlow from "./components/CursorGlow";
import MagneticButton from "./components/MagneticButton";
import AnimatedNumber from "./components/AnimatedNumber";
import ParticleField from "./components/ParticleField";
import ConfettiButton from "./components/ConfettiButton";
import QuoteSection from "./components/QuoteSection";
import ScrollVelocity from "./components/ScrollVelocity";
import SpotlightCard from "./components/SpotlightCard";
import TiltCard from "./components/TiltCard";
import ClipReveal from "./components/ClipReveal";
import BrowserMockup from "./components/BrowserMockup";
import { posts } from "./blog/posts";

const mediaServices = [
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
      </svg>
    ),
    title: "Présentation & prise de parole",
    desc: "À l'aise pour préparer et présenter un sujet devant un public, comme lors de mes exposés scolaires.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 13l2.5-3 2 2L16 8l2 3M9 9a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    title: "Création de contenu",
    desc: "Conception de supports visuels avec Canva : présentations, visuels et mise en forme soignée.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Recherche & rédaction",
    desc: "Recherche d'informations fiables et rédaction claire et structurée pour transmettre un message.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h9a4 4 0 014 4v14M17 21H7M21 11h-4a2 2 0 01-2-2V3" />
      </svg>
    ),
    title: "Identité visuelle",
    desc: "Création de logos et de chartes graphiques cohérentes, pensés pour une marque ou une équipe.",
  },
];

const stats = [
  { value: 15, suffix: "", label: "ans", sub: "Passionné depuis toujours", accent: "from-white to-blue-200" },
  { value: 2027, suffix: "", label: "rentrée visée", sub: "CFC médiamatique", accent: "from-blue-300 to-sky-400" },
  { value: 1, suffix: "", label: "stage effectué", sub: "En développement web", accent: "from-white to-gray-300" },
  { value: 100, suffix: "%", label: "motivé", sub: "Les deux voies, une ambition", accent: "from-blue-400 to-purple-400" },
];

export default function WelcomePage() {
  const { scrollY } = useScroll();

  const nikoY = useSpring(useTransform(scrollY, [0, 600], [0, -120]), { stiffness: 80, damping: 20 });
  const nikoOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroContentY = useSpring(useTransform(scrollY, [0, 500], [0, -60]), { stiffness: 80, damping: 20 });
  const heroContentOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* ── Hero ── */}
      <CursorGlow
        className="relative flex flex-col md:flex-row md:items-center min-h-screen px-8 md:px-16 overflow-hidden"
      >
        <ParticleField count={32} />
        <div className="grid-floor" aria-hidden />
        <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_220px_80px_rgba(0,0,0,0.65)]" />

        {/* Animated ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-600/18 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/14 rounded-full blur-[90px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/8 rounded-full blur-[80px]"
          />
        </div>

        {/* NIKO watermark with parallax */}
        <motion.div
          style={{ y: nikoY, opacity: nikoOpacity }}
          className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none 
          "
        >
          <span
            className="font-black text-white/[0.022] leading-none tracking-tighter"
            style={{ fontSize: "clamp(5rem, 24vw, 28rem)", paddingRight: "2rem" }}
          >
            NIKO
          </span>
        </motion.div>

        {/* Hero content with scroll fade */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-10 max-w-xl pb-16 md:pb-0 mt-8 md:mt-0"
        >
          <HeroTitle />

          <Reveal delay={0.4}>
            <div className="flex items-center gap-8 mt-10">
              {/* Spinning orbit badge — Motion-controlled, readable */}
              <div className="relative w-[108px] h-[108px] flex-shrink-0">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                >
                  <defs>
                    <path
                      id="orbitPath"
                      d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <text fontSize="10" fill="rgba(255,255,255,0.65)" letterSpacing="4">
                    <textPath href="#orbitPath">
                      REACT • NEXT.JS • TYPESCRIPT • CFC 2027 •
                    </textPath>
                  </text>
                </motion.svg>

                {/* Center glass button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full bg-blue-600/15 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-blue-500/10"
                  >
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Je conçois des projets web avec Claude Code depuis mes 14 ans. Passionné par les interfaces modernes — disponible pour un CFC dès 2027.
                </p>
                {/* Availability pill */}
                <div className="inline-flex items-center gap-2 self-start">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="text-green-400 text-xs font-medium">Disponible dès 2027</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <ConfettiButton
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/30 uppercase tracking-widest text-sm"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Me recruter</span> <span className="relative">→</span>
              </ConfettiButton>
              <MagneticButton
                href="/cv/nikolas-luquiens-cv-mediamaticien.pdf"
                download
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white px-6 py-4 rounded-xl transition-colors duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Télécharger mon CV
              </MagneticButton>
            </div>
            <a
              href="mailto:niko.luquiens@icloud.com"
              className="inline-flex items-center gap-2 mt-5 text-gray-600 hover:text-gray-400 transition-colors text-xs group"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:underline underline-offset-2">niko.luquiens@icloud.com</span>
            </a>
          </Reveal>
        </motion.div>

        <HeroPhoto />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-gray-600 text-[10px] uppercase tracking-[0.25em]">Défiler</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </CursorGlow>

      {/* ── Velocity marquee ── */}
      <ScrollVelocity />

      {/* ── Stats ── */}
      <section className="px-8 md:px-16 py-20 border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <div className="glass-card border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors duration-500 group h-full">
                  <p className={`text-5xl md:text-6xl font-black bg-gradient-to-br ${s.accent} bg-clip-text text-transparent leading-none`}>
                    <AnimatedNumber value={s.value} />
                    {s.suffix}
                  </p>
                  <p className="text-white/80 text-sm font-medium mt-3">{s.label}</p>
                  <p className="text-gray-600 text-xs mt-1 leading-tight">{s.sub}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section className="px-8 md:px-16 py-20 border-b border-white/5">
        <Reveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Projet phare</p>
        </Reveal>
        <ClipReveal delay={0.05} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Des projets en <span className="text-blue-400">production</span>
          </h2>
        </ClipReveal>
        <Reveal delay={0.1}>
          <TiltCard>
            <div className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/25 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_55%] gap-10 items-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    <span className="text-green-400 text-xs font-medium">En ligne · Vercel</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">GoalieCoach</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Application de planification d&apos;entraînements pour les jeunes gardiens que je coache,
                    conçue avec Claude Code pendant mon stage chez Stormbolt — de l&apos;idée à la production.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Claude Code", "Vercel", "Déploiement continu"].map((tag) => (
                      <span key={tag} className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 bg-blue-500/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://hockey-planning.vercel.app/planning"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-text="Voir"
                      className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Voir le projet live
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                    <Link href="/projets" className="text-gray-500 hover:text-gray-300 text-sm transition-colors group flex items-center gap-1">
                      Tous les projets <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                  </div>
                </div>
                <BrowserMockup />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* ── Quote ── */}
      <QuoteSection />

      {/* ── Services ── */}
      <section className="px-8 md:px-16 py-24">
        <Reveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Ce que je peux apporter</p>
        </Reveal>
        <ClipReveal delay={0.05} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Une seule voie, <span className="text-purple-400">une vraie envie d&apos;apprendre</span>
          </h2>
        </ClipReveal>

        <Reveal delay={0.1}>
          <p className="text-purple-400 text-xs uppercase tracking-widest mb-6">Médiamatique</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {mediaServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <SpotlightCard spotColor="rgba(168,85,247,0.16)" className="h-full">
                <div className="group glass-card border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 h-full">
                  <div className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 inline-block">{s.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="px-8 md:px-16 py-20 border-t border-white/5">
        <Reveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Ce qui me caractérise</p>
        </Reveal>
        <ClipReveal delay={0.05} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pourquoi me <span className="text-blue-400">choisir</span> ?
          </h2>
        </ClipReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
          {[
            {
              emoji: "🏒",
              title: "Esprit d'équipe",
              desc: "Le hockey sur glace m'a appris que les meilleurs résultats viennent d'un groupe soudé. Je m'intègre vite et je donne le meilleur pour l'équipe.",
            },
            {
              emoji: "🔥",
              title: "Persévérance",
              desc: "Préparer un CFC exigeant demande de la rigueur. J'aime les défis difficiles — c'est là que j'apprends le plus vite.",
            },
            {
              emoji: "🌱",
              title: "Curiosité naturelle",
              desc: "De WordPress avec mon père à React et Next.js, j'ai toujours cherché à comprendre comment les choses fonctionnent. Je ne m'arrête pas à la surface.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col gap-4">
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className="text-4xl inline-block"
                  >
                    {v.emoji}
                  </motion.span>
                  <h3 className="text-xl font-semibold">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Blog preview ── */}
      <section className="px-8 md:px-16 py-20 border-t border-white/5">
        <div className="flex items-end justify-between mb-12 max-w-5xl">
          <div>
            <Reveal>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Blog</p>
            </Reveal>
            <ClipReveal>
              <h2 className="text-2xl md:text-3xl font-bold">
                Ce que j&apos;écris
              </h2>
            </ClipReveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/blog" className="text-blue-400 text-sm hover:text-blue-300 transition-colors group flex items-center gap-1">
              Tout voir <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <TiltCard className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor-text="Lire"
                  className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 block group h-full"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs text-gray-600 uppercase tracking-wider">{post.date}</span>
                    <span className="text-white/15">·</span>
                    <span className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-0.5">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-6 text-blue-400 text-sm font-medium">
                    Lire l&apos;article
                    <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
