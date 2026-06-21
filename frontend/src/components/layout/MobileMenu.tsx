"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaIndustry, FaFire, FaHome, FaMicrochip } from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCatOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const catalogItems = [
    { href: "/catalog/industrial", label: "Промышленное газовое оборудование", icon: FaIndustry },
    { href: "/catalog/boilers", label: "Бытовые котлы", icon: FaFire },
    { href: "/catalog/smarthome", label: "Системы «Умный дом»", icon: FaHome },
    { href: "/catalog/kipia", label: "Оборудование КИПиА", icon: FaMicrochip },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Menu panel */}
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-all duration-300 overflow-y-auto"
        style={{ animation: "slideIn 0.3s ease-out" }}
      >
        <style jsx>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Закрыть меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-navy bg-gray-50"
          >
            Главная
          </Link>
          <Link
            href="/services"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Услуги
          </Link>
          <Link
            href="/objects"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Объекты
          </Link>
          <Link
            href="/certificates"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Сертификаты
          </Link>
          <Link
            href="/partners"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Партнеры
          </Link>

          {/* Catalog mobile accordion */}
          <div>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Каталог
              <FaChevronDown
                className={`text-xs transition ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {catalogItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm text-gray-500 hover:text-red-brand"
                  >
                    <item.icon className="w-5 inline-block mr-1" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contacts"
            onClick={onClose}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Контакты
          </Link>
          <Link
            href="/contacts"
            onClick={onClose}
            className="block mt-3 px-5 py-3 bg-red-brand text-white text-sm font-semibold rounded-lg text-center"
          >
            Связаться
          </Link>
        </div>
      </div>
    </>
  );
}