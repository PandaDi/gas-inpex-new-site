"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  button_text: string;
  button_url: string;
  order: number;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL.replace(/\/+$/, '')}/hero-slides/`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results || [];
        items.sort((a: Slide, b: Slide) => a.order - b.order);
        setSlides(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || slides.length === 0) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning, slides.length]
  );

  const next = useCallback(() => {
    if (slides.length === 0) return;
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    if (slides.length === 0) return;
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (loading) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-navy flex items-center justify-center">
        <div className="text-white/50 text-lg">Загрузка...</div>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">
                  {slide.subtitle || "GAS INPEX"}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4 leading-tight">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                )}
                {slide.button_text && (
                  <Link
                    href={slide.button_url || "/contacts"}
                    className="inline-block bg-red-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
                    style={{ boxShadow: "0 10px 15px -3px rgba(230,0,0,0.2)" }}
                  >
                    {slide.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
            aria-label="Предыдущий слайд"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
            aria-label="Следующий слайд"
          >
            <FaChevronRight size={20} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === current
                    ? "bg-red-brand w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}