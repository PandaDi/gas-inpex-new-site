import Link from "next/link";
import { COMPANY, CATALOG_CATEGORIES } from "@/lib/constants";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Главная" },
    { href: "/services", label: "Услуги" },
    { href: "/objects", label: "Объекты" },
    { href: "/certificates", label: "Сертификаты" },
    { href: "/partners", label: "Партнёры" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div>
            <h3 className="text-xl font-bold mb-3">{COMPANY.shortName}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {COMPANY.tagline}
            </p>
            <p className="text-sm text-white/70 leading-relaxed mt-2">
              Надёжный партнёр в сфере газового оборудования и автоматизации.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-base font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <FaPhone className="text-xs text-accent" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <FaEnvelope className="text-xs text-accent" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-xs text-accent mt-0.5 shrink-0" />
                  {COMPANY.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-base font-semibold mb-3">Каталог</h4>
            <ul className="space-y-2 text-sm">
              {CATALOG_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog/${cat.slug}`}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {COMPANY.shortName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}