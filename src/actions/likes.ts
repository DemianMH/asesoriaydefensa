"use server";

import { readContent, writeContent } from "@/lib/store";
import type { BlogPost } from "@/lib/types";

export async function toggleLike(postId: string, like: boolean): Promise<number> {
  const posts = await readContent<BlogPost[]>("posts");
  const post = posts.find((p) => p.id === postId);
  if (!post) return 0;

  post.likes = Math.max(0, post.likes + (like ? 1 : -1));
  await writeContent("posts", posts);
  return post.likes;
}
