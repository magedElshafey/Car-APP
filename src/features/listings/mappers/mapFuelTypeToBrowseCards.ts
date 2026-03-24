import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";
import { FuelType } from "@/features/listings/types/listing.types";

export function mapFuelTypeToBrowseCards(types: FuelType[]): BrowseCardItem[] {
  return types.map((type) => ({
    id: type.value,
    label: type.label,
  }));
}
