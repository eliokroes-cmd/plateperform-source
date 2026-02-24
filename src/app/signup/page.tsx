"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/pricing");
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-sm text-muted">
              Sign up to get full access to all recipes.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs text-muted mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs text-muted mb-1.5" htmlFor="confirm">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="Repeat your password"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
