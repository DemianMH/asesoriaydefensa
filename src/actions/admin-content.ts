"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/store";
import type { BlogPost, ContactSubmission, Faq, SiteContent, Testimonial } from "@/lib/types";

type ActionResult = { ok: boolean; message: string };

function fail(error: unknown): ActionResult {
  const message = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
  return { ok: false, message };
}

function refreshSite() {
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- Site content (banner, hero, about, contact info, stats) ----------

export async function saveSiteContent(content: SiteContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    await writeContent("site", content);
    refreshSite();
    return { ok: true, message: "Contenido general actualizado." };
  } catch (error) {
    return fail(error);
  }
}

// ---------- FAQs ----------

export async function saveFaqs(faqs: Faq[]): Promise<ActionResult> {
  try {
    await requireAdmin();
    await writeContent("faqs", faqs);
    refreshSite();
    return { ok: true, message: "Preguntas frecuentes actualizadas." };
  } catch (error) {
    return fail(error);
  }
}

// ---------- Testimonials ----------

export async function saveTestimonials(testimonials: Testimonial[]): Promise<ActionResult> {
  try {
    await requireAdmin();
    await writeContent("testimonials", testimonials);
    refreshSite();
    return { ok: true, message: "Testimonios actualizados." };
  } catch (error) {
    return fail(error);
  }
}

// ---------- Blog / forum posts ----------

export async function saveBlogPost(post: BlogPost): Promise<ActionResult> {
  try {
    await requireAdmin();
    const posts = await readContent<BlogPost[]>("posts");
    const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    await writeContent("posts", posts);
    refreshSite();
    return { ok: true, message: "Publicación guardada." };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteBlogPost(postId: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const posts = await readContent<BlogPost[]>("posts");
    const next = posts.filter((p) => p.id !== postId);
    await writeContent("posts", next);
    refreshSite();
    return { ok: true, message: "Publicación eliminada." };
  } catch (error) {
    return fail(error);
  }
}

// ---------- Contact submissions ----------

export async function markSubmissionRead(id: string, read: boolean): Promise<ActionResult> {
  try {
    await requireAdmin();
    const submissions = await readContent<ContactSubmission[]>("submissions");
    const submission = submissions.find((s) => s.id === id);
    if (submission) submission.read = read;
    await writeContent("submissions", submissions);
    revalidatePath("/admin");
    return { ok: true, message: "Actualizado." };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const submissions = await readContent<ContactSubmission[]>("submissions");
    const next = submissions.filter((s) => s.id !== id);
    await writeContent("submissions", next);
    revalidatePath("/admin");
    return { ok: true, message: "Mensaje eliminado." };
  } catch (error) {
    return fail(error);
  }
}
