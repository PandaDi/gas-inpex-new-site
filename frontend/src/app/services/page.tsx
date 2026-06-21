"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaRobot,
  FaCheckCircle,
  FaTruck,
  FaHome,
  FaHeadset,
  FaArrowRight,
  FaCogs,
  FaIndustry,
  FaFire,
  FaFireAlt,
  FaThermometerHalf,
  FaCubes,
  FaHardHat,
  FaTools,
  FaDraftingCompass,
} from "react-icons/fa";

const iconMap: Record<string, IconType> = {
  FaRobot, FaTruck, FaHome, FaHeadset, FaCogs, FaIndustry,
  FaFire, FaFireAlt, FaThermometerHalf, FaCubes, FaHardHat,
  FaTools, FaDraftingCompass, FaCheckCircle,
};

function resolveIcon(iconName?: string): IconType {
  if (iconName && iconMap[iconName]) return iconMap[iconName];
  return FaCogs;
}

const sectionBgColors = [
  { section: "bg-gray-50", iconBg: "bg-red-brand" },
  { section: "bg-white", iconBg: "bg-navy" },
  { section: "bg-gray-50", iconBg: "bg-red-brand" },
  { section: "bg-white", iconBg: "bg-navy" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/services/")
      .then((r) => r.json())
      .then((data) => {
        const list = data.results || data || [];
        list.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        setServices(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Направления</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Перечень предоставляемых услуг
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Комплексные решения от проектирования до ввода в эксплуатацию и сервисного обслуживания
          </p>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">Загрузка...</div>
      ) : (
        services.map((service: any, idx: number) => {
          const colors = sectionBgColors[idx % sectionBgColors.length];
          const IconComponent = resolveIcon(service.icon);
          const features = service.full_description
            ? service.full_description
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
                .slice(0, 6)
            : [];

          return (
            <section key={service.id || idx} className={`py-16 sm:py-20 ${colors.section}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-10">
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center text-white text-xl`}>
                    <IconComponent />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy">{service.title}</h2>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-red-brand hover:text-red-dark font-semibold transition whitespace-nowrap"
                  >
                    Подробнее <FaArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid lg:grid-cols-2 gap-10">
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>{service.short_description || ""}</p>
                    {service.full_description && (
                      <p className="text-sm text-gray-500">{service.full_description}</p>
                    )}
                  </div>
                  {features.length > 0 && (
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-navy mb-4">Что мы предлагаем</h3>
                      <ul className="space-y-3">
                        {features.map((item: string, fi: number) => (
                          <li key={fi} className="flex items-start gap-3">
                            <FaCheckCircle className="text-red-brand mt-1 shrink-0" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}
    </>
  );
}