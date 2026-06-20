import type { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Промышленное оборудование",
  description:
    "Промышленное газовое оборудование от компании Gas Inpex — газовые котлы, горелки, газораспределительные пункты, запорно-регулирующая арматура.",
};

const products = [
  {
    title: "Газовый котел промышленный Viessmann Vitomax 200",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Котел+промышленный",
    specs: ["Мощность: 200 кВт", "КПД: 95%", "Природный газ"],
    price: "от 5 500 000 ₸",
  },
  {
    title: "Газогорелочное устройство Weishaupt WM-G10",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Горелка",
    specs: ["Мощность: 300-1200 кВт", "Модулируемая", "Низкий NOx"],
    price: "от 850 000 ₸",
  },
  {
    title: "Газораспределительный пункт ГРПШ-01",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=ГРПШ",
    specs: ["Пропускная способность: 1000 м³/ч", "Входное давление: 0.6 МПа", "Выходное давление: 0.3 МПа"],
    price: "от 1 200 000 ₸",
  },
  {
    title: "Задвижка газовая DN150 PN16",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Задвижка",
    specs: ["DN 150", "PN 16", "Сталь"],
    price: "от 85 000 ₸",
  },
  {
    title: "Фильтр газовый ФГ-100",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Фильтр",
    specs: ["DN 100", "Сетчатый", "Ду 100 мм"],
    price: "от 45 000 ₸",
  },
  {
    title: "Сигнализатор загазованности Seitron RGD",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Сигнализатор",
    specs: ["Метан / Пропан", "Порог срабатывания: 10% НКПР", "Аналоговый выход"],
    price: "от 25 000 ₸",
  },
];

export default function IndustrialCatalogPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Промышленное газовое оборудование</h1>
          <p className="text-white/70 mt-2">
            Качественное оборудование для промышленных объектов
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