"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const categories = [
  {
    label: "High Protein",
    headline: "Fuel your gains with protein-packed global dishes.",
    emoji: "\u{1F969}",
    gradient: "from-[#4A3728] to-[#2C1E12]",
    textLight: true,
  },
  {
    label: "Plant-Based",
    headline: "Vibrant plant-powered meals from every continent.",
    emoji: "\u{1F957}",
    gradient: "from-[#3D5A3A] to-[#1E3B1B]",
    textLight: true,
  },
  {
    label: "Quick Meals",
    headline: "Delicious international flavors in under 30 minutes.",
    emoji: "\u26A1",
    gradient: "from-[#F5F2ED] to-[#E5E2DC]",
    textLight: false,
  },
  {
    label: "Comfort Food",
    headline: "Soul-warming recipes from kitchens around the world.",
    emoji: "\u{1F372}",
    gradient: "from-[#3A3055] to-[#1F1835]",
    textLight: true,
  },
  {
    label: "Balanced",
    headline: "Perfectly portioned meals for everyday performance.",
    emoji: "\u2696\uFE0F",
    gradient: "from-[#F5F2ED] to-[#E5E2DC]",
    textLight: false,
  },
  {
    label: "Lean & Light",
    headline: "Low-calorie dishes that never compromise on taste.",
    emoji: "\u{1F96C}",
    gradient: "from-[#2A4A5A] to-[#14303E]",
    textLight: true,
  },
  {
    label: "Snacks",
    headline: "High-protein bites and snacks to fuel your day.",
    emoji: "\u{1F36A}",
    gradient: "from-[#5A3E28] to-[#3D2815]",
    textLight: true,
  },
  {
    label: "Shakes",
    headline: "Protein shakes inspired by flavors around the globe.",
    emoji: "\u{1F964}",
    gradient: "from-[#2E5A4A] to-[#163D30]",
    textLight: true,
  },
];

export default function RecipeCategoryCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
    }
    return () => {
      el?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            Browse by Category
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What are you craving?
          </h2>
        </div>

        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/recipes?category=${encodeURIComponent(cat.label)}`}
                className="category-card group flex-shrink-0 snap-start"
              >
                <div
                  className={`relative w-[280px] h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b ${cat.gradient}`}
                >
                  {/* Content */}
                  <div className="relative z-10 p-7 flex flex-col h-full">
                    {/* Category label */}
                    <span
                      className={`text-xs font-medium tracking-wide ${
                        cat.textLight ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {cat.label}
                    </span>

                    {/* Headline */}
                    <h3
                      className={`text-xl font-bold leading-snug mt-3 max-w-[200px] ${
                        cat.textLight ? "text-white" : "text-foreground"
                      }`}
                    >
                      {cat.headline}
                    </h3>

                    {/* CTA button */}
                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                          cat.textLight
                            ? "border-white/30 text-white group-hover:bg-white group-hover:text-foreground"
                            : "border-foreground/20 text-foreground group-hover:bg-foreground group-hover:text-background"
                        }`}
                      >
                        See recipes
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Large emoji visual */}
                    <div className="flex justify-center items-end">
                      <span className="text-[100px] leading-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                        {cat.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow overlay */}
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      cat.textLight
                        ? "bg-gradient-to-t from-white/5 to-white/10"
                        : "bg-gradient-to-t from-accent/5 to-accent/10"
                    }`}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-background cursor-pointer"
                  : "border-border text-border cursor-default"
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-background cursor-pointer"
                  : "border-border text-border cursor-default"
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
