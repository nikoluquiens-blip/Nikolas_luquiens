import type { Metadata } from "next";
import QuizGame from "../components/QuizGame";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";

export const metadata: Metadata = {
  title: "Quiz — Informatique ou Médiamatique ?",
  description: "Découvre quel CFC te correspond le mieux : Informatique ou Médiamatique ? 6 questions, résultat instantané.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="relative px-8 md:px-16 pt-20 pb-16 border-b border-white/5 overflow-hidden">
        {/* Background bloom */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-blue-600/8 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-600 text-sm uppercase tracking-widest">Quiz</span>
            <span className="text-white/15">·</span>
            <span className="text-xs text-violet-400 border border-violet-500/30 rounded-full px-2.5 py-0.5">6 questions · ~2 min</span>
          </div>
        </Reveal>

        <h1 className="text-5xl md:text-6xl font-bold max-w-2xl leading-tight">
          <SplitText text="Informatique ou Médiamatique ?" highlight="Médiamatique" delay={0.08} />
        </h1>

        <Reveal delay={0.25}>
          <p className="text-gray-400 mt-5 text-lg max-w-xl leading-relaxed">
            Tu hésites entre les deux filières — ou tu veux juste savoir ce qui te correspond ?
            Réponds à 6 questions et découvre ton profil.
          </p>
        </Reveal>

        {/* Track pills */}
        <Reveal delay={0.35}>
          <div className="flex gap-3 mt-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 border border-blue-500/30 rounded-full px-4 py-1.5 bg-blue-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> CFC Informatique
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-purple-400 border border-purple-500/30 rounded-full px-4 py-1.5 bg-purple-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> CFC Médiamatique
            </span>
          </div>
        </Reveal>
      </section>

      {/* Quiz */}
      <section className="px-8 md:px-16 py-20 flex justify-center">
        <QuizGame />
      </section>
    </div>
  );
}
