"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      id="scrollTopBtn"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-red-brand text-white shadow-lg hover:bg-red-dark transition flex items-center justify-center ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Наверх"
    >
      <FaArrowUp />
    </button>
  );
}