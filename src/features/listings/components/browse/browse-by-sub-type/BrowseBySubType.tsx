import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import BrowseCardSkeletonList from "@/common/components/loader/skeltons/BrowseCardSkeletonList";
import ErrorMessage from "@/common/components/error-message/ErrorMessage";
import useGetVehicleSubtype from "@/features/browse/hooks/use-get-vehicle-subtype";
import { mapSubTypeToBrowseCards } from "@/features/listings/mappers/mapSubTypeToBrowseCards";

export default function BrowseBySubType() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetVehicleSubtype("car");
  console.log("data from sub type filter", data);
  const items = useMemo(() => {
    return mapSubTypeToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (value: string) => {
      navigate(`/car-browse?filter-sub_type=${value}`);
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
