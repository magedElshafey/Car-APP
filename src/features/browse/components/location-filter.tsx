import { useTranslation } from "react-i18next";
import useFilterSearch from "../hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import useGetCities from "../hooks/use-get-cities";
import { useEffect, useMemo } from "react";
import SkeletonFilterList from "./filter-list-skeleton";

const LocationMenu = () => {
    const {
        states: {
            city_id
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { value: search } = useFilterSearch();
    const { t } = useTranslation();

    const {
        data: cities,
        isLoading: citiesLoading
    } = useGetCities();


    const activeColor = city_id?.value;

    const filteredColors = useMemo(() => {
        if (!search) return cities;
        return cities?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }, [cities, search]);

    useEffect(() => {
        if (cities && city_id?.value && !city_id.label) {
            const active = cities.find(item => item.value === city_id.value);
            if (active) {
                handleUniqueChange("color", {
                    label: active.name,
                    value: city_id.value
                });
            }
        }
    }, [cities, city_id, handleUniqueChange]);

    if (citiesLoading) return <SkeletonFilterList />;

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {Boolean(filteredColors?.length) ? filteredColors?.map(item => (
                <button
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeColor === item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
                    key={item.value}
                    onClick={() => {
                        handleUniqueChange("color", {
                            label: item.name,
                            value: item.value
                        });
                    }}
                >
                    {item.name}
                </button>
            )) : <div className="py-2 block w-full text-start rounded px-2 text-sm text-gray-500">{t("no results found")}</div>}
        </div>
    );
}

const LocationFilter = () => {
    return (
        <FilterItem filterKey="city_id">
            <FilterItem.Header showLabel title="browse.filters.location" />
            <FilterItem.Menu searchable>
                <LocationMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
}

export default LocationFilter;