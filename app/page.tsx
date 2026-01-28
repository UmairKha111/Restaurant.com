import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  return (
    <div className="w-full">
      {/* ✅ CONTENT CONTAINER */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}
