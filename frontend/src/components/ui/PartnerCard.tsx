interface PartnerCardProps {
  name: string;
  logo: string;
}

export default function PartnerCard({ name, logo }: PartnerCardProps) {
  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-mid/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-28">
      <img
        src={logo}
        alt={name}
        className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
}