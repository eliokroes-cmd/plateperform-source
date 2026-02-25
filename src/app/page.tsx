"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCategoryCards from "@/components/RecipeCategoryCards";
import { recipes, regions } from "@/lib/recipes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState, useEffect } from "react";
import { useRevenueCat } from "@/contexts/RevenueCatContext";

const featuredRecipes = recipes.slice(0, 3);

const featureIcons = {
  nutrition: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  trophy: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
};

export default function HomePage() {
  const { t } = useLanguage();
  const { isPro: hasAccess } = useRevenueCat();
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = testimonialsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }

  useEffect(() => {
    updateScrollState();
    const el = testimonialsRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
    }
    return () => {
      el?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollTestimonials(direction: "left" | "right") {
    const el = testimonialsRef.current;
    if (!el) return;
    const amount = 380;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  const features = [
    { icon: featureIcons.nutrition, title: t.features.nutrition.title, desc: t.features.nutrition.desc },
    { icon: featureIcons.globe, title: t.features.worldRegions.title, desc: t.features.worldRegions.desc },
    { icon: featureIcons.clock, title: t.features.quick.title, desc: t.features.quick.desc },
    { icon: featureIcons.trophy, title: t.features.everyone.title, desc: t.features.everyone.desc },
  ];

  const testimonials = [
    { name: t.testimonials.testimonial1.name, role: t.testimonials.testimonial1.role, text: t.testimonials.testimonial1.text, rating: t.testimonials.testimonial1.rating },
    { name: t.testimonials.testimonial2.name, role: t.testimonials.testimonial2.role, text: t.testimonials.testimonial2.text, rating: t.testimonials.testimonial2.rating },
    { name: t.testimonials.testimonial3.name, role: t.testimonials.testimonial3.role, text: t.testimonials.testimonial3.text, rating: t.testimonials.testimonial3.rating },
    { name: t.testimonials.testimonial4.name, role: t.testimonials.testimonial4.role, text: t.testimonials.testimonial4.text, rating: t.testimonials.testimonial4.rating },
    { name: t.testimonials.testimonial5.name, role: t.testimonials.testimonial5.role, text: t.testimonials.testimonial5.text, rating: t.testimonials.testimonial5.rating },
    { name: t.testimonials.testimonial6.name, role: t.testimonials.testimonial6.role, text: t.testimonials.testimonial6.text, rating: t.testimonials.testimonial6.rating },
    { name: t.testimonials.testimonial7.name, role: t.testimonials.testimonial7.role, text: t.testimonials.testimonial7.text, rating: t.testimonials.testimonial7.rating },
    { name: t.testimonials.testimonial8.name, role: t.testimonials.testimonial8.role, text: t.testimonials.testimonial8.text, rating: t.testimonials.testimonial8.rating },
    { name: t.testimonials.testimonial9.name, role: t.testimonials.testimonial9.role, text: t.testimonials.testimonial9.text, rating: t.testimonials.testimonial9.rating },
    { name: t.testimonials.testimonial10.name, role: t.testimonials.testimonial10.role, text: t.testimonials.testimonial10.text, rating: t.testimonials.testimonial10.rating },
    { name: t.testimonials.testimonial11.name, role: t.testimonials.testimonial11.role, text: t.testimonials.testimonial11.text, rating: t.testimonials.testimonial11.rating },
    { name: t.testimonials.testimonial12.name, role: t.testimonials.testimonial12.role, text: t.testimonials.testimonial12.text, rating: t.testimonials.testimonial12.rating },
    { name: t.testimonials.testimonial13.name, role: t.testimonials.testimonial13.role, text: t.testimonials.testimonial13.text, rating: t.testimonials.testimonial13.rating },
    { name: t.testimonials.testimonial14.name, role: t.testimonials.testimonial14.role, text: t.testimonials.testimonial14.text, rating: t.testimonials.testimonial14.rating },
    { name: t.testimonials.testimonial15.name, role: t.testimonials.testimonial15.role, text: t.testimonials.testimonial15.text, rating: t.testimonials.testimonial15.rating },
  ];

  return (
    <main className="bg-background">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            {t.hero.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            {t.hero.title1}
            <br />
            <span className="text-accent">{t.hero.title2}</span> {t.hero.title3}
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/pricing"
              className="bg-foreground text-background px-8 py-3.5 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="#regions"
              className="text-muted hover:text-foreground px-8 py-3.5 rounded-full border border-border font-medium transition-colors text-sm"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Recipe Category Cards */}
      <RecipeCategoryCards />

      {/* Regions */}
      <section id="regions" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              {t.regions.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.regions.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regions.map((region) => {
              return (
                <Link
                  key={region.name}
                  href={`/recipes?region=${encodeURIComponent(region.name)}`}
                  className="recipe-card rounded-2xl overflow-hidden block"
                >
                  <div className={`${region.cls} p-8 md:p-10`}>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {region.name}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4 max-w-md">
                      {region.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {region.countries.map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-white/50 text-foreground/70 px-2.5 py-1 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Recipes Preview */}
      <section id="preview" className="section-gradient py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              {t.featured.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.featured.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.slug}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden"
              >
                <div
                  className={`${recipe.cuisineClass} h-40 flex items-center justify-center`}
                >
                  {recipe.image.startsWith("/") ? <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" /> : <span className="text-5xl">{recipe.image}</span>}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{recipe.flag}</span>
                    <span className="text-xs text-muted">{recipe.country}</span>
                    <span className="ml-auto text-xs bg-accent/10 text-accent-dark px-2 py-0.5 rounded-full">
                      {recipe.region}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-6 text-xs text-muted">
                    <span>{recipe.calories} {t.recipe.calories}</span>
                    <span>{recipe.protein}g {t.recipe.protein}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
            >
              {t.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              {t.features.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.features.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  {f.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-gradient py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              {t.testimonials.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="relative">
            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-xl p-6 flex-shrink-0 w-[320px] md:w-[380px] snap-start"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className="w-4 h-4"
                        fill={j < testimonial.rating ? "#B8956A" : "none"}
                        stroke={j < testimonial.rating ? "none" : "#B8956A"}
                        strokeWidth={j < testimonial.rating ? 0 : 1.5}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => scrollTestimonials("left")}
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
                onClick={() => scrollTestimonials("right")}
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

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            {t.pricing.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            {t.pricing.subtitle}
          </p>

          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 max-w-md mx-auto">
            <p className="text-xs uppercase tracking-wider text-muted mb-4">
              {t.pricing.plan}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-border rounded-xl p-4 text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-3xl font-bold text-foreground">&euro;7.99</span>
                  <span className="text-muted text-sm">{t.pricing.perMonth}</span>
                </div>
                <p className="text-xs text-muted mt-1">{t.pricing.monthly}</p>
              </div>
              <div className="border-2 border-accent rounded-xl p-4 text-center relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  {t.pricing.discount}
                </span>
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-3xl font-bold text-foreground">&euro;69.99</span>
                  <span className="text-muted text-sm">{t.pricing.perYear}</span>
                </div>
                <p className="text-xs text-muted mt-1">{t.pricing.yearlyDetail}</p>
              </div>
            </div>

            <ul className="text-sm text-muted space-y-3 mb-8 text-left">
              {t.pricing.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="block w-full bg-foreground text-background text-center py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm"
            >
              {t.pricing.cta}
            </Link>
            <p className="text-xs text-muted mt-3">{t.pricing.trialInfo}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-background mb-4">
            {t.cta.title}
          </h2>
          <p className="text-background/60 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-accent text-white px-8 py-3.5 rounded-full font-medium hover:bg-accent-dark transition-colors text-sm"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
