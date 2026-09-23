"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { readContent, writeContent } from "@/lib/store";
import type { Testimonial } from "@/lib/types";

const TestimonialSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre."),
  role: z.string().trim().min(2, "Cuéntanos brevemente tu situación (ej. Ex empleado)."),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().trim().min(10, "Escribe un comentario un poco más completo."),
});

export type TestimonialFormState = {
  ok: boolean;
  message: string;
};

export async function submitTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const parsed = TestimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    rating: formData.get("rating"),
    text: formData.get("text"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Revisa el formulario." };
  }

  const testimonials = await readContent<Testimonial[]>("testimonials");
  const entry: Testimonial = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    role: parsed.data.role,
    rating: parsed.data.rating,
    text: parsed.data.text,
    photo: `https://i.pravatar.cc/200?u=${encodeURIComponent(parsed.data.name)}`,
    approved: false,
    date: new Date().toISOString(),
  };
  testimonials.unshift(entry);
  await writeContent("testimonials", testimonials);
  revalidatePath("/admin");

  return {
    ok: true,
    message: "¡Gracias por tu opinión! Se publicará después de ser revisada.",
  };
}
