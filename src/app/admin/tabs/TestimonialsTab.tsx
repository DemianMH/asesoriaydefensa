"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { saveTestimonials } from "@/actions/admin-content";
import StarRating from "@/components/ui/StarRating";
import { Card, Field, IconButton, SaveBar, TextArea, TextInput } from "./shared";

export default function TestimonialsTab({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setPending(true);
    setStatus(null);
    const result = await saveTestimonials(items);
    setStatus(result.ok ? result.message : `Error: ${result.message}`);
    setPending(false);
  };

  const addTestimonial = () => {
    setItems([
      {
        id: crypto.randomUUID(),
        name: "",
        role: "",
        rating: 5,
        text: "",
        photo: "https://i.pravatar.cc/200",
        approved: true,
        date: new Date().toISOString(),
      },
      ...items,
    ]);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card
        title="Testimonios y calificaciones"
        description="Los comentarios enviados desde el sitio aparecen sin aprobar hasta que actives 'Publicado'."
      >
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-navy-900/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy-700">
                  <input
                    type="checkbox"
                    checked={item.approved}
                    onChange={(e) =>
                      setItems(
                        items.map((t) => (t.id === item.id ? { ...t, approved: e.target.checked } : t))
                      )
                    }
                  />
                  {item.approved ? "Publicado" : "Pendiente de aprobación"}
                </label>
                <IconButton
                  variant="danger"
                  title="Eliminar"
                  onClick={() => setItems(items.filter((t) => t.id !== item.id))}
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nombre">
                  <TextInput
                    value={item.name}
                    onChange={(e) =>
                      setItems(items.map((t) => (t.id === item.id ? { ...t, name: e.target.value } : t)))
                    }
                  />
                </Field>
                <Field label="Rol / situación">
                  <TextInput
                    value={item.role}
                    onChange={(e) =>
                      setItems(items.map((t) => (t.id === item.id ? { ...t, role: e.target.value } : t)))
                    }
                  />
                </Field>
                <Field label="Foto (URL)">
                  <TextInput
                    value={item.photo}
                    onChange={(e) =>
                      setItems(items.map((t) => (t.id === item.id ? { ...t, photo: e.target.value } : t)))
                    }
                  />
                </Field>
                <Field label="Calificación">
                  <StarRating
                    rating={item.rating}
                    interactive
                    onChange={(value) =>
                      setItems(items.map((t) => (t.id === item.id ? { ...t, rating: value } : t)))
                    }
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Comentario">
                  <TextArea
                    rows={3}
                    value={item.text}
                    onChange={(e) =>
                      setItems(items.map((t) => (t.id === item.id ? { ...t, text: e.target.value } : t)))
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTestimonial}
            className="inline-flex items-center gap-2 self-start rounded-full border border-gold-400/50 px-4 py-2 text-sm font-medium text-gold-700 hover:bg-gold-50"
          >
            <Plus size={16} /> Agregar testimonio
          </button>
        </div>
      </Card>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}
