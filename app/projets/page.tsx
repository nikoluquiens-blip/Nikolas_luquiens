import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import BrowserMockup from "../components/BrowserMockup";
import ClipReveal from "../components/ClipReveal";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets et expériences pratiques de Nikolas Luquiens en informatique et en médiamatique.",
};

const projects = [
  {
    title: "Capy Hockey (CPHL)",
    desc: "Un jeu vidéo de hockey complet développé en JavaScript avec Claude Code : moteur physique, IA, plusieurs modes (carrière, franchise, multijoueur). Je prépare aussi son identité visuelle et ses textes marketing pour un lancement sur itch.io et Steam.",
    tags: ["JavaScript", "Claude Code", "Vercel", "Identité visuelle"],
    status: "En cours",
    link: null,
    external: false,
    track: "both",
  },
  {
    title: "Communication & identité visuelle — équipe de hockey",
    desc: "Gestion et animation du compte Instagram de mon équipe (photos, stories, publications après les matchs) et création du logo et des visuels de l'équipe avec Canva. Saison 2025-2026.",
    tags: ["Canva", "Réseaux sociaux", "Identité visuelle"],
    status: "En cours",
    link: null,
    external: false,
    track: "media",
  },
  {
    title: "Portfolio Personnel",
    desc: "Mon site portfolio, conçu avec Claude Code sur Next.js 15, TypeScript et Tailwind CSS. Animations avec Motion (Framer Motion v12), SEO optimisé.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    status: "En cours",
    link: "/",
    external: false,
    track: "info",
  },
  {
    title: "Exposé — Les quatre langues de la Suisse",
    desc: "Présentation réalisée en duo pour le cours de Tronc Spécifique Histoire : origines, répartition par cantons et particularités des quatre langues nationales suisses.",
    tags: ["Recherche", "Canva", "Présentation orale"],
    status: "Terminé",
    link: null,
    external: false,
    track: "media",
  },
  {
    title: "Journée découverte — Rouge FM",
    desc: "Une journée immergé dans une radio locale pour découvrir les métiers de la radio et de la production média, en lien direct avec mon projet médiamaticien.",
    tags: ["Radio", "Découverte métier"],
    status: "Terminé",
    link: null,
    external: false,
    track: "media",
  },
];

export default function Projets() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Projets</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Mes réalisations" highlight="réalisations" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Projets réalisés dans le cadre de mon apprentissage, de mon stage et de mes cours — en informatique
            comme en médiamatique. D&apos;autres arrivent bientôt.
          </p>
        </Reveal>
      </section>

      {/* Featured project — Hockey Planning */}
      <section className="px-8 md:px-16 pt-16 pb-8 border-b border-white/5">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 bg-blue-500/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Projet phare · Stage chez Stormbolt
          </span>
        </Reveal>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-5xl items-start mt-4">
          <div className="flex-1 min-w-0 space-y-5">
            <ClipReveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">GoalieCoach</h2>
            </ClipReveal>
            <Reveal delay={0.1}>
              <p className="text-gray-400 leading-relaxed">
                Application de planification d&apos;entraînements pour les jeunes gardiens (mini-goalies)
                que je coache, conçue avec Claude Code pendant mon stage chez Stormbolt — mon premier projet
                web complet, de l&apos;idée au déploiement sur Vercel.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "Tailwind CSS", "Vercel", "TypeScript"].map((tag) => (
                  <span key={tag} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3">
                {[
                  "Calendrier de disponibilité interactif par joueur",
                  "Vue semaine avec récapitulatif des joueurs disponibles",
                  "Déploiement continu via Vercel + GitHub",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                href="https://hockey-planning.vercel.app/planning"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="Voir"
                className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Voir le projet live
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </Reveal>
          </div>
          <div className="w-full lg:w-[52%] flex-shrink-0">
            <BrowserMockup />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-8 md:px-16 py-16">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Autres réalisations</p>
        </ClipReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {projects.map((p, i) => {
            const isMedia = p.track === "media";
            const isBoth = p.track === "both";
            const hoverBorder = isBoth
              ? "hover:border-violet-500/40 hover:shadow-violet-500/10"
              : isMedia
              ? "hover:border-purple-500/40 hover:shadow-purple-500/10"
              : "hover:border-blue-500/40 hover:shadow-blue-500/10";
            const tagText = isBoth ? "Informatique + Médiamatique" : isMedia ? "Médiamatique" : "Informatique";
            const tagColor = isBoth
              ? "border-violet-500/30 text-violet-400"
              : isMedia
              ? "border-purple-500/30 text-purple-400"
              : "border-blue-500/30 text-blue-400";
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className={`glass-card border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${hoverBorder} flex flex-col gap-4 h-full`}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap flex-shrink-0 ${
                        p.status === "En cours" || p.status === "En ligne"
                          ? "border-green-500/30 text-green-400"
                          : "border-white/10 text-gray-500"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 w-fit ${tagColor}`}>{tagText}</span>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {p.link && (
                      p.external ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-text="Voir"
                          className={`group inline-flex items-center gap-2 text-sm transition-colors mt-1 ${isMedia ? "text-purple-400 hover:text-purple-300" : isBoth ? "text-violet-400 hover:text-violet-300" : "text-blue-400 hover:text-blue-300"}`}
                        >
                          Voir le projet <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      ) : (
                        <Link
                          href={p.link}
                          className={`group inline-flex items-center gap-2 text-sm transition-colors mt-1 ${isMedia ? "text-purple-400 hover:text-purple-300" : isBoth ? "text-violet-400 hover:text-violet-300" : "text-blue-400 hover:text-blue-300"}`}
                        >
                          Voir le projet <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      )
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

    </div>
  );
}
