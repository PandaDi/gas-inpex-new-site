export const COMPANY = {
  name: "ТОО «Gas Inpex»",
  shortName: "GAS INPEX",
  tagline: "Инжиниринг, автоматизация и поставка газового оборудования",
  phone: "+7 (7213) 56-78-90",
  phoneRaw: "+77213567890",
  whatsapp: "+77712739802",
  email: "info@gas-inpex.kz",
  address: "г. Темиртау, ул. Металлургов, 12",
  workingHours: "Пн–Пт: 09:00 – 18:00",
  instagram: "https://www.instagram.com/gas.inpex/",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/catalog/industrial", label: "Каталог" },
  { href: "/objects", label: "Объекты" },
  { href: "/certificates", label: "Сертификаты" },
  { href: "/partners", label: "Партнёры" },
  { href: "/contacts", label: "Контакты" },
];

export const CATALOG_CATEGORIES = [
  { slug: "industrial", label: "Промышленное оборудование" },
  { slug: "boilers", label: "Бытовые котлы" },
  { slug: "smarthome", label: "Умный дом" },
  { slug: "kipia", label: "КИПиА" },
];