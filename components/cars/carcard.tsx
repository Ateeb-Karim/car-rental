"use server";

import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types/car";
import { GetCarByType } from "@/server-action/action";
import { CarBrand } from "@/data/carbrand";

type carbrandType = {
  name1: string;
  name2?: string;
  name3?: string;
};

export default async function CarCard({ car }: { car: Car }) {
  // const carImage = await GetCarByType(carName);

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden flex flex-col hover:shadow-glow transition-shadow duration-200">
      <div className="relative aspect-16/10 bg-surfaceAlt overflow-hidden">
        {/* <Image
          src={}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        /> */}

        {!car.available && (
          <span className="absolute top-3 left-3 bg-danger/15 text-danger text-xs font-medium px-2 py-1 rounded">
            Unavailable
          </span>
        )}

        <span className="absolute top-3 right-3 bg-surface/90 text-accent text-xs font-medium px-2 py-1 rounded">
          {car.type}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-text text-lg font-semibold leading-tight">
            {car.name}
          </h3>
          <p className="text-textMuted text-sm">
            {car.year} &middot; {car.location}
          </p>
        </div>

        <div className="flex items-center gap-3 text-textMuted text-sm">
          <span>{car.seats} seats</span>
          <span className="w-1 h-1 rounded-full bg-textMuted" />
          <span>{car.transmission}</span>
          <span className="w-1 h-1 rounded-full bg-textMuted" />
          <span>{car.fuel}</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-accent">★</span>
          <span className="text-text font-medium">{car.rating}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-text font-display text-xl font-bold">
              ${car.pricePerDay}
            </span>
            <span className="text-textMuted text-sm"> /day</span>
          </div>

          <Link
            href={car.available ? `/car/${car.id}` : "#"}
            aria-disabled={!car.available}
            className={
              car.available
                ? "bg-accent text-bg font-medium text-sm px-4 py-2 rounded hover:bg-accentHover transition-colors"
                : "bg-surfaceAlt text-textMuted font-medium text-sm px-4 py-2 rounded cursor-not-allowed pointer-events-none"
            }
          >
            {car.available ? "View Details" : "Unavailable"}
          </Link>
        </div>
      </div>
    </div>
  );
}
