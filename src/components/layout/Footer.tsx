import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/whatsapp";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.36C16.2 4.32 15.2 4.24 14 4.24c-2.4 0-4 1.46-4 4.14V10.5H7.5v3H10V21h3.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer({ site }: { site: SiteContent }) {
  const year = new Date().getFullYear();
  const waLink = buildWhatsappLink(
    site.contactInfo.whatsappNumber,
    "Hola, me gustaría recibir asesoría laboral."
  );

  return (
    <footer className="bg-navy-950 text-white/70 relative overflow-hidden">
      <div className="divider-gold w-full opacity-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Asesoría y Defensa Laboral"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-display text-white text-lg">Asesoría y Defensa</p>
              <p className="text-gold-400 text-xs uppercase tracking-[0.3em]">Laboral</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Despacho especializado en derecho laboral. Defendemos tus derechos como
            trabajador o empresa con estrategia legal y cercanía humana.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-white text-base mb-4">Navegación</p>
          <ul className="space-y-3 text-sm">
            {[
              ["#inicio", "Inicio"],
              ["#nosotros", "Nosotros"],
              ["#servicios", "Servicios"],
              ["#casos-exito", "Casos de éxito"],
              ["#blog", "Blog"],
              ["#preguntas-frecuentes", "Preguntas frecuentes"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-gold-300 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-white text-base mb-4">Contacto</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-gold-400 shrink-0" />
              <span>{site.contactInfo.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-gold-400 shrink-0" />
              <span className="break-all">{site.contactInfo.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-gold-400 shrink-0" />
              <span>{site.contactInfo.address}</span>
            </li>
          </ul>
          <div className="mt-4 text-xs text-white/50 space-y-1">
            <p>{site.contactInfo.scheduleWeekdays}</p>
            <p>{site.contactInfo.scheduleSaturday}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>© {year} Asesoría y Defensa Laboral. Todos los derechos reservados.</p>
          <p>
            Sitio administrado por{" "}
            <Link href="/admin" className="hover:text-gold-400 transition-colors">
              panel privado
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
