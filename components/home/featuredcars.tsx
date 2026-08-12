import Link from "next/link";
import CarCard from "../cars/carcard";
import carsData from "@/data/car.json";
import { Car } from "@/types/car";

export default function FeaturedCars() {
  const cars = carsData as Car[];
  const featuredCars = cars.filter((c) => c.rating >= 4.5).slice(0, 3);

  return (
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
  );
}
