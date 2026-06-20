"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 10000,
});

export const getServices = () => api.get("/pages/services/");
export const getServiceBySlug = (slug: string) =>
  api.get(`/pages/services/${slug}/`);
export const getProjects = () => api.get("/pages/projects/");
export const getPartners = () => api.get("/pages/partners/");
export const getCertificates = () => api.get("/pages/certificates/");
export const getHeroSlides = () => api.get("/pages/hero-slides/");
export const getCategories = () => api.get("/catalog/categories/");
export const getProducts = (categorySlug?: string) =>
  api.get("/catalog/products/", {
    params: categorySlug ? { category__slug: categorySlug } : {},
  });
export const submitContact = (data: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  account_number?: string;
  address?: string;
}) => api.post("/contacts/requests/", data);

export default api;