import type { Metadata } from "next";
import PartnerCard from "@/components/ui/PartnerCard";

export const metadata: Metadata = {
  title: "Партнёры",
  description:
    "Партнёры компании Gas Inpex — ведущие производители газового оборудования, КИПиА, котлов и систем автоматизации.",
};

const partners = [
  { name: "Honeywell", logo: "https://via.placeholder.com/200x80/005088/ffffff?text=Honeywell" },
  { name: "Siemens", logo: "https://via.placeholder.com/200x80/003a61/ffffff?text=Siemens" },
  { name: "Viessmann", logo: "https://via.placeholder.com/200x80/c1272d/ffffff?text=Viessmann" },
  { name: "Bosch", logo: "https://via.placeholder.com/200x80/005088/ffffff?text=Bosch" },
  { name: "Endress+Hauser", logo: "https://via.placeholder.com/200x80/003a61/ffffff?text=E%2BH" },
  { name: "Grundfos", logo: "https://via.placeholder.com/200x80/444444/ffffff?text=Grundfos" },
  { name: "Danfoss", logo: "https://via.placeholder.com/200x80/c1272d/ffffff?text=Danfoss" },
  { name: "Schneider Electric", logo: "https://via.placeholder.com/200x80/005088/ffffff?text=Schneider" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Наши партнёры</h1>
          <p className="text-white/70 mt-2">
            Ведущие производители и поставщики оборудования
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} {...partner} />
          ))}
        </div>
      </div>
    </div>
  );
}