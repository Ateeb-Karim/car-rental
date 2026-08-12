export type CarType =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "Luxury"
  | "Electric"
  | "Van";
export type Transmission = "Automatic" | "Manual";
export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type SortOption = "popularity" | "price-low" | "price-high" | "rating";

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: CarType;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  pricePerDay: number;
  rating: number;
  location: string;
  year: number;
  features: string[];
  available: boolean;
  image: string | undefined;
}

export interface CarFilters {
  type: CarType | "";
  transmission: Transmission | "";
  priceRange: [number, number];
  seats: number | null;
  sortBy: SortOption;
}

export const defaultFilters: CarFilters = {
  type: "",
  transmission: "",
  priceRange: [0, 300],
  seats: null,
  sortBy: "popularity",
};
