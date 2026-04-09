import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import useGetCarTypes from "@/features/browse/hooks/use-get-car-types";
import { mapBodyToBrowseCards } from "@/features/listings/mappers/mapBodyToBrowseCards";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import ErrorMessage from "@/common/components/error-message/ErrorMessage";
import BrowseCardSkeletonList from "@/common/components/loader/skeltons/BrowseCardSkeletonList";

export default function BrowseBodyTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCarTypes();
  const items = useMemo(() => {
    return mapBodyToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (typeId: string) => {
      navigate(`/car-browse?filter-vehicle_type_id=${typeId}`);
    },
    [navigate],
  );

  if (isLoading) return <BrowseCardSkeletonList />;
  if (isError) return <ErrorMessage />;
  if (!items.length) return null;

  return (
    <GridPagesSlider
      items={items}
      className="grid-cols-3"
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
