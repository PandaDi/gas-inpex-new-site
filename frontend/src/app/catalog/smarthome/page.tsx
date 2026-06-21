"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";

export default function SmarthomeCatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/catalog/categories/")
      .then((r) => r.json())
      .then((data) => {
        const list = data.results || data || [];
        const cat = list.find((c: any) => c.slug === "smarthome");
        setProducts(cat?.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Умный дом</h1>
          <p className="text-white/70 mt-2">
            Системы автоматизации и управления домом
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard
                key={product.id || product.title}
                title={product.title}
                image={product.image || "https://via.placeholder.com/400x300/e0e0e0/444444?text=Умный+дом"}
                specs={product.specifications || product.specs || []}
                price={product.price || ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}