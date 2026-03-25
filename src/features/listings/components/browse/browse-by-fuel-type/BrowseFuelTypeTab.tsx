import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import useGetFuelTypes from "@/features/browse/hooks/use-get-fuel-types";
import { mapFuelTypeToBrowseCards } from "@/features/listings/mappers/mapFuelTypeToBrowseCards";
import BrowseCardSkeletonList from "@/common/components/loader/skeltons/BrowseCardSkeletonList";
import ErrorMessage from "@/common/components/error-message/ErrorMessage";

export default function BrowseFuelTypeTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetFuelTypes();
  const items = useMemo(() => {
    return mapFuelTypeToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (value: string) => {
      navigate(`/car-browse?filter-fuel_type=${value}`);
    },
    [navigate],
  );

  if (isLoading) return <BrowseCardSkeletonList />;
  if (isError)
    return <ErrorMessage message="An error occurred while retrieving data." />;
  if (!items.length) return null;

  return (
    <GridPagesSlider
      items={items}
      itemsPerPage={8}
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
