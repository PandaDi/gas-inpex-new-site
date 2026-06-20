import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  location: string;
  year: string;
  image: string;
}

export default function ProjectCard({
  title,
  location,
  year,
  image,
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-mid/50 bg-white">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-semibold text-lg">Подробнее</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-dark mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-dark/60">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt size={12} />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt size={12} />
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}