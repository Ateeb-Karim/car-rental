"use client";

import { useFilter } from "@/context/filtercontext";
import { Car, CarType } from "@/types/car";
import { useRouter } from "next/navigation";
import carsData from "@/data/car.json";

const CATEGORIES: { type: CarType; label: string }[] = [
  { type: "Sedan", label: "Sedan" },
  { type: "SUV", label: "SUV" },
  { type: "Luxury", label: "Luxury" },
  { type: "Electric", label: "Electric" },
];

export default function CategoryButton() {
  const router = useRouter();
  const { setFilters } = useFilter();
  const cars = carsData as Car[];

  const gotoCategory = (type: CarType) => {
    setFilters((prev) => ({
      ...prev,
      type,
    }));
    router.push("/cars");
  };

  return (
    <>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.type}
          onClick={() => gotoCategory(cat.type)}
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
    </>
  );
}
