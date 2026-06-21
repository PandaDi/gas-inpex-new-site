"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { COMPANY } from "@/lib/constants";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8000/api/services/${slug}/`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-20">Загрузка...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Услуга не найдена</h1>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-red-brand hover:text-red-dark font-semibold"
        >
          <FaArrowLeft size={12} /> Назад к услугам
        </Link>
      </div>
    );
  }

  const features = service.full_description
    ? service.full_description
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors"
          >
            <FaArrowLeft size={12} />
            Назад к услугам
          </Link>
          <h1 className="text-3xl font-bold">{service.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {service.short_description || service.full_description || ""}
        </p>

        {features.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-navy mb-4">
              Что мы предлагаем
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-600"
                >
                  <FaCheck size={14} className="text-red-brand mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-navy mb-2">
            Хотите заказать услугу?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Свяжитесь с нами для консультации и расчёта стоимости
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-red-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-dark transition-colors"
            >
              {COMPANY.phone}
            </a>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy/90 transition-colors"
            >
              Форма обратной связи
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
