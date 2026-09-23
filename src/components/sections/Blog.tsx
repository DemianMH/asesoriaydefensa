import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import LikeButton from "@/components/blog/LikeButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const published = posts.filter((p) => p.published);

  return (
    <section id="blog" className="section-padding bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="Foro y blog informativo"
          title="Noticias y guías de derecho laboral"
          description="Información útil, clara y actualizada para conocer y defender tus derechos."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {published.map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 0.1} direction="up">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                <Link href={`/blog/${post.slug}`} className="relative block h-52 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300 backdrop-blur-sm">
                    {post.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-1.5 text-xs text-navy-700/60">
                    <CalendarDays size={14} />
                    {formatDate(post.date)}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-display mt-2 text-xl text-navy-900 group-hover:text-gold-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700/70">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-navy-900/10 pt-4">
                    <LikeButton postId={post.id} initialLikes={post.likes} />
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
                    >
                      Leer más
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
