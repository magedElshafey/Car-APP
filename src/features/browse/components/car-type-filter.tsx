import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetCarTypes from "../hooks/use-get-car-types";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const CarTypeFilterMenu = () => {
  const {
    states: { car_type: carType },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: carTypes, isLoading: carTypesLoading } = useGetCarTypes();
  console.log("car types is", carTypes);
  const activeCarType = carType?.id;

  const filteredCarTypes = useMemo(() => {
    if (!search) return carTypes;
    return carTypes?.filter((item) =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [carTypes, search]);

  useEffect(() => {
    if (carTypes && carType?.id && !carType.name) {
      const active = carTypes.find((item) => item.id === carType.id);
      if (active) {
        handleUniqueChange("car_type", {
          name: active.name,
          id: carType.id,
        });
      }
    }
  }, [carTypes, carType, handleUniqueChange]);

  if (carTypesLoading) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredCarTypes?.length) ? (
        filteredCarTypes?.map((item) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeCarType === item.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={item.id}
            onClick={() => {
              handleUniqueChange("car_type", {
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

const CarTypeFilter = () => {
  return (
    <FilterItem filterKey="car_type">
      <FilterItem.Header showLabel title="browse.filters.carType" />
      <FilterItem.Menu searchable>
        <CarTypeFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default CarTypeFilter;
