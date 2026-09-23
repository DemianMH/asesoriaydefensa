"use client";

import type { ChangeEvent, ReactNode } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-navy-800/80">{label}</span>
      {children}
    </label>
  );
}

const baseInput =
  "rounded-lg border border-navy-900/15 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInput} ${props.className || ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseInput} ${props.className || ""}`} />;
}

export function NumberInput({
  value,
  onChange,
  ...rest
}: {
  value: number;
  onChange: (value: number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));
  return <TextInput type="number" value={value} onChange={handle} {...rest} />;
}

export function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm">
      <h3 className="font-display text-lg text-navy-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-navy-700/60">{description}</p>}
      <div className="mt-5 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function SaveBar({
  pending,
  status,
  onSave,
  label = "Guardar cambios",
}: {
  pending: boolean;
  status: string | null;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-6 mt-6 flex items-center justify-between gap-4 border-t border-navy-900/10 bg-white/90 px-6 py-4 backdrop-blur">
      <p className={`text-sm ${status?.startsWith("Error") ? "text-red-600" : "text-emerald-600"}`}>
        {status}
      </p>
      <button
        onClick={onSave}
        disabled={pending}
        className="rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
      >
        {pending ? "Guardando..." : label}
      </button>
    </div>
  );
}

export function IconButton({
  onClick,
  children,
  variant = "default",
  title,
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: "default" | "danger";
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
        variant === "danger"
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-navy-900/15 text-navy-700 hover:bg-navy-900/5"
      }`}
    >
      {children}
    </button>
  );
}
