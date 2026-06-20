import type { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Умный дом",
  description:
    "Системы умного дома (BMS) от Gas Inpex — автоматизация отопления, освещения, климат-контроль и безопасность.",
};

const products = [
  {
    title: "Контроллер умного дома Ajax Systems Hub 2",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Ajax+Hub",
    specs: ["Wi-Fi / Ethernet", "Поддержка до 100 устройств", "Мобильное приложение"],
    price: "от 45 000 ₸",
  },
  {
    title: "Термостат комнатный Honeywell T6 Pro",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Honeywell",
    specs: ["Wi-Fi", "Программируемый", "Сенсорный экран"],
    price: "от 35 000 ₸",
  },
  {
    title: "Умный привод радиатора Danfoss Ally",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Danfoss",
    specs: ["Zigbee", "Батарейный", "Расписание по дням"],
    price: "от 12 000 ₸",
  },
  {
    title: "Датчик температуры и влажности Xiaomi",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Xiaomi",
    specs: ["Bluetooth", "OLED дисплей", "Точность ±0.3°C"],
    price: "от 3 500 ₸",
  },
  {
    title: "Умное реле Shelly Pro 4PM",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Shelly",
    specs: ["Wi-Fi", "4 канала", "Мониторинг энергии"],
    price: "от 15 000 ₸",
  },
  {
    title: "Смарт-хаб Zigbee Sonoff ZBBridge",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Sonoff",
    specs: ["Zigbee 3.0", "USB питание", "Поддержка HomeKit"],
    price: "от 6 500 ₸",
  },
];

export default function SmarthomeCatalogPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Умный дом</h1>
          <p className="text-white/70 mt-2">
            Системы автоматизации и управления домом
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}