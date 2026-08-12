import { Car, CarFilters } from "@/types/car";
import { useMemo } from "react";

function useCarFilter(cars: Car[], filters: CarFilters) {
  return useMemo(() => {
    const filtered = cars.filter((car) => {
      if (filters.type && car.type !== filters.type) return false;
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }
      if (filters.seats && car.seats !== filters.seats) return false;
      if (car.pricePerDay < filters.priceRange[0]) return false;
      if (car.pricePerDay > filters.priceRange[1]) return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay;
        case "price-high":
          return b.pricePerDay - a.pricePerDay;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    return sorted;
  }, [cars, filters]);
}

export default useCarFilter;
