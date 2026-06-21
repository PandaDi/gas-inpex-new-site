import { COMPANY } from "@/lib/constants";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="bg-navy text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between py-2">
        {/* Left: tagline (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300">
          <FaShieldAlt className="text-red-brand" />
          <span>Газовое оборудование, АСУ ТП и сервис по Казахстану</span>
        </div>
        {/* Contacts row */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="hover:text-red-brand transition flex items-center gap-1.5"
          >
            <FaPhoneAlt className="text-red-brand text-xs" /> {COMPANY.phone}
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="hover:text-red-brand transition flex items-center gap-1.5"
          >
            <FaEnvelope className="text-red-brand text-xs" /> {COMPANY.email}
          </a>
          <a
            href={COMPANY.whatsappLink}
            className="hover:text-red-brand transition flex items-center gap-1.5"
          >
            <FaWhatsapp className="text-red-brand text-xs" /> WhatsApp
          </a>
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-brand transition flex items-center gap-1.5"
          >
            <FaInstagram className="text-red-brand text-xs" /> Instagram
          </a>
          <span className="hidden md:flex items-center gap-1.5 text-gray-300">
            <FaMapMarkerAlt className="text-red-brand text-xs" /> г. Темиртау, ул. Амангельды, 112
          </span>
        </div>
      </div>
    </div>
  );
}