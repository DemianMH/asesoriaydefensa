import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asesoriaydefensalaboralmx.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Asesoría y Defensa Laboral | Abogados laborales en México",
    template: "%s | Asesoría y Defensa Laboral",
  },
  description:
    "Despacho especializado en derecho laboral. Asesoría y defensa en despidos injustificados, indemnizaciones, demandas laborales y cumplimiento para empresas. Primera consulta gratis.",
  keywords: [
    "abogado laboral",
    "despido injustificado",
    "asesoría laboral",
    "defensa laboral",
    "indemnización laboral",
    "demanda laboral México",
    "abogado de trabajo",
    "derechos del trabajador",
  ],
  authors: [{ name: "Asesoría y Defensa Laboral" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Asesoría y Defensa Laboral",
    title: "Asesoría y Defensa Laboral | Abogados laborales en México",
    description:
      "Protegemos tus derechos como trabajador o empleador con estrategia legal, cercanía humana y resultados reales.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Asesoría y Defensa Laboral" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesoría y Defensa Laboral",
    description:
      "Despacho especializado en derecho laboral. Primera asesoría gratuita.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Asesoría y Defensa Laboral",
  description:
    "Despacho especializado en derecho laboral: despidos injustificados, indemnizaciones y asesoría a empresas.",
  url: siteUrl,
  image: `${siteUrl}/images/logo.png`,
  telephone: "+52 33 1455 7020",
  priceRange: "$$",
  areaServed: "MX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guadalajara",
    addressRegion: "Jalisco",
    addressCountry: "MX",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
        <Script src="https://widget.manychat.com/5650194_e8dbe.js" strategy="afterInteractive" />
        <Script src="https://mccdn.me/assets/js/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
