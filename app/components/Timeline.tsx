"use client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Reveal from "./Reveal";

const milestones = [
  {
    tag: "Le déclic",
    title: "La découverte du web",
    desc: "Mon père travaille dans le développement web, avec WordPress. Le voir construire des sites et raconter des histoires en ligne a éveillé très tôt ma curiosité pour le digital.",
    dot: "bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]",
    label: "text-purple-400",
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
    title: "Un stage qui m'a beaucoup appris",
    desc: "Stage chez Stormbolt, où j'ai conçu GoalieCoach avec Claude Code — une app de planification d'entraînements pour les jeunes gardiens que je coache. Une vraie expérience de terrain, qui nourrit aussi ma curiosité pour le digital.",
    dot: "bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]",
    label: "text-purple-400",
  },
  {
    tag: "Depuis juillet 2026",
    title: "Capy Hockey, mon premier projet créatif complet",
    desc: "Je pilote avec Claude Code le développement d'un jeu de hockey complet, et je conçois son identité visuelle et ses textes marketing pour un lancement sur itch.io et Steam.",
    dot: "bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]",
    label: "text-purple-400",
  },
  {
    tag: "Aujourd'hui",
    title: "Un objectif clair",
    desc: "Entre la radio, la création de contenu et la communication digitale, je vise deux métiers proches : médiamaticien ou interactive media designer.",
    dot: "bg-gradient-to-br from-purple-400 to-fuchsia-400 shadow-[0_0_14px_3px_rgba(168,85,247,0.7)]",
    label: "bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent",
  },
  {
    tag: "Rentrée 2027",
    title: "L'objectif",
    desc: "Décrocher un contrat d'apprentissage de médiamaticien ou d'interactive media designer pour continuer à apprendre sur le terrain.",
    dot: "bg-gradient-to-br from-purple-400 to-fuchsia-400 shadow-[0_0_14px_3px_rgba(168,85,247,0.7)]",
    label: "bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  // Le parcours se lit comme une histoire : l'étape atteinte par la ligne de
  // progression est mise en avant, les suivantes restent en retrait.
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(milestones.length - 1, Math.max(0, Math.round(p * (milestones.length - 1)))));
  });

  return (
    <div ref={ref} className="relative pl-10 max-w-2xl">
      {/* Track line */}
      <div className="absolute left-2 top-1 bottom-1 w-px bg-white/8" />
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-purple-400 via-fuchsia-400 to-purple-500 origin-top"
      />

      <div className="flex flex-col gap-10">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1;
          return (
            <Reveal key={m.title} delay={i * 0.08}>
              <motion.div
                className="relative"
                animate={{ opacity: i === active ? 1 : i < active ? 0.55 : 0.3, x: i === active ? 8 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Dot : allumé une fois atteint par la ligne */}
                <motion.span
                  animate={{ scale: i === active ? 1.35 : 1, opacity: i <= active ? 1 : 0.35 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`absolute -left-9 top-1.5 w-3 h-3 rounded-full ${m.dot}`}
                />
                {isLast && (
                  <motion.span
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className={`absolute -left-9 top-1.5 w-3 h-3 rounded-full ${m.dot}`}
                  />
                )}
                {/* Déclencheur sur le conteneur visible, pas sur le texte masqué */}
                <motion.div className="overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.p
                    variants={{ hidden: { y: "100%" }, visible: { y: "0%" } }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: i * 0.08 }}
                    className={`text-xs uppercase tracking-widest mb-1 font-medium ${m.label}`}
                  >
                    {m.tag}
                  </motion.p>
                </motion.div>
                <h3 className="text-white font-semibold text-lg mb-2">{m.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{m.desc}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
