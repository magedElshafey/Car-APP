import { CarType } from "@/features/browse/types/car-type.types";
import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";

export function mapBodyToBrowseCards(bodies: CarType[]): BrowseCardItem[] {
  return bodies.map((body) => ({
    id: String(body.value),
    label: body.label,
    image: body.image,
  }));
}
