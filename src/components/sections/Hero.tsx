"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { BannerSlide } from "@/lib/types";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function Hero({
  slides,
  kicker,
  heading,
  subheading,
}: {
  slides: BannerSlide[];
  kicker: string;
  heading: string;
  subheading: string;
}) {
  const [index, setIndex] = useState(0);
  const safeSlides = slides.length > 0 ? slides : [];

  useEffect(() => {
    if (safeSlides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [safeSlides.length]);

  const current = safeSlides[index];

  return (
    <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden bg-navy-950">
      <AnimatePresence mode="sync">
        {current && (
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.src}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gold particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold-300/70"
            style={{ top: `${15 + i * 13}%`, left: `${8 + i * 15}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-28 pb-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-navy-900/40 px-4 py-1.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-300"
        >
          <ShieldCheck size={16} />
          {kicker}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl"
        >
          {heading.split(" ").map((word, i) => (
            <span key={i} className={i % 3 === 1 ? "text-gold-gradient" : ""}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {subheading}
        </motion.p>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id + "-copy"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="mt-4 max-w-xl"
            >
              <p className="font-display text-xl text-gold-200 sm:text-2xl">{current.title}</p>
              <p className="mt-1 text-sm text-white/60 sm:text-base">{current.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <AnimatedButton href={current?.buttonHref || "#contacto"} variant="primary">
            {current?.buttonText || "Solicita tu asesoría gratis"}
          </AnimatedButton>
          <AnimatedButton href="#servicios" variant="outline">
            Ver servicios
          </AnimatedButton>
        </motion.div>

        {safeSlides.length > 1 && (
          <div className="mt-14 flex items-center gap-4">
            <button
              aria-label="Anterior"
              onClick={() => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length)}
              className="rounded-full border border-white/20 p-2 text-white/70 hover:border-gold-400 hover:text-gold-300 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {safeSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  aria-label={`Ir a slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/20"
                >
                  {i === index && (
                    <motion.span
                      layoutId="hero-progress"
                      className="absolute inset-0 rounded-full bg-gold-400"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              aria-label="Siguiente"
              onClick={() => setIndex((i) => (i + 1) % safeSlides.length)}
              className="rounded-full border border-white/20 p-2 text-white/70 hover:border-gold-400 hover:text-gold-300 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <motion.a
        href="#nosotros"
        aria-label="Desplázate hacia abajo"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 hover:text-gold-300 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
