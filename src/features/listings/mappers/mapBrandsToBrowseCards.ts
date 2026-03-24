import { Brand } from "@/features/browse/types/brand.types";
import { BrowseCardItem } from "@/features/listings/components/browse/browse-card/browsecard.types";

export function mapBrandsToBrowseCards(brands: Brand[]): BrowseCardItem[] {
  return brands.map((brand) => ({
    id: String(brand.id),
    label: brand.name,
    // count: brand.listingsCount,
    logo: brand.logo,
  }));
}
