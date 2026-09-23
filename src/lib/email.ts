import nodemailer from "nodemailer";
import type { ContactSubmission } from "./types";

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Sends the contact-form notification by SMTP. Silently no-ops (returns false)
 * when SMTP env vars are not configured yet, so the form still works and the
 * submission is still stored for the admin panel.
 */
export async function sendContactNotification(submission: ContactSubmission): Promise<boolean> {
  const transporter = buildTransport();
  if (!transporter) return false;

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Sitio Web - Asesoría y Defensa Laboral" <${from}>`,
    to,
    replyTo: submission.email,
    subject: `Nuevo mensaje de contacto: ${submission.subject}`,
    text: [
      `Nombre: ${submission.name}`,
      `Correo: ${submission.email}`,
      `Teléfono: ${submission.phone}`,
      `Asunto: ${submission.subject}`,
      "",
      submission.message,
    ].join("\n"),
    html: `
      <div style="font-family: Georgia, serif; color:#0b1b33;">
        <h2 style="color:#0b1b33;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${submission.name}</p>
        <p><strong>Correo:</strong> ${submission.email}</p>
        <p><strong>Teléfono:</strong> ${submission.phone}</p>
        <p><strong>Asunto:</strong> ${submission.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${submission.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });

  return true;
}
