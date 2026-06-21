import type { Metadata } from "next";
import Link from "next/link";
import {
  FaRobot,
  FaCheckCircle,
  FaTruck,
  FaHome,
  FaHeadset,
  FaArrowRight,
  FaStar,
  FaIndustry,
  FaFire,
  FaThermometerHalf,
  FaCubes,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Услуги — Gas Inpex",
  description:
    "Полный перечень услуг ТОО «Gas Inpex»: инжиниринг, автоматизация АСУ ТП, поставка газового оборудования, проектирование Умный дом, СМР и ПНР.",
};

export default function ServicesPage() {
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

      {/* SERVICE: Инжиниринг и автоматизация */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-red-brand rounded-xl flex items-center justify-center text-white text-xl">
              <FaRobot />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">Инжиниринг и автоматизация (АСУ ТП)</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Проектирование систем автоматизации</strong>
                — разработка проектной и рабочей документации для систем автоматизации технологических процессов (АСУ ТП), диспетчеризации и управления производством. Наши инженеры создают технические задания, структурные и функциональные схемы, схемы внешних проводок и подключений.
              </p>
              <p>
                <strong className="text-navy">Внедрение и интеграция</strong> — поставка и настройка программируемых логических контроллеров (ПЛК), промышленных компьютеров, SCADA-систем. Мы интегрируем оборудование различных производителей в единую систему управления.
              </p>
              <p>
                <strong className="text-navy">Сопровождение и модернизация</strong> — техническая поддержка действующих систем, обновление программного обеспечения, замена устаревших компонентов, расширение функциональности.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">Преимущества</h3>
              <ul className="space-y-3">
                {["Сокращение времени простоев на 40%", "Повышение энергоэффективности до 25%", "Совместимость с оборудованием любых брендов", "Удалённый мониторинг и управление 24/7", "Гарантия 3 года на внедрённые системы"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-red-brand mt-1 shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE: Поставка газового оборудования */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white text-xl">
              <FaTruck />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">Поставка газового оборудования</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Промышленное газовое оборудование</strong> — газовые горелки, клапаны, регуляторы давления, газоанализаторы, теплообменники, запорно-регулирующая арматура от ведущих мировых производителей (Siemens, Honeywell, Kromschröder, Dungs).
              </p>
              <p>
                <strong className="text-navy">Бытовое газовое оборудование</strong> — настенные и напольные газовые котлы, водонагреватели, газовые плиты, системы дымоудаления. Представлены бренды Ariston, Baxi, Vaillant, Buderus.
              </p>
              <p>
                <strong className="text-navy">Комплексные поставки</strong> — формирование спецификаций под конкретный проект, логистика, таможенное оформление, складская программа.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">Преимущества</h3>
              <ul className="space-y-3">
                {["Официальная дилерская поддержка", "Гарантия на всё оборудование до 5 лет", "Сертифицированное оборудование", "Складской запас в г. Темиртау", "Индивидуальные условия для постоянных клиентов"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-red-brand mt-1 shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE: Умный дом */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-red-brand rounded-xl flex items-center justify-center text-white text-xl">
              <FaHome />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">Проектирование систем «Умный дом»</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Автоматизация жилых помещений</strong> — комплексные решения для управления климатом, освещением, безопасностью, мультимедиа и энергопотреблением. Используем оборудование ведущих производителей: Ajax, Fibaro, Xiaomi Aqara, Schneider Electric.
              </p>
              <p>
                <strong className="text-navy">Климат-контроль</strong> — автоматическое управление отоплением, кондиционированием, вентиляцией. Поддержание заданной температуры в каждом помещении с учётом времени суток и присутствия людей.
              </p>
              <p>
                <strong className="text-navy">Безопасность</strong> — системы видеонаблюдения, охранной и пожарной сигнализации, датчики утечки газа, протечки воды, открытия окон и дверей. Мгновенные уведомления на смартфон.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">Преимущества</h3>
              <ul className="space-y-3">
                {["Экономия до 30% на коммунальных платежах", "Управление со смартфона из любой точки мира", "Масштабируемость — добавление новых устройств без замены контроллера", "Голосовое управление (Алиса, Siri, Google Assistant)", "Сценарии автоматизации на любой случай"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-red-brand mt-1 shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE: Гарантийное и сервисное обслуживание */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white text-xl">
              <FaHeadset />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">Гарантийное и сервисное обслуживание</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Гарантийное обслуживание</strong> — бесплатное устранение дефектов и неисправностей в течение гарантийного срока. Замена неисправных компонентов, настройка и калибровка оборудования.
              </p>
              <p>
                <strong className="text-navy">Послегарантийный сервис</strong> — заключение договоров на регулярное техническое обслуживание, плановые осмотры, профилактические работы. Снижение риска внезапных отказов.
              </p>
              <p>
                <strong className="text-navy">Аварийное реагирование</strong> — выезд инженеров в течение 2-4 часов по г. Темиртау и Караганда. Круглосуточная диспетчерская служба.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">Преимущества</h3>
              <ul className="space-y-3">
                {["Оперативный выезд 24/7", "Склад запчастей в Темиртау", "Сертифицированные инженеры", "Гарантия на ремонт до 2 лет", "Индивидуальные сервисные контракты"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-red-brand mt-1 shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}