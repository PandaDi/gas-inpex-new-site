import Link from "next/link";
import { FaWrench, FaBoxes, FaProjectDiagram, FaPhoneAlt } from "react-icons/fa";
import type { IconType } from "react-icons";

interface QuickLinkItem {
  icon: IconType;
  title: string;
  description: string;
  href: string;
}

const links: QuickLinkItem[] = [
  {
    icon: FaWrench,
    title: "Услуги",
    description: "Инжиниринг, монтаж и сервисное обслуживание",
    href: "/services",
  },
  {
    icon: FaBoxes,
    title: "Каталог",
    description: "Промышленное оборудование, котлы, КИПиА",
    href: "/catalog/industrial",
  },
  {
    icon: FaProjectDiagram,
    title: "Объекты",
    description: "Реализованные проекты и портфолио",
    href: "/objects",
  },
  {
    icon: FaPhoneAlt,
    title: "Контакты",
    description: "Свяжитесь с нами для консультации",
    href: "/contacts",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-12 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-mid/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <link.icon size={24} />
              </div>
              <h3 className="text-base font-semibold text-gray-dark mb-1 group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-dark/60">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}