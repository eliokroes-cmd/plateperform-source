"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getRecipeBySlug, recipes } from "@/lib/recipes";
import { translateRecipe } from "@/lib/recipe-translations";
import { useLanguage } from "@/contexts/LanguageContext";

// Free recipes available to everyone
const freeRecipeSlugs = [
  "italian-protein-pasta",
  "greek-chicken-souvlaki",
  "mexican-black-bean-quinoa"
];

function RecipeDetail({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const recipe = getRecipeBySlug(slug);
  const translatedRecipe = translateRecipe(recipe, language === "NL" ? "nl" : language === "ES" ? "es" : undefined);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscribed = localStorage.getItem("globalfuel_subscribed");
    setHasAccess(subscribed === "true");
    setLoading(false);
  }, []);

  if (!recipe) {
    notFound();
  }

  const isFreeRecipe = freeRecipeSlugs.includes(slug);
  const canView = hasAccess || isFreeRecipe;

  // Show paywall if user can't view this recipe
  if (!loading && !canView) {
    return (
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-8">
            <Link href="/recipes" className="hover:text-foreground transition-colors">
              Recipes
            </Link>
            <span>/</span>
            <span className="text-foreground">{translatedRecipe.title}</span>
          </div>

          {/* Paywall */}
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              This Recipe is Locked
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Get full access to 200+ international recipes with macro breakdowns, meal plans, and more.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-foreground text-background font-medium py-3 px-8 rounded-full hover:bg-foreground/90 transition-colors mb-4"
            >
              View Plans
            </Link>
            <p className="text-xs text-muted">
              or{" "}
              <Link href="/recipes" className="text-accent hover:underline">
                browse free recipes
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const otherRecipes = recipes
    .filter((r) => r.slug !== slug && (hasAccess || freeRecipeSlugs.includes(r.slug)))
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/recipes" className="hover:text-foreground transition-colors">
            Recipes
          </Link>
          <span>/</span>
          <span className="text-foreground">{translatedRecipe.title}</span>
        </div>

        {/* Hero */}
        <div className="rounded-2xl h-56 md:h-72 flex items-center justify-center mb-8 overflow-hidden">
          {recipe.image.startsWith('/') ? (
            <img 
              src={recipe.image} 
              alt={translatedRecipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={recipe.image} alt={translatedRecipe.title} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Title & Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{recipe.flag}</span>
            <span className="text-sm text-muted">{recipe.country}</span>
            <span className="ml-2 text-xs bg-accent/10 text-accent-dark px-3 py-1 rounded-full">
              {recipe.region}
            </span>
            <span className="text-xs bg-foreground/5 text-muted px-3 py-1 rounded-full">
              {recipe.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {translatedRecipe.title}
          </h1>
          <p className="text-muted leading-relaxed">{translatedRecipe.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xs text-muted mb-1">Prep Time</p>
            <p className="text-sm font-semibold text-foreground">{recipe.prepTime}</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xs text-muted mb-1">Cook Time</p>
            <p className="text-sm font-semibold text-foreground">{recipe.cookTime}</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xs text-muted mb-1">Servings</p>
            <p className="text-sm font-semibold text-foreground">{recipe.servings}</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xs text-muted mb-1">Calories</p>
            <p className="text-sm font-semibold text-foreground">{recipe.calories}</p>
          </div>
        </div>

        {/* Macros */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-10">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Nutrition per Serving
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Protein</span>
                <span className="text-xs font-semibold text-foreground">{recipe.protein}g</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${Math.min((recipe.protein / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Carbs</span>
                <span className="text-xs font-semibold text-foreground">{recipe.carbs}g</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage rounded-full"
                  style={{ width: `${Math.min((recipe.carbs / 70) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Fat</span>
                <span className="text-xs font-semibold text-foreground">{recipe.fat}g</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground/30 rounded-full"
                  style={{ width: `${Math.min((recipe.fat / 30) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-background border border-border px-3 py-1 rounded-full text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {translatedRecipe.ingredients.map((ing: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full border border-border flex-shrink-0 mt-0.5" />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Instructions</h2>
          <ol className="space-y-4">
            {translatedRecipe.instructions.map((step: string, i: number) => (
              <li key={i} className="flex gap-4">
                <span className="w-7 h-7 bg-accent/10 text-accent text-xs font-semibold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* More Recipes */}
        <div className="border-t border-border pt-10">
          <h3 className="text-lg font-bold text-foreground mb-6">
            More recipes you&apos;ll love
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherRecipes.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="recipe-card bg-surface border border-border rounded-xl overflow-hidden block"
              >
                <div className={`${r.cuisineClass} h-28 flex items-center justify-center overflow-hidden`}>
                  {r.image.startsWith('/') ? (
                    <img 
                      src={r.image} 
                      alt={r.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted mb-1">
                    {r.flag} {r.country}
                  </p>
                  <h4 className="text-sm font-semibold text-foreground">
                    {r.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <RecipeDetail slug={slug} />
      <Footer />
    </main>
  );
}
