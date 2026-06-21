import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import StickyCTA from "@/components/layout/StickyCTA";

const siteUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default:
      "Gas Inpex — Инжиниринг, автоматизация и поставка газового оборудования",
    template: "%s — Gas Inpex",
  },
  description:
    "ТОО «Gas Inpex» — инжиниринг, автоматизация (АСУ ТП), поставка промышленного газового оборудования, проектирование систем Умный дом. г. Темиртау.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Gas Inpex",
    title: "Gas Inpex — Инжиниринг, автоматизация и поставка газового оборудования",
    description: "ТОО «Gas Inpex» — инжиниринг, автоматизация (АСУ ТП), поставка промышленного газового оборудования.",
    url: "https://pandadi.github.io/gas-inpex-site/",
    images: [{ url: "https://pandadi.github.io/gas-inpex-site/static/images/og-preview.webp" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🔥</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gas Inpex",
    legalName: "ТОО «Gas Inpex»",
    url: "https://pandadi.github.io/gas-inpex-site/",
    image: "https://pandadi.github.io/gas-inpex-site/static/images/hero-supply.webp",
    telephone: "+772****7890",
    email: "info@gasinpex.kz",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Темиртау",
      streetAddress: "ул. Амангельды, 112",
      addressCountry: "KZ",
    },
    areaServed: "Казахстан",
    description: "Инжиниринг, автоматизация АСУ ТП, поставка и сервис газового оборудования.",
  };

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-white">
        {/* SEO H1 (hidden, for crawlers) */}
        <h1 className="sr-only">Gas Inpex — Инжиниринг, автоматизация и поставка газового оборудования в Казахстане</h1>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <StickyCTA />
      </body>
    </html>
  );
}