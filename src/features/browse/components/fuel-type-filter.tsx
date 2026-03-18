import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetFuelTypes from "../hooks/use-get-fuel-types";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const FuelTypeFilterMenu = () => {
    const {
        states: {
            fuel_type: fuelType
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { value: search } = useFilterSearch();
    const { t } = useTranslation();

    const {
        data: fuelTypes,
        isLoading: fuelTypesLoading
    } = useGetFuelTypes();

    const activeFuelType = fuelType?.value;

    const filteredFuelTypes = useMemo(() => {
        if (!search) return fuelTypes;
        return fuelTypes?.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [fuelTypes, search]);

    useEffect(() => {
        if (fuelTypes && fuelType?.value && !fuelType.label) {
            const active = fuelTypes.find(item => item.label.toString() === fuelType.value);
            if (active) {
                handleUniqueChange("fuel_type", {
                    label: active.label,
                    value: fuelType.value
                });
            }
        }
    }, [fuelTypes, fuelType, handleUniqueChange]);

    if (fuelTypesLoading) return <SkeletonFilterList />;

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {Boolean(filteredFuelTypes?.length) ? filteredFuelTypes?.map(item => (
                <button
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeFuelType === item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
                    key={item.label}
                    onClick={() => {
                        handleUniqueChange("fuel_type", {
                            label: item.label,
                            value: item.value
                        });
                    }}
                >
                    {item.label}
                </button>
            )) : <div className="py-2 block w-full text-start rounded px-2 text-sm text-gray-500">{t("no results found")}</div>}
        </div>
    );
}

const FuelTypeFilter = () => {
    return (
        <FilterItem filterKey="fuel_type">
            <FilterItem.Header showLabel title="fuel type" />
            <FilterItem.Menu searchable>
                <FuelTypeFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
}

export default FuelTypeFilter;