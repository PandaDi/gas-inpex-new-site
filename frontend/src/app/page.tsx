"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaLayerGroup,
  FaChevronLeft,
  FaChevronRight,
  FaCogs,
  FaTools,
  FaDraftingCompass,
  FaHeadset,
  FaCheckCircle,
  FaShieldAlt,
  FaCubes,
  FaHome,
  FaHardHat,
  FaIndustry,
  FaFire,
  FaThermometerHalf,
  FaCalendarAlt,
  FaArrowUp,
  FaAward,
  FaMicrochip,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaTruck,
  FaRobot,
} from "react-icons/fa";

// ============================================================
// HERO SLIDER
// ============================================================
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      badge: "АСУ ТП",
      title: "Инжиниринг и Автоматизация",
      desc: "Проектирование и внедрение систем автоматизации технологических процессов (АСУ ТП) для промышленных объектов любой сложности.",
      image: "/images/hero-industrial.webp",
    },
    {
      badge: "Оборудование",
      title: "Поставка газового оборудования",
      desc: "Широкий ассортимент промышленного и бытового газового оборудования от ведущих мировых производителей.",
      image: "/images/hero-supply.webp",
    },
    {
      badge: "Smart Home",
      title: "Проектирование систем Умного дома",
      desc: "Комплексные решения автоматизации жилых помещений: климат-контроль, освещение, безопасность и мультимедиа.",
      image: "/images/hero-smarthome.webp",
    },
    {
      badge: "Сервис",
      title: "Гарантийное и сервисное обслуживание",
      desc: "Оперативное сервисное обслуживание, ремонт и техническая поддержка всего поставляемого оборудования.",
      image: "/images/hero-service.webp",
    },
  ];

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[420px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-[#001A33]/70 to-transparent z-10" />
            <div
              className="absolute inset-0"
              style={{ background: `url(${slide.image}) center/cover no-repeat` }}
            />
            <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-red-brand text-white text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                  {slide.badge}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl">
                  {slide.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/contacts"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-brand text-white font-semibold rounded-lg hover:bg-red-dark transition shadow-xl shadow-red-500/20 text-sm sm:text-base"
                  >
                    Получить консультацию <FaArrowRight className="text-sm" />
                  </Link>
                  <Link
                    href="/catalog/industrial"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/25 backdrop-blur-sm text-sm sm:text-base"
                  >
                    Смотреть каталог <FaLayerGroup className="text-sm" />
                  </Link>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-3">
                    <div className="text-white font-bold">15+ лет</div>
                    <div className="text-xs text-gray-300">опыта в инженерии</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-3">
                    <div className="text-white font-bold">230+ объектов</div>
                    <div className="text-xs text-gray-300">по Казахстану</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-3">
                    <div className="text-white font-bold">АСУ ТП + Газофикации</div>
                    <div className="text-xs text-gray-300">единый подрядчик</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-red-brand w-8" : "bg-white/40 w-3 hover:bg-white/70"
              }`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="hero-prev absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition border border-white/20"
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>
        <button
          onClick={next}
          className="hero-next absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition border border-white/20"
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </button>
      </div>
    </section>
  );
}

// ============================================================
// QUICK LINKS
// ============================================================
function QuickLinks() {
  const links = [
    { href: "/services", icon: FaCogs, title: "Наши услуги", desc: "Полный спектр" },
    { href: "/catalog/industrial", icon: FaTools, title: "Оборудование", desc: "Газовое и КИПиА" },
    { href: "/services", icon: FaDraftingCompass, title: "Проектирование", desc: "Систем любой сложности" },
    { href: "/services", icon: FaHeadset, title: "Обслуживание", desc: "Гарантийное и сервисное" },
  ];

  return (
    <section className="quick-links-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 text-center border border-gray-100 hover:border-[#E60000]/20 hover:-translate-y-1"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-red-brand transition-colors">
              <link.icon className="text-xl sm:text-2xl text-navy group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-navy group-hover:text-red-brand transition-colors">
              {link.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WORK PROCESS
// ============================================================
function WorkProcess() {
  const steps = [
    { num: "01", title: "Обследование", desc: "Выезд на объект, сбор данных, оценка текущего оборудования и задач." },
    { num: "02", title: "Подбор решения", desc: "Коммерческое предложение, подбор КИПиА, газового оборудования и автоматики." },
    { num: "03", title: "Монтаж и запуск", desc: "СМР, ПНР, программирование, обучение персонала и сервисное сопровождение." },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-6 bg-navy text-white">
              <div className="text-sm uppercase tracking-widest text-gray-300 mb-2">Как работаем</div>
              <h2 className="text-2xl font-bold">Понятный путь от заявки до запуска</h2>
            </div>
            {steps.map((step) => (
              <div key={step.num} className="p-6 hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-lg bg-red-brand/10 text-red-brand flex items-center justify-center mb-4 font-bold">
                  {step.num}
                </div>
                <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">О компании</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3 mb-6 leading-tight">
              ТОО «Gas Inpex» — <br className="hidden sm:block" />ваш надёжный партнёр
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Компания <strong className="text-navy">Gas Inpex</strong> основана в
                2010 году и является одним из ведущих поставщиков промышленного
                газового оборудования и систем автоматизации в Республике Казахстан.
              </p>
              <p>
                Мы специализируемся на проектировании и внедрении{" "}
                <strong className="text-navy">АСУ ТП</strong>, систем «Умный
                дом», а также на комплексной поставке котельного оборудования,
                газогорелочных устройств, запорно-регулирующей арматуры и КИПиА.
              </p>
              <p>
                За 15 лет работы мы реализовали более{" "}
                <strong className="text-red-brand">230 проектов</strong> по всему
                Казахстану, сотрудничая с ведущими промышленными предприятиями,
                коммерческими и частными заказчиками.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-red-brand text-lg" />
                <span className="text-sm text-gray-600">Разрешительные документы по запросу</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-red-brand text-lg" />
                <span className="text-sm text-gray-600">Сертификат ISO 9001</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-red-brand text-lg" />
                <span className="text-sm text-gray-600">Член НПП «Атамекен»</span>
              </div>
            </div>
          </div>

          {/* Right: Presentation card */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-navy relative group">
            <div className="relative aspect-video overflow-hidden">
              <img
                src="/images/about-video-thumbnail.webp"
                alt="Инженерные решения Gas Inpex"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-[#001A33]/30 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-brand text-xs font-semibold uppercase tracking-wider mb-3">
                  <FaShieldAlt /> Инженерный подход
                </div>
                <h3 className="text-2xl font-bold mb-2">От обследования до запуска объекта</h3>
                <p className="text-sm text-gray-200">
                  Подбираем оборудование, проектируем, монтируем, программируем АСУ ТП и сопровождаем после ввода в эксплуатацию.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10 bg-navy text-white">
              <div className="p-4 text-center">
                <div className="text-lg font-bold text-red-brand">24/7</div>
                <div className="text-xs text-gray-300">поддержка</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-lg font-bold text-red-brand">Казахстан</div>
                <div className="text-xs text-gray-300">выезд на объект</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-lg font-bold text-red-brand">Гарантия</div>
                <div className="text-xs text-gray-300">на работы</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES GRID
// ============================================================
function ServicesGrid() {
  const engineeringServices = [
    { icon: FaCubes, title: "Проектирование систем", desc: "Разработка проектной и рабочей документации для систем автоматизации, диспетчеризации и управления технологическими процессами." },
    { icon: FaHome, title: "Системы «Умный дом»", desc: "Интегрированные решения автоматизации жилых помещений: климат-контроль, освещение, безопасность, мультимедиа и энергоменеджмент." },
    { icon: FaHardHat, title: "СМР и ПНР", desc: "Строительно-монтажные и пусконаладочные работы «под ключ» с гарантией качества и соблюдением сроков." },
  ];
  const supplyServices = [
    { icon: FaIndustry, title: "Промышленные котельные", desc: "Поставка и монтаж промышленных котельных установок, газогорелочных устройств, теплообменников и вспомогательного оборудования." },
    { icon: FaFire, title: "Бытовые котлы", desc: "Широкий выбор настенных и напольных газовых котлов ведущих брендов (Ariston, Baxi, Vaillant, Buderus) с установкой и настройкой." },
    { icon: FaThermometerHalf, title: "Датчики утечки газа и климат-контроль", desc: "Системы газового мониторинга, сигнализации утечки, термостаты и контроллеры для автоматического управления микроклиматом." },
  ];

  const ServiceCard = ({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) => (
    <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#E60000]/20 hover:-translate-y-1">
      <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red-brand/10 transition-colors">
        <Icon className="text-2xl text-navy group-hover:text-red-brand transition-colors" />
      </div>
      <h4 className="text-lg font-bold text-navy mb-2">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-brand mt-4 hover:gap-3 transition-all"
      >
        Подробнее <FaArrowRight className="text-xs" />
      </Link>
    </div>
  );

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Направления</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3">
            Перечень предоставляемых услуг
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Комплексные решения от проектирования до ввода в эксплуатацию и сервисного обслуживания
          </p>
        </div>

        {/* Engineering & Automation */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-brand rounded-lg flex items-center justify-center text-white text-lg">
              <FaRobot />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy">Инжиниринг и автоматизация</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {engineeringServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* Equipment Supply & Installation */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white text-lg">
              <FaTruck />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy">Поставка оборудования и монтаж</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {supplyServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PORTFOLIO / COUNTER SECTION
// ============================================================
function PortfolioSection() {
  const projects = [
    { year: "2024", title: "Котельная ТОО «Qarmet»", icon: FaIndustry, bgClass: "project-bg-boiler-house" },
    { year: "2024", title: "ЖК «Астана» Умный дом", icon: FaHome, bgClass: "project-bg-factory" },
    { year: "2023", title: "АСУ ТП ТОО «KazMinerals»", icon: FaMicrochip, bgClass: "project-bg-automation" },
    { year: "2023", title: "Газоснабжение ТОО «Steel Corp»", icon: FaFire, bgClass: "project-bg-boiler-residential" },
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-28 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Counter */}
          <div>
            <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Наши достижения</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
              Более <span className="text-red-brand">230</span> объектов завершено
            </h2>
            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Каждый проект — это результат слаженной работы команды инженеров, проектировщиков и монтажников. Мы гордимся качеством и надёжностью каждого реализованного объекта.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-red-brand">15</span>
                <p className="text-sm text-gray-400 mt-1">Лет на рынке</p>
              </div>
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-red-brand">230</span>
                <p className="text-sm text-gray-400 mt-1">Объектов</p>
              </div>
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-red-brand">50</span>
                <p className="text-sm text-gray-400 mt-1">Специалистов</p>
              </div>
            </div>
          </div>

          {/* Right: Project cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`relative group rounded-xl overflow-hidden aspect-[4/3] shadow-xl ${project.bgClass}`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl">
                  <project.icon />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <span className="text-xs text-gray-300">{project.year}</span>
                  <h4 className="text-sm sm:text-base font-bold text-white">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CERTIFICATES SECTION
// ============================================================
function CertificatesSection() {
  const certs = [
    "Сертификат ISO 9001",
    "Разрешительные документы по запросу",
    "Сертификат соответствия",
    "Разрешение на монтаж",
    "Свидетельство СРО",
  ];

  return (
    <section id="certificates" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Документы</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3">Сертификаты и лицензии</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Вся деятельность компании подтверждена соответствующими лицензиями и сертификатами качества
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="group aspect-[3/4] bg-gray-50 rounded-xl border border-gray-200 hover:border-red-brand/30 transition-all flex flex-col items-center justify-center p-4 text-center hover:shadow-lg cursor-pointer"
            >
              <FaAward className="text-4xl text-gray-300 group-hover:text-red-brand transition-colors mb-3" />
              <span className="text-xs text-gray-500 font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PARTNERS SECTION (Infinite Horizontal Scroll)
// ============================================================
function PartnersSection() {
  const partners = [
    { icon: FaCogs, name: "Hitachi" },
    { icon: FaIndustry, name: "Toyota" },
    { icon: FaFire, name: "Caterpillar" },
    { icon: FaFire, name: "Ariston" },
    { icon: FaIndustry, name: "Qarmet" },
    { icon: FaMicrochip, name: "Siemens" },
    { icon: FaCogs, name: "Baxi" },
    { icon: FaHome, name: "Vaillant" },
  ];

  return (
    <section id="partners" className="py-14 sm:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Партнёры</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mt-3">Нам доверяют ведущие бренды</h2>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="partners-track flex items-center gap-16 sm:gap-24 py-4">
          {/* First set */}
          <div className="flex items-center gap-16 sm:gap-24">
            {partners.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-gray-400 hover:text-navy transition-colors min-w-[100px]">
                <p.icon className="text-4xl sm:text-5xl" />
                <span className="text-xs mt-2 font-semibold">{p.name}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless scroll */}
          <div className="flex items-center gap-16 sm:gap-24">
            {partners.map((p, i) => (
              <div key={`dup-${i}`} className="flex flex-col items-center text-gray-400 hover:text-navy transition-colors min-w-[100px]">
                <p.icon className="text-4xl sm:text-5xl" />
                <span className="text-xs mt-2 font-semibold">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// NEWS SECTION
// ============================================================
function NewsSection() {
  const news = [
    {
      image: "/images/news-boiler-launch.webp",
      icon: FaHardHat,
      date: "15 марта 2025",
      tag: "Новый проект",
      title: "Запуск котельной на ТОО «Qarmet»",
      desc: "Завершён монтаж и пусконаладка промышленной котельной мощностью 15 МВт для металлургического комбината.",
    },
    {
      image: "/images/news-smarthome-complex.webp",
      icon: FaHome,
      date: "28 февраля 2025",
      tag: "Smart Home",
      title: "Умный дом для ЖК «Астана»",
      desc: "Подписан договор на автоматизацию 120 квартир в новом жилом комплексе столицы.",
    },
    {
      image: "/images/news-award.webp",
      icon: FaAward,
      date: "10 февраля 2025",
      tag: "Событие",
      title: "Gas Inpex — лауреат премии «Лучший поставщик 2024»",
      desc: "Компания отмечена наградой за высокое качество услуг и вклад в развитие газовой отрасли Казахстана.",
    },
  ];

  return (
    <section id="news" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Новости</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3">Последние события</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Будьте в курсе новостей компании, новых проектов и актуальных событий отрасли
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map((item, i) => (
            <article
              key={i}
              className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className="h-48 relative flex items-center justify-center text-white/20 text-5xl overflow-hidden"
                style={{ background: `url(${item.image}) center/cover` }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <item.icon className="relative z-10" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <FaCalendarAlt />
                  <span>{item.date}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-red-brand">{item.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-red-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <Link
                  href="/objects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-brand mt-4 hover:gap-3 transition-all"
                >
                  Читать далее <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA SECTION
// ============================================================
function CTASection() {
  return (
    <section id="contacts" className="py-16 sm:py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Готовы к сотрудничеству?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
          Оставьте заявку — наши специалисты свяжутся с вами в ближайшее время и предложат оптимальное решение для вашего объекта
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+772****7890"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-brand text-white font-semibold rounded-lg hover:bg-red-dark transition shadow-lg shadow-red-500/20 text-base"
          >
            <FaPhoneAlt /> +7 (7213) 56-78-90
          </a>
          <a
            href="mailto:info@gasinpex.kz"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/20 text-base"
          >
            <FaEnvelope /> info@gasinpex.kz
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <QuickLinks />
      <WorkProcess />
      <AboutSection />
      <ServicesGrid />
      <PortfolioSection />
      <CertificatesSection />
      <PartnersSection />
      <NewsSection />
      <CTASection />
    </>
  );
}