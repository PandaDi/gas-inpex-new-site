import type { Metadata } from "next";
import Link from "next/link";
import {
  FaCertificate,
  FaFileContract,
  FaTools,
  FaCheckDouble,
  FaBuilding,
  FaGraduationCap,
  FaFileExport,
  FaCalendarAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Сертификаты и лицензии — Gas Inpex",
  description:
    "Лицензии и сертификаты ТОО «Gas Inpex»: ISO 9001, лицензия ГСЛ, разрешения на монтаж, свидетельство СРО.",
};

const certs = [
  {
    icon: FaCertificate,
    title: "Документы системы качества",
    desc: "Документы системы качества и внутренние регламенты работ предоставляются по запросу клиента при подготовке договора или тендерной документации.",
    note: "Актуальные копии предоставляются по запросу",
    iconBg: "bg-red-brand/10",
    iconColor: "text-red-brand",
  },
  {
    icon: FaFileContract,
    title: "Лицензия на проектирование объектов промышленной безопасности",
    desc: "Профильные разрешительные документы и реквизиты лицензий предоставляются по запросу для проверки перед заключением договора.",
    note: "Реквизиты уточняются по актуальному комплекту документов",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
  },
  {
    icon: FaTools,
    title: "Лицензия на монтаж газового оборудования",
    desc: "Разрешение на производство монтажных работ газового оборудования и газопроводов. Включает установку, подключение, пусконаладку и испытания систем газоснабжения.",
    note: "Реквизиты уточняются по актуальному комплекту документов",
    iconBg: "bg-red-brand/10",
    iconColor: "text-red-brand",
  },
  {
    icon: FaCheckDouble,
    title: "Сертификат соответствия на оборудование",
    desc: "Сертификаты соответствия на всё поставляемое газовое оборудование: газовые горелки, котлы, регуляторы давления, газоанализаторы. Соответствие требованиям ТР ТС.",
    note: "Актуальность подтверждается по запросу",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
  },
  {
    icon: FaBuilding,
    title: "Свидетельство СРО",
    desc: "Свидетельство о допуске к работам, влияющим на безопасность объектов капитального строительства. Включает подготовку проектной документации, строительно-монтажные и пусконаладочные работы.",
    note: "Актуальность подтверждается по запросу",
    iconBg: "bg-red-brand/10",
    iconColor: "text-red-brand",
  },
  {
    icon: FaGraduationCap,
    title: "Аттестация специалистов",
    desc: "Квалификационные удостоверения и сертификаты инженерно-технического персонала. Ежегодное повышение квалификации в учебных центрах Siemens, Honeywell и Kromschröder.",
    note: "Копии удостоверений предоставляются по запросу",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
  },
];

export default function CertificatesPage() {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certs.map((cert, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-red-brand/30 transition-all hover:shadow-lg"
              >
                <div className={`w-16 h-16 ${cert.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                  <cert.icon className={`text-3xl ${cert.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{cert.desc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FaCalendarAlt />
                  <span>{cert.note}</span>
                </div>
              </div>
            ))}
          </div>
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