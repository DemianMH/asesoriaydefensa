import type { MetadataRoute } from "next";
import { readContent } from "@/lib/store";
import type { BlogPost } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asesoriaydefensalaboralmx.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await readContent<BlogPost[]>("posts");

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((p) => p.published)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
  ];
}
