import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import TiltCard from "../components/TiltCard";
import { posts as publishedPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Réflexions de Nikolas Luquiens sur son apprentissage en médiamatique.",
};

const upcoming = [
  {
    date: "Bientôt",
    title: "Mon premier projet Next.js : ce que j'ai appris",
    excerpt:
      "Retour d'expérience sur la création de ce portfolio — les galères, les découvertes, et ce que je ferais différemment aujourd'hui.",
    readTime: "5 min",
    slug: null,
  },
  {
    date: "Bientôt",
    title: "Hockey sur glace et développement web : les points communs",
    excerpt:
      "Persévérance, esprit d'équipe, rigueur... Le hockey m'a appris des choses que je retrouve chaque jour dans le code.",
    readTime: "4 min",
    slug: null,
  },
  {
    date: "Bientôt",
    title: "Ce que Canva m'a appris sur la création de contenu",
    excerpt:
      "Retour sur mes présentations scolaires et ce qu'elles m'ont enseigné sur le design et la communication visuelle.",
    readTime: "3 min",
    slug: null,
  },
];

const posts = [
  ...publishedPosts.map((p) => ({
    date: p.date,
    title: p.title,
    excerpt: p.excerpt,
    readTime: p.readTime,
    slug: p.slug,
  })),
  ...upcoming,
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Reveal>
          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">Blog</p>
        </Reveal>
        <h1 className="text-5xl md:text-6xl font-bold">
          <SplitText text="Mes articles" highlight="articles" delay={0.1} />
        </h1>
        <Reveal delay={0.2}>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Réflexions sur mon apprentissage, mes projets, et mes deux passions : le développement web
            et la médiamatique.
          </p>
        </Reveal>
      </section>

      {/* Posts */}
      <section className="px-8 md:px-16 py-16">
        <div className="flex flex-col gap-6 max-w-3xl">
          {posts.map((post, i) => {
            const card = (
              <div
                className={`border rounded-2xl p-8 transition-all duration-300 h-full ${
                  post.slug
                    ? "glass-card border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                    : "border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-500 text-xs">{post.date}</span>
                  <span className="text-gray-600 text-xs">·</span>
                  <span className="text-gray-500 text-xs">{post.readTime} de lecture</span>
                  {!post.slug && (
                    <span className="text-xs border border-white/10 text-gray-600 px-2 py-0.5 rounded-full">
                      À venir
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                {post.slug && (
                  <span className="group inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors mt-4">
                    Lire l&apos;article <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </div>
            );

            return (
              <Reveal key={i} delay={i * 0.1}>
                {post.slug ? (
                  <TiltCard>
                    <Link href={`/blog/${post.slug}`} data-cursor-text="Lire">
                      {card}
                    </Link>
                  </TiltCard>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
