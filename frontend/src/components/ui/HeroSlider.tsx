"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Промышленное газовое оборудование",
    subtitle: "Поставка, монтаж и сервисное обслуживание газового оборудования для промышленных объектов",
    cta: "Перейти в каталог",
    ctaLink: "/catalog/industrial",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
  },
  {
    title: "Автоматизация (АСУ ТП)",
    subtitle: "Разработка и внедрение систем автоматизации технологических процессов",
    cta: "Наши услуги",
    ctaLink: "/services",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=80",
  },
  {
    title: "Умный дом и КИПиА",
    subtitle: "Современные решения для управления инженерными системами и контрольно-измерительные приборы",
    cta: "Подробнее",
    ctaLink: "/catalog/smarthome",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
  },
  {
    title: "Надёжность и качество",
    subtitle: "Сертифицированное оборудование, профессиональный монтаж и гарантия на все виды работ",
    cta: "О компании",
    ctaLink: "/#about",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
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

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === current
                ? "bg-accent w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}