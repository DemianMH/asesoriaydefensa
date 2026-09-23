"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  const sorted = [...faqs].sort((a, b) => a.order - b.order);
  const [openId, setOpenId] = useState<string | null>(sorted[0]?.id ?? null);

  return (
    <section id="preguntas-frecuentes" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading
          kicker="Dudas y respuestas"
          title="Preguntas frecuentes"
          description="Resolvemos las dudas más comunes sobre derecho laboral."
          light
        />

        <div className="mt-14 flex flex-col gap-4">
          {sorted.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <RevealOnScroll key={faq.id} delay={i * 0.05} direction="up">
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen ? "border-gold-400/60 bg-navy-900/70" : "border-white/10 bg-navy-900/40"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base text-white sm:text-lg">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 rounded-full bg-gold-400/15 p-1.5 text-gold-300"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-white/70 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
