"use client";

import { motion } from "framer-motion";
import {
  FileWarning,
  Gavel,
  HandCoins,
  ShieldCheck,
  Building2,
  FileSignature,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const SERVICES = [
  {
    icon: FileWarning,
    title: "Despido injustificado",
    description:
      "Analizamos tu caso y te ayudamos a obtener la indemnización que te corresponde por ley.",
  },
  {
    icon: HandCoins,
    title: "Indemnizaciones y finiquitos",
    description:
      "Calculamos y negociamos liquidaciones justas: aguinaldo, vacaciones, prima de antigüedad y más.",
  },
  {
    icon: Gavel,
    title: "Litigio laboral",
    description:
      "Representación legal completa ante juntas y tribunales laborales, de principio a fin.",
  },
  {
    icon: Building2,
    title: "Asesoría a empresas",
    description:
      "Cumplimiento normativo, contratos, reglamentos internos y prevención de conflictos laborales.",
  },
  {
    icon: FileSignature,
    title: "Contratos y REPSE",
    description:
      "Elaboración y revisión de contratos individuales, colectivos y registro de subcontratación especializada.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad social",
    description:
      "Trámites y defensa en materia de IMSS, INFONAVIT, riesgos de trabajo e incapacidades.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:28px_28px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
        <SectionHeading
          kicker="Áreas de práctica"
          title="Soluciones legales para trabajadores y empresas"
          description="Cubrimos todo el espectro del derecho laboral con estrategia, ética y resultados comprobados."
          light
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 0.08} direction="up">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-white/10 bg-navy-900/60 p-7 backdrop-blur-sm hover:border-gold-400/50 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-300 text-navy-950 shadow-[var(--shadow-gold)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <service.icon size={22} />
                </div>
                <h3 className="font-display mt-5 text-xl text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{service.description}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
