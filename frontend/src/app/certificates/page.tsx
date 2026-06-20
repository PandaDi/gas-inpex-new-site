import type { Metadata } from "next";
import CertificateCard from "@/components/ui/CertificateCard";

export const metadata: Metadata = {
  title: "Сертификаты",
  description:
    "Сертификаты и лицензии компании Gas Inpex на осуществление деятельности по газоснабжению, автоматизации и монтажу оборудования.",
};

const certificates = [
  {
    title: "Сертификат соответствия на газовое оборудование",
    validUntil: "Декабрь 2026",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Сертификат+1",
  },
  {
    title: "Лицензия на монтаж газового оборудования",
    validUntil: "Март 2027",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Лицензия",
  },
  {
    title: "Сертификат соответствия системы менеджмента качества ISO 9001",
    validUntil: "Сентябрь 2025",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=ISO+9001",
  },
  {
    title: "Разрешение на применение газового оборудования",
    validUntil: "Июнь 2026",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Разрешение",
  },
  {
    title: "Сертификат на контрольно-измерительные приборы",
    validUntil: "Январь 2027",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=КИПиА",
  },
  {
    title: "Аттестат аккредитации лаборатории КИПиА",
    validUntil: "Октябрь 2025",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Лаборатория",
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Сертификаты и лицензии</h1>
          <p className="text-white/70 mt-2">
            Документы, подтверждающие качество и безопасность наших услуг
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.title} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
}