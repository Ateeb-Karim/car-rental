export interface BookingCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface BookingFormData {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  customer: BookingCustomer;
}

export const emptyBookingForm = (carId: string): BookingFormData => ({
  carId,
  pickupDate: "",
  returnDate: "",
  pickupLocation: "",
  customer: { name: "", email: "", phone: "" },
});

export type BookingStep = 1 | 2 | 3;
