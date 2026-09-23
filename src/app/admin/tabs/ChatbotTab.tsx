"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ChatbotFlow } from "@/lib/types";
import { saveChatbotFlow } from "@/actions/admin-content";
import { Card, Field, IconButton, SaveBar, TextArea, TextInput } from "./shared";

export default function ChatbotTab({ initialChatbot }: { initialChatbot: ChatbotFlow }) {
  const [flow, setFlow] = useState<ChatbotFlow>(initialChatbot);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setPending(true);
    setStatus(null);
    const result = await saveChatbotFlow(flow);
    setStatus(result.ok ? result.message : `Error: ${result.message}`);
    setPending(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card
        title="Chatbot del sitio"
        description="Configura el saludo, las preguntas rápidas y el mensaje que dirige a WhatsApp."
      >
        <Field label="Mensaje de saludo">
          <TextArea
            rows={2}
            value={flow.greeting}
            onChange={(e) => setFlow({ ...flow, greeting: e.target.value })}
          />
        </Field>

        <div className="flex flex-col gap-4">
          {flow.options.map((option, i) => (
            <div key={option.id} className="rounded-xl border border-navy-900/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Opción {i + 1}
                </span>
                <IconButton
                  variant="danger"
                  title="Eliminar"
                  onClick={() =>
                    setFlow({ ...flow, options: flow.options.filter((o) => o.id !== option.id) })
                  }
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
              <Field label="Pregunta / botón">
                <TextInput
                  value={option.label}
                  onChange={(e) =>
                    setFlow({
                      ...flow,
                      options: flow.options.map((o) =>
                        o.id === option.id ? { ...o, label: e.target.value } : o
                      ),
                    })
                  }
                />
              </Field>
              <div className="mt-3">
                <Field label="Respuesta del bot">
                  <TextArea
                    rows={3}
                    value={option.answer}
                    onChange={(e) =>
                      setFlow({
                        ...flow,
                        options: flow.options.map((o) =>
                          o.id === option.id ? { ...o, answer: e.target.value } : o
                        ),
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFlow({
                ...flow,
                options: [
                  ...flow.options,
                  { id: crypto.randomUUID(), label: "Nueva pregunta", answer: "Respuesta..." },
                ],
              })
            }
            className="inline-flex items-center gap-2 self-start rounded-full border border-gold-400/50 px-4 py-2 text-sm font-medium text-gold-700 hover:bg-gold-50"
          >
            <Plus size={16} /> Agregar opción
          </button>
        </div>

        <Field label="Mensaje de cierre (antes de invitar a WhatsApp)">
          <TextArea
            rows={2}
            value={flow.closingMessage}
            onChange={(e) => setFlow({ ...flow, closingMessage: e.target.value })}
          />
        </Field>
        <Field label="Texto del botón de WhatsApp">
          <TextInput
            value={flow.whatsappCta}
            onChange={(e) => setFlow({ ...flow, whatsappCta: e.target.value })}
          />
        </Field>
      </Card>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}
