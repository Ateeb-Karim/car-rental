import Link from "next/link";
import carsData from "@/data/car.json";
import { Car } from "@/types/car";

const cars = carsData as Car[];

interface ConfirmedPageProps {
  params: { id: string };
  searchParams: {
    pickupDate?: string;
    returnDate?: string;
    pickupLocation?: string;
    name?: string;
    email?: string;
    phone?: string;
    days?: string;
    total?: string;
  };
}

function generateBookingRef(carId: string): string {
  return `BK-${carId.slice(-3).toUpperCase()}-${Date.now().toString().slice(-5)}`;
}

export default function BookingConfirmedPage({
  params,
  searchParams,
}: ConfirmedPageProps) {
  const car = cars.find((c) => c.id === params.id);

  if (!car || !searchParams.pickupDate) {
    return (
      <main className="min-h-screen bg-bg text-text px-6 py-10 max-w-2xl mx-auto text-center">
        <p className="text-textMuted">No booking found.</p>
        <Link href="/cars" className="text-link hover:underline">
          Browse cars
        </Link>
      </main>
    );
  }

  const bookingRef = generateBookingRef(car.id);

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-16 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-3xl">
        ✓
      </div>

      <h1 className="font-display text-2xl font-bold mt-6">
        Booking Confirmed
      </h1>
      <p className="text-textMuted mt-2">
        A confirmation has been sent to {searchParams.email}
      </p>

      <div className="bg-surface border border-border rounded-card p-6 mt-8 text-left flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="text-textMuted">Booking Reference</span>
          <span className="font-mono font-medium text-accent">
            {bookingRef}
          </span>
        </div>

        <SummaryRow label="Car" value={car.name} />
        <SummaryRow
          label="Pickup"
          value={`${searchParams.pickupDate} — ${searchParams.pickupLocation}`}
        />
        <SummaryRow label="Return" value={searchParams.returnDate ?? ""} />
        <SummaryRow
          label="Duration"
          value={`${searchParams.days} ${searchParams.days === "1" ? "day" : "days"}`}
        />
        <SummaryRow label="Booked by" value={searchParams.name ?? ""} />
        <SummaryRow label="Phone" value={searchParams.phone ?? ""} />

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-textMuted">Total Paid</span>
          <span className="font-display text-xl font-bold text-accent">
            ${searchParams.total}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Link
          href="/cars"
          className="bg-accent text-bg font-medium px-6 py-2.5 rounded hover:bg-accentHover transition-colors"
        >
          Browse More Cars
        </Link>
        <Link
          href="/"
          className="text-textMuted text-sm hover:text-text transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-textMuted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
