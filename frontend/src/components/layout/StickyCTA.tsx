"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { COMPANY } from "@/lib/constants";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center justify-between sticky-cta ${
        show ? "show" : ""
      }`}
    >
      <span className="text-sm font-semibold text-navy">
        Нужна консультация?
      </span>
      <a
        href={`tel:${COMPANY.phoneRaw}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-brand text-white text-sm font-semibold rounded-lg hover:bg-red-dark transition"
      >
        <FaPhoneAlt /> Вызвать инженера
      </a>
    </div>
  );
}