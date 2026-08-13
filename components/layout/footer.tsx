import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <Link href="/" className="font-display text-lg font-bold text-text">
            Car Rental <span className="text-accent">.</span>
          </Link>
          <p className="text-textMuted text-sm mt-3 max-w-xs">
            A car rental fleet built for every kind of trip — city runs, weekend
            escapes, and everything between.
          </p>
        </div>

        <div>
          <p className="text-text text-sm font-medium mb-3">Explore</p>
          <div className="flex flex-col gap-2">
            <Link
              href="/cars"
              className="text-textMuted text-sm hover:text-text transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              href="/about"
              className="text-textMuted text-sm hover:text-text transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-textMuted text-sm hover:text-text transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-text text-sm font-medium mb-3">Contact</p>
          <div className="flex flex-col gap-2 text-textMuted text-sm">
            <span>support@car-rentals.com</span>
            <span>+92 300 1234567</span>
            <span>Islamabad, Pakistan</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="text-textMuted text-xs text-center py-4">
          © {new Date().getFullYear()} Car Rentals. Built as a portfolio
          project.
        </p>
      </div>
    </footer>
  );
}
