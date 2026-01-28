"use client";

import { Product } from "@/types/product";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <div className="border border-gray-200 p-3">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />

      <h4 className="mt-3 font-medium">{product.title}</h4>
      <p className="text-sm text-gray-600">₹{product.price}</p>

      <button
        onClick={() => onAdd(product)}
        className="mt-4 w-full border border-black py-2 text-sm hover:bg-black hover:text-white transition"
      >
        Add to WhatsApp Order
      </button>
    </div>
  );
}
