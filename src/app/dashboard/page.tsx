"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { recipes, regions } from "@/lib/recipes";
import { useLanguage } from "@/contexts/LanguageContext";

// Top 5 meals of the week (can be randomized or featured)
const topMealsOfWeek = recipes.slice(0, 5);

// Newest recipes (last 5 recipes added)
const newestRecipes = recipes.slice(-5).reverse();

function DashboardContent() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  const viewParam = searchParams.get("view");
  const categoryParam = searchParams.get("category");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    protein: "all", // all, high (30+), medium (15-29), low (<15)
    calories: "all", // all, low (<400), medium (400-600), high (600+)
    prepTime: "all", // all, quick (<15), medium (15-30), long (30+)
  });
  const [favoriteCounts, setFavoriteCounts] = useState<Record<string, number>>({});
  const { t } = useLanguage();

  const isHomeView = !regionParam && !viewParam && !categoryParam;
  const isFavoritesView = viewParam === "favorites";

  // Initial favorite counts (default values)
  const initialFavoriteCounts: Record<string, number> = {
    "teriyaki-salmon-bowl": 42,
    "moroccan-chickpea-tagine": 28,
    "greek-chicken-souvlaki": 47,
    "thai-basil-chicken": 39,
    "mexican-black-bean-quinoa": 31,
    "italian-protein-pasta": 50,
    "korean-bibimbap": 44,
    "indian-tandoori-chicken": 36,
    "brazilian-acai-bowl": 48,
    "ethiopian-lentil-stew": 22,
    "vietnamese-pho": 45,
    "peruvian-ceviche": 38,
    "french-coq-au-vin-light": 26,
    "french-nicoise-salad": 34,
    "spanish-chicken-paella": 41,
    "spanish-gazpacho": 29,
    "turkish-chicken-kebab": 37,
    "chinese-kung-pao-chicken": 43,
    "chinese-egg-drop-soup": 30,
    "colombian-bandeja-paisa": 33,
    "argentinian-chimichurri-steak": 46,
    "nigerian-jollof-rice": 35,
    "south-african-bobotie": 27,
    "german-turkey-schnitzel": 40,
    "german-pretzel-protein-bites": 21,
    "dutch-stamppot-protein": 25,
    "british-cottage-pie": 37,
    "polish-chicken-pierogi": 32,
    "greek-protein-energy-balls": 18,
    "japanese-edamame-crispy": 20,
    "mexican-turkey-taquitos": 33,
    "indian-spiced-chickpea-trail-mix": 19,
    "nigerian-suya-skewers": 28,
    "tropical-mango-protein-shake": 31,
    "dutch-chocolate-peanut-butter-shake": 35,
    "indian-mango-lassi-protein": 29,
    "moroccan-date-almond-shake": 23,
    "japanese-matcha-protein-shake": 30,
    "colombian-coffee-protein-shake": 32,
    "thai-tofu-red-curry": 41,
    "italian-vegan-arrabbiata": 38,
    "german-vegan-lentil-stew": 31,
    "peruvian-vegan-ceviche": 36,
  };

  // Load favorites and favorite counts from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("recipe_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCounts = localStorage.getItem("recipe_favorite_counts");
    if (savedCounts) {
      setFavoriteCounts(JSON.parse(savedCounts));
    } else {
      // Initialize with default counts
      setFavoriteCounts(initialFavoriteCounts);
      localStorage.setItem("recipe_favorite_counts", JSON.stringify(initialFavoriteCounts));
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isFavorited = favorites.includes(slug);
    const newFavorites = isFavorited
      ? favorites.filter(f => f !== slug)
      : [...favorites, slug];

    setFavorites(newFavorites);
    localStorage.setItem("recipe_favorites", JSON.stringify(newFavorites));

    // Update favorite count
    const newCounts = { ...favoriteCounts };
    if (isFavorited) {
      // Unfavoriting - decrease count
      newCounts[slug] = Math.max((newCounts[slug] || 0) - 1, 0);
    } else {
      // Favoriting - increase count
      newCounts[slug] = (newCounts[slug] || 0) + 1;
    }
    setFavoriteCounts(newCounts);
    localStorage.setItem("recipe_favorite_counts", JSON.stringify(newCounts));
  };

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }

  useEffect(() => {
    if (isHomeView) {
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
    }
  }, [isHomeView]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  function scrollSlider(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  const filtered = recipes.filter((r) => {
    // If favorites view, only show favorited recipes
    if (isFavoritesView) {
      return favorites.includes(r.slug);
    }
    const matchesRegion = !regionParam || r.region === regionParam;
    const matchesCategory = !categoryParam || r.category === categoryParam;
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase());

    // Apply filters
    let matchesProtein = true;
    if (filters.protein === "high") matchesProtein = r.protein >= 30;
    else if (filters.protein === "medium") matchesProtein = r.protein >= 15 && r.protein < 30;
    else if (filters.protein === "low") matchesProtein = r.protein < 15;

    let matchesCalories = true;
    if (filters.calories === "low") matchesCalories = r.calories < 400;
    else if (filters.calories === "medium") matchesCalories = r.calories >= 400 && r.calories <= 600;
    else if (filters.calories === "high") matchesCalories = r.calories > 600;

    let matchesPrepTime = true;
    const prepMinutes = parseInt(r.prepTime);
    if (filters.prepTime === "quick") matchesPrepTime = prepMinutes < 15;
    else if (filters.prepTime === "medium") matchesPrepTime = prepMinutes >= 15 && prepMinutes <= 30;
    else if (filters.prepTime === "long") matchesPrepTime = prepMinutes > 30;

    return matchesRegion && matchesCategory && matchesSearch && matchesProtein && matchesCalories && matchesPrepTime;
  });

  // Most favorited recipes (sorted by favorite count)
  const mostFavorited = recipes
    .map(recipe => ({ ...recipe, favoriteCount: favoriteCounts[recipe.slug] || 0 }))
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 8);

  const activeFilterCount = [filters.protein, filters.calories, filters.prepTime].filter(f => f !== "all").length;

  const clearFilters = () => {
    setFilters({
      protein: "all",
      calories: "all",
      prepTime: "all",
    });
  };

  const currentRegion = regionParam
    ? regions.find((r) => r.name === regionParam)
    : null;

  const currentCategory = categoryParam;

  // Home View
  if (isHomeView) {
    return (
      <div className="p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {t.dashboard.welcome}
          </h1>
          <p className="text-sm text-muted">
            {t.dashboard.welcomeSub}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder={t.dashboard.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            {/* Filter Button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl border transition-colors flex items-center gap-2 ${
                  activeFilterCount > 0
                    ? "bg-accent text-white border-accent"
                    : "bg-surface border-border text-foreground hover:border-accent/50"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                <span className="text-sm font-medium">{t.dashboard.filter}</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-accent text-xs flex items-center justify-center font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{t.dashboard.filters}</h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-accent hover:underline"
                      >
                        {t.dashboard.clearAll}
                      </button>
                    )}
                  </div>

                  {/* Protein Filter */}
                  <div className="mb-4">
                    <label className="text-xs text-muted mb-2 block">{t.dashboard.protein}</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setFilters({...filters, protein: "all"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.protein === "all"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilters({...filters, protein: "high"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.protein === "high"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        High 30g+
                      </button>
                      <button
                        onClick={() => setFilters({...filters, protein: "medium"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.protein === "medium"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        Medium 15-29g
                      </button>
                      <button
                        onClick={() => setFilters({...filters, protein: "low"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.protein === "low"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        Low &lt;15g
                      </button>
                    </div>
                  </div>

                  {/* Calories Filter */}
                  <div className="mb-4">
                    <label className="text-xs text-muted mb-2 block">Calories</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setFilters({...filters, calories: "all"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.calories === "all"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilters({...filters, calories: "low"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.calories === "low"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        &lt;400
                      </button>
                      <button
                        onClick={() => setFilters({...filters, calories: "medium"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.calories === "medium"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        400-600
                      </button>
                      <button
                        onClick={() => setFilters({...filters, calories: "high"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.calories === "high"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        600+
                      </button>
                    </div>
                  </div>

                  {/* Prep Time Filter */}
                  <div>
                    <label className="text-xs text-muted mb-2 block">Prep Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setFilters({...filters, prepTime: "all"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.prepTime === "all"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilters({...filters, prepTime: "quick"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.prepTime === "quick"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        &lt;15 min
                      </button>
                      <button
                        onClick={() => setFilters({...filters, prepTime: "medium"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.prepTime === "medium"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        15-30 min
                      </button>
                      <button
                        onClick={() => setFilters({...filters, prepTime: "long"})}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          filters.prepTime === "long"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-muted hover:border-accent/50"
                        }`}
                      >
                        30+ min
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Meals of the Week */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {t.dashboard.mealsOfWeek}
              </h2>
              <p className="text-sm text-muted">
                {t.dashboard.mealsOfWeekSub}
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {topMealsOfWeek.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/dashboard/${recipe.slug}`}
                  className="recipe-card bg-surface border border-border rounded-xl overflow-hidden flex-shrink-0 w-[280px] snap-start block"
                >
                  <div className={`${recipe.cuisineClass} h-40 flex items-center justify-center relative`}>
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    {/* Favorite Count Badge - Top Left */}
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center gap-1.5 z-10">
                      <svg className="w-3.5 h-3.5" fill="#B8956A" viewBox="0 0 24 24" stroke="none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span className="text-xs font-medium text-accent">{favoriteCounts[recipe.slug] || 0}</span>
                    </div>
                    {/* Favorite Star Button on Image */}
                    <button
                      onClick={(e) => toggleFavorite(recipe.slug, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors z-10"
                      aria-label={favorites.includes(recipe.slug) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg
                        className="w-4 h-4"
                        fill={favorites.includes(recipe.slug) ? "#B8956A" : "none"}
                        viewBox="0 0 24 24"
                        stroke="#B8956A"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{recipe.flag}</span>
                      <span className="text-xs text-muted">{recipe.country}</span>
                      <span className="ml-auto text-xs text-muted bg-sidebar-active px-2 py-0.5 rounded-full">
                        {recipe.region}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground text-sm mb-1.5">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span>{recipe.calories} cal</span>
                      <span>{recipe.protein}g protein</span>
                      <span className="ml-auto">{recipe.prepTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => scrollSlider("left")}
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
                onClick={() => scrollSlider("right")}
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

        {/* Most Favorited */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {t.dashboard.mostFavorited}
              </h2>
              <p className="text-sm text-muted">
                {t.dashboard.mostFavoritedSub}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mostFavorited.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/dashboard/${recipe.slug}`}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden block"
              >
                <div className={`${recipe.cuisineClass} h-32 flex items-center justify-center relative`}>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  {/* Favorite Count Badge - Top Left */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center gap-1.5 z-10">
                    <svg className="w-3.5 h-3.5" fill="#B8956A" viewBox="0 0 24 24" stroke="none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-medium text-accent">{favoriteCounts[recipe.slug] || 0}</span>
                  </div>
                  {/* Favorite Star Button on Image */}
                  <button
                    onClick={(e) => toggleFavorite(recipe.slug, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors z-10"
                    aria-label={favorites.includes(recipe.slug) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill={favorites.includes(recipe.slug) ? "#B8956A" : "none"}
                      viewBox="0 0 24 24"
                      stroke="#B8956A"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{recipe.flag}</span>
                    <span className="text-xs text-muted">{recipe.country}</span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1.5">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{recipe.calories} cal</span>
                    <span>{recipe.protein}g protein</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newest Recipes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {t.dashboard.newestRecipes}
              </h2>
              <p className="text-sm text-muted">
                {t.dashboard.newestRecipesSub}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {newestRecipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/dashboard/${recipe.slug}`}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden block"
              >
                <div className={`${recipe.cuisineClass} h-32 flex items-center justify-center relative`}>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  {/* Favorite Count Badge - Top Left */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center gap-1.5 z-10">
                    <svg className="w-3.5 h-3.5" fill="#B8956A" viewBox="0 0 24 24" stroke="none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-medium text-accent">{favoriteCounts[recipe.slug] || 0}</span>
                  </div>
                  {/* Favorite Star Button on Image */}
                  <button
                    onClick={(e) => toggleFavorite(recipe.slug, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors z-10"
                    aria-label={favorites.includes(recipe.slug) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill={favorites.includes(recipe.slug) ? "#B8956A" : "none"}
                      viewBox="0 0 24 24"
                      stroke="#B8956A"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{recipe.flag}</span>
                    <span className="text-xs text-muted">{recipe.country}</span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1.5">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{recipe.calories} cal</span>
                    <span>{recipe.protein}g protein</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Recipes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {t.dashboard.allRecipes}
              </h2>
              {activeFilterCount > 0 && (
                <p className="text-xs text-muted mt-1">
                  {activeFilterCount} {activeFilterCount > 1 ? t.dashboard.filtersAppliedPlural : t.dashboard.filtersApplied} {t.dashboard.applied}
                </p>
              )}
            </div>
            <span className="text-sm text-muted">
              {search ? filtered.length : recipes.length} {t.dashboard.recipes}
            </span>
          </div>

          <div className="space-y-3">
            {(search ? filtered : recipes).map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/dashboard/${recipe.slug}`}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden flex items-center hover:shadow-md transition-shadow"
              >
                <div className={`${recipe.cuisineClass} w-32 h-32 flex items-center justify-center flex-shrink-0 relative`}>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  {/* Favorite Count Badge - Top Left */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center gap-1 z-10">
                    <svg className="w-3 h-3" fill="#B8956A" viewBox="0 0 24 24" stroke="none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-medium text-accent">{favoriteCounts[recipe.slug] || 0}</span>
                  </div>
                  {/* Favorite Star Button on Image */}
                  <button
                    onClick={(e) => toggleFavorite(recipe.slug, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors z-10"
                    aria-label={favorites.includes(recipe.slug) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={favorites.includes(recipe.slug) ? "#B8956A" : "none"}
                      viewBox="0 0 24 24"
                      stroke="#B8956A"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{recipe.flag}</span>
                    <span className="text-xs text-muted">{recipe.country}</span>
                    <span className="ml-auto text-xs text-muted bg-sidebar-active px-2 py-0.5 rounded-full">
                      {recipe.region}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground text-base mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-muted mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span>{recipe.calories} cal</span>
                    <span>{recipe.protein}g protein</span>
                    <span>{recipe.carbs}g carbs</span>
                    <span className="ml-auto">{recipe.prepTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Region/All Recipes/Category/Favorites View
  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {isFavoritesView
            ? "Favorites"
            : currentRegion
            ? currentRegion.name
            : currentCategory
            ? currentCategory
            : t.dashboard.allRecipes}
        </h1>
        {isFavoritesView ? (
          <p className="text-sm text-muted">
            Your favorite recipes collection
          </p>
        ) : currentRegion ? (
          <p className="text-sm text-muted">{currentRegion.description}</p>
        ) : currentCategory ? (
          <p className="text-sm text-muted">
            Browse all {currentCategory.toLowerCase()} {t.dashboard.recipes}
          </p>
        ) : (
          <p className="text-sm text-muted">
            Browse all {recipes.length} {t.dashboard.recipes} across every region.
          </p>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder={t.dashboard.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition-colors flex items-center gap-2 ${
                activeFilterCount > 0
                  ? "bg-accent text-white border-accent"
                  : "bg-surface border-border text-foreground hover:border-accent/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <span className="text-sm font-medium">Filter</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-accent text-xs flex items-center justify-center font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-accent hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Protein Filter */}
                <div className="mb-4">
                  <label className="text-xs text-muted mb-2 block">Protein</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setFilters({...filters, protein: "all"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.protein === "all"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilters({...filters, protein: "high"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.protein === "high"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      High 30g+
                    </button>
                    <button
                      onClick={() => setFilters({...filters, protein: "medium"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.protein === "medium"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      Medium 15-29g
                    </button>
                    <button
                      onClick={() => setFilters({...filters, protein: "low"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.protein === "low"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      Low &lt;15g
                    </button>
                  </div>
                </div>

                {/* Calories Filter */}
                <div className="mb-4">
                  <label className="text-xs text-muted mb-2 block">Calories</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setFilters({...filters, calories: "all"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.calories === "all"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilters({...filters, calories: "low"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.calories === "low"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      &lt;400
                    </button>
                    <button
                      onClick={() => setFilters({...filters, calories: "medium"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.calories === "medium"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      400-600
                    </button>
                    <button
                      onClick={() => setFilters({...filters, calories: "high"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.calories === "high"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      &gt;600
                    </button>
                  </div>
                </div>

                {/* Prep Time Filter */}
                <div>
                  <label className="text-xs text-muted mb-2 block">Prep Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setFilters({...filters, prepTime: "all"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.prepTime === "all"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilters({...filters, prepTime: "quick"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.prepTime === "quick"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      &lt;15 min
                    </button>
                    <button
                      onClick={() => setFilters({...filters, prepTime: "medium"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.prepTime === "medium"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      15-30 min
                    </button>
                    <button
                      onClick={() => setFilters({...filters, prepTime: "long"})}
                      className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                        filters.prepTime === "long"
                          ? "bg-accent text-white border-accent"
                          : "bg-surface border-border text-muted hover:border-accent/50"
                      }`}
                    >
                      &gt;30 min
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs text-muted mb-1">{t.dashboard.allRecipes}</p>
          <p className="text-xl font-bold text-foreground">{filtered.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs text-muted mb-1">{t.dashboard.avgCalories}</p>
          <p className="text-xl font-bold text-foreground">
            {filtered.length > 0
              ? Math.round(
                  filtered.reduce((sum, r) => sum + r.calories, 0) /
                    filtered.length
                )
              : 0}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs text-muted mb-1">{t.dashboard.avgProtein}</p>
          <p className="text-xl font-bold text-foreground">
            {filtered.length > 0
              ? Math.round(
                  filtered.reduce((sum, r) => sum + r.protein, 0) /
                    filtered.length
                )
              : 0}
            g
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs text-muted mb-1">{t.dashboard.countries}</p>
          <p className="text-xl font-bold text-foreground">
            {new Set(filtered.map((r) => r.country)).size}
          </p>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 && isFavoritesView ? (
          <div className="col-span-full text-center py-12">
            <svg
              className="w-16 h-16 text-muted mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <p className="text-muted">{t.dashboard.noFavorites}</p>
            <p className="text-sm text-muted mt-2">{t.dashboard.noFavoritesSub}</p>
          </div>
        ) : (
          filtered.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/dashboard/${recipe.slug}`}
              className="recipe-card bg-surface border border-border rounded-xl overflow-hidden block"
            >
              <div className={`${recipe.cuisineClass} h-36 flex items-center justify-center relative`}>
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                {/* Favorite Count Badge - Top Left */}
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center gap-1.5 z-10">
                  <svg className="w-3.5 h-3.5" fill="#B8956A" viewBox="0 0 24 24" stroke="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span className="text-xs font-medium text-accent">{favoriteCounts[recipe.slug] || 0}</span>
                </div>
                {/* Favorite Star Button on Image */}
                <button
                  onClick={(e) => toggleFavorite(recipe.slug, e)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors z-10"
                  aria-label={favorites.includes(recipe.slug) ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg
                    className="w-4 h-4"
                    fill={favorites.includes(recipe.slug) ? "#B8956A" : "none"}
                    viewBox="0 0 24 24"
                    stroke="#B8956A"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{recipe.flag}</span>
                  <span className="text-xs text-muted">{recipe.country}</span>
                  <span className="ml-auto text-xs text-muted bg-sidebar-active px-2 py-0.5 rounded-full">
                    {recipe.region}
                  </span>
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1.5">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{recipe.calories} cal</span>
                  <span>{recipe.protein}g protein</span>
                  <span className="ml-auto">{recipe.prepTime}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
