"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { saveSiteContent } from "@/actions/admin-content";
import { Card, Field, IconButton, NumberInput, SaveBar, TextArea, TextInput } from "./shared";

export default function GeneralTab({ initialSite }: { initialSite: SiteContent }) {
  const [site, setSite] = useState<SiteContent>(initialSite);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setPending(true);
    setStatus(null);
    const result = await saveSiteContent(site);
    setStatus(result.ok ? result.message : `Error: ${result.message}`);
    setPending(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card title="Encabezado principal" description="Texto que aparece arriba del banner.">
        <Field label="Texto pequeño (kicker)">
          <TextInput
            value={site.hero.kicker}
            onChange={(e) => setSite({ ...site, hero: { ...site.hero, kicker: e.target.value } })}
          />
        </Field>
        <Field label="Título principal">
          <TextInput
            value={site.hero.heading}
            onChange={(e) => setSite({ ...site, hero: { ...site.hero, heading: e.target.value } })}
          />
        </Field>
        <Field label="Subtítulo">
          <TextArea
            rows={2}
            value={site.hero.subheading}
            onChange={(e) => setSite({ ...site, hero: { ...site.hero, subheading: e.target.value } })}
          />
        </Field>
      </Card>

      <Card
        title="Banner / Carrusel"
        description="Imágenes, videos y textos que rotan en la portada. Pega la URL de la imagen o video."
      >
        <div className="flex flex-col gap-5">
          {site.banner.map((slide, i) => (
            <div key={slide.id} className="rounded-xl border border-navy-900/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Slide {i + 1}
                </span>
                <IconButton
                  variant="danger"
                  title="Eliminar slide"
                  onClick={() =>
                    setSite({ ...site, banner: site.banner.filter((s) => s.id !== slide.id) })
                  }
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Tipo">
                  <select
                    value={slide.type}
                    onChange={(e) =>
                      updateSlide(site, setSite, slide.id, { type: e.target.value as "image" | "video" })
                    }
                    className="rounded-lg border border-navy-900/15 bg-white px-3.5 py-2.5 text-sm"
                  >
                    <option value="image">Imagen</option>
                    <option value="video">Video</option>
                  </select>
                </Field>
                <Field label="URL de imagen/video">
                  <TextInput
                    value={slide.src}
                    onChange={(e) => updateSlide(site, setSite, slide.id, { src: e.target.value })}
                  />
                </Field>
                <Field label="Título">
                  <TextInput
                    value={slide.title}
                    onChange={(e) => updateSlide(site, setSite, slide.id, { title: e.target.value })}
                  />
                </Field>
                <Field label="Subtítulo">
                  <TextInput
                    value={slide.subtitle}
                    onChange={(e) => updateSlide(site, setSite, slide.id, { subtitle: e.target.value })}
                  />
                </Field>
                <Field label="Texto del botón">
                  <TextInput
                    value={slide.buttonText}
                    onChange={(e) => updateSlide(site, setSite, slide.id, { buttonText: e.target.value })}
                  />
                </Field>
                <Field label="Enlace del botón">
                  <TextInput
                    value={slide.buttonHref}
                    onChange={(e) => updateSlide(site, setSite, slide.id, { buttonHref: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setSite({
                ...site,
                banner: [
                  ...site.banner,
                  {
                    id: crypto.randomUUID(),
                    type: "image",
                    src: "https://picsum.photos/seed/nuevo/1920/1080",
                    title: "Nuevo título",
                    subtitle: "Nuevo subtítulo",
                    buttonText: "Contáctanos",
                    buttonHref: "#contacto",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-2 self-start rounded-full border border-gold-400/50 px-4 py-2 text-sm font-medium text-gold-700 hover:bg-gold-50"
          >
            <Plus size={16} /> Agregar slide
          </button>
        </div>
      </Card>

      <Card title="Quiénes somos" description="Texto de la sección 'Nosotros'.">
        <Field label="Título">
          <TextInput
            value={site.about.heading}
            onChange={(e) => setSite({ ...site, about: { ...site.about, heading: e.target.value } })}
          />
        </Field>
        <Field label="Descripción">
          <TextArea
            rows={4}
            value={site.about.text}
            onChange={(e) => setSite({ ...site, about: { ...site.about, text: e.target.value } })}
          />
        </Field>

        <div className="flex flex-col gap-4">
          {site.about.team.map((member) => (
            <div key={member.id} className="grid gap-3 rounded-xl border border-navy-900/10 p-4 sm:grid-cols-2">
              <Field label="Nombre">
                <TextInput
                  value={member.name}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: {
                        ...site.about,
                        team: site.about.team.map((m) =>
                          m.id === member.id ? { ...m, name: e.target.value } : m
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Cargo">
                <TextInput
                  value={member.role}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: {
                        ...site.about,
                        team: site.about.team.map((m) =>
                          m.id === member.id ? { ...m, role: e.target.value } : m
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Foto (URL)">
                <TextInput
                  value={member.photo}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: {
                        ...site.about,
                        team: site.about.team.map((m) =>
                          m.id === member.id ? { ...m, photo: e.target.value } : m
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Biografía">
                <TextArea
                  rows={2}
                  value={member.bio}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: {
                        ...site.about,
                        team: site.about.team.map((m) =>
                          m.id === member.id ? { ...m, bio: e.target.value } : m
                        ),
                      },
                    })
                  }
                />
              </Field>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Estadísticas" description="Números destacados en la sección 'Nosotros'.">
        <div className="grid gap-3 sm:grid-cols-2">
          {site.stats.map((stat) => (
            <div key={stat.id} className="grid grid-cols-3 gap-2 rounded-xl border border-navy-900/10 p-3">
              <NumberInput
                value={stat.value}
                onChange={(value) =>
                  setSite({
                    ...site,
                    stats: site.stats.map((s) => (s.id === stat.id ? { ...s, value } : s)),
                  })
                }
              />
              <TextInput
                placeholder="Sufijo (+, %)"
                value={stat.suffix}
                onChange={(e) =>
                  setSite({
                    ...site,
                    stats: site.stats.map((s) => (s.id === stat.id ? { ...s, suffix: e.target.value } : s)),
                  })
                }
              />
              <TextInput
                placeholder="Etiqueta"
                value={stat.label}
                onChange={(e) =>
                  setSite({
                    ...site,
                    stats: site.stats.map((s) => (s.id === stat.id ? { ...s, label: e.target.value } : s)),
                  })
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Información de contacto" description="Se muestra en el footer y la sección de contacto.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Teléfono (texto)">
            <TextInput
              value={site.contactInfo.phoneDisplay}
              onChange={(e) =>
                setSite({ ...site, contactInfo: { ...site.contactInfo, phoneDisplay: e.target.value } })
              }
            />
          </Field>
          <Field label="WhatsApp (solo dígitos, con código de país)">
            <TextInput
              value={site.contactInfo.whatsappNumber}
              onChange={(e) =>
                setSite({ ...site, contactInfo: { ...site.contactInfo, whatsappNumber: e.target.value } })
              }
            />
          </Field>
          <Field label="Correo">
            <TextInput
              value={site.contactInfo.email}
              onChange={(e) =>
                setSite({ ...site, contactInfo: { ...site.contactInfo, email: e.target.value } })
              }
            />
          </Field>
          <Field label="Dirección">
            <TextInput
              value={site.contactInfo.address}
              onChange={(e) =>
                setSite({ ...site, contactInfo: { ...site.contactInfo, address: e.target.value } })
              }
            />
          </Field>
          <Field label="Horario entre semana">
            <TextInput
              value={site.contactInfo.scheduleWeekdays}
              onChange={(e) =>
                setSite({
                  ...site,
                  contactInfo: { ...site.contactInfo, scheduleWeekdays: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Horario sábado">
            <TextInput
              value={site.contactInfo.scheduleSaturday}
              onChange={(e) =>
                setSite({
                  ...site,
                  contactInfo: { ...site.contactInfo, scheduleSaturday: e.target.value },
                })
              }
            />
          </Field>
        </div>
      </Card>

      <SaveBar pending={pending} status={status} onSave={handleSave} />
    </div>
  );
}

function updateSlide(
  site: SiteContent,
  setSite: (site: SiteContent) => void,
  id: string,
  patch: Partial<SiteContent["banner"][number]>
) {
  setSite({
    ...site,
    banner: site.banner.map((s) => (s.id === id ? { ...s, ...patch } : s)),
  });
}
