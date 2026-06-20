import { FaIndustry, FaTools, FaUsers, FaCertificate } from "react-icons/fa";

const stats = [
  { icon: FaIndustry, value: "15+", label: "Лет на рынке" },
  { icon: FaTools, value: "200+", label: "Реализованных проектов" },
  { icon: FaUsers, value: "50+", label: "Квалифицированных специалистов" },
  { icon: FaCertificate, value: "100%", label: "Сертифицированное оборудование" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            О компании
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-gray-dark/70 max-w-3xl mx-auto leading-relaxed">
            ТОО «Gas Inpex» — надёжный партнёр в сфере поставки газового
            оборудования, автоматизации технологических процессов и
            инжиниринговых услуг. Мы работаем с промышленными предприятиями и
            частными клиентами, обеспечивая высокое качество и индивидуальный
            подход к каждому проекту.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gray-light hover:bg-primary/5 transition-colors"
            >
              <stat.icon size={32} className="mx-auto text-accent mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-dark/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}