"use client";

import { useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import type { ContactSubmission } from "@/lib/types";
import { deleteSubmission, markSubmissionRead } from "@/actions/admin-content";
import { Card, IconButton } from "./shared";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
}

export default function SubmissionsTab({ initialSubmissions }: { initialSubmissions: ContactSubmission[] }) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);

  const toggleRead = async (submission: ContactSubmission) => {
    const next = !submission.read;
    setSubmissions(submissions.map((s) => (s.id === submission.id ? { ...s, read: next } : s)));
    await markSubmissionRead(submission.id, next);
  };

  const handleDelete = async (id: string) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    await deleteSubmission(id);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card
        title="Mensajes de contacto"
        description={`${submissions.filter((s) => !s.read).length} mensajes sin leer de ${submissions.length} totales.`}
      >
        {submissions.length === 0 && (
          <p className="text-sm text-navy-700/60">Aún no hay mensajes de contacto.</p>
        )}
        <div className="flex flex-col gap-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className={`rounded-xl border p-4 ${
                s.read ? "border-navy-900/10 bg-white" : "border-gold-400/40 bg-gold-50/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-navy-900">
                    {s.name} · <span className="text-navy-700/60">{s.subject}</span>
                  </p>
                  <p className="text-xs text-navy-700/60">
                    {s.email} · {s.phone} · {formatDate(s.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IconButton title={s.read ? "Marcar como no leído" : "Marcar como leído"} onClick={() => toggleRead(s)}>
                    {s.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </IconButton>
                  <IconButton variant="danger" title="Eliminar" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={16} />
                  </IconButton>
                </div>
              </div>
              <p className="mt-3 text-sm text-navy-800/80">{s.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
