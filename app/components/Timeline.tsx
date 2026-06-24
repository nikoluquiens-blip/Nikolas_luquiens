"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal from "./Reveal";

const milestones = [
  {
    tag: "Le déclic",
    title: "La découverte du développement web",
    desc: "Mon père travaille dans le développement web, avec WordPress. Le voir construire des sites et résoudre des problèmes techniques a éveillé ma curiosité très tôt.",
    dot: "bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.6)]",
    label: "text-blue-400",
  },
  {
    tag: "Direction radio",
    title: "L'envie de faire de la radio",
    desc: "En grandissant, c'est la radio qui m'attirait le plus. On m'a expliqué que ce métier portait un nom — médiamaticien — et je me suis dirigé vers cette voie.",
    dot: "bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]",
    label: "text-purple-400",
  },
  {
    tag: "Le tournant",
    title: "Un stage qui change tout",
    desc: "J'ai fait un stage en informatique sans penser que ça changerait mon projet. Mais ce stage m'a donné un vrai coup de cœur pour le développement, que je n'attendais pas du tout.",
    dot: "bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.6)]",
    label: "text-blue-400",
  },
  {
    tag: "Aujourd'hui",
    title: "Deux voies, un seul objectif",
    desc: "Je ne veux plus choisir entre les deux : je me prépare maintenant pour deux CFC, informaticien et médiamaticien.",
    dot: "bg-gradient-to-br from-blue-400 to-purple-400 shadow-[0_0_14px_3px_rgba(139,92,246,0.7)]",
    label: "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
  },
  {
    tag: "Rentrée 2027",
    title: "L'objectif",
    desc: "Décrocher un contrat d'apprentissage — dans l'une de ces deux voies, ou pourquoi pas les deux — pour continuer à apprendre sur le terrain.",
    dot: "bg-gradient-to-br from-blue-400 to-purple-400 shadow-[0_0_14px_3px_rgba(139,92,246,0.7)]",
    label: "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative pl-10 max-w-2xl">
      {/* Track line */}
      <div className="absolute left-2 top-1 bottom-1 w-px bg-white/8" />
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-blue-400 via-purple-400 to-blue-500 origin-top"
      />

      <div className="flex flex-col gap-10">
        {milestones.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08}>
            <div className="relative">
              <span className={`absolute -left-9 top-1.5 w-3 h-3 rounded-full ${m.dot}`} />
              <p className={`text-xs uppercase tracking-widest mb-1 font-medium ${m.label}`}>
                {m.tag}
              </p>
              <h3 className="text-white font-semibold text-lg mb-2">{m.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
