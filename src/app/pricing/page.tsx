"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRevenueCat } from "@/contexts/RevenueCatContext";
import { Language } from "@/lib/translations";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const { t, language, setLanguage } = useLanguage();
  const { packages, loading, purchasePackage } = useRevenueCat();
  const [purchasing, setPurchasing] = useState(false);
  const router = useRouter();
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

  const handleSubscribe = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/signup");
      return;
    }
    setPurchasing(true);
    try {
      const { PackageType } = await import("@revenuecat/purchases-js");
      const pkg = packages.find(p =>
        annual
          ? p.packageType === PackageType.Annual || p.identifier.toLowerCase().includes("annual")
          : p.packageType === PackageType.Monthly || p.identifier.toLowerCase().includes("monthly")
      ) ?? packages[0];
      await purchasePackage(pkg);
      router.push("/dashboard");
    } catch {
      // Purchase failed or was cancelled
    } finally {
      setPurchasing(false);
    }
  };

  const monthlyText = {
    EN: "Monthly",
    NL: "Maandelijks",
    ES: "Mensual"
  };

  const annualText = {
    EN: "Annual",
    NL: "Jaarlijks",
    ES: "Anual"
  };

  const freeText = {
    EN: {
      title: "Free",
      price: "/forever",
      desc: "Preview the experience with limited access.",
      feat1: "5 sample recipes",
      feat2: "Basic macro info",
      feat3: "No meal plans",
      feat4: "No shopping lists",
      cta: "Browse Free Recipes"
    },
    NL: {
      title: "Gratis",
      price: "/altijd",
      desc: "Bekijk de ervaring met beperkte toegang.",
      feat1: "5 voorbeeldrecepten",
      feat2: "Basis macro info",
      feat3: "Geen maaltijdplannen",
      feat4: "Geen boodschappenlijsten",
      cta: "Bekijk Gratis Recepten"
    },
    ES: {
      title: "Gratis",
      price: "/para siempre",
      desc: "Vista previa de la experiencia con acceso limitado.",
      feat1: "5 recetas de muestra",
      feat2: "Información macro básica",
      feat3: "Sin planes de comidas",
      feat4: "Sin listas de compras",
      cta: "Explorar Recetas Gratis"
    }
  };

  const popularText = {
    EN: "Most Popular",
    NL: "Meest Populair",
    ES: "Más Popular"
  };

  const faqText = {
    EN: {
      title: "Frequently asked questions",
      q1: "Can I cancel anytime?",
      a1: "Yes. Cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period.",
      q2: "How does billing work?",
      a2: "You'll be charged immediately when you subscribe. Choose monthly or annual billing. Annual subscribers save 22% compared to monthly.",
      q3: "Are new recipes added regularly?",
      a3: "We add 5-10 new recipes every week, sourced from professional chefs and sports nutritionists around the world.",
      q4: "Do you cater to dietary restrictions?",
      a4: "Yes. Every recipe is tagged with dietary info, and you can filter by vegan, gluten-free, dairy-free, and more."
    },
    NL: {
      title: "Veelgestelde vragen",
      q1: "Kan ik altijd opzeggen?",
      a1: "Ja. Zeg je abonnement op elk moment op via je accountinstellingen. Je behoudt toegang tot het einde van je factureringsperiode.",
      q2: "Hoe werkt facturering?",
      a2: "Je wordt direct bij inschrijving gefactureerd. Kies tussen maandelijkse of jaarlijkse facturering. Jaarlijkse abonnees besparen 22% vergeleken met maandelijks.",
      q3: "Worden er regelmatig nieuwe recepten toegevoegd?",
      a3: "We voegen elke week 5-10 nieuwe recepten toe, afkomstig van professionele chefs en sportvoedingsdeskundigen over de hele wereld.",
      q4: "Houdt u rekening met dieetbeperkingen?",
      a4: "Ja. Elk recept is gelabeld met dieetinformatie, en je kunt filteren op veganistisch, glutenvrij, zuivelvrij, en meer."
    },
    ES: {
      title: "Preguntas frecuentes",
      q1: "¿Puedo cancelar en cualquier momento?",
      a1: "Sí. Cancela tu suscripción en cualquier momento desde la configuración de tu cuenta. Mantendrás el acceso hasta el final de tu período de facturación.",
      q2: "¿Cómo funciona la facturación?",
      a2: "Se te cobrará inmediatamente cuando te suscribas. Elige entre facturación mensual o anual. Los suscriptores anuales ahorran un 22% en comparación con los mensuales.",
      q3: "¿Se agregan nuevas recetas regularmente?",
      a3: "Agregamos entre 5 y 10 nuevas recetas cada semana, provenientes de chefs profesionales y nutricionistas deportivos de todo el mundo.",
      q4: "¿Atienden restricciones dietéticas?",
      a4: "Sí. Cada receta está etiquetada con información dietética, y puedes filtrar por vegano, sin gluten, sin lácteos y más."
    }
  };

  const currentFree = freeText[language];
  const currentFaq = faqText[language];

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2 flex items-center gap-2 rounded-lg border border-border hover:border-accent/50 bg-surface"
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
                <div className="absolute top-full right-0 mt-2 w-44 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-background/50 transition-colors flex items-center gap-3 ${
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
          </div>

          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              {t.pricing.tagline}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t.pricing.title}
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              {t.pricing.subtitle}
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setAnnual(false)}
                className={`text-sm transition-colors ${!annual ? "text-foreground font-medium" : "text-muted hover:text-foreground"}`}
              >
                {monthlyText[language]}
              </button>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-accent" : "bg-border"}`}
                aria-label="Toggle between monthly and annual billing"
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${annual ? "translate-x-7" : "translate-x-0"}`}
                />
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`text-sm transition-colors ${annual ? "text-foreground font-medium" : "text-muted hover:text-foreground"}`}
              >
                {annualText[language]}
                <span className="ml-1.5 text-xs text-sage font-medium">{t.pricing.discount}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free Plan */}
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                {currentFree.title}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">&euro;0</span>
                <span className="text-muted text-sm">{currentFree.price}</span>
              </div>
              <p className="text-sm text-muted mb-6">
                {currentFree.desc}
              </p>
              <ul className="text-sm text-muted space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {currentFree.feat1}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {currentFree.feat2}
                </li>
                <li className="flex items-center gap-3 text-muted/50">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {currentFree.feat3}
                </li>
                <li className="flex items-center gap-3 text-muted/50">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {currentFree.feat4}
                </li>
              </ul>
              <Link
                href="/recipes"
                className="block w-full text-center border border-border text-foreground py-3 rounded-full font-medium hover:bg-foreground/5 transition-colors text-sm"
              >
                {currentFree.cta}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-surface border-2 border-accent rounded-2xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                {popularText[language]}
              </span>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                {t.pricing.plan}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">
                  &euro;{annual ? "11.67" : "15"}
                </span>
                <span className="text-muted text-sm">{t.pricing.perMonth}</span>
              </div>
              {annual && (
                <p className="text-xs text-sage mb-4">
                  {t.pricing.yearlyDetail}
                </p>
              )}
              {!annual && (
                <p className="text-xs text-muted mb-4">
                  {t.pricing.monthly}
                </p>
              )}
              <p className="text-sm text-muted mb-6">
                {t.pricing.subtitle}
              </p>
              <ul className="text-sm text-muted space-y-3 mb-8">
                {t.pricing.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe()}
                disabled={purchasing}
                className="block w-full text-center bg-foreground text-background py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchasing ? "Processing..." : loading ? "Loading..." : t.pricing.cta}
              </button>
              <p className="text-xs text-muted mt-3 text-center">
                {t.pricing.trialInfo}
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-xl mx-auto mt-20">
            <h3 className="text-xl font-bold text-center text-foreground mb-8">
              {currentFaq.title}
            </h3>
            <div className="space-y-4">
              {[
                { q: currentFaq.q1, a: currentFaq.a1 },
                { q: currentFaq.q2, a: currentFaq.a2 },
                { q: currentFaq.q3, a: currentFaq.a3 },
                { q: currentFaq.q4, a: currentFaq.a4 },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-surface border border-border rounded-xl group"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer">
                    <span className="text-sm font-medium text-foreground">
                      {faq.q}
                    </span>
                    <span className="faq-icon text-muted transition-transform text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
