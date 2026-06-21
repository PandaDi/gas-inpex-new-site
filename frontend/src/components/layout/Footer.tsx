import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaClock,
  FaChevronRight,
  FaIndustry,
  FaFire,
  FaHome,
  FaMicrochip,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Главная" },
    { href: "/services", label: "Услуги" },
    { href: "/objects", label: "Объекты" },
    { href: "/certificates", label: "Сертификаты" },
    { href: "/partners", label: "Партнеры" },
    { href: "/contacts", label: "Контакты" },
  ];

  const catalogLinks = [
    { href: "/catalog/industrial", label: "Промышленное газовое оборудование", icon: FaChevronRight },
    { href: "/catalog/boilers", label: "Бытовые котлы", icon: FaChevronRight },
    { href: "/catalog/smarthome", label: "Системы «Умный дом»", icon: FaChevronRight },
    { href: "/catalog/kipia", label: "Оборудование КИПиА", icon: FaChevronRight },
  ];

  return (
    <footer className="bg-navy border-t border-white/10 pt-12 sm:pt-16 pb-24 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Logo + description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-black tracking-tight">
                <span className="text-red-brand">GAS</span>
                <span className="text-white">INPEX</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Инжиниринг, автоматизация и поставка газового оборудования в Казахстане с 2010 года.
            </p>
          </div>

          {/* Column 2: Contacts */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-brand mt-1 shrink-0" />
                <span>г. Темиртау,<br />ул. Амангельды, 112</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-brand shrink-0" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-white transition">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-brand shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-red-brand shrink-0" />
                <a href={COMPANY.whatsappLink} className="hover:text-white transition">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaInstagram className="text-red-brand shrink-0" />
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-red-brand shrink-0" />
                <span>Пн–Пт: 09:00–18:00</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition flex items-center gap-2"
                  >
                    <FaChevronRight className="text-[10px] text-red-brand" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Catalog */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Каталог</h4>
            <ul className="space-y-2.5 text-sm">
              {catalogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition flex items-center gap-2"
                  >
                    <FaChevronRight className="text-[10px] text-red-brand" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 ТОО «Gas Inpex». Все права защищены.</p>
          <div className="flex items-center gap-4">
            <Link href="/contacts" className="hover:text-white transition">
              Политика конфиденциальности
            </Link>
            <Link href="/contacts" className="hover:text-white transition">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}