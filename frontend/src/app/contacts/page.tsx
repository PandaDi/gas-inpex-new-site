"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function ContactsPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    setStatus("sending");

    try {
      await fetch("http://localhost:8000/api/contacts/requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      setStatus("success");

      // Also open WhatsApp
      const whatsappText = `Здравствуйте! Меня зовут ${name}.%0AТелефон: ${phone}%0AEmail: ${email}%0A%0A${message}`;
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=${whatsappText}`, "_blank");
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    {
      icon: FaMapMarkerAlt,
      title: "Адрес",
      content: "г. Темиртау, ул. Амангельды, 112",
      bgColor: "bg-red-brand/10",
      iconColor: "text-red-brand",
    },
    {
      icon: FaPhoneAlt,
      title: "Телефон",
      content: <a href={`tel:${COMPANY.phoneRaw}`} className="text-gray-500 text-sm hover:text-red-brand transition">{COMPANY.phone}</a>,
      bgColor: "bg-navy/10",
      iconColor: "text-navy",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      content: <a href={COMPANY.whatsappLink} className="text-gray-500 text-sm hover:text-red-brand transition">Написать в WhatsApp</a>,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: <a href={`mailto:${COMPANY.email}`} className="text-gray-500 text-sm hover:text-red-brand transition">{COMPANY.email}</a>,
      bgColor: "bg-red-brand/10",
      iconColor: "text-red-brand",
    },
    {
      icon: FaClock,
      title: "Режим работы",
      content: "Пн–Пт: 09:00–18:00<br />Сб–Вс: выходной",
      bgColor: "bg-navy/10",
      iconColor: "text-navy",
    },
  ];

  return (
    <>
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Контакты</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Свяжитесь с нами</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Оставьте заявку — наши специалисты свяжутся с вами в ближайшее время
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Форма обратной связи</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-name">
                    Ваше имя *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent outline-none text-sm"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-phone">
                    Телефон *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent outline-none text-sm"
                    placeholder="+7 (7213) 56-78-90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent outline-none text-sm"
                    placeholder="info@gasinpex.kz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-message">
                    Сообщение *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent outline-none text-sm resize-none"
                    placeholder="Опишите ваш вопрос или задачу..."
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                    <FaCheckCircle /> Заявка успешно отправлена!
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                    <FaExclamationCircle /> Ошибка отправки. Попробуйте ещё раз.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-6 py-3.5 bg-red-brand text-white font-semibold rounded-lg hover:bg-red-dark transition shadow-lg shadow-red-500/20 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <><FaSpinner className="animate-spin" /> Отправка...</>
                  ) : (
                    <><FaWhatsapp className="inline mr-1" /> Отправить заявку в WhatsApp</>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  После нажатия откроется WhatsApp с подготовленным текстом заявки.
                </p>
              </form>
            </div>

            {/* Contacts info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Наши контакты</h2>
              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`${item.iconColor} text-xl`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                      <div className="text-gray-500 text-sm">
                        {typeof item.content === 'string' ? <span dangerouslySetInnerHTML={{ __html: item.content }} /> : item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A006d9854c94e8b4b4b7b1d1a910f6b4f8c0f6b4f8c0f6b4f8c0f6b4f8c0f6b&source=constructor"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  title="Яндекс Карта"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}