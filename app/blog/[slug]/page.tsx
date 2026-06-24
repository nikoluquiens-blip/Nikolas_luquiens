import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import SplitText from "../../components/SplitText";
import ConfettiButton from "../../components/ConfettiButton";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <section className="px-8 md:px-16 pt-20 pb-12 border-b border-white/5">
        <Link
          href="/blog"
          className="text-gray-500 text-sm hover:text-white transition-colors mb-6 inline-flex items-center gap-2 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Blog
        </Link>

        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500 text-xs">{post.date}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-gray-500 text-xs">{post.readTime} de lecture</span>
          </div>
        </Reveal>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
          <SplitText text={post.title} delay={0.1} />
        </h1>
      </section>

      {/* Content */}
      <section className="px-8 md:px-16 py-16 border-b border-white/5">
        <div className="max-w-2xl flex flex-col gap-12">
          {post.content.map((block, bi) => (
            <div key={bi}>
              {block.heading && (
                <Reveal delay={bi * 0.05}>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-4">{block.heading}</p>
                </Reveal>
              )}
              <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
                {block.paragraphs.map((para, pi) => (
                  <Reveal key={pi} delay={bi * 0.05 + pi * 0.05}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-16">
        <Reveal>
          <div className="glass-card border border-white/10 rounded-2xl p-10 max-w-2xl flex flex-col items-start gap-4">
            <h3 className="text-xl font-semibold">Cet article vous a plu ?</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Je suis à la recherche d&apos;un contrat d&apos;apprentissage en développement web pour la
              rentrée 2027. N&apos;hésitez pas à me contacter.
            </p>
            <ConfettiButton
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/30 uppercase tracking-widest text-sm"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <span className="relative">Me contacter</span> <span className="relative">→</span>
            </ConfettiButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
