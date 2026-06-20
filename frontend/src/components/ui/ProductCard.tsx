import { FaCheck } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  image: string;
  specs: string[];
  price?: string;
}

export default function ProductCard({
  title,
  image,
  specs,
  price,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-mid/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gray-light">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-dark mb-3 line-clamp-2">
          {title}
        </h3>
        {specs.length > 0 && (
          <ul className="space-y-1 mb-3">
            {specs.map((spec, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-gray-dark/70"
              >
                <FaCheck size={10} className="text-primary mt-0.5 shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}
        {price && (
          <div className="text-lg font-bold text-primary">{price}</div>
        )}
      </div>
    </div>
  );
}