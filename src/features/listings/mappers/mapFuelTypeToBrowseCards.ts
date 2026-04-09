import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";
import { FuelType } from "@/features/browse/types/fuel-type.types";

export function mapFuelTypeToBrowseCards(types: FuelType[]): BrowseCardItem[] {
  return types.map((type) => ({
    id: type.id,
    label: type.name,
  }));
}
