import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import TiltCard from "../components/TiltCard";
import CopyEmailButton from "../components/CopyEmailButton";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Nikolas Luquiens pour un contrat d'apprentissage en informatique ou en médiamatique — rentrée 2027.",
};

const EMAIL = "niko.luquiens@icloud.com";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Contact</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Parlons de votre projet" highlight="projet" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Je suis à la recherche d&apos;un contrat d&apos;apprentissage pour la rentrée 2027.
            N&apos;hésitez pas à me contacter, je réponds rapidement.
          </p>
        </Reveal>
      </section>

      {/* Form + sidebar */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 max-w-5xl">

          {/* Left — form */}
          <Reveal>
            <h2 className="text-lg font-semibold mb-7">Envoyer un message</h2>
            <ContactForm />
          </Reveal>

          {/* Right — info cards */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <TiltCard>
                <div className="glass-card border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Email direct</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">
                      Préfère l&apos;email ? Copie mon adresse.
                    </p>
                    <CopyEmailButton email={EMAIL} />
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.2}>
              <TiltCard>
                <div className="glass-card border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Disponibilité</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Disponible pour un entretien, une visite ou un café virtuel.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">Disponible pour 2027</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.3}>
              <TiltCard>
                <div className="glass-card border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Localisation</h3>
                    <p className="text-gray-500 text-xs">Suisse — détails sur demande.</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
