import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { readContent } from "@/lib/store";
import type { BlogPost, SiteContent } from "@/lib/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import LikeButton from "@/components/blog/LikeButton";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { ChatbotFlow } from "@/lib/types";

export const revalidate = 0;

async function getPost(slug: string) {
  const posts = await readContent<BlogPost[]>("posts");
  return posts.find((p) => p.slug === slug && p.published);
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Publicación no encontrada" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 700 }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [site, allPosts, chatbot] = await Promise.all([
    readContent<SiteContent>("site"),
    readContent<BlogPost[]>("posts"),
    readContent<ChatbotFlow>("chatbot"),
  ]);

  const related = allPosts.filter((p) => p.published && p.id !== post.id).slice(0, 2);

  return (
    <>
      <Header whatsappNumber={site.contactInfo.whatsappNumber} />
      <main className="flex-1 bg-white">
        <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-navy-950">
          <Image src={post.image} alt={post.title} fill priority className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />
          <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-12 pt-32">
            <Link
              href="/#blog"
              className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al blog
            </Link>
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300">
              <Tag size={12} />
              {post.category}
            </span>
            <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {formatDate(post.date)}
              </span>
              <LikeButton postId={post.id} initialLikes={post.likes} />
            </div>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-16">
          <RevealOnScroll direction="up">
            <div className="flex flex-col gap-5 text-base leading-relaxed text-navy-800/90 sm:text-lg">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </RevealOnScroll>

          <div className="mt-12 rounded-3xl bg-navy-950 p-8 text-center text-white shadow-[var(--shadow-navy)]">
            <p className="font-display text-2xl">¿Necesitas asesoría sobre este tema?</p>
            <p className="mt-2 text-white/70">
              Agenda tu primera consulta gratuita con nuestro equipo especializado.
            </p>
            <Link
              href="/#contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-950"
            >
              Solicitar asesoría
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-cream px-6 pb-20">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-display text-2xl text-navy-900 mb-8">También te puede interesar</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                      <Image src={r.image} alt={r.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-display text-navy-900 group-hover:text-gold-600 transition-colors">
                        {r.title}
                      </p>
                      <p className="mt-1 text-xs text-navy-700/60">{formatDate(r.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer site={site} />
      <ChatbotWidget flow={chatbot} whatsappNumber={site.contactInfo.whatsappNumber} />
    </>
  );
}
