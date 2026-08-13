import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import carsData from "@/data/car.json";
import { Car } from "@/types/car";
import { GetCarByType } from "@/server-action/action";

const cars = carsData as Car[];

interface CarDetailPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarPage({ params }: CarDetailPageProps) {
  const paramID = (await params).id;
  const car = cars.find((c) => c.id === paramID) as Car;

  if (!car) {
    notFound();
  }

  const relatedCars = cars
    .filter((c) => c.type === car.type && c.id !== car.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-10 max-w-6xl mx-auto">
      <Link href="/cars" className="text-link text-sm hover:underline">
        &larr; Back to all cars
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 mt-6">
        <div className="relative aspect-16/10 rounded-card overflow-hidden border border-border">
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-accentSoft text-accent text-xs font-medium px-2 py-1 rounded">
                {car.type}
              </span>
              {!car.available && (
                <span className="bg-danger/15 text-danger text-xs font-medium px-2 py-1 rounded">
                  Unavailable
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold">{car.name}</h1>
            <p className="text-textMuted mt-1">
              {car.year} &middot; {car.location}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-accent text-lg">★</span>
            <span className="font-medium">{car.rating}</span>
            <span className="text-textMuted text-sm">rating</span>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-surface border border-border rounded-card p-5">
            <Spec label="Transmission" value={car.transmission} />
            <Spec label="Fuel Type" value={car.fuel} />
            <Spec label="Seats" value={String(car.seats)} />
            <Spec label="Brand" value={car.brand} />
          </div>

          <div>
            <h2 className="font-display font-semibold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-surfaceAlt text-textMuted text-sm px-3 py-1.5 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between bg-surface border border-border rounded-card p-5">
            <div>
              <span className="font-display text-2xl font-bold">
                ${car.pricePerDay}
              </span>
              <span className="text-textMuted text-sm"> /day</span>
            </div>

            <Link
              href={car.available ? `/booking/${car.id}` : "#"}
              aria-disabled={!car.available}
              className={
                car.available
                  ? "bg-accent text-bg font-medium px-6 py-3 rounded hover:bg-accentHover transition-colors"
                  : "bg-surfaceAlt text-textMuted font-medium px-6 py-3 rounded cursor-not-allowed pointer-events-none"
              }
            >
              {car.available ? "Book Now" : "Unavailable"}
            </Link>
          </div>
        </div>
      </div>

      {relatedCars.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-xl font-semibold mb-4">
            Similar {car.type}s
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCars.map((rc) => (
              <Link
                key={rc.id}
                href={`/car/${rc.id}`}
                className="bg-surface border border-border rounded-card p-4 hover:border-accent transition-colors"
              >
                <p className="font-medium">{rc.name}</p>
                <p className="text-textMuted text-sm mt-1">
                  ${rc.pricePerDay}/day
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-textMuted text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
