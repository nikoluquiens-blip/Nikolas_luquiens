import type { ReactNode } from "react";

/**
 * Bloc de contenu réutilisé par les pages "Mentions légales" et
 * "Confidentialité" — factorisé ici pour garder les deux pages visuellement
 * cohérentes si le contenu légal est mis à jour plus tard.
 */
export default function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
