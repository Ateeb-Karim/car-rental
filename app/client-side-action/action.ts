"use client";
import { useFilter } from "@/context/filtercontext";
import { useRouter } from "next/router";
import { CarFilters } from "@/types/car";

export function gotoSUV() {
  const { setFilters } = useFilter();
  setFilters((prev: CarFilters) => ({ ...prev, type: "SUV" }));
  const router = useRouter();
  router.push("/cars");
}
