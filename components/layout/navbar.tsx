"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border/80 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-text tracking-tight flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#ffb400]" />
          Car Rentals
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "relative text-text text-sm font-medium px-3 py-2"
                    : "relative text-textMuted text-sm font-medium px-3 py-2 hover:text-text transition-colors"
                }
              >
                {link.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/cars"
          className="hidden sm:inline-flex items-center bg-accent text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accentHover hover:shadow-glow transition-all"
        >
          Rent Now
        </Link>

        <Link
          href="/cars"
          className="sm:hidden bg-accent text-bg text-sm font-semibold px-4 py-2 rounded-full"
        >
          Rent
        </Link>
      </nav>
    </header>
  );
}
