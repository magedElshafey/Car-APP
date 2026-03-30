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
        states: {
            sub_type,
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();

    const { t } = useTranslation();

    const { value: search } = useFilterSearch();

    const activeFilters = useActiveFilters();

    const {
        data: subtypes,
        isLoading: subtypesLoading
    } = useGetVehicleSubtype(activeFilters.vehicle_type);

    const activeSubtype = sub_type?.value || "";

    const filteredModels = useMemo(() => {
        if (!search) return subtypes;
        return subtypes?.filter(type => type.label.toLowerCase().includes(search.toLowerCase()));
    }, [subtypes, search]);

    useEffect(() => {
        if (subtypes && sub_type?.value && !sub_type.label) {
            const active = subtypes.find(b => b.value.toString() === sub_type.value);
            if (active) {
                handleUniqueChange("model", {
                    label: active.label,
                    value: sub_type.value
                });
            }
        }
    }, [subtypes, sub_type, handleUniqueChange]);

    if (subtypesLoading || !activeFilters.vehicle_type) return <SkeletonFilterList />

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {!!filteredModels?.length ? filteredModels?.map(type => (
                <button
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeSubtype === type.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`} key={type.value}
                    onClick={() => {
                        handleUniqueChange("sub_type", {
                            label: type.label,
                            value: type.value
                        });
                    }}
                >
                    {type.label}
                </button>
            )) : <div className="py-2 block w-full text-start rounded px-2 text-sm text-gray-500">{t("no results found")}</div>}
        </div>
    );
}

const SubtypeFilter = () => {
    const { vehicle_type } = useFilters().states;

    if (!vehicle_type?.value) return null;
    return (
        <FilterItem filterKey="sub_type">
            <FilterItem.Header showLabel title="browse.filters.sub_type" />
            <FilterItem.Menu searchable>
                <SubtypeFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
};

export default SubtypeFilter;
