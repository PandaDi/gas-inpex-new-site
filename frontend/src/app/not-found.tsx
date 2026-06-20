import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-light">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-dark mb-3">
          Страница не найдена
        </h2>
        <p className="text-gray-dark/60 mb-8 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена. 
          Пожалуйста, проверьте правильность ссылки или вернитесь на главную.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
        >
          <FaHome />
          На главную
        </Link>
      </div>
    </div>
  );
}