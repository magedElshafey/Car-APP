import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetVehicleType from "../hooks/use-get-vehicle-type";

const VehicleTypeFilterMenu = () => {
  const {
    states: { vehicle_type_id },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: vehicleTypes, isLoading: typesLoading } = useGetVehicleType();

  const activeType = vehicle_type_id?.id;

  const filteredTypes = useMemo(() => {
    if (!search) return vehicleTypes;
    return vehicleTypes?.filter((type) =>
      type?.name?.toLowerCase()?.includes(search?.toLowerCase()),
    );
  }, [vehicleTypes, search]);

  useEffect(() => {
    if (vehicleTypes && vehicle_type_id?.id && !vehicle_type_id.name) {
      const active = vehicleTypes.find((b) => b.id == vehicle_type_id.id);
      if (active) {
        handleUniqueChange("vehicle_type_id", {
          name: active.name,
          id: vehicle_type_id.id,
        });
      }
    }
  }, [vehicleTypes, vehicle_type_id, handleUniqueChange]);

  if (typesLoading) return <SkeletonFilterList />;
  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredTypes?.length) ? (
        filteredTypes?.map((type) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeType == type.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={type.id}
            onClick={() => {
              handleUniqueChange("vehicle_type_id", {
                name: type.name,
                id: type.id,
              });
              handleUniqueChange("sub_type_id", undefined);
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

const VehicleTypeFilter = () => {
  return (
    <FilterItem filterKey="vehicle_type_id">
      <FilterItem.Header showLabel title="browse.filters.vehicle_type" />
      <FilterItem.Menu searchable>
        <VehicleTypeFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default VehicleTypeFilter;
