"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaywallGate({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscribed = localStorage.getItem("globalfuel_subscribed");
    setHasAccess(subscribed === "true");
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Blurred content preview */}
      <div className="paywall-blur">{children}</div>

      {/* Paywall overlay */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 max-w-md mx-6 text-center shadow-xl">
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-7 h-7 text-accent"
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

          <h2 className="text-2xl font-bold text-foreground mb-3">
            Unlock All Recipes
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Get full access to 200+ international recipes from every region,
            with macro breakdowns, meal plans, and more.
          </p>

          <Link
            href="/pricing"
            className="inline-block w-full bg-foreground text-background font-medium py-3 px-6 rounded-full hover:bg-foreground/90 transition-colors mb-4"
          >
            View Plans
          </Link>

          <p className="text-xs text-muted">
            Already a member?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
