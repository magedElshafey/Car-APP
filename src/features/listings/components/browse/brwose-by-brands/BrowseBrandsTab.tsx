import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import useGetBrands from "@/features/browse/hooks/use-get-brands";
import { mapBrandsToBrowseCards } from "@/features/listings/mappers/mapBrandsToBrowseCards";

export default function BrowseBrandsTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBrands();

  const items = useMemo(() => {
    return mapBrandsToBrowseCards(data ?? []);
  }, [data]);

  const handleBrandClick = useCallback(
    (brandId: string) => {
      navigate(`/car-browse?filter-brand=${brandId}`);
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
