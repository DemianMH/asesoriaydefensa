"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  Star,
  Newspaper,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import type { BlogPost, ContactSubmission, Faq, SiteContent, Testimonial } from "@/lib/types";
import { logoutAdmin } from "@/actions/admin-auth";
import GeneralTab from "./tabs/GeneralTab";
import FaqTab from "./tabs/FaqTab";
import TestimonialsTab from "./tabs/TestimonialsTab";
import BlogTab from "./tabs/BlogTab";
import SubmissionsTab from "./tabs/SubmissionsTab";

type TabKey = "general" | "faqs" | "testimonials" | "blog" | "submissions";

const TABS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "general", label: "Contenido general", icon: LayoutDashboard },
  { key: "faqs", label: "Preguntas frecuentes", icon: HelpCircle },
  { key: "testimonials", label: "Testimonios", icon: Star },
  { key: "blog", label: "Blog / Foro", icon: Newspaper },
  { key: "submissions", label: "Mensajes", icon: Mail },
];

export default function AdminDashboard({
  initialSite,
  initialFaqs,
  initialTestimonials,
  initialPosts,
  initialSubmissions,
}: {
  initialSite: SiteContent;
  initialFaqs: Faq[];
  initialTestimonials: Testimonial[];
  initialPosts: BlogPost[];
  initialSubmissions: ContactSubmission[];
}) {
  const [tab, setTab] = useState<TabKey>("general");
  const unread = initialSubmissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-[#f4f2ec]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex flex-row items-center justify-between gap-4 border-b border-navy-900/10 bg-navy-950 px-4 py-4 lg:w-72 lg:flex-col lg:items-stretch lg:justify-start lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <div className="hidden sm:block">
              <p className="font-display text-sm text-white">Asesoría y Defensa</p>
              <p className="text-[10px] uppercase tracking-widest text-gold-400">Panel admin</p>
            </div>
          </div>

          <nav className="flex flex-1 gap-1 overflow-x-auto lg:mt-8 lg:flex-col lg:overflow-visible">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors lg:shrink ${
                  tab === key
                    ? "bg-gold-400/15 text-gold-300"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />
                <span className="hidden sm:inline">{label}</span>
                {key === "submissions" && unread > 0 && (
                  <span className="ml-auto rounded-full bg-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-navy-950">
                    {unread}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="hidden flex-col gap-2 lg:flex">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink size={16} />
              Ver sitio
            </Link>
            <form action={logoutAdmin}>
              <button className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm text-white/60 hover:bg-white/5 hover:text-white">
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-display text-2xl text-navy-900 sm:text-3xl">
              {TABS.find((t) => t.key === tab)?.label}
            </h1>
            <p className="mt-1 text-sm text-navy-700/60">
              Los cambios se reflejan de inmediato en el sitio público.
            </p>

            <div className="mt-8">
              {tab === "general" && <GeneralTab initialSite={initialSite} />}
              {tab === "faqs" && <FaqTab initialFaqs={initialFaqs} />}
              {tab === "testimonials" && <TestimonialsTab initialTestimonials={initialTestimonials} />}
              {tab === "blog" && <BlogTab initialPosts={initialPosts} />}
              {tab === "submissions" && <SubmissionsTab initialSubmissions={initialSubmissions} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
