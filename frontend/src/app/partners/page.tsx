import type { Metadata } from "next";
import Link from "next/link";
import {
  FaCogs,
  FaCar,
  FaTractor,
  FaFire,
  FaIndustry,
  FaMicrochip,
  FaWifi,
  FaWater,
  FaHandshake,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Партнеры и клиенты — Gas Inpex",
  description:
    "Партнеры и клиенты ТОО «Gas Inpex»: Hitachi, Toyota Tsusho, Caterpillar, Ariston, Qarmet, Siemens, Baxi, Vaillant, Grundfos, Kiturami.",
};

const partners = [
  {
    icon: FaCogs,
    name: "Hitachi",
    desc: "Партнёр по поставке промышленных контроллеров и средств автоматизации. Совместная реализация проектов АСУ ТП для горнорудной промышленности.",
  },
  {
    icon: FaCar,
    name: "Toyota Tsusho",
    desc: "Стратегический партнёр по логистике и поставкам импортного газового оборудования. Обеспечение прямых поставок из Японии и Европы.",
  },
  {
    icon: FaTractor,
    name: "Caterpillar",
    desc: "Официальный партнёр по поставке газопоршневых установок и генераторов. Реализация проектов когенерации и автономного энергоснабжения.",
  },
  {
    icon: FaFire,
    name: "Ariston",
    desc: "Официальный дилер по бытовым газовым котлам и водонагревателям. Сертифицированный сервисный центр по гарантийному и послегарантийному обслуживанию.",
  },
  {
    icon: FaIndustry,
    name: "Qarmet",
    desc: "Ключевой заказчик — реализация проектов автоматизации котельных и газоснабжения на металлургическом комбинате в Темиртау.",
  },
  {
    icon: FaMicrochip,
    name: "Siemens",
    desc: "Технологический партнёр по ПЛК, SCADA-системам и промышленным коммуникациям. Использование оборудования Siemens во всех проектах автоматизации.",
  },
  {
    icon: FaCogs,
    name: "Baxi",
    desc: "Официальный дистрибьютор газовых котлов Baxi в Казахстане. Сертифицированный монтаж и сервисное обслуживание всей линейки оборудования.",
  },
  {
    icon: FaWifi,
    name: "Vaillant",
    desc: "Партнёрство в области премиальных систем отопления и горячего водоснабжения. Реализация объектов индивидуального и многоквартирного жилья.",
  },
  {
    icon: FaWater,
    name: "Grundfos",
    desc: "Официальный партнёр по насосному оборудованию. Применение циркуляционных и повысительных насосов в системах отопления и водоснабжения.",
  },
];

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

export default function PartnersPage() {
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-red-brand/30 transition-all hover:shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="text-4xl text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.desc}</p>
              </div>
            ))}
          </div>
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