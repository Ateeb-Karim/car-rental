"use client";

import carsData from "@/data/car.json";
import { Car } from "@/types/car";
import useCarFilter from "@/hooks/useCarFilter";
import { useFilter } from "@/context/filtercontext";
import CarCard from "@/components/cars/carcard";
import FilterSidebar from "@/components/cars/filtersidebar";

const cars = carsData as Car[];

export default function CarsPage() {
  const { filters } = useFilter();
  const filteredCars = useCarFilter(cars, filters);

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Available Cars</h1>
        <p className="text-textMuted mt-1">
          {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}{" "}
          found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <FilterSidebar />

        {filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-textMuted text-lg">
              No cars match your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
