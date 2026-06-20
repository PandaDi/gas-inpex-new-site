"use client";

import { useState, FormEvent } from "react";
import { submitContact } from "@/lib/api";
import { FaCheck, FaSpinner } from "react-icons/fa";

interface FormData {
  name: string;
  phone: string;
  email: string;
  account_number: string;
  address: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    account_number: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Некорректный номер телефона";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Введите сообщение";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await submitContact({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        account_number: formData.account_number.trim() || undefined,
        address: formData.address.trim() || undefined,
        message: formData.message.trim(),
      });
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        account_number: "",
        address: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <FaCheck size={40} className="mx-auto text-green-500 mb-3" />
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Сообщение отправлено!
        </h3>
        <p className="text-sm text-green-600">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-dark mb-1">
            Имя <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.name ? "border-accent ring-1 ring-accent" : "border-gray-mid"
            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
            placeholder="Ваше имя"
          />
          {errors.name && (
            <p className="text-xs text-accent mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-dark mb-1">
            Телефон <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.phone ? "border-accent ring-1 ring-accent" : "border-gray-mid"
            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          {errors.phone && (
            <p className="text-xs text-accent mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-dark mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-mid focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="email@example.com"
          />
        </div>

        {/* Account number */}
        <div>
          <label className="block text-sm font-medium text-gray-dark mb-1">
            Лицевой счёт
          </label>
          <input
            type="text"
            value={formData.account_number}
            onChange={(e) => handleChange("account_number", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-mid focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="Номер лицевого счёта"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1">
          Адрес выезда
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-mid focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          placeholder="Адрес для выезда специалиста"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1">
          Сообщение <span className="text-accent">*</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={4}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.message
              ? "border-accent ring-1 ring-accent"
              : "border-gray-mid"
          } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none`}
          placeholder="Опишите ваш вопрос или заявку"
        />
        {errors.message && (
          <p className="text-xs text-accent mt-1">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <FaSpinner className="animate-spin" />
            Отправка...
          </>
        ) : (
          "Отправить"
        )}
      </button>
    </form>
  );
}