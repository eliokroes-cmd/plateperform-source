import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3">
              Plate<span className="text-accent">Perform</span>
            </h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Stop eating the same meals every week. Try something new.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-sm text-background/60 hover:text-background transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/#regions" className="text-sm text-background/60 hover:text-background transition-colors">
                  Regions
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm text-background/60 hover:text-background transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              Account
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-background/60 hover:text-background transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-background/60 hover:text-background transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-background/60">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-background/60">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} PlatePerform. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            For athletes and food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
