import Image from "next/image";
import { Scale } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Counter from "@/components/ui/Counter";

export default function About({ site }: { site: SiteContent }) {
  return (
    <section id="nosotros" className="section-padding bg-cream relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="Sobre el despacho"
          title={site.about.heading}
          description={site.about.text}
        />

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {site.about.team.map((member, i) => (
            <RevealOnScroll key={member.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl bg-navy-950 shadow-[var(--shadow-navy)]">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                </div>
                <div className="relative p-6">
                  <div className="flex items-center gap-2 text-gold-400">
                    <Scale size={18} />
                    <span className="text-xs uppercase tracking-[0.25em]">{member.role}</span>
                  </div>
                  <h3 className="font-display mt-2 text-2xl text-white">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{member.bio}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll direction="up" delay={0.15} className="mt-16">
          <div className="grid grid-cols-2 gap-6 rounded-3xl bg-navy-950 px-6 py-10 shadow-[var(--shadow-navy)] sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-display text-3xl font-semibold text-gold-gradient sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-white/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
