"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { CarFilters, defaultFilters } from "@/types/car";

interface FilterContextValue {
  filters: CarFilters;
  setFilters: Dispatch<SetStateAction<CarFilters>>;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<CarFilters>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <>
      <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
        {children}
      </FilterContext.Provider>
    </>
  );
}

export function useFilter(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
