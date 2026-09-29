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

        <RevealOnScroll direction="up" delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 text-center shadow-[var(--shadow-navy)] sm:px-14">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:26px_26px]" />

            <Scale className="relative mx-auto text-gold-400" size={32} />
            <p className="relative mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {site.about.teamIntro}
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {site.about.team.map((member, i) => (
                <div key={member.id} className="flex items-center gap-x-10">
                  <div>
                    <p className="font-display text-3xl text-white sm:text-4xl">{member.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold-400 sm:text-sm">
                      {member.role}
                    </p>
                  </div>
                  {i < site.about.team.length - 1 && (
                    <span className="font-display text-2xl text-gold-400/50 sm:text-3xl">&amp;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2} className="mt-10">
          <div className="grid grid-cols-1 gap-6 rounded-3xl bg-navy-950 px-6 py-10 shadow-[var(--shadow-navy)] sm:grid-cols-3">
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
