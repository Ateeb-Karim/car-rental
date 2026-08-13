"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavBtn() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
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

      {/* Mobile toggle */}
      <button
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 mr-2"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div
        className={`w-fit mx-auto md:hidden rounded-b-xl absolute right-0 top-full bg-bg/95 backdrop-blur-md border-b border-border/80 overflow-hidden transition-all duration-300 ease-out ${
          menuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 flex flex-col items-center gap-4">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium ${active ? "text-accent" : "text-text"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/cars"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-accent text-bg text-sm font-semibold px-4 py-2 rounded-full"
          >
            Rent
          </Link>
        </div>
      </div>
    </>
  );
}
