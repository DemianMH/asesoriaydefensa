import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { readContent } from "@/lib/store";
import type { BlogPost, ContactSubmission, Faq, SiteContent, Testimonial } from "@/lib/types";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Panel administrador" };
export const revalidate = 0;

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const [site, faqs, testimonials, posts, submissions] = await Promise.all([
    readContent<SiteContent>("site"),
    readContent<Faq[]>("faqs"),
    readContent<Testimonial[]>("testimonials"),
    readContent<BlogPost[]>("posts"),
    readContent<ContactSubmission[]>("submissions"),
  ]);

  return (
    <AdminDashboard
      initialSite={site}
      initialFaqs={faqs}
      initialTestimonials={testimonials}
      initialPosts={posts}
      initialSubmissions={submissions}
    />
  );
}
