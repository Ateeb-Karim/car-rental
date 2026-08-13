import Link from "next/link";
import NavBtn from "../ui/navbtn";

export default function Navbar() {
  return (
    <header className="border-b border-border/80 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between relative">
        <Link
          href="/"
          className="font-display text-xl font-bold text-text tracking-tight flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#ffb400]" />
          Car Rentals
        </Link>
        <NavBtn />
        <Link
          href="/cars"
          className="hidden md:inline-flex items-center bg-accent text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accentHover hover:shadow-glow transition-all"
        >
          Rent Now
        </Link>
      </nav>
    </header>
  );
}
