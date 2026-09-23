"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { deleteBlogPost, saveBlogPost } from "@/actions/admin-content";
import { Card, Field, IconButton, TextArea, TextInput } from "./shared";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function emptyPost(): BlogPost {
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    image: "https://picsum.photos/seed/nuevo-post/1200/700",
    category: "Derecho Laboral",
    date: new Date().toISOString().slice(0, 10),
    likes: 0,
    published: true,
  };
}

export default function BlogTab({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [statusById, setStatusById] = useState<Record<string, string>>({});

  const updatePost = (id: string, patch: Partial<BlogPost>) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const handleSave = async (post: BlogPost) => {
    setPendingId(post.id);
    const finalPost = { ...post, slug: post.slug || slugify(post.title) };
    updatePost(post.id, { slug: finalPost.slug });
    const result = await saveBlogPost(finalPost);
    setStatusById((s) => ({ ...s, [post.id]: result.ok ? result.message : `Error: ${result.message}` }));
    setPendingId(null);
  };

  const handleDelete = async (id: string) => {
    setPendingId(id);
    const result = await deleteBlogPost(id);
    if (result.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
    setPendingId(null);
  };

  const addPost = () => {
    const post = emptyPost();
    setPosts([post, ...posts]);
    setOpenId(post.id);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <Card title="Blog / Foro informativo" description="Crea, edita, publica o elimina publicaciones.">
        <button
          type="button"
          onClick={addPost}
          className="inline-flex items-center gap-2 self-start rounded-full border border-gold-400/50 px-4 py-2 text-sm font-medium text-gold-700 hover:bg-gold-50"
        >
          <Plus size={16} /> Nueva publicación
        </button>

        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const isOpen = openId === post.id;
            return (
              <div key={post.id} className="rounded-xl border border-navy-900/10">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : post.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <div>
                    <p className="font-medium text-navy-900">{post.title || "(Sin título)"}</p>
                    <p className="text-xs text-navy-700/60">
                      {post.published ? "Publicado" : "Borrador"} · {post.likes} likes
                    </p>
                  </div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="flex flex-col gap-3 border-t border-navy-900/10 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Título">
                        <TextInput
                          value={post.title}
                          onChange={(e) => updatePost(post.id, { title: e.target.value })}
                        />
                      </Field>
                      <Field label="Slug (URL)">
                        <TextInput
                          value={post.slug}
                          placeholder="se genera automáticamente"
                          onChange={(e) => updatePost(post.id, { slug: slugify(e.target.value) })}
                        />
                      </Field>
                      <Field label="Categoría">
                        <TextInput
                          value={post.category}
                          onChange={(e) => updatePost(post.id, { category: e.target.value })}
                        />
                      </Field>
                      <Field label="Imagen (URL)">
                        <TextInput
                          value={post.image}
                          onChange={(e) => updatePost(post.id, { image: e.target.value })}
                        />
                      </Field>
                      <Field label="Fecha">
                        <TextInput
                          type="date"
                          value={post.date.slice(0, 10)}
                          onChange={(e) => updatePost(post.id, { date: e.target.value })}
                        />
                      </Field>
                      <Field label="Estado">
                        <label className="flex items-center gap-2 pt-2 text-sm">
                          <input
                            type="checkbox"
                            checked={post.published}
                            onChange={(e) => updatePost(post.id, { published: e.target.checked })}
                          />
                          Publicado
                        </label>
                      </Field>
                    </div>
                    <Field label="Resumen (excerpt)">
                      <TextArea
                        rows={2}
                        value={post.excerpt}
                        onChange={(e) => updatePost(post.id, { excerpt: e.target.value })}
                      />
                    </Field>
                    <Field label="Contenido completo">
                      <TextArea
                        rows={8}
                        value={post.content}
                        onChange={(e) => updatePost(post.id, { content: e.target.value })}
                      />
                    </Field>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSave(post)}
                          disabled={pendingId === post.id}
                          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                          <Save size={14} />
                          {pendingId === post.id ? "Guardando..." : "Guardar"}
                        </button>
                        <IconButton
                          variant="danger"
                          title="Eliminar publicación"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                      {statusById[post.id] && (
                        <p className="text-xs text-emerald-600">{statusById[post.id]}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
