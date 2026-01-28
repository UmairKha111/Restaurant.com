"use client";

import Link from "next/link";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

const menuItems = [
  "Shop",
  "Celebrations",
  "Gifting",
  "Corporate Gifting",
  "About Us",
  "Contact",
];

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="h-28 px-4 flex items-center justify-between lg:max-w-[1400px] lg:mx-auto">
          
          {/* LEFT: HAMBURGER (MOBILE) */}
          <button
            className="lg:hidden text-4xl"
            onClick={() => setOpenMenu(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="text-lg lg:text-2xl font-semibold tracking-wide"
          >
            DEMO 
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex gap-10">
            {menuItems.map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm uppercase tracking-widest text-gray-700 hover:text-black relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black hover:after:w-full transition-all"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* RIGHT: SEARCH */}
          <button
            onClick={() => setOpenSearch(true)}
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-15 h-15"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {openMenu && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-6">
            
            {/* CLOSE */}
            <button
              className="mb-6 text-xl"
              onClick={() => setOpenMenu(false)}
            >
              ✕
            </button>

            <nav className="flex flex-col gap-5">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href="/"
                  onClick={() => setOpenMenu(false)}
                  className="text-sm uppercase tracking-widest text-gray-800"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      {openSearch && (
        <SearchOverlay
          query={query}
          setQuery={setQuery}
          onClose={() => setOpenSearch(false)}
        />
      )}
    </>
  );
}
