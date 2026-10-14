import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import LegalSection from "../components/LegalSection";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du portfolio de Nikolas Luquiens.",
};

const LAST_UPDATED = "5 août 2026";
const EMAIL = "niko.luquiens@icloud.com";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Informations légales</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Mentions légales" highlight="légales" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-500 mt-4 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
        </Reveal>
      </section>

      {/* Contenu */}
      <section className="px-8 md:px-16 py-16 max-w-3xl space-y-10">
        <Reveal>
          <LegalSection title="Éditeur du site">
            <p>
              Ce site est édité à titre personnel et non commercial par Nikolas Luquiens, domicilié
              en Suisse. Il s&apos;agit d&apos;un portfolio présentant un parcours scolaire et des
              projets de développement dans le cadre d&apos;une recherche de contrat
              d&apos;apprentissage — ce n&apos;est pas une activité professionnelle ou commerciale,
              et aucun numéro d&apos;immatriculation n&apos;est donc applicable.
            </p>
            <p>
              Contact :{" "}
              <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                {EMAIL}
              </a>
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalSection title="Hébergement">
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis —{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                vercel.com
              </a>
              .
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.1}>
          <LegalSection title="Propriété intellectuelle">
            <p>
              Les textes, le code source, les visuels et la mise en page de ce site sont la
              propriété de Nikolas Luquiens, sauf mention contraire. Les frameworks et
              bibliothèques utilisés (Next.js, React, Tailwind CSS, Motion…) restent régis par
              leurs licences open source respectives.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.15}>
          <LegalSection title="Liens vers d'autres sites">
            <p>
              Ce site peut renvoyer vers d&apos;autres projets réalisés par Nikolas Luquiens (par
              exemple des démonstrations en ligne). Ces sites tiers, lorsqu&apos;ils existent,
              restent soumis à leurs propres conditions et politiques.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.2}>
          <LegalSection title="Responsabilité">
            <p>
              Les informations présentées (parcours, compétences, projets) sont fournies à titre
              indicatif et mises à jour de façon régulière, sans garantie d&apos;exhaustivité
              permanente. En cas d&apos;erreur constatée, merci de signaler le problème à
              l&apos;adresse ci-dessus.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.25}>
          <LegalSection title="Droit applicable">
            <p>Le présent site et ses mentions légales sont soumis au droit suisse.</p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-gray-400 text-xs pt-4 border-t border-white/5">
            Voir aussi la{" "}
            <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
              politique de confidentialité
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}
