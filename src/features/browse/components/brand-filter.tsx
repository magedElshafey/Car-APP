import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import useGetBrands from "../hooks/use-get-brands";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const BrandFilterMenu = () => {
  const {
    states: { brand },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: brands, isLoading: brandsLoading } = useGetBrands();

  const activeBrand = parseInt(brand?.id || "") || undefined;
  const filteredBrands = useMemo(() => {
    if (!search) return brands;
    return brands?.filter((brand) =>
      brand?.name?.toLowerCase()?.includes(search?.toLowerCase()),
    );
  }, [brands, search]);

  useEffect(() => {
    if (brands && brand?.id && !brand.name) {
      const active = brands.find((b) => b.id.toString() === brand.id);
      if (active) {
        handleUniqueChange("brand", {
          name: active.name,
          id: brand.id,
        });
      }
    }
  }, [brands, brand, handleUniqueChange]);

  if (brandsLoading) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredBrands?.length) ? (
        filteredBrands?.map((brand) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeBrand == brand.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={brand.id}
            onClick={() => {
              handleUniqueChange("brand", {
                name: brand.name,
                id: brand.id.toString(),
              });
              handleUniqueChange("model", undefined);
            }}
          >
            {brand.name}
          </button>
        ))
      ) : (
        <div className="block w-full px-2 py-2 text-sm text-gray-500 rounded text-start">
          {t("no results found")}
        </div>
      )}
    </div>
  );
};

const BrandFilter = () => {
  return (
    <FilterItem filterKey="brand">
      <FilterItem.Header showLabel title="browse.filters.brand" />
      <FilterItem.Menu searchable>
        <BrandFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default BrandFilter;
