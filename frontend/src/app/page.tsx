import HeroSection from "@/components/sections/HeroSection";
import QuickLinks from "@/components/sections/QuickLinks";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import NewsSection from "@/components/sections/NewsSection";
import { COMPANY } from "@/lib/constants";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <AboutSection />
      <ProjectsSection />
      <NewsSection />

      {/* Contacts section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <FaPhone className="text-2xl text-accent mx-auto mb-3" />
              <p className="text-lg font-semibold mb-1">Телефон</p>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="text-white/80 hover:text-accent transition-colors"
              >
                {COMPANY.phone}
              </a>
            </div>
            <div>
              <FaEnvelope className="text-2xl text-accent mx-auto mb-3" />
              <p className="text-lg font-semibold mb-1">Email</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-white/80 hover:text-accent transition-colors"
              >
                {COMPANY.email}
              </a>
            </div>
            <div>
              <FaMapMarkerAlt className="text-2xl text-accent mx-auto mb-3" />
              <p className="text-lg font-semibold mb-1">Адрес</p>
              <p className="text-white/80">{COMPANY.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}