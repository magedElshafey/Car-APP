import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import { cn } from "@/lib/utils";
import useGetCities from "@/features/browse/hooks/use-get-cities";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mapCitiesToBrowseCards } from "@/features/listings/mappers/mapCitiesToBrowseCards";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
type BrowseByLocationSectionProps = {
  title?: React.ReactNode;
  className?: string;
};

export default function BrowseByLocationSection({
  title = "تصفح حسب المدينة أو المنطقة",
  className,
}: BrowseByLocationSectionProps) {
  const { data, isLoading, isError } = useGetCities();
  console.log("data from cities", data);
  const navigate = useNavigate();
  const items = useMemo(() => {
    return mapCitiesToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (typeId: string) => {
      navigate(`/car-browse?filter-city=${typeId}`);
    },
    [navigate],
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>حدث خطأ أثناء تحميل العلامات التجارية</div>;
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
          <BrowseCard
            label={item.label}
            count={item.count}
            image={item.image}
            onClick={() => handleBrandClick(item.id)}
          />
        )}
      />
    </section>
  );
}
