import Link from "next/link";

/**
 * Temporary Category type
 * (matches data/categories.ts)
 */
type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="block group">
      <div className="bg-white overflow-hidden">
        {/* IMAGE */}
        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>

        {/* TITLE */}
        <div className="pt-2 text-sm font-medium">
          {category.title}
        </div>
      </div>
    </Link>
  );
}
