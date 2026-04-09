import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import BrowseCardSkeletonList from "@/common/components/loader/skeltons/BrowseCardSkeletonList";
import ErrorMessage from "@/common/components/error-message/ErrorMessage";
import useGetTopCities from "@/features/browse/hooks/useGetTopCities";
import { mapCitiesToBrowseCards } from "@/features/listings/mappers/mapCitiesToBrowseCards";

export default function BrowseByTopCities() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTopCities();

  const items = useMemo(() => {
    return mapCitiesToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (brandId: string) => {
      navigate(`/car-browse?filter-city_id=${brandId}`);
    },
    [navigate],
  );

  if (isLoading) return <BrowseCardSkeletonList />;
  if (isError)
    return (
      <ErrorMessage message="An error occurred while fetching trademarks" />
    );
  if (!items.length) return null;

  return (
    <GridPagesSlider
      className="grid-cols-3"
      items={items}
      itemsPerPage={{
        xs: 2,
        md: 4,
        lg: 8,
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
  );
}
