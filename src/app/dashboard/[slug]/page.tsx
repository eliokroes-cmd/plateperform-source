"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeBySlug, recipes } from "@/lib/recipes";
import { translateRecipe } from "@/lib/recipe-translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const recipe = getRecipeBySlug(slug);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const { t, language } = useLanguage();
  const translatedRecipe = translateRecipe(recipe, language === "NL" ? "nl" : language === "ES" ? "es" : undefined);

  // Load favorites and checked ingredients from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("recipe_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedIngredients = localStorage.getItem(`recipe_ingredients_${slug}`);
    if (savedIngredients) {
      setCheckedIngredients(new Set(JSON.parse(savedIngredients)));
    }
  }, [slug]);

  // Toggle favorite
  const toggleFavorite = () => {
    const newFavorites = favorites.includes(slug)
      ? favorites.filter(f => f !== slug)
      : [...favorites, slug];
    setFavorites(newFavorites);
    localStorage.setItem("recipe_favorites", JSON.stringify(newFavorites));
  };

  // Toggle ingredient checkbox
  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
    localStorage.setItem(`recipe_ingredients_${slug}`, JSON.stringify(Array.from(newChecked)));
  };

  if (!recipe) {
    notFound();
  }

  const otherRecipes = recipes
    .filter((r) => r.slug !== slug && r.region === recipe.region)
    .slice(0, 3);

  return (
    <div className="p-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link
          href="/dashboard"
          className="hover:text-foreground transition-colors"
        >
          {t.recipe.allRecipes}
        </Link>
        <span>/</span>
        <Link
          href={`/dashboard?region=${encodeURIComponent(recipe.region)}`}
          className="hover:text-foreground transition-colors"
        >
          {recipe.region}
        </Link>
        <span>/</span>
        <span className="text-foreground">{translatedRecipe.title}</span>
      </div>

      {/* Hero */}
      <div
        className={`${recipe.cuisineClass} rounded-xl h-48 md:h-60 flex items-center justify-center mb-6`}
      >
        <img src={recipe.image} alt={translatedRecipe.title} className="w-full h-full object-cover" />
      </div>

      {/* Title & Meta */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{recipe.flag}</span>
          <span className="text-sm text-muted">{recipe.country}</span>
          <span className="text-xs bg-sidebar-active text-foreground/70 px-2.5 py-0.5 rounded-full">
            {recipe.region}
          </span>
          <span className="text-xs bg-sidebar-active text-foreground/70 px-2.5 py-0.5 rounded-full">
            {recipe.category}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {translatedRecipe.title}
            </h1>
            <p className="text-sm text-muted leading-relaxed">
              {translatedRecipe.description}
            </p>
          </div>
          {/* Favorite Star Button */}
          <button
            onClick={toggleFavorite}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent/10 transition-colors"
            aria-label={favorites.includes(slug) ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className="w-6 h-6"
              fill={favorites.includes(slug) ? "#B8956A" : "none"}
              viewBox="0 0 24 24"
              stroke="#B8956A"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-surface border border-border rounded-lg p-3 text-center">
          <p className="text-[10px] text-muted mb-0.5">{t.recipe.prep}</p>
          <p className="text-sm font-semibold text-foreground">
            {recipe.prepTime}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-3 text-center">
          <p className="text-[10px] text-muted mb-0.5">{t.recipe.cook}</p>
          <p className="text-sm font-semibold text-foreground">
            {recipe.cookTime}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-3 text-center">
          <p className="text-[10px] text-muted mb-0.5">{t.recipe.servings}</p>
          <p className="text-sm font-semibold text-foreground">
            {recipe.servings}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-3 text-center">
          <p className="text-[10px] text-muted mb-0.5">{t.recipe.calories}</p>
          <p className="text-sm font-semibold text-foreground">
            {recipe.calories}
          </p>
        </div>
      </div>

      {/* Macros */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
          {t.recipe.nutritionPerServing}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted">{t.recipe.protein}</span>
              <span className="text-xs font-semibold text-foreground">
                {recipe.protein}g
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((recipe.protein / 50) * 100, 100)}%`,
                  backgroundColor: "#B8956A",
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted">{t.recipe.carbs}</span>
              <span className="text-xs font-semibold text-foreground">
                {recipe.carbs}g
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((recipe.carbs / 70) * 100, 100)}%`,
                  backgroundColor: "#7A9A6D",
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted">{t.recipe.fat}</span>
              <span className="text-xs font-semibold text-foreground">
                {recipe.fat}g
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((recipe.fat / 30) * 100, 100)}%`,
                  backgroundColor: "#D4C4B0",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-sidebar-active text-muted px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Ingredients */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-3">{translatedRecipe.ingredients}</h2>
        <div className="bg-surface border border-border rounded-xl p-5">
          <ul className="space-y-2">
            {translatedRecipe.ingredients.map((ing: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <button
                  onClick={() => toggleIngredient(i)}
                  className={`w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    checkedIngredients.has(i)
                      ? "bg-accent border-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                  aria-label={`Toggle ${ing}`}
                >
                  {checkedIngredients.has(i) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className={checkedIngredients.has(i) ? "line-through text-muted" : ""}>
                  {ing}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-3">{translatedRecipe.instructions}</h2>
        <div className="bg-surface border border-border rounded-xl p-5">
          <ol className="space-y-4">
            {translatedRecipe.instructions.map((step: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(184, 149, 106, 0.12)",
                    color: "#9A7B54",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* More from region */}
      {otherRecipes.length > 0 && (
        <div className="border-t border-border pt-8">
          <h3 className="text-base font-bold text-foreground mb-4">
            {t.recipe.moreFrom} {recipe.region}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherRecipes.map((r) => (
              <Link
                key={r.slug}
                href={`/dashboard/${r.slug}`}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden block"
              >
                <div
                  className={`${r.cuisineClass} h-24 flex items-center justify-center`}
                >
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted mb-0.5">
                    {r.flag} {r.country}
                  </p>
                  <h4 className="text-xs font-medium text-foreground">
                    {r.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
