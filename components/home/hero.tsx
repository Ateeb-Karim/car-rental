import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const HERO_IMAGE =
    "https://images.unsplash.com/photo-1578148103598-aed9e3871003?auto=format&fit=crop&w=2000&q=80";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/80 to-bg/30" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/60 via-transparent to-bg/60" />
      </div>

      <div
        aria-hidden
        className="headlight-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-accent/30 to-transparent blur-2xl"
      />

      <div className="relative px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase bg-accentSoft px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Rent smarter
          </span>

          <h1 className="font-display text-5xl sm:text-6xl font-bold mt-6 leading-[1.05] tracking-tight">
            The right car,
            <br />
            <span className="text-accent">whenever</span> you need it.
          </h1>

          <p className="text-textMuted text-lg mt-5 max-w-md mx-auto">
            From city runs to weekend getaways — browse a fleet built for every
            kind of trip.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/cars"
              className="bg-accent text-bg font-semibold px-7 py-3.5 rounded-full hover:bg-accentHover hover:shadow-glow transition-all"
            >
              Browse Cars
            </Link>
            <Link
              href="/about"
              className="text-text font-medium px-7 py-3.5 rounded-full border border-border hover:border-textMuted transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
