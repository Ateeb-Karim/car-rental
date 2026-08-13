"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import carsData from "@/data/car.json";
import { Car } from "@/types/car";
import {
  BookingFormData,
  BookingStep,
  emptyBookingForm,
} from "@/types/booking";
import {
  calculateRentalDays,
  calculateTotalPrice,
  todayISO,
} from "@/lib/booking-utils";

const cars = carsData as Car[];

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const car = cars.find((c) => c.id === params.id);

  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<BookingFormData>(
    emptyBookingForm(params.id ?? ""),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!car) {
    return (
      <main className="min-h-screen bg-bg text-text px-6 py-10 max-w-2xl mx-auto text-center">
        <p className="text-textMuted">Car not found.</p>
        <Link href="/cars" className="text-link hover:underline">
          Back to all cars
        </Link>
      </main>
    );
  }

  const days = calculateRentalDays(form.pickupDate, form.returnDate);
  const totalPrice = calculateTotalPrice(car.pricePerDay, days);

  function validateStep1(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!form.returnDate) newErrors.returnDate = "Return date is required";
    if (!form.pickupLocation.trim())
      newErrors.pickupLocation = "Pickup location is required";
    if (form.pickupDate && form.returnDate && days <= 0) {
      newErrors.returnDate = "Return date must be after pickup date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.customer.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.customer.email))
      newErrors.email = "Enter a valid email";
    if (!/^[\d+\-\s]{7,}$/.test(form.customer.phone))
      newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  function goBack() {
    if (step > 1) setStep((s) => (s - 1) as BookingStep);
  }

  function handleConfirm() {
    const query = new URLSearchParams({
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      pickupLocation: form.pickupLocation,
      name: form.customer.name,
      email: form.customer.email,
      phone: form.customer.phone,
      days: days.toString(),
      total: totalPrice.toString(),
    });
    router.push(
      `/booking/${encodeURIComponent(params.id)}/confirmed?${query.toString()}`,
    );
  }

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-10 max-w-2xl mx-auto">
      <Link
        href={`/cars/${car.id}`}
        className="text-link text-sm hover:underline"
      >
        &larr; Back to {car.name}
      </Link>
      <h1 className="font-display text-2xl font-bold mt-4">Book: {car.name}</h1>
      <div className="flex items-center gap-2 mt-6 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={
                s <= step
                  ? "w-8 h-8 rounded-full bg-accent text-bg flex items-center justify-center text-sm font-semibold"
                  : "w-8 h-8 rounded-full bg-surfaceAlt text-textMuted flex items-center justify-center text-sm font-semibold"
              }
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={
                  s < step
                    ? "h-0.5 flex-1 bg-accent"
                    : "h-0.5 flex-1 bg-surfaceAlt"
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-card p-6">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-semibold">Dates & Location</h2>

            <Field label="Pickup Date" error={errors.pickupDate}>
              <input
                type="date"
                min={todayISO()}
                value={form.pickupDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pickupDate: e.target.value }))
                }
                className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
              />
            </Field>

            <Field label="Return Date" error={errors.returnDate}>
              <input
                type="date"
                min={form.pickupDate || todayISO()}
                value={form.returnDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, returnDate: e.target.value }))
                }
                className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
              />
            </Field>

            <Field label="Pickup Location" error={errors.pickupLocation}>
              <input
                type="text"
                placeholder="e.g. Islamabad Airport"
                value={form.pickupLocation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pickupLocation: e.target.value }))
                }
                className="w-full bg-surfaceAlt rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link placeholder:text-textMuted"
              />
            </Field>

            {days > 0 && (
              <p className="text-textMuted text-sm">
                {days} {days === 1 ? "day" : "days"} &middot;{" "}
                <span className="text-accent font-medium">${totalPrice}</span>{" "}
                total
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-semibold">Your Details</h2>

            <Field label="Full Name" error={errors.name}>
              <input
                type="text"
                value={form.customer.name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    customer: { ...f.customer, name: e.target.value },
                  }))
                }
                className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.customer.email}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    customer: { ...f.customer, email: e.target.value },
                  }))
                }
                className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
              />
            </Field>

            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                value={form.customer.phone}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    customer: { ...f.customer, phone: e.target.value },
                  }))
                }
                className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-semibold">Review & Confirm</h2>

            <div className="flex flex-col gap-3 text-sm">
              <SummaryRow label="Car" value={car.name} />
              <SummaryRow
                label="Pickup"
                value={`${form.pickupDate} — ${form.pickupLocation}`}
              />
              <SummaryRow label="Return" value={form.returnDate} />
              <SummaryRow
                label="Duration"
                value={`${days} ${days === 1 ? "day" : "days"}`}
              />
              <SummaryRow label="Name" value={form.customer.name} />
              <SummaryRow label="Email" value={form.customer.email} />
              <SummaryRow label="Phone" value={form.customer.phone} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-textMuted">Total</span>
              <span className="font-display text-2xl font-bold text-accent">
                ${totalPrice}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goBack}
            disabled={step === 1}
            className={
              step === 1
                ? "text-textMuted text-sm cursor-not-allowed opacity-40"
                : "text-textMuted text-sm hover:text-text transition-colors"
            }
          >
            &larr; Back
          </button>

          {step < 3 ? (
            <button
              onClick={goNext}
              className="bg-accent text-bg font-medium px-6 py-2.5 rounded hover:bg-accentHover transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="bg-accent text-bg font-medium px-6 py-2.5 rounded hover:bg-accentHover transition-colors"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-textMuted text-sm font-medium mb-1.5 block">
        {label}
      </label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
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
