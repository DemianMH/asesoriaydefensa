"use client";

import Image from "next/image";
import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAdmin, type LoginState } from "@/actions/admin-auth";

const initialState: LoginState = { ok: true, message: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="w-full max-w-sm rounded-3xl border border-gold-400/20 bg-navy-900/70 p-8 shadow-[var(--shadow-navy)]">
      <div className="flex flex-col items-center gap-3 text-center">
        <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="rounded-full" />
        <h1 className="font-display text-2xl text-white">Panel Administrador</h1>
        <p className="text-sm text-white/60">Asesoría y Defensa Laboral</p>
      </div>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="w-full rounded-xl border border-white/15 bg-navy-950 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
          />
        </div>

        {!state.ok && state.message && (
          <p className="text-sm text-red-400">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 py-3 text-sm font-semibold text-navy-950 transition-opacity disabled:opacity-60"
        >
          {pending ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
