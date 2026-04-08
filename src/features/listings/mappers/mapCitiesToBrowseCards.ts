import { CityOption } from "@/features/browse/hooks/use-get-cities";
import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";

export function mapCitiesToBrowseCards(cities: CityOption[]): BrowseCardItem[] {
  return cities.map((city) => ({
    id: String(city.id),
    label: city.name,
    image: city.image,
  }));
}
