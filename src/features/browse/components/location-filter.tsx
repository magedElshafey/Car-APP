import { useTranslation } from "react-i18next";
import useFilterSearch from "../hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import useGetCities from "../hooks/use-get-cities";
import { useEffect, useMemo } from "react";
import SkeletonFilterList from "./filter-list-skeleton";

const LocationMenu = () => {
  const {
    states: { city_id },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: cities, isLoading: citiesLoading } = useGetCities();

  const activeColor = city_id?.id;

  const filteredColors = useMemo(() => {
    if (!search) return cities;
    return cities?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [cities, search]);

  useEffect(() => {
    if (cities && city_id?.id && !city_id.name) {
      // const active = cities.find((item) => item.value === city_id.id);
      const active = cities.find((item) => item.id.toString() === city_id.id);
      if (active) {
        handleUniqueChange("city_id", {
          name: active.name,
          id: city_id.id,
        });
      }
    }
  }, [cities, city_id, handleUniqueChange]);

  if (citiesLoading) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredColors?.length) ? (
        filteredColors?.map((item) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeColor === item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={item.value}
            onClick={() => {
              handleUniqueChange("city_id", {
                name: item.name,
                id: item.value,
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

const LocationFilter = () => {
  return (
    <FilterItem filterKey="city_id">
      <FilterItem.Header showLabel title="browse.filters.location" />
      <FilterItem.Menu searchable>
        <LocationMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default LocationFilter;
