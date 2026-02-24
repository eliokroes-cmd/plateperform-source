"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRevenueCat } from "@/contexts/RevenueCatContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { isPro } = useRevenueCat();

  useEffect(() => {
    let subscribed = false;
    try {
      subscribed = localStorage.getItem("globalfuel_subscribed") === "true";
    } catch {
      // localStorage unavailable
    }
    if (subscribed || isPro) {
      setHasAccess(true);
    } else {
      router.push("/pricing");
    }
    setLoading(false);
  }, [router, isPro]);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-40 px-3 py-2 bg-surface border border-border rounded text-xs font-medium"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>
      <Suspense>
        <div className={`fixed md:relative inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <DashboardSidebar />
        </div>
      </Suspense>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
