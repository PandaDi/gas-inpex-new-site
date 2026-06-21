"use client";

import { useState, useEffect } from "react";

export default function ObjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/projects/")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.results || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-brand text-sm font-semibold uppercase tracking-widest">Наши проекты</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Реализованные объекты</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Портфолио выполненных проектов по всему Казахстану</p>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">Загрузка...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project: any, idx: number) => (
                <div
                  key={project.id || idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  {/* Header with background */}
                  <div className="h-60 relative overflow-hidden flex items-center justify-center bg-gray-200">
                    {project.image ? (
                      <>
                        <div
                          className="absolute inset-0"
                          style={{ background: `url(${project.image}) center/cover` }}
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-navy to-gray-700" />
                    )}
                    <span className="relative z-10 text-white/20 text-7xl font-bold">
                      {project.title ? project.title.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <span className="text-xs text-red-brand font-semibold">
                      {project.year || ""}{project.year && project.location ? " | " : ""}{project.location || ""}
                    </span>
                    <h3 className="text-xl font-bold text-navy mt-2 mb-3">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {project.short_description || project.full_description || ""}
                    </p>
                    {project.client && (
                      <div className="mt-4 text-xs text-gray-500">
                        <span className="font-semibold">Клиент: </span>{project.client}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
