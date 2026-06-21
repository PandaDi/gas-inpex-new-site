import type { Metadata } from "next";
import {
  FaIndustry,
  FaMicrochip,
  FaHome,
  FaFire,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Объекты — Gas Inpex",
  description:
    "Портфолио выполненных проектов ТОО «Gas Inpex»: промышленные котельные, автоматизация заводов, Умный дом, газопроводы.",
};

const projects = [
  {
    year: "2024",
    location: "Темиртау",
    title: "Промышленная котельная для производственного объекта",
    desc: "Комплекс работ: обследование, подбор горелочного оборудования, поставка, монтаж, пусконаладка и автоматизация котельной. Решение рассчитано на стабильную работу под промышленной нагрузкой и удобное обслуживание персоналом.",
    tags: ["Котельная", "АСУ ТП", "Сервис"],
    tasks: [
      { label: "Задача: стабильная теплогенерация" },
      { label: "Работы: СМР + ПНР" },
      { label: "Результат: готовность к эксплуатации" },
    ],
    bgClass: "obj-bg-boiler-house",
    icon: FaIndustry,
  },
  {
    year: "2023",
    location: "Караганда",
    title: "Автоматизация производственной линии",
    desc: "Разработка и внедрение АСУ ТП для производственного участка: шкаф управления, программирование ПЛК, операторская панель, аварийная сигнализация и удалённый мониторинг параметров.",
    tags: ["АСУ ТП", "SCADA", "ПЛК"],
    tasks: [
      { label: "Задача: контроль линии" },
      { label: "Работы: шкаф + ПО" },
      { label: "Результат: диспетчеризация" },
    ],
    bgClass: "obj-bg-automation",
    icon: FaMicrochip,
  },
  {
    year: "2024",
    location: "Астана",
    title: "Система «Умный дом» для частного объекта",
    desc: "Комплексная автоматизация 15 коттеджей: климат-контроль, управление освещением, охранная сигнализация, видеонаблюдение, автоматизация ворот. Центральный контроллер Fibaro Home Center 3.",
    tags: ["Умный дом", "Fibaro", "Климат-контроль"],
    image: "/images/obj-cottage.webp",
    icon: FaHome,
  },
  {
    year: "2022",
    location: "Караганда",
    title: "Монтаж наружного и внутреннего газопровода",
    desc: "Проектирование и строительство газопровода среднего давления протяжённостью 1,2 км. Монтаж ГРП, узлов учёта газа, системы телеметрии и диспетчеризации. Получение разрешительной документации.",
    tags: ["Газопровод", "ГРП", "Телеметрия"],
    tasks: [
      { label: "Протяжённость: 1,2 км" },
      { label: "Давление: среднее" },
      { label: "Статус: введён в 2022" },
    ],
    bgClass: "obj-bg-pipeline",
    icon: FaFire,
  },
];

export default function ObjectsPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Наши проекты</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Реализованные объекты</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Портфолио выполненных проектов по всему Казахстану</p>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Header with background */}
                <div
                  className={`h-60 relative overflow-hidden flex items-center justify-center text-white/20 text-6xl ${project.bgClass || ""}`}
                >
                  {project.image ? (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{ background: `url(${project.image}) center/cover` }}
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-black/30" />
                  )}
                  <project.icon className="relative z-10" />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs text-red-brand font-semibold">{project.year} | {project.location}</span>
                  <h3 className="text-xl font-bold text-navy mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.tasks && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                      {project.tasks.map((task, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-2">
                          {task.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}