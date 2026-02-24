"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Purchases, Package, PackageType } from "@revenuecat/purchases-js";

interface RevenueCatContextType {
  isPro: boolean;
  packages: Package[];
  loading: boolean;
  purchasePackage: (pkg?: Package) => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

function getUserId(): string {
  try {
    let userId = localStorage.getItem("rc_user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("rc_user_id", userId);
    }
    return userId;
  } catch {
    return crypto.randomUUID();
  }
}

export function RevenueCatProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchases | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY;
    if (!apiKey) return;

    const userId = getUserId();
    const instance = Purchases.configure(apiKey, userId);
    setPurchases(instance);

    instance.getCustomerInfo().then((info) => {
      const active = Object.keys(info.entitlements.active).length > 0;
      setIsPro(active);
    }).catch(() => {
      // Fallback to localStorage
      try {
        setIsPro(localStorage.getItem("globalfuel_subscribed") === "true");
      } catch { /* ignore */ }
    });

    instance.getOfferings().then((offerings) => {
      const pkgs = offerings.current?.availablePackages ?? [];
      setPackages(pkgs);
    }).catch(() => {
      setPackages([]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const purchasePackage = async (pkg?: Package) => {
    const targetPkg = pkg ?? packages[0];
    if (!purchases || !targetPkg) {
      // Fallback demo mode
      try { localStorage.setItem("globalfuel_subscribed", "true"); } catch { /* ignore */ }
      setIsPro(true);
      return;
    }

    try {
      const { customerInfo } = await purchases.purchase({ rcPackage: targetPkg });
      const active = Object.keys(customerInfo.entitlements.active).length > 0;
      setIsPro(active);
      if (active) {
        try { localStorage.setItem("globalfuel_subscribed", "true"); } catch { /* ignore */ }
      }
    } catch (e: any) {
      if (e?.userCancelled) return;
      throw e;
    }
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
