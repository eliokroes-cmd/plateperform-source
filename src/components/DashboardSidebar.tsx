"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

const homeLinks = [
  { name: "Home", href: "/dashboard", icon: "home", emoji: "🏠" },
];

const regionLinks = [
  { name: "Mediterranean", href: "/dashboard?region=Mediterranean", icon: "mediterranean", emoji: "🫒" },
  { name: "Asian", href: "/dashboard?region=Asian", icon: "asian", emoji: "🥢" },
  { name: "Latin American", href: "/dashboard?region=Latin American", icon: "latin", emoji: "🌶️" },
  { name: "African", href: "/dashboard?region=African", icon: "african", emoji: "🌍" },
  { name: "European", href: "/dashboard?region=European", icon: "european", emoji: "🥖" },
];

const categoryLinks = [
  { name: "Vegan", href: "/dashboard?category=Vegan", icon: "vegan", emoji: "🌱" },
  { name: "Snacks", href: "/dashboard?category=Snacks", icon: "snacks", emoji: "🍿" },
  { name: "Shakes", href: "/dashboard?category=Shakes", icon: "shakes", emoji: "🥤" },
];

const viewLinks = [
  { name: "Favorites", href: "/dashboard?view=favorites", icon: "favorites", emoji: "⭐" },
  { name: "All Recipes", href: "/dashboard?view=all", icon: "grid", emoji: "📋" },
];

function NavIcon({ type }: { type: string }) {
  const cls = "w-4 h-4";
  switch (type) {
    case "home":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case "grid":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      );
    case "mediterranean":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      );
    case "asian":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37" />
        </svg>
      );
    case "latin":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
        </svg>
      );
    case "african":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      );
    case "european":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      );
    case "snacks":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.871V8.25m-6 4.25v.01M9 16.5v.01m3-.01v.01m3-.01v.01" />
        </svg>
      );
    case "shakes":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      );
    case "vegan":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591l-5.607 3.112a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-5.714zm.75 5.715v2.927a2.25 2.25 0 001.244 2.013l5.607 3.112a2.25 2.25 0 00.659-1.591V14.82l-5.607-3.112a2.25 2.25 0 00-.659-1.591v-2.927a2.25 2.25 0 011.244-2.013L14.25 8.82V8.82l-5.607-3.112A2.25 2.25 0 008.25 3.104z" />
        </svg>
      );
    case "favorites":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRegion = searchParams.get("region");
  const currentCategory = searchParams.get("category");
  const [regionsExpanded, setRegionsExpanded] = useState(true);
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "EN" as Language, label: "English", flag: "🇬🇧" },
    { code: "NL" as Language, label: "Nederlands", flag: "🇳🇱" },
    { code: "ES" as Language, label: "Español", flag: "🇪🇸" },
  ];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setLangOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langOpen]);

  function isActive(link: { name: string; href: string; icon: string; emoji?: string }) {
    if (link.href === "/dashboard") {
      // Home is active when no params at all
      return pathname === "/dashboard" && !currentRegion && !searchParams.get("view") && !currentCategory;
    }
    if (link.href === "/dashboard?view=all") {
      // All Recipes is active when view=all
      return searchParams.get("view") === "all";
    }
    if (link.href === "/dashboard?view=favorites") {
      // Favorites is active when view=favorites
      return searchParams.get("view") === "favorites";
    }
    // Check for region match
    const linkRegion = new URL(link.href, "http://localhost").searchParams.get("region");
    if (linkRegion) {
      return currentRegion === linkRegion;
    }
    // Check for category match
    const linkCategory = new URL(link.href, "http://localhost").searchParams.get("category");
    if (linkCategory) {
      return currentCategory === linkCategory;
    }
    return false;
  }

  return (
    <aside className="w-60 bg-sidebar-bg border-r border-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          Plate<span style={{ color: "#B8956A" }}>Perform</span>
        </Link>
        <Link href="/login" className="text-muted hover:text-foreground transition-colors text-lg">
          ⚙️
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {/* Home */}
        {homeLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
              isActive(link)
                ? "active text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span className="text-base">{link.emoji}</span>
            {link.name}
          </Link>
        ))}

        {/* Regions Section */}
        <div className="pt-4">
          <button
            onClick={() => setRegionsExpanded(!regionsExpanded)}
            className="w-full flex items-center justify-between px-3 pb-2 text-[10px] font-semibold text-muted uppercase tracking-wider hover:text-foreground transition-colors"
          >
            <span>Regions</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${regionsExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              regionsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {regionLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  isActive(link)
                    ? "active text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="text-base">{link.emoji}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="pt-2">
          {categoryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                isActive(link)
                  ? "active text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span className="text-base">{link.emoji}</span>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Views */}
        <div className="pt-2">
          {viewLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                isActive(link)
                  ? "active text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span className="text-base">{link.emoji}</span>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-border space-y-2">
        {/* Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground transition-colors sidebar-link"
            aria-label="Select language"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{languages.find(l => l.code === language)?.flag}</span>
              <span>{languages.find(l => l.code === language)?.label}</span>
            </div>
            <svg
              className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sidebar-active transition-colors flex items-center gap-3 ${
                    language === lang.code ? "bg-sidebar-active text-foreground" : "text-muted"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground sidebar-link"
        >
          <span className="text-base">🌐</span>
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
