import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import { cn } from "@/lib/utils";
import useGetCities from "@/features/browse/hooks/use-get-cities";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mapCitiesToBrowseCards } from "@/features/listings/mappers/mapCitiesToBrowseCards";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import BrowseCardSkeletonList from "@/common/components/loader/skeltons/BrowseCardSkeletonList";
import ErrorMessage from "@/common/components/error-message/ErrorMessage";
import SectionTitle from "@/common/components/section-title/SectionTitle";
type BrowseByLocationSectionProps = {
  title?: string;
  className?: string;
};

export default function BrowseByLocationSection({
  title = "تصفح حسب المدينة أو المنطقة",
  className,
}: BrowseByLocationSectionProps) {
  const { data, isLoading, isError } = useGetCities();
  const navigate = useNavigate();
  const items = useMemo(() => {
    return mapCitiesToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (typeId: string) => {
      navigate(`/car-browse?filter-city_id=${typeId}`);
    },
    [navigate],
  );
  if (isLoading) return <BrowseCardSkeletonList />;
  if (isError) return <ErrorMessage />;
  if (!items.length) return null;

  return (
    <section
      className={cn("w-full", className)}
      aria-label="Browse by location"
    >
      <SectionTitle title={title} />

      <GridPagesSlider
        items={items}
        slideClassName="pb-1"
        dotsClassName="mt-5"
        className="grid-cols-3"
        itemsPerPage={{
          xs: 2,
          md: 4,
          lg: 16,
        }}
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
