"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StarRating from "@/components/ui/StarRating";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { submitTestimonial, type TestimonialFormState } from "@/actions/testimonials";

const initialState: TestimonialFormState = { ok: false, message: "" };

export default function SuccessCases({ testimonials }: { testimonials: Testimonial[] }) {
  const approved = testimonials.filter((t) => t.approved);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [state, formAction, pending] = useActionState(submitTestimonial, initialState);

  useEffect(() => {
    if (approved.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % approved.length), 5500);
    return () => clearInterval(timer);
  }, [approved.length]);

  useEffect(() => {
    if (state.ok) {
      const timeout = setTimeout(() => setModalOpen(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [state.ok]);

  const current = approved[index];

  return (
    <section id="casos-exito" className="section-padding bg-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="Testimonios"
          title="Casos de éxito y opiniones reales"
          description="La confianza de nuestros clientes es nuestro mejor respaldo."
        />

        {current && (
          <RevealOnScroll direction="up" delay={0.1} className="mt-16">
            <div className="relative mx-auto max-w-3xl rounded-3xl bg-navy-950 px-8 py-12 text-center shadow-[var(--shadow-navy)] sm:px-14">
              <Quote className="mx-auto text-gold-400/70" size={36} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
                    “{current.text}”
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <Image
                      src={current.photo}
                      alt={current.name}
                      width={56}
                      height={56}
                      className="rounded-full ring-2 ring-gold-400/50"
                    />
                    <p className="font-display text-white">{current.name}</p>
                    <p className="text-xs uppercase tracking-widest text-gold-400">{current.role}</p>
                    <StarRating rating={current.rating} size={16} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {approved.length > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    aria-label="Anterior testimonio"
                    onClick={() => setIndex((i) => (i - 1 + approved.length) % approved.length)}
                    className="rounded-full border border-white/20 p-2 text-white/70 hover:border-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-2">
                    {approved.map((t, i) => (
                      <button
                        key={t.id}
                        aria-label={`Ver testimonio ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          i === index ? "w-6 bg-gold-400" : "bg-white/25"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    aria-label="Siguiente testimonio"
                    onClick={() => setIndex((i) => (i + 1) % approved.length)}
                    className="rounded-full border border-white/20 p-2 text-white/70 hover:border-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        <div className="mt-12 flex justify-center">
          <AnimatedButton variant="outline" onClick={() => setModalOpen(true)}>
            Deja tu opinión
          </AnimatedButton>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >
              <button
                aria-label="Cerrar"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 text-navy-700/60 hover:text-navy-900"
              >
                <X size={20} />
              </button>
              <h3 className="font-display text-2xl text-navy-900">Comparte tu experiencia</h3>
              <p className="mt-1 text-sm text-navy-700/70">
                Tu opinión ayuda a otras personas a confiar en nosotros.
              </p>

              <form action={formAction} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
                    Tu calificación
                  </label>
                  <div className="mt-1">
                    <StarRating rating={rating} interactive size={26} onChange={setRating} />
                  </div>
                  <input type="hidden" name="rating" value={rating} />
                </div>
                <input
                  name="name"
                  placeholder="Tu nombre"
                  required
                  className="rounded-xl border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                />
                <input
                  name="role"
                  placeholder="Ej. Ex empleado, Empresa, etc."
                  required
                  className="rounded-xl border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                />
                <textarea
                  name="text"
                  placeholder="Cuéntanos tu experiencia..."
                  required
                  rows={4}
                  className="rounded-xl border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                />
                {state.message && (
                  <p className={`text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}>
                    {state.message}
                  </p>
                )}
                <AnimatedButton type="submit" variant="primary" disabled={pending}>
                  {pending ? "Enviando..." : "Enviar comentario"}
                </AnimatedButton>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
