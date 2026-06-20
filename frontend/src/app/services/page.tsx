import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import { FaIndustry, FaTools, FaHome, FaCogs, FaFire, FaWifi, FaThermometerHalf, FaBoxes } from "react-icons/fa";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Услуги компании Gas Inpex — инжиниринг, монтаж, автоматизация и сервисное обслуживание газового оборудования в г. Темиртау.",
};

interface ServiceItem {
  icon: IconType;
  title: string;
  description: string;
  slug: string;
}

const services: ServiceItem[] = [
  {
    icon: FaIndustry,
    title: "Поставка промышленного газового оборудования",
    description:
      "Поставка газового оборудования от ведущих мировых производителей для промышленных предприятий. Включает газовые котлы, горелки, газораспределительные пункты.",
    slug: "postavka-promyshlennogo-oborudovaniya",
  },
  {
    icon: FaCogs,
    title: "Автоматизация (АСУ ТП)",
    description:
      "Разработка и внедрение систем автоматизации технологических процессов на базе современных контроллеров и SCADA-систем.",
    slug: "avtomatizatsiya-asu-tp",
  },
  {
    icon: FaTools,
    title: "Монтаж и пусконаладка",
    description:
      "Профессиональный монтаж газового и котельного оборудования, пусконаладочные работы, ввод в эксплуатацию.",
    slug: "montazh-i-puskonaladka",
  },
  {
    icon: FaHome,
    title: "Обслуживание котельных",
    description:
      "Техническое обслуживание и ремонт котельных установок любой сложности. Плановое и аварийное обслуживание.",
    slug: "obsluzhivanie-kotelnyh",
  },
  {
    icon: FaFire,
    title: "Бытовые котлы и отопление",
    description:
      "Продажа и установка бытовых газовых котлов, систем отопления и горячего водоснабжения для частных домов.",
    slug: "bytovye-kotly",
  },
  {
    icon: FaWifi,
    title: "Умный дом (BMS)",
    description:
      "Проектирование и монтаж систем управления зданием (умный дом): отопление, освещение, вентиляция, безопасность.",
    slug: "umnyj-dom",
  },
  {
    icon: FaThermometerHalf,
    title: "КИПиА",
    description:
      "Поставка и обслуживание контрольно-измерительных приборов и автоматики для промышленных объектов.",
    slug: "kipia",
  },
  {
    icon: FaBoxes,
    title: "Энергоаудит и проектирование",
    description:
      "Энергетическое обследование предприятий, разработка проектной документации по газоснабжению и автоматизации.",
    slug: "energoaudit",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Наши услуги</h1>
          <p className="text-white/70 mt-2">
            Полный спектр услуг в сфере газового оборудования и автоматизации
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}