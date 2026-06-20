import { FaCertificate } from "react-icons/fa";

interface CertificateCardProps {
  title: string;
  validUntil: string;
  image: string;
}

export default function CertificateCard({
  title,
  validUntil,
  image,
}: CertificateCardProps) {
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
        <h3 className="text-sm font-semibold text-gray-dark mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-dark/60">
          <FaCertificate size={12} className="text-accent" />
          <span>Действителен до: {validUntil}</span>
        </div>
      </div>
    </div>
  );
}