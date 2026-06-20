"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, CATALOG_CATEGORIES } from "@/lib/constants";
import { FaChevronDown, FaBars } from "react-icons/fa";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                GAS INPEX
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                if (link.label === "Каталог") {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setCatalogOpen(true)}
                      onMouseLeave={() => setCatalogOpen(false)}
                    >
                      <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-dark hover:text-primary rounded-md hover:bg-gray-light transition-all cursor-pointer select-none">
                        {link.label}
                        <FaChevronDown className="text-[10px]" />
                      </span>
                      {catalogOpen && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-mid py-2 z-50">
                          {CATALOG_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/catalog/${cat.slug}`}
                              className="block px-4 py-2.5 text-sm text-gray-dark hover:text-primary hover:bg-gray-light transition-colors"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-dark hover:text-primary rounded-md hover:bg-gray-light transition-all"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA button - desktop */}
            <Link
              href="/contacts"
              className="hidden lg:inline-flex bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              Связаться
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-dark hover:text-primary transition-colors"
              aria-label="Открыть меню"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}