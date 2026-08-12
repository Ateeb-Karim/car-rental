import carsData from "@/data/car.json";
import { Car } from "@/types/car";
import CategoryButton from "../ui/catbtn";

export default function Category() {
  const cars = carsData as Car[];

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Browse by Type
        </h2>
        <span className="text-textMuted text-sm">{cars.length} cars total</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CategoryButton />
      </div>
    </section>
  );
}
