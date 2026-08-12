"use client";
import { CarType, Transmission, SortOption } from "@/types/car";
import { useFilter } from "@/context/filtercontext";
import { CarFilters } from "@/types/car";
const CAR_TYPES: CarType[] = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Luxury",
  "Electric",
  "Van",
];
const TRANSMISSIONS: Transmission[] = ["Automatic", "Manual"];
const SEAT_OPTIONS = [2, 4, 5, 7];

export default function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useFilter();

  return (
    <aside className="bg-surface border border-border rounded-card p-5 flex flex-col gap-6 h-fit">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-text font-semibold text-lg">
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-link text-sm hover:underline"
        >
          Reset
        </button>
      </div>
      <div>
        <label className="text-textMuted text-sm font-medium mb-2 block">
          Car Type
        </label>
        <div className="flex flex-wrap gap-2">
          {CAR_TYPES.map((type) => {
            const active = filters.type === type;
            return (
              <button
                key={type}
                onClick={() =>
                  setFilters((prev: CarFilters) => ({
                    ...prev,
                    type: prev.type === type ? "" : type,
                  }))
                }
                className={
                  active
                    ? "bg-accent text-bg text-sm font-medium px-3 py-1.5 rounded"
                    : "bg-surfaceAlt text-textMuted text-sm px-3 py-1.5 rounded hover:text-text transition-colors"
                }
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="text-textMuted text-sm font-medium mb-2 block">
          Transmission
        </label>
        <div className="flex gap-2">
          {TRANSMISSIONS.map((transmission) => {
            const active = filters.transmission === transmission;
            return (
              <button
                key={transmission}
                onClick={() =>
                  setFilters((prev: CarFilters) => ({
                    ...prev,
                    transmission:
                      prev.transmission === transmission ? "" : transmission,
                  }))
                }
                className={
                  active
                    ? "bg-accent text-bg text-sm font-medium px-3 py-1.5 rounded"
                    : "bg-surfaceAlt text-textMuted text-sm px-3 py-1.5 rounded hover:text-text transition-colors"
                }
              >
                {transmission}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="text-textMuted text-sm font-medium mb-2 block">
          Max price/day: ${filters.priceRange[1]}
        </label>
        <input
          type="range"
          min={200}
          max={10000}
          step={10}
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev: CarFilters) => ({
              ...prev,
              price: [prev.priceRange[0], Number(e.target.value)],
            }))
          }
          className="w-full accent-accent"
        />
      </div>
      <div>
        <label className="text-textMuted text-sm font-medium mb-2 block">
          Min Seats
        </label>
        <div className="flex gap-2">
          {SEAT_OPTIONS.map((seat) => {
            const active = filters.seats === seat;
            return (
              <button
                key={seat}
                onClick={() =>
                  setFilters((prev: CarFilters) => ({
                    ...prev,
                    seats: prev.seats === seat ? null : seat,
                  }))
                }
                className={
                  active
                    ? "bg-accent text-bg text-sm font-medium w-9 h-9 rounded"
                    : "bg-surfaceAlt text-textMuted text-sm w-9 h-9 rounded hover:text-text transition-colors"
                }
              >
                {seat}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="text-textMuted text-sm font-medium mb-2 block">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev: CarFilters) => ({
              ...prev,
              sortBy: e.target.value as SortOption,
            }))
          }
          className="w-full bg-surfaceAlt text-text text-sm rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
        >
          <option value="popularity">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </aside>
  );
}
