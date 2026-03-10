import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import LocationChipCard from "@/features/listings/components/location/location-card/LocationChipCard";
import {
  type LocationItem,
  locations,
} from "@/features/listings/data/location.data";

import { cn } from "@/lib/utils";

type BrowseByLocationSectionProps = {
  items?: readonly LocationItem[];
  title?: React.ReactNode;
  className?: string;
};

export default function BrowseByLocationSection({
  items = locations,
  title = "تصفح حسب المدينة أو المنطقة",
  className,
}: BrowseByLocationSectionProps) {
  if (!items.length) return null;

  return (
    <section
      className={cn("w-full", className)}
      aria-label="Browse by location"
    >
      <div className="mb-4 md:mb-5">
        <h2 className="text-2xl font-bold text-text md:text-4xl">{title}</h2>
      </div>

      <GridPagesSlider
        items={items}
        itemsPerPage={24}
        gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        slideClassName="pb-1"
        dotsClassName="mt-5"
        getItemId={(item) => item.id}
        getItemAriaLabel={(item) => item.label}
        renderItem={(item) => (
          <LocationChipCard label={item.label} href={item.href} />
        )}
      />
    </section>
  );
}
