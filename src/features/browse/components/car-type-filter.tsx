import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetCarTypes from "../hooks/use-get-car-types";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const CarTypeFilterMenu = () => {
    const {
        states: {
            car_type: carType
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { value: search } = useFilterSearch();
    const { t } = useTranslation();

    const {
        data: carTypes,
        isLoading: carTypesLoading
    } = useGetCarTypes();

    const activeCarType = carType?.value;

    const filteredCarTypes = useMemo(() => {
        if (!search) return carTypes;
        return carTypes?.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [carTypes, search]);

    useEffect(() => {
        if (carTypes && carType?.value && !carType.label) {
            const active = carTypes.find(item => item.value === carType.value);
            if (active) {
                handleUniqueChange("car_type", {
                    label: active.label,
                    value: carType.value
                });
            }
        }
    }, [carTypes, carType, handleUniqueChange]);

    if (carTypesLoading) return <SkeletonFilterList />;

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {Boolean(filteredCarTypes?.length) ? filteredCarTypes?.map(item => (
                <button
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeCarType === item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
                    key={item.value}
                    onClick={() => {
                        handleUniqueChange("car_type", {
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

const CarTypeFilter = () => {
    return (
        <FilterItem filterKey="car_type">
            <FilterItem.Header showLabel title="browse.filters.carType" />
            <FilterItem.Menu searchable>
                <CarTypeFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
}

export default CarTypeFilter;