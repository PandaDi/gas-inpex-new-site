import { FaNewspaper } from "react-icons/fa";

const news = [
  {
    date: "Март 2025",
    title: "Расширение ассортимента промышленного газового оборудования",
    excerpt:
      "Мы рады сообщить о расширении линейки поставляемого оборудования от ведущих мировых производителей.",
  },
  {
    date: "Январь 2025",
    title: "Завершён проект автоматизации на крупном промышленном объекте",
    excerpt:
      "Успешно сдан в эксплуатацию проект по автоматизации газораспределительного пункта в г. Темиртау.",
  },
  {
    date: "Ноябрь 2024",
    title: "Сезонное предложение на обслуживание котельного оборудования",
    excerpt:
      "Специальные условия на техническое обслуживание и ремонт котлов в осенне-зимний период 2024–2025.",
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Новости и акции
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.title}
              className="bg-gray-light rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs text-gray-dark/50 mb-3">
                <FaNewspaper size={12} />
                <span>{item.date}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-dark mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-dark/70 leading-relaxed">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}