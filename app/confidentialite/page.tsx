import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import LegalSection from "../components/LegalSection";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité du portfolio de Nikolas Luquiens : données collectées, finalités et droits.",
};

const LAST_UPDATED = "5 août 2026";
const EMAIL = "niko.luquiens@icloud.com";

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Vie privée</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Politique de confidentialité" highlight="confidentialité" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-500 mt-4 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
        </Reveal>
      </section>

      {/* Contenu */}
      <section className="px-8 md:px-16 py-16 max-w-3xl space-y-10">
        <Reveal>
          <LegalSection title="Responsable du traitement">
            <p>
              Nikolas Luquiens, éditeur de ce site personnel, est responsable des données décrites
              ci-dessous. Pour toute question, écris à{" "}
              <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalSection title="Données collectées">
            <p>
              <span className="text-gray-300 font-medium">Formulaire de contact</span> — nom,
              email, entreprise (facultatif) et message que tu saisis volontairement pour être
              recontacté.
            </p>
            <p>
              <span className="text-gray-300 font-medium">Journaux techniques</span> — lors de
              l&apos;envoi du formulaire, l&apos;adresse IP et l&apos;horodatage de la requête sont
              enregistrés côté serveur, uniquement à des fins de sécurité (détection d&apos;abus ou
              de spam).
            </p>
            <p>
              <span className="text-gray-300 font-medium">Navigation</span> — aucun cookie de
              suivi ni outil d&apos;analytics n&apos;est utilisé sur ce site. Le navigateur retient
              localement, via <code className="text-gray-300">sessionStorage</code>, le fait que
              l&apos;animation d&apos;introduction a déjà été vue durant l&apos;onglet en cours ;
              cette information n&apos;est jamais transmise et disparaît à la fermeture de
              l&apos;onglet.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.1}>
          <LegalSection title="Finalités">
            <p>
              Les données du formulaire servent uniquement à répondre à ta demande de contact. Les
              journaux techniques servent uniquement à repérer un usage abusif du formulaire
              (spam, tentative d&apos;intrusion).
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.15}>
          <LegalSection title="Sous-traitants et destinataires">
            <p>
              L&apos;envoi du formulaire est délégué à{" "}
              <a
                href="https://web3forms.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Web3Forms
              </a>
              , un service tiers qui relaie le message par email — la clé d&apos;accès à ce service
              n&apos;est jamais exposée dans le navigateur, elle reste sur le serveur. Le site est
              hébergé par{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Vercel
              </a>
              , qui traite les requêtes techniques nécessaires au fonctionnement du site.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.2}>
          <LegalSection title="Durée de conservation">
            <p>
              Les messages reçus sont conservés dans la messagerie personnelle de Nikolas le temps
              nécessaire pour traiter la demande, puis supprimés. Les journaux techniques
              (IP/horodatage) suivent la durée de rétention standard de l&apos;hébergeur et ne sont
              consultés qu&apos;en cas de suspicion d&apos;abus.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.25}>
          <LegalSection title="Transferts hors Suisse">
            <p>
              Web3Forms et Vercel opèrent notamment depuis les États-Unis. Ces transferts sont
              encadrés par les garanties contractuelles propres à chaque prestataire ; aucune
              donnée n&apos;est vendue ni partagée à des fins publicitaires.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.3}>
          <LegalSection title="Tes droits">
            <p>
              Conformément à la législation suisse sur la protection des données (LPD), tu peux
              demander l&apos;accès, la rectification ou la suppression de tes données en écrivant
              à{" "}
              <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                {EMAIL}
              </a>
              . Une réponse te sera apportée dans un délai raisonnable.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.35}>
          <LegalSection title="Sécurité">
            <p>
              Le site est servi en HTTPS et le formulaire de contact passe par une route serveur
              dédiée : la clé du prestataire d&apos;envoi n&apos;est jamais incluse dans le code
              envoyé au navigateur.
            </p>
          </LegalSection>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-gray-400 text-xs pt-4 border-t border-white/5">
            Cette politique peut évoluer ; la date de dernière mise à jour en haut de page fait foi.
            Voir aussi les{" "}
            <Link href="/mentions-legales" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
              mentions légales
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}
