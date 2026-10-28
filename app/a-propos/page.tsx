import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import Timeline from "../components/Timeline";
import QuoteSection from "../components/QuoteSection";
import ClipReveal from "../components/ClipReveal";

export const metadata: Metadata = {
  title: "À propos",
  description: "Le parcours et les passions de Nikolas Luquiens, futur médiamaticien.",
};

export default function APropos() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-16 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">À propos</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Luquiens Nikolas" highlight="Nikolas" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg">15 ans · 11VG · Futur médiamaticien</p>
        </Reveal>

        {/* En bref chips */}
        <Reveal delay={0.35}>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "15 ans", icon: "🎂", color: "border-white/15 text-gray-300" },
              { label: "Suisse 🇨🇭", icon: null, color: "border-white/15 text-gray-300" },
              { label: "11VG", icon: "📚", color: "border-white/15 text-gray-300" },
              { label: "Création de contenu", icon: "✨", color: "border-purple-500/30 text-purple-400 bg-purple-500/5" },
              { label: "CFC Médiamatique", icon: null, color: "border-purple-500/30 text-purple-400 bg-purple-500/5" },
              { label: "Disponible 2027", icon: "✅", color: "border-green-500/30 text-green-400 bg-green-500/5" },
            ].map((chip) => (
              <span
                key={chip.label}
                className={`inline-flex items-center gap-1.5 text-sm border rounded-full px-4 py-1.5 font-medium ${chip.color}`}
              >
                {chip.icon && <span>{chip.icon}</span>}
                {chip.label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Mon histoire */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Mon parcours</p>
        </ClipReveal>
        <Timeline />
      </section>

      {/* Passions */}
      <section className="px-8 md:px-16 py-16">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Ce qui me passionne</p>
        </ClipReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">

          <Reveal delay={0}>
            <TiltCard className="h-full">
              <Link href="/hockey" data-cursor-text="Voir" className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 block group h-full">
                <div className="mb-5 flex items-center justify-between">
                  <svg className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Hockey sur glace</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Le sport est une partie essentielle de ma vie. Le hockey sur glace m&apos;apprend la
                  rigueur, l&apos;esprit d&apos;équipe et la persévérance — des valeurs que j&apos;applique
                  aussi dans mes projets.
                </p>
              </Link>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="h-full">
              <div className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 group h-full">
                <div className="mb-5">
                  <svg className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Nouvelles technologies</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Je me tiens constamment informé des dernières évolutions technologiques. Chaque
                  nouvelle avancée est pour moi une source d&apos;inspiration et de curiosité.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2}>
            <TiltCard className="h-full">
              <div className="glass-card border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 group h-full">
                <div className="mb-5">
                  <svg className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Médias & création</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Mon attrait pour les médias vient de mon envie initiale de travailler dans la radio.
                  C&apos;est ce qui m&apos;a fait découvrir le métier de médiamaticien — à la croisée
                  du digital et de la communication.
                </p>
              </div>
            </TiltCard>
          </Reveal>

        </div>
      </section>

      {/* Motto */}
      <QuoteSection />

    </div>
  );
}
