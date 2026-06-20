import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import { COMPANY } from "@/lib/constants";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты компании Gas Inpex в г. Темиртау — телефон, email, адрес, форма обратной связи.",
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Контакты</h1>
          <p className="text-white/70 mt-2">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Наши контакты
            </h2>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <p className="font-medium text-gray-dark">Телефон</p>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-medium text-gray-dark">Email</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-medium text-gray-dark">Адрес</p>
                  <p className="text-gray-dark/70">{COMPANY.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FaClock />
                </div>
                <div>
                  <p className="font-medium text-gray-dark">Часы работы</p>
                  <p className="text-gray-dark/70">{COMPANY.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Yandex Maps */}
            <div className="rounded-xl overflow-hidden border border-gray-mid">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=73.1264%2C50.0759&z=12&l=map&pt=73.1264,50.0759,pm2rdl"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Карта"
              />
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Форма обратной связи
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}