"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useActionState } from "react";
import type { SiteContent } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { submitContactForm, type ContactFormState } from "@/actions/contact";

const initialState: ContactFormState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-200 placeholder:text-navy-700/40";

export default function ContactForm({ site }: { site: SiteContent }) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contacto" className="section-padding bg-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="Contacto"
          title="Solicita tu asesoría gratuita"
          description="Cuéntanos tu caso y un asesor especializado te contactará a la brevedad, sin costo ni compromiso."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <RevealOnScroll direction="left" className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-navy-950 p-8 text-white shadow-[var(--shadow-navy)]">
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-2xl">Información de contacto</h3>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 shrink-0 text-gold-400" size={20} />
                  <div>
                    <p className="text-sm text-white/60">Teléfono / WhatsApp</p>
                    <p className="font-medium">{site.contactInfo.phoneDisplay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 shrink-0 text-gold-400" size={20} />
                  <div>
                    <p className="text-sm text-white/60">Correo</p>
                    <p className="font-medium break-all">{site.contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 shrink-0 text-gold-400" size={20} />
                  <div>
                    <p className="text-sm text-white/60">Ubicación</p>
                    <p className="font-medium">{site.contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 shrink-0 text-gold-400" size={20} />
                  <div>
                    <p className="text-sm text-white/60">Horario de atención</p>
                    <p className="font-medium">{site.contactInfo.scheduleWeekdays}</p>
                    <p className="font-medium">{site.contactInfo.scheduleSaturday}</p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-10 rounded-2xl border border-gold-400/30 bg-gold-400/5 p-4 text-sm text-gold-200"
              >
                Primera consulta 100% gratuita y confidencial.
              </motion.div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="lg:col-span-3">
            <form
              action={formAction}
              className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-[0_20px_60px_-25px_rgba(10,24,48,0.25)]"
            >
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input name="name" placeholder="Nombre completo" required className={fieldClass} />
                  {state.fieldErrors?.name && (
                    <p className="mt-1 text-xs text-red-600">{state.fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <input name="phone" placeholder="Teléfono" required className={fieldClass} />
                  {state.fieldErrors?.phone && (
                    <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <input name="email" type="email" placeholder="Correo electrónico" required className={fieldClass} />
                {state.fieldErrors?.email && (
                  <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email}</p>
                )}
              </div>

              <div>
                <input name="subject" placeholder="Asunto (ej. Despido injustificado)" required className={fieldClass} />
                {state.fieldErrors?.subject && (
                  <p className="mt-1 text-xs text-red-600">{state.fieldErrors.subject}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Cuéntanos brevemente tu situación..."
                  required
                  rows={5}
                  className={fieldClass}
                />
                {state.fieldErrors?.message && (
                  <p className="mt-1 text-xs text-red-600">{state.fieldErrors.message}</p>
                )}
              </div>

              {state.message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm ${
                    state.ok ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {state.ok && <CheckCircle2 size={16} />}
                  {state.message}
                </motion.p>
              )}

              <AnimatedButton type="submit" variant="primary" disabled={pending} icon={<Send size={16} />}>
                {pending ? "Enviando..." : "Enviar mensaje"}
              </AnimatedButton>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
