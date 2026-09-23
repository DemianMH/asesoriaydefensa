"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Faq } from "@/lib/types";
import { saveFaqs } from "@/actions/admin-content";
import { Card, Field, IconButton, SaveBar, TextArea, TextInput } from "./shared";

export default function FaqTab({ initialFaqs }: { initialFaqs: Faq[] }) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setPending(true);
    setStatus(null);
    const result = await saveFaqs(faqs);
    setStatus(result.ok ? result.message : `Error: ${result.message}`);
    setPending(false);
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      { id: crypto.randomUUID(), question: "", answer: "", order: faqs.length + 1 },
    ]);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card title="Preguntas frecuentes" description="Se muestran en orden ascendente.">
        <div className="flex flex-col gap-4">
          {faqs
            .sort((a, b) => a.order - b.order)
            .map((faq, i) => (
              <div key={faq.id} className="rounded-xl border border-navy-900/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    Pregunta {i + 1}
                  </span>
                  <IconButton
                    variant="danger"
                    title="Eliminar"
                    onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </div>
                <div className="flex flex-col gap-3">
                  <Field label="Pregunta">
                    <TextInput
                      value={faq.question}
                      onChange={(e) =>
                        setFaqs(faqs.map((f) => (f.id === faq.id ? { ...f, question: e.target.value } : f)))
                      }
                    />
                  </Field>
                  <Field label="Respuesta">
                    <TextArea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) =>
                        setFaqs(faqs.map((f) => (f.id === faq.id ? { ...f, answer: e.target.value } : f)))
                      }
                    />
                  </Field>
                  <Field label="Orden">
                    <TextInput
                      type="number"
                      value={faq.order}
                      onChange={(e) =>
                        setFaqs(
                          faqs.map((f) =>
                            f.id === faq.id ? { ...f, order: Number(e.target.value) } : f
                          )
                        )
                      }
                      className="max-w-[100px]"
                    />
                  </Field>
                </div>
              </div>
            ))}
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-2 self-start rounded-full border border-gold-400/50 px-4 py-2 text-sm font-medium text-gold-700 hover:bg-gold-50"
          >
            <Plus size={16} /> Agregar pregunta
          </button>
        </div>
      </Card>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}
