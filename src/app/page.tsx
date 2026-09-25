import { readContent } from "@/lib/store";
import type { BlogPost, Faq, SiteContent, Testimonial } from "@/lib/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import SuccessCases from "@/components/sections/SuccessCases";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/sections/ContactForm";

export const revalidate = 0;

export default async function Home() {
  const [site, faqs, testimonials, posts] = await Promise.all([
    readContent<SiteContent>("site"),
    readContent<Faq[]>("faqs"),
    readContent<Testimonial[]>("testimonials"),
    readContent<BlogPost[]>("posts"),
  ]);

  return (
    <>
      <Header whatsappNumber={site.contactInfo.whatsappNumber} />
      <main className="flex-1">
        <Hero
          slides={site.banner}
          kicker={site.hero.kicker}
          heading={site.hero.heading}
          subheading={site.hero.subheading}
        />
        <About site={site} />
        <Services />
        <SuccessCases testimonials={testimonials} />
        <Blog posts={posts} />
        <FAQ faqs={faqs} />
        <ContactForm site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
