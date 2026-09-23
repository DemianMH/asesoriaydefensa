"use server";

import { z } from "zod";
import { readContent, writeContent } from "@/lib/store";
import { sendContactNotification } from "@/lib/email";
import type { ContactSubmission } from "@/lib/types";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo."),
  email: z.string().trim().email("Escribe un correo válido."),
  phone: z.string().trim().min(8, "Escribe un teléfono válido."),
  subject: z.string().trim().min(3, "Escribe el motivo de tu mensaje."),
  message: z.string().trim().min(10, "Cuéntanos un poco más sobre tu caso."),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
    honeypot: String(formData.get("company") || ""),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof ContactSchema>;
      fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Revisa los campos marcados.", fieldErrors };
  }

  if (parsed.data.honeypot) {
    // Bot submission — silently pretend success.
    return { ok: true, message: "¡Gracias! Hemos recibido tu mensaje." };
  }

  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    date: new Date().toISOString(),
    read: false,
  };

  const submissions = await readContent<ContactSubmission[]>("submissions").catch(
    () => [] as ContactSubmission[]
  );
  submissions.unshift(submission);
  await writeContent("submissions", submissions.slice(0, 500));

  try {
    await sendContactNotification(submission);
  } catch {
    // El mensaje ya quedó guardado en el panel admin aunque el correo falle.
  }

  return {
    ok: true,
    message: "¡Gracias! Hemos recibido tu mensaje. Un asesor se pondrá en contacto contigo muy pronto.",
  };
}
