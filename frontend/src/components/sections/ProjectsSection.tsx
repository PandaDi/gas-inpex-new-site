import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { FaArrowRight } from "react-icons/fa";

const projects = [
  {
    title: "Автоматизация газораспределительного пункта",
    location: "г. Темиртау",
    year: "2024",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
  },
  {
    title: "Монтаж котельного оборудования на промышленном объекте",
    location: "г. Караганда",
    year: "2024",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
  },
  {
    title: "Система управления умным домом (BMS)",
    location: "г. Нур-Султан",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    title: "Поставка КИПиА для нефтегазового объекта",
    location: "Атырауская область",
    year: "2023",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Наши проекты
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>
          <Link
            href="/objects"
            className="hidden sm:inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors text-sm"
          >
            Все проекты
            <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/objects"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
          >
            Все проекты
            <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}