import type { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Объекты",
  description:
    "Портфолио компании Gas Inpex — реализованные проекты по автоматизации, монтажу газового оборудования и КИПиА в Казахстане.",
};

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
  {
    title: "Газоснабжение жилого комплекса",
    location: "г. Темиртау",
    year: "2023",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb9bc8a58?w=600&q=80",
  },
  {
    title: "Автоматизация котельной завода",
    location: "г. Караганда",
    year: "2022",
    image: "https://images.unsplash.com/photo-1578991624413-2f01e8c56f3b?w=600&q=80",
  },
  {
    title: "Монтаж системы газового контроля",
    location: "г. Темиртау",
    year: "2022",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    title: "Реконструкция системы отопления",
    location: "г. Нур-Султан",
    year: "2022",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=600&q=80",
  },
];

export default function ObjectsPage() {
  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Наши объекты</h1>
          <p className="text-white/70 mt-2">
            Реализованные проекты в сфере газоснабжения, автоматизации и КИПиА
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}