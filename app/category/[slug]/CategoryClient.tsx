"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function CategoryClient({ slug }: { slug: string }) {
  const [order, setOrder] = useState<Product[]>([]);

  const filtered = products.filter(
    (p) => p.category === slug
  );

  const orderOnWhatsApp = () => {
    const phone = "916391157751";

    const message = order
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} - ₹${item.price}`
      )
      .join("\n");

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(
        "Hello, I want to order:\n\n" + message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 sm:px-4 py-8">
      {/* PRODUCTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAdd={(p) => setOrder((prev) => [...prev, p])}
          />
        ))}
      </div>

      {/* ORDER PANEL */}
      {order.length > 0 && (
        <div className="fixed bottom-6 right-6 w-80 bg-white border shadow-lg rounded-lg p-4">
          <h4 className="font-semibold mb-3">Your Order</h4>

          <ul className="space-y-2 max-h-40 overflow-auto">
            {order.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span>{item.title}</span>
                <button
                  onClick={() =>
                    setOrder(order.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={orderOnWhatsApp}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Order on WhatsApp ({order.length})
          </button>
        </div>
      )}
    </div>
  );
}
