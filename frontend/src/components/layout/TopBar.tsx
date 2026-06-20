import { COMPANY } from "@/lib/constants";
import { FaPhone, FaEnvelope, FaClock, FaInstagram } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <FaPhone className="text-xs" />
            <span>{COMPANY.phone}</span>
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <FaEnvelope className="text-xs" />
            <span>{COMPANY.email}</span>
          </a>
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <FaInstagram className="text-xs" />
            <span>Instagram</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5 text-white/70">
          <FaClock className="text-xs" />
          <span>{COMPANY.workingHours}</span>
        </div>
      </div>
    </div>
  );
}