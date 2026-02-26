"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Purchases, Package, PackageType } from "@revenuecat/purchases-js";
import { supabase } from "@/lib/supabase";

interface RevenueCatContextType {
  isPro: boolean;
  packages: Package[];
  loading: boolean;
  purchasePackage: (pkg?: Package) => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

async function getUserId(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user?.id) return session.user.id;
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

    const initRC = async (userId: string) => {
      const instance = Purchases.configure(apiKey, userId);
      setPurchases(instance);

      try {
        const info = await instance.getCustomerInfo();
        setIsPro(Object.keys(info.entitlements.active).length > 0);
      } catch {
        try {
          setIsPro(localStorage.getItem("globalfuel_subscribed") === "true");
        } catch { /* ignore */ }
      }

      try {
        const offerings = await instance.getOfferings();
        setPackages(offerings.current?.availablePackages ?? []);
      } catch {
        setPackages([]);
      }
    };

    const start = async () => {
      const userId = await getUserId();
      await initRC(userId);
      setLoading(false);
    };

    start();

    // Re-initialize RC with Supabase user ID when the user signs in,
    // so any purchase made before login transfers to their account.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user?.id) {
        await initRC(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
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
