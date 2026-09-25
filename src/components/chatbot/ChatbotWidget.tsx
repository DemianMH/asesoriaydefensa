"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, CornerDownLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatbotFlow } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/whatsapp";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

export default function ChatbotWidget({
  flow,
  whatsappNumber,
}: {
  flow: ChatbotFlow;
  whatsappNumber: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showClosing, setShowClosing] = useState(false);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, showClosing]);

  const startConversation = () => {
    if (started) return;
    setStarted(true);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages([{ id: "greeting", from: "bot", text: flow.greeting }]);
    }, 900);
  };

  const handleOption = (optionId: string) => {
    const option = flow.options.find((o) => o.id === optionId);
    if (!option) return;

    setMessages((prev) => [...prev, { id: `${optionId}-q-${Date.now()}`, from: "user", text: option.label }]);
    setShowOptions(false);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `${optionId}-a-${Date.now()}`, from: "bot", text: option.answer },
      ]);
      setTimeout(() => setShowClosing(true), 500);
    }, 1100);
  };

  const askAnother = () => {
    setShowClosing(false);
    setShowOptions(true);
  };

  const waLink = buildWhatsappLink(
    whatsappNumber,
    "Hola, vengo del sitio web y me gustaría hablar con un asesor laboral."
  );

  return (
    <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-3 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(520px,calc(100dvh-160px))] w-[90vw] max-w-sm flex-col overflow-hidden rounded-3xl border border-gold-400/20 bg-navy-950 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-navy-900 to-navy-800 px-4 py-3.5">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Asistente virtual"
                  width={38}
                  height={38}
                  className="rounded-full"
                />
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-navy-900 bg-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Asistente Virtual</p>
                <p className="text-xs text-emerald-400">En línea</p>
              </div>
              <button
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-gold-500 text-navy-950"
                        : "rounded-bl-sm bg-navy-800 text-white/90"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-navy-800 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-gold-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showClosing && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 pt-1"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-navy-800 px-4 py-2.5 text-sm text-white/90">
                    {flow.closingMessage}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition-colors"
                    >
                      {flow.whatsappCta}
                    </a>
                    <button
                      onClick={askAnother}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 px-4 py-2 text-xs font-semibold text-gold-300 hover:bg-gold-400/10 transition-colors"
                    >
                      <CornerDownLeft size={13} />
                      Otra pregunta
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            {showOptions && !typing && (
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
                {flow.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOption(option.id)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-gold-400 hover:text-gold-300 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
              <div className="flex-1 rounded-full bg-navy-900 px-4 py-2 text-xs text-white/40">
                Elige una opción arriba para continuar…
              </div>
              <span className="rounded-full bg-navy-800 p-2 text-white/40">
                <Send size={14} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        onClick={() => {
          setOpen((v) => !v);
          startConversation();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`animate-pulse-ring relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-300 text-navy-950 shadow-[0_10px_35px_-8px_rgba(201,162,39,0.7)] ${
          open ? "rotate-0" : ""
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
