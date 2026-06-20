import type { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "КИПиА",
  description:
    "Контрольно-измерительные приборы и автоматика от Gas Inpex — датчики, расходомеры, сигнализаторы загазованности, регуляторы.",
};

const products = [
  {
    title: "Датчик давления Rosemount 3051S",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Датчик+давления",
    specs: ["Диапазон: 0-100 бар", "Погрешность: 0.075%", "HART протокол"],
    price: "от 280 000 ₸",
  },
  {
    title: "Расходомер газа Endress+Hauser Proline",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=Расходомер",
    specs: ["Кориолисовый", "DN 50", "±0.1%"],
    price: "от 450 000 ₸",
  },
  {
    title: "Сигнализатор загазованности СЗ-1",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=СЗ-1",
    specs: ["Метан", "Порог: 10% НКПР", "Звуковая сигнализация"],
    price: "от 18 000 ₸",
  },
  {
    title: "Регулятор давления газа РДГ-50",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=РДГ-50",
    specs: ["DN 50", "Вход: 0.6 МПа", "Выход: 0.3 МПа"],
    price: "от 65 000 ₸",
  },
  {
    title: "Термопреобразователь ТПТ-1",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=ТПТ-1",
    specs: ["Pt100", "Диапазон: -50...+200°C", "4-20 мА"],
    price: "от 8 500 ₸",
  },
  {
    title: "Счётчик газа бытовой СГМ-1.6",
    image: "https://via.placeholder.com/400x300/e0e0e0/444444?text=СГМ-1.6",
    specs: ["Пропускная способность: 1.6 м³/ч", "Мембранный", "МГТС"],
    price: "от 5 500 ₸",
  },
];

export default function KipiaCatalogPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">КИПиА</h1>
          <p className="text-white/70 mt-2">
            Контрольно-измерительные приборы и средства автоматизации
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