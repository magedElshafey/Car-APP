import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import useGetFuelTypes from "@/features/browse/hooks/use-get-fuel-types";
import { mapFuelTypeToBrowseCards } from "@/features/listings/mappers/mapFuelTypeToBrowseCards";

export default function BrowseFuelTypeTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetFuelTypes();
  console.log("data from fuel type", data);
  const items = useMemo(() => {
    return mapFuelTypeToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (value: string) => {
      navigate(`/car-browse?filter-fuel_type=${value}`);
    },
    [navigate],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>حدث خطأ أثناء تحميل العلامات التجارية</div>;
  if (!items.length) return null;

  return (
    <GridPagesSlider
      items={items}
      itemsPerPage={16}
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
