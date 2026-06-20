import type { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Бытовые котлы",
  description:
    "Бытовые газовые котлы для отопления и горячего водоснабжения. Продажа и установка в г. Темиртау и Казахстане.",
};

const products = [
  {
    title: "Настенный газовый котел Baxi ECO Four 24F",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Котел+Baxi",
    specs: ["Мощность: 24 кВт", "Закрытая камера сгорания", "КПД: 93%"],
    price: "от 350 000 ₸",
  },
  {
    title: "Настенный газовый котел Vaillant turboTEC pro VUW",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Vaillant",
    specs: ["Мощность: 24 кВт", "Открытая камера сгорания", "КПД: 92%"],
    price: "от 420 000 ₸",
  },
  {
    title: "Напольный газовый котел Protherm Бизон 30 NL",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Protherm",
    specs: ["Мощность: 30 кВт", "Чугунный теплообменник", "КПД: 91%"],
    price: "от 520 000 ₸",
  },
  {
    title: "Настенный газовый котел Buderus Logamax U072",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Buderus",
    specs: ["Мощность: 28 кВт", "Турбированная горелка", "КПД: 94%"],
    price: "от 400 000 ₸",
  },
  {
    title: "Электрический котел EVAN Warmos IV-9",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=EVAN",
    specs: ["Мощность: 9 кВт", "Электронный термостат", "Компактный"],
    price: "от 85 000 ₸",
  },
  {
    title: "Бойлер косвенного нагрева Drazice OKC 200",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Бойлер",
    specs: ["Объём: 200 л", "Нержавеющая сталь", "Теплообменник"],
    price: "от 180 000 ₸",
  },
];

export default function BoilersCatalogPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Бытовые газовые котлы</h1>
          <p className="text-white/70 mt-2">
            Надёжное отопительное оборудование для вашего дома
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