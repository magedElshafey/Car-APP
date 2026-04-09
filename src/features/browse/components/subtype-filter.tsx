import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useActiveFilters from "../hooks/use-active-filters";
import useGetVehicleSubtype from "../hooks/use-get-vehicle-subtype";

const SubtypeFilterMenu = () => {
  const {
    states: { sub_type_id },
    handlers: { handleUniqueChange },
  } = useFilters();

  const { t } = useTranslation();

  const { value: search } = useFilterSearch();

  const activeFilters = useActiveFilters();

  const { data: subtypes, isLoading: subtypesLoading } = useGetVehicleSubtype(
    activeFilters.vehicle_type_id,
  );

  const activeSubtype = sub_type_id?.id || "";

  const filteredModels = useMemo(() => {
    if (!search) return subtypes;
    return subtypes?.filter((type) =>
      type?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [subtypes, search]);

  useEffect(() => {
    if (subtypes && sub_type_id?.id && !sub_type_id.name) {
      const active = subtypes.find((b) => b.id.toString() == sub_type_id.id);
      if (active) {
        handleUniqueChange("sub_type_id", {
          name: active.name,
          id: sub_type_id.id,
        });
      }
    }
  }, [subtypes, sub_type_id, handleUniqueChange]);

  if (subtypesLoading || !activeFilters.vehicle_type_id)
    return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {!!filteredModels?.length ? (
        filteredModels?.map((type) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeSubtype == type.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={type.id}
            onClick={() => {
              handleUniqueChange("sub_type_id", {
                name: type.name,
                id: type.id,
              });
            }}
          >
            {type.name}
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

const SubtypeFilter = () => {
  const { vehicle_type_id } = useFilters().states;

  if (!vehicle_type_id?.id) return null;
  return (
    <FilterItem filterKey="sub_type_id">
      <FilterItem.Header showLabel title="browse.filters.sub_type" />
      <FilterItem.Menu searchable>
        <SubtypeFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default SubtypeFilter;
