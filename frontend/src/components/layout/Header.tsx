"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { FaChevronDown, FaPhoneAlt, FaIndustry, FaFire, FaHome, FaMicrochip } from "react-icons/fa";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const catalogItems = [
    { href: "/catalog/industrial", label: "Промышленное газовое оборудование", icon: FaIndustry },
    { href: "/catalog/boilers", label: "Бытовые котлы", icon: FaFire },
    { href: "/catalog/smarthome", label: "Системы «Умный дом»", icon: FaHome },
    { href: "/catalog/kipia", label: "Оборудование КИПиА", icon: FaMicrochip },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-all duration-300"
      style={{ boxShadow: scrolled ? "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" : "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? "3.5rem" : "4rem" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span
              className="font-black tracking-tight transition-all"
              style={{ fontSize: scrolled ? "1.25rem" : "1.5rem" }}
            >
              <span className="text-red-brand">GAS</span>
              <span className="text-navy">INPEX</span>
            </span>
          </Link>

          {/* Desktop Nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`nav-link px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/") && pathname === "/" ? "text-navy active" : "text-gray-600 hover:text-navy"}`}
            >
              Главная
            </Link>
            <Link
              href="/services"
              className={`nav-link px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/services") ? "text-navy active" : "text-gray-600 hover:text-navy"}`}
            >
              Услуги
            </Link>
            <Link
              href="/objects"
              className={`nav-link px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/objects") ? "text-navy active" : "text-gray-600 hover:text-navy"}`}
            >
              Объекты
            </Link>
            <Link
              href="/certificates"
              className={`nav-link px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/certificates") ? "text-navy active" : "text-gray-600 hover:text-navy"}`}
            >
              Сертификаты
            </Link>
            <Link
              href="/partners"
              className={`nav-link px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/partners") ? "text-navy active" : "text-gray-600 hover:text-navy"}`}
            >
              Партнеры
            </Link>
            {/* Catalog with dropdown */}
            <div className="group relative inline-flex items-center">
              <Link
                href="/catalog/industrial"
                className="nav-link px-2 xl:px-3 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap"
              >
                <span className="flex items-center gap-1">
                  Каталог
                  <FaChevronDown className="text-[10px] transition group-hover:rotate-180" />
                </span>
              </Link>
              <div className="dropdown-content absolute top-full left-2 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                {catalogItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-brand transition"
                  >
                    <item.icon className="w-5 inline-block text-navy mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/contacts"
              className={`px-2 xl:px-3 py-2 text-sm font-medium ${isActive("/contacts") ? "text-navy" : "text-gray-600 hover:text-navy"}`}
            >
              Контакты
            </Link>
            {/* CTA Button */}
            <Link
              href="/contacts"
              className="ml-3 px-5 py-2.5 bg-red-brand text-white text-sm font-semibold rounded-lg hover:bg-red-dark transition shadow-lg flex items-center gap-2"
              style={{ boxShadow: "0 10px 15px -3px rgba(230,0,0,0.2)" }}
            >
              <FaPhoneAlt /> Связаться
            </Link>
          </nav>

          {/* Hamburger (mobile < lg) */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}