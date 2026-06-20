import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

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
    "ТОО «Gas Inpex» — инжиниринг, автоматизация (АСУ ТП), поставка промышленного газового оборудования. г. Темиртау.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Gas Inpex",
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
  return (
    <html lang="ru">
      <body className="font-sans antialiased text-gray-dark bg-white">
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}