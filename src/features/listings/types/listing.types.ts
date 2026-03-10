export type Transmission = "manual" | "automatic";
export type FuelType = "benzine" | "diesel" | "electric" | "hybrid";

export type CarListing = {
  id: string;
  title: string;
  price: number;
  currency: "EGP";
  city: string;
  year: number;
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  image: string;
  brand: string;
  model: string;
};
