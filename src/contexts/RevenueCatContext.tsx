"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RevenueCatContextType {
  isPro: boolean;
  packages: any[];
  loading: boolean;
  purchasePackage: () => void;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

// Placeholder - RevenueCat integration to be completed
const API_KEY = "test_BDkyIxEUHMamWuGzsGWEFWqzaxA";

export function RevenueCatProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Check localStorage for demo purposes
  useEffect(() => {
    const subscribed = localStorage.getItem("globalfuel_subscribed");
    if (subscribed === "true") {
      setIsPro(true);
    }
    setLoading(false);
  }, []);

  const purchasePackage = () => {
    // For now, just set localStorage as demo
    // Full RevenueCat integration can be added later with proper setup
    localStorage.setItem("globalfuel_subscribed", "true");
    setIsPro(true);
    window.location.href = "/dashboard";
  };

  return (
    <RevenueCatContext.Provider value={{ isPro, packages, loading, purchasePackage }}>
      {children}
    </RevenueCatContext.Provider>
  );
}

export function useRevenueCat() {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error("useRevenueCat must be used within RevenueCatProvider");
  }
  return context;
}
