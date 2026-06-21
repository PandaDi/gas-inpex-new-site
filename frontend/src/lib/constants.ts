export const COMPANY = {
  name: "ТОО «Gas Inpex»",
  shortName: "GAS INPEX",
  logoHtml: '<span class="text-red-brand">GAS</span><span class="text-navy">INPEX</span>',
  tagline: "Инжиниринг, автоматизация и поставка газового оборудования",
  phone: "+7 (7213) 56-78-90",
  phoneRaw: "+772****7890",
  whatsapp: "+771****9802",
  email: "info@gasinpex.kz",
  oldEmail: "info@gas-inpex.kz",
  address: "г. Темиртау, ул. Амангельды, 112",
  workingHours: "Пн–Пт: 09:00–18:00",
  instagram: "https://www.instagram.com/gas.inpex/",
  instagramLabel: "Instagram",
  whatsappLink: "https://wa.me/+771****9802",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/objects", label: "Объекты" },
  { href: "/certificates", label: "Сертификаты" },
  { href: "/partners", label: "Партнеры" },
  { href: "/contacts", label: "Контакты" },
];

export const CATALOG_CATEGORIES = [
  { slug: "industrial", label: "Промышленное газовое оборудование", icon: "FaIndustry" },
  { slug: "boilers", label: "Бытовые котлы", icon: "FaFire" },
  { slug: "smarthome", label: "Системы «Умный дом»", icon: "FaHome" },
  { slug: "kipia", label: "Оборудование КИПиА", icon: "FaMicrochip" },
];

export const QUICK_LINKS = [
  { href: "/services", title: "Наши услуги", desc: "Полный спектр", icon: "FaCogs" },
  { href: "/catalog/industrial", title: "Оборудование", desc: "Газовое и КИПиА", icon: "FaTools" },
  { href: "/services", title: "Проектирование", desc: "Систем любой сложности", icon: "FaDraftingCompass" },
  { href: "/services", title: "Обслуживание", desc: "Гарантийное и сервисное", icon: "FaHeadset" },
];

export const WORK_STEPS = [
  { num: "01", title: "Обследование", desc: "Выезд на объект, сбор данных, оценка текущего оборудования и задач." },
  { num: "02", title: "Подбор решения", desc: "Коммерческое предложение, подбор КИПиА, газового оборудования и автоматики." },
  { num: "03", title: "Монтаж и запуск", desc: "СМР, ПНР, программирование, обучение персонала и сервисное сопровождение." },
];

export const COUNTERS = [
  { value: "15+", label: "Лет на рынке" },
  { value: "230+", label: "Объектов завершено" },
  { value: "50+", label: "Специалистов" },
  { value: "Сертификаты", label: "ISO 9001 и лицензии" },
];

export const SERVICES = [
  { icon: "FaCubes", title: "Проектирование систем", desc: "Разработка проектной и рабочей документации для систем автоматизации, диспетчеризации и управления технологическими процессами.", group: "engineering" },
  { icon: "FaHome", title: "Системы «Умный дом»", desc: "Интегрированные решения автоматизации жилых помещений: климат-контроль, освещение, безопасность, мультимедиа и энергоменеджмент.", group: "engineering" },
  { icon: "FaHardHat", title: "СМР и ПНР", desc: "Строительно-монтажные и пусконаладочные работы «под ключ» с гарантией качества и соблюдением сроков.", group: "engineering" },
  { icon: "FaIndustry", title: "Промышленные котельные", desc: "Поставка и монтаж промышленных котельных установок, газогорелочных устройств, теплообменников и вспомогательного оборудования.", group: "supply" },
  { icon: "FaFireBurner", title: "Бытовые котлы", desc: "Широкий выбор настенных и напольных газовых котлов ведущих брендов (Ariston, Baxi, Vaillant, Buderus) с установкой и настройкой.", group: "supply" },
  { icon: "FaThermometerHalf", title: "Датчики утечки газа и климат-контроль", desc: "Системы газового мониторинга, сигнализации утечки, термостаты и контроллеры для автоматического управления микроклиматом.", group: "supply" },
];

export const PROJECTS = [
  { year: "2024", title: "Котельная ТОО «Qarmet»", icon: "FaIndustry" },
  { year: "2024", title: "ЖК «Астана» Умный дом", icon: "FaHome" },
  { year: "2023", title: "АСУ ТП ТОО «KazMinerals»", icon: "FaMicrochip" },
  { year: "2023", title: "Газоснабжение ТОО «Steel Corp»", icon: "FaFire" },
];