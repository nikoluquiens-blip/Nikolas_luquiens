import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import SkillBar from "../components/SkillBar";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import ClipReveal from "../components/ClipReveal";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Compétences en médiamatique de Nikolas Luquiens.",
};

const skills = [
  {
    category: "Médiamatique & Communication",
    color: "purple" as const,
    items: [
      { name: "Présentation & prise de parole", level: 55 },
      { name: "Création de contenu (Canva)", level: 50 },
      { name: "Identité visuelle", level: 50 },
      { name: "Réseaux sociaux", level: 55 },
      { name: "Photo & vidéo", level: 45 },
      { name: "Recherche & rédaction", level: 60 },
    ],
  },
  {
    category: "Autres",
    items: [
      { name: "Figma / Design UI", level: 40 },
      { name: "Responsive Design", level: 60 },
      { name: "Déploiement Vercel", level: 45 },
    ],
  },
];

const softSkills = [
  { icon: "🎯", title: "Curieux", desc: "Toujours en train d'apprendre et d'explorer de nouvelles technologies." },
  { icon: "🤝", title: "Esprit d'équipe", desc: "Habitué au travail en équipe grâce au hockey sur glace." },
  { icon: "💪", title: "Persévérant", desc: "Je ne lâche pas tant que le problème n'est pas résolu." },
  { icon: "⚡", title: "Adaptable", desc: "Capable de m'adapter rapidement à de nouveaux outils et environnements." },
];

export default function Competences() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Compétences</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Ce que je sais faire" highlight="sais faire" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            En apprentissage constant. Ces compétences reflètent mon niveau actuel à 15 ans en médiamatique,
            avec encore beaucoup à découvrir.
          </p>
        </Reveal>
      </section>

      {/* Technical skills */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Compétences techniques</p>
        </ClipReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          {skills.map((group, gi) => {
            const isMedia = "color" in group && group.color === "purple";
            return (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className={`glass-card border rounded-2xl p-6 ${isMedia ? "border-purple-500/20" : "border-white/10"}`}>
                {isMedia && (
                  <span className="text-xs text-purple-400 uppercase tracking-widest mb-2 block">Médiamatique</span>
                )}
                <h3 className="text-white font-semibold mb-6">{group.category}</h3>
                <div className="flex flex-col gap-5">
                  {group.items.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={si * 0.08}
                      color={"color" in group ? group.color : "blue"}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* Outils */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Outils que j&apos;utilise</p>
        </ClipReveal>
        <Reveal>
          <div className="flex flex-wrap gap-3 max-w-4xl">
            {["Canva", "Claude Code", "VS Code", "GitHub", "Suite Office", "Écosystème Apple (Apple Creator Studio)"].map((tool) => (
              <span
                key={tool}
                className="text-sm border border-white/15 text-gray-300 rounded-full px-4 py-1.5 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Langues */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Langues</p>
        </ClipReveal>
        <Reveal>
          <div className="flex flex-wrap gap-3 max-w-4xl">
            {[
              { name: "Français", level: "Langue maternelle" },
              { name: "Hongrois", level: "Langue maternelle" },
              { name: "Anglais", level: "En apprentissage" },
              { name: "Allemand", level: "En apprentissage · niv. 2" },
            ].map((lang) => (
              <span
                key={lang.name}
                className="inline-flex items-center gap-2 text-sm border border-white/15 rounded-full pl-4 pr-3 py-1.5 font-medium text-gray-300"
              >
                {lang.name}
                <span className="text-xs text-gray-500 font-normal">{lang.level}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Soft skills */}
      <section className="px-8 md:px-16 py-16">
        <ClipReveal>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">Qualités personnelles</p>
        </ClipReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
          {softSkills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass-card border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 h-full">
                  <p className="text-3xl mb-4 transition-transform duration-300 hover:scale-125 inline-block">{s.icon}</p>
                  <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
