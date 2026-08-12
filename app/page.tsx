"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import carsData from "@/data/car.json";
import { Car, CarType } from "@/types/car";
import { useFilter } from "@/context/filtercontext";
import CarCard from "@/components/cars/carcard";

const cars = carsData as Car[];

const CATEGORIES: { type: CarType; label: string }[] = [
  { type: "Sedan", label: "Sedan" },
  { type: "SUV", label: "SUV" },
  { type: "Luxury", label: "Luxury" },
  { type: "Electric", label: "Electric" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1578148103598-aed9e3871003?auto=format&fit=crop&w=2000&q=80";

export default function HomePage() {
  const router = useRouter();
  const { setFilters } = useFilter();

  const featuredCars = cars.filter((c) => c.rating >= 4.5).slice(0, 3);

  function goToCategory(type: CarType) {
    setFilters((prev) => ({ ...prev, type }));
    router.push("/cars");
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero */}
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
              From city runs to weekend getaways — browse a fleet built for
              every kind of trip.
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

      {/* Categories */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Browse by Type
          </h2>
          <span className="text-textMuted text-sm">
            {cars.length} cars total
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.type}
              onClick={() => goToCategory(cat.type)}
              className="lift-on-hover group bg-surface border border-border rounded-card p-6 text-left hover:border-accent/50 hover:shadow-soft"
            >
              <p className="font-display font-semibold text-lg tracking-tight group-hover:text-accent transition-colors">
                {cat.label}
              </p>
              <p className="text-textMuted text-sm mt-1">
                {cars.filter((c) => c.type === cat.type).length} available
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Top Rated Cars
          </h2>
          <Link
            href="/cars"
            className="text-link text-sm font-medium hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <TrustItem
            icon="24"
            title="24/7 Support"
            body="Roadside help and customer service, day or night."
          />
          <TrustItem
            icon="✓"
            title="Fully Insured"
            body="Every rental includes standard coverage, no surprises."
          />
          <TrustItem
            icon="◎"
            title="Flexible Pickup"
            body="Choose from multiple locations, or request custom pickup."
          />
        </div>
      </section>
    </main>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-card p-7">
      <div className="w-10 h-10 rounded-full bg-accentSoft text-accent flex items-center justify-center font-display font-semibold text-sm mb-4">
        {icon}
      </div>
      <h3 className="font-display font-semibold tracking-tight">{title}</h3>
      <p className="text-textMuted text-sm mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
