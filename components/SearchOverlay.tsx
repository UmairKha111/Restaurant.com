"use client";

import Link from "next/link";
import { useEffect } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function SearchOverlay({
  query = "",
  setQuery,
  onClose,
}: {
  query?: string;
  setQuery: (val: string) => void;
  onClose: () => void;
}) {
  const q = (query || "").toLowerCase().trim();

  /* 1️⃣ Categories matching query */
  const matchedCategories = q
    ? categories.filter((cat) =>
        cat.title.toLowerCase().includes(q)
      )
    : [];

  /* Extract matched category slugs */
  const matchedCategorySlugs = matchedCategories.map(
    (c) => c.slug
  );

  /* 2️⃣ Products matching by TITLE */
  const productsByTitle = q
    ? products.filter((prod) =>
        prod.title.toLowerCase().includes(q)
      )
    : [];

  /* 3️⃣ Products matching by CATEGORY */
  const productsByCategory = q
    ? products.filter((prod) =>
        matchedCategorySlugs.includes(prod.category)
      )
    : [];

  /* 4️⃣ MERGE products (avoid duplicates) */
  const filteredProducts = [
    ...productsByTitle,
    ...productsByCategory,
  ].filter(
    (prod, index, self) =>
      index === self.findIndex((p) => p.id === prod.id)
  );

  /* 5️⃣ Categories from product matches (reverse mapping) */
  const categoriesFromProducts = productsByTitle
    .map((prod) =>
      categories.find(
        (cat) => cat.slug === prod.category
      )
    )
    .filter(Boolean) as typeof categories;

  /* 6️⃣ FINAL categories (merge + dedupe) */
  const filteredCategories = [
    ...matchedCategories,
    ...categoriesFromProducts,
  ].filter(
    (cat, index, self) =>
      index ===
      self.findIndex((c) => c.slug === cat.slug)
  );

  /* ESC to close */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* TOP BAR */}
      <div className="border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center gap-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or categories"
            className="w-full text-xl outline-none"
          />

          {query?.length > 0 && (
            <button
              onClick={() => setQuery("")}
              className="text-lg px-3"
              aria-label="Clear"
            >
              ✕
            </button>
          )}

          <button
            onClick={onClose}
            className="text-2xl px-2"
            aria-label="Close search"
          >
            ✕
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: CATEGORIES */}
        <div>
          <h4 className="text-xs tracking-widest text-gray-500 mb-4">
            CATEGORIES
          </h4>

          {!q && (
            <p className="text-sm text-gray-500">
              Start typing to search categories and products.
            </p>
          )}

          {q && filteredCategories.length === 0 && (
            <p className="text-sm text-gray-500">
              No categories found.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={onClose}
                className="border border-gray-300 px-4 py-4 hover:bg-gray-50 transition"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCTS */}
        <div>
          <h4 className="text-xs tracking-widest text-gray-500 mb-4">
            PRODUCTS
          </h4>

          {q && filteredProducts.length === 0 && (
            <p className="text-sm text-gray-500">
              No products found.
            </p>
          )}

          <div className="space-y-4">
            {filteredProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/category/${prod.category}`}
                onClick={onClose}
                className="flex items-center gap-4 hover:bg-gray-50 p-2 transition"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{prod.title}</p>
                  <p className="text-sm text-gray-500">
                    ₹{prod.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {q && (
        <div className="border-t">
          <div className="max-w-[1400px] mx-auto px-6 py-4 text-sm flex justify-between items-center">
            <span className="text-gray-500">
              Showing results for “{query}”
            </span>
            <button
              onClick={onClose}
              className="hover:underline"
            >
              Close →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
