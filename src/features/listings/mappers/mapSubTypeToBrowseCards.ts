import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";
import { SubType } from "@/features/browse/hooks/use-get-vehicle-subtype";

export function mapSubTypeToBrowseCards(types: SubType[]): BrowseCardItem[] {
  return types.map((type) => ({
    id: type.id,
    label: type.name,
    image: type.image,
  }));
}
