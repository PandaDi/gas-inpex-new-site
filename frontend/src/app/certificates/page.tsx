"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCertificate,
  FaFileExport,
  FaCalendarAlt,
} from "react-icons/fa";

const iconColors = [
  { iconBg: "bg-red-brand/10", iconColor: "text-red-brand" },
  { iconBg: "bg-navy/10", iconColor: "text-navy" },
  { iconBg: "bg-red-brand/10", iconColor: "text-red-brand" },
  { iconBg: "bg-navy/10", iconColor: "text-navy" },
  { iconBg: "bg-red-brand/10", iconColor: "text-red-brand" },
  { iconBg: "bg-navy/10", iconColor: "text-navy" },
];

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/certificates/")
      .then((r) => r.json())
      .then((data) => {
        setCerts(data.results || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Документы</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Сертификаты и лицензии</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Вся деятельность компании подтверждена соответствующими лицензиями и сертификатами качества
          </p>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">Загрузка...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certs.map((cert: any, i: number) => {
                const colors = iconColors[i % iconColors.length];
                return (
                  <div
                    key={cert.id || i}
                    className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-red-brand/30 transition-all hover:shadow-lg"
                  >
                    <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                      <FaCertificate className={`text-3xl ${colors.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{cert.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {cert.description || ""}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FaCalendarAlt />
                      <span>
                        {cert.issue_date ? `Выдан: ${cert.issue_date}` : ""}
                        {cert.issue_date && cert.expiry_date ? " | " : ""}
                        {cert.expiry_date ? `Действителен до: ${cert.expiry_date}` : ""}
                        {!cert.issue_date && !cert.expiry_date ? "Актуальность подтверждается по запросу" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Запросить копии документов</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Мы предоставим заверенные копии всех лицензий и сертификатов по вашему запросу
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-brand text-white font-semibold rounded-lg hover:bg-red-dark transition shadow-lg shadow-red-500/20"
          >
            <FaFileExport /> Отправить запрос
          </Link>
        </div>
      </section>
    </>
  );
}