"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buildWhatsappLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#casos-exito", label: "Casos de éxito" },
  { href: "#blog", label: "Blog" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const waLink = buildWhatsappLink(
    whatsappNumber,
    "Hola, me gustaría recibir asesoría laboral."
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2 glass-panel shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "py-4 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link href="#inicio" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 0.6 }}>
              <Image
                src="/images/logo.png"
                alt="Asesoría y Defensa Laboral"
                width={46}
                height={46}
                className="rounded-full ring-1 ring-gold-400/40"
                priority
              />
            </motion.div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-white text-base font-semibold tracking-wide group-hover:text-gold-300 transition-colors">
                Asesoría y Defensa
              </span>
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase">Laboral</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-white/85 hover:text-gold-300 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-[0_8px_25px_-8px_rgba(201,162,39,0.6)]"
            >
              <MessageCircle size={16} />
              Habla con un asesor
            </motion.a>
          </div>

          <button
            aria-label="Abrir menú"
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-navy-950/98 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="text-white p-2">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center gap-8 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl text-white hover:text-gold-300 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * NAV_LINKS.length, duration: 0.5 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-950"
              >
                <MessageCircle size={18} />
                Habla con un asesor
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
