"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2ED]/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Plate<span className="text-accent">Perform</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/#regions"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.regions}
          </Link>
          <Link
            href="/#features"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.features}
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.pricing}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-background/50"
              aria-label="Select language"
            >
              <span>{languages.find(l => l.code === language)?.flag}</span>
              <span>{language}</span>
              <svg
                className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-[#F5F2ED] border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-background/50 transition-colors flex items-center gap-3 ${
                      language === lang.code ? "bg-background/30 text-foreground" : "text-muted"
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
            href="/login"
            className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/pricing"
            className="text-sm bg-foreground text-background px-5 py-2 rounded-full hover:bg-foreground/90 transition-colors"
          >
            {t.nav.getAccess}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5F2ED] border-b border-border px-6 py-4 space-y-4">
          <Link
            href="/#regions"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.regions}
          </Link>
          <Link
            href="/#features"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.features}
          </Link>
          <Link
            href="/pricing"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.pricing}
          </Link>

          {/* Mobile Language Selector */}
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted mb-2 uppercase tracking-wider">Language</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex-1 text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    language === lang.code
                      ? "bg-foreground text-background"
                      : "bg-background/50 text-muted hover:text-foreground"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border flex gap-3">
            <Link
              href="/login"
              className="text-sm text-muted hover:text-foreground px-4 py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/pricing"
              className="text-sm bg-foreground text-background px-5 py-2 rounded-full"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.getAccess}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
