"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHandshake,
} from "react-icons/fa";

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/partners/")
      .then((r) => r.json())
      .then((data) => {
        setPartners(data.results || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const testimonials = [
    {
      initials: "АК",
      name: "А. Каримов",
      role: "Главный инженер, ТОО «Qarmet»",
      text: "Сотрудничаем с Gas Inpex более 5 лет. Профессиональный подход, качественное выполнение работ, строгое соблюдение сроков. Особо хочу отметить компетентность инженеров при внедрении АСУ ТП.",
      bgColor: "bg-navy",
    },
    {
      initials: "СМ",
      name: "С. Муратов",
      role: "Технический директор, ТОО «KazMinerals»",
      text: "Компания Gas Inpex выполнила автоматизацию нашей производственной линии на высшем уровне. Система работает без сбоев уже 2 года. Очень довольны качеством и надёжностью.",
      bgColor: "bg-red-brand",
    },
    {
      initials: "ЕК",
      name: "Е. Калиев",
      role: "Частный заказчик, г. Темиртау",
      text: "Заказывали систему \"Умный дом\" для коттеджа. Всё работает отлично: климат-контроль, освещение, безопасность. Управляю домом со смартфона. Рекомендую!",
      bgColor: "bg-navy",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Партнёры</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Наши партнеры и клиенты</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Мы сотрудничаем с ведущими мировыми производителями и крупнейшими промышленными предприятиями Казахстана
          </p>
        </div>
      </section>

      {/* PARTNERS GRID */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">Загрузка...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {partners.map((partner: any, i: number) => (
                <div
                  key={partner.id || i}
                  className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-red-brand/30 transition-all hover:shadow-lg text-center"
                >
                  <div className="w-20 h-20 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-4xl text-navy font-bold">
                        {partner.name ? partner.name.charAt(0).toUpperCase() : "?"}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-500">{partner.description || ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">Нам доверяют</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${t.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">«{t.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Станьте нашим партнёром</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Предлагаем взаимовыгодное сотрудничество производителям и поставщикам газового оборудования
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-brand text-white font-semibold rounded-lg hover:bg-red-dark transition shadow-lg shadow-red-500/20"
          >
            <FaHandshake /> Обсудить партнёрство
          </Link>
        </div>
      </section>
    </>
  );
}
