import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { IconType } from "react-icons";

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  slug: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  slug,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-mid/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold text-gray-dark mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-dark/70 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent transition-colors">
        Подробнее
        <FaArrowRight size={12} />
      </span>
    </Link>
  );
}