import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetVehicleType from "../hooks/use-get-vehicle-type";

const VehicleTypeFilterMenu = () => {
    const { 
        states: {
           vehicle_type 
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { value: search } = useFilterSearch();
    const {t} = useTranslation();

    const {
        data: vehicleTypes,
        isLoading: typesLoading
    } = useGetVehicleType();

    const activeType = vehicle_type?.value;

    const filteredTypes = useMemo(() => {
        if(!search) return vehicleTypes;
        return vehicleTypes?.filter(type => type.label.toLowerCase().includes(search.toLowerCase()));
    }, [vehicleTypes, search]);

    useEffect(() => {
        if(vehicleTypes && vehicle_type?.value && !vehicle_type.label) {
            const active = vehicleTypes.find(b => b.value === vehicle_type.value);
            if(active) {
                handleUniqueChange("vehicle_type", {
                    label: active.label,
                    value: vehicle_type.value 
                });
            }
        }
    }, [vehicleTypes, vehicle_type, handleUniqueChange]);

    if(typesLoading) return <SkeletonFilterList /> 

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {Boolean(filteredTypes?.length) ? filteredTypes?.map(type => (
                <button 
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeType === type.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`} key={type.value}
                    onClick={() => {
                        handleUniqueChange("vehicle_type", {
                            label: type.label,
                            value: type.value
                        });
                        handleUniqueChange("sub_type", undefined);
                    }}
                >
                    {type.label}
                </button>
            )): <div className="py-2 block w-full text-start rounded px-2 text-sm text-gray-500">{t("no results found")}</div>}
        </div>
    );
}

const VehicleTypeFilter = () => {
    return (
        <FilterItem filterKey="vehicle_type">
            <FilterItem.Header showLabel title="browse.filters.vehicle_type" />
            <FilterItem.Menu searchable>
                <VehicleTypeFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
};

export default VehicleTypeFilter;

