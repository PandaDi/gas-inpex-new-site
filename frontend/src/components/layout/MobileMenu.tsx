"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, CATALOG_CATEGORIES } from "@/lib/constants";
import { FaTimes, FaChevronDown } from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCatalogOpen(false);
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

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-primary">
            GAS INPEX
          </span>
          <button
            onClick={onClose}
            className="p-2 text-gray-dark hover:text-accent transition-colors"
            aria-label="Закрыть меню"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              if (link.label === "Каталог") {
                return (
                  <li key={link.label}>
                    <button
                      onClick={() => setCatalogOpen(!catalogOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-dark hover:text-primary hover:bg-gray-light rounded-lg transition-colors"
                    >
                      <span>{link.label}</span>
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          catalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {catalogOpen && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
                        {CATALOG_CATEGORIES.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/catalog/${cat.slug}`}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-gray-dark hover:text-primary hover:bg-gray-light rounded-lg transition-colors"
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-dark hover:text-primary hover:bg-gray-light rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/contacts"
            onClick={onClose}
            className="block w-full text-center bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
          >
            Связаться
          </Link>
        </div>
      </div>
    </>
  );
}