// lib/booking-utils.ts

/**
 * Returns the number of whole rental days between two ISO date strings.
 * Returns 0 if dates are missing or invalid (return date not after pickup).
 */
export function calculateRentalDays(
  pickupDate: string,
  returnDate: string,
): number {
  if (!pickupDate || !returnDate) return 0;

  const pickup = new Date(pickupDate);
  const returnDateMs = new Date(returnDate);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round(
    (returnDateMs.getTime() - pickup.getTime()) / msPerDay,
  );

  return diffDays > 0 ? diffDays : 0;
}

export function calculateTotalPrice(pricePerDay: number, days: number): number {
  return pricePerDay * days;
}

/** Today's date as an ISO string (YYYY-MM-DD), for min-date constraints on inputs. */
export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}
