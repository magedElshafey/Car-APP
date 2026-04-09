import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetFuelTypes from "../hooks/use-get-fuel-types";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const FuelTypeFilterMenu = () => {
  const {
    states: { fuel_type_id: fuelType },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: fuelTypes, isLoading: fuelTypesLoading } = useGetFuelTypes();

  const activeFuelType = fuelType?.id;

  const filteredFuelTypes = useMemo(() => {
    if (!search) return fuelTypes;
    return fuelTypes?.filter((item) =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [fuelTypes, search]);

  useEffect(() => {
    if (fuelTypes && fuelType?.id && !fuelType.name) {
      // const active = fuelTypes.find(
      //   (item) => item.name.toString() === fuelType.id,
      // );
      const active = fuelTypes.find(
        (item) => item.id.toString() === fuelType.id,
      );
      if (active) {
        handleUniqueChange("fuel_type_id", {
          name: active.name,
          id: fuelType.id,
        });
      }
    }
  }, [fuelTypes, fuelType, handleUniqueChange]);

  if (fuelTypesLoading) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredFuelTypes?.length) ? (
        filteredFuelTypes?.map((item) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeFuelType == item.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={item.id}
            onClick={() => {
              handleUniqueChange("fuel_type_id", {
                name: item.name,
                id: item.id,
              });
            }}
          >
            {item.name}
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

const FuelTypeFilter = () => {
  return (
    <FilterItem filterKey="fuel_type_id">
      <FilterItem.Header showLabel title="browse.filters.fuelType" />
      <FilterItem.Menu searchable>
        <FuelTypeFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default FuelTypeFilter;
