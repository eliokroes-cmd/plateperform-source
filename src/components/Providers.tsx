"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { RevenueCatProvider } from "@/contexts/RevenueCatContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <RevenueCatProvider>
        {children}
      </RevenueCatProvider>
    </LanguageProvider>
  );
}
