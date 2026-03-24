import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import useGetCarTypes from "@/features/browse/hooks/use-get-car-types";
import { mapBodyToBrowseCards } from "@/features/listings/mappers/mapBodyToBrowseCards";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";

export default function BrowseBodyTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCarTypes();
  console.log("data from car body", data);
  const items = useMemo(() => {
    return mapBodyToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (typeId: string) => {
      navigate(`/car-browse?filter-car_type=${typeId}`);
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
