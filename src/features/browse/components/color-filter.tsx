import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetColors from "../hooks/use-get-colors";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const ColorFilterMenu = () => {
    const {
        states: {
            color
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { value: search } = useFilterSearch();
    const { t } = useTranslation();

    const {
        data: colors,
        isLoading: colorsLoading
    } = useGetColors();

    const activeColor = color?.value;

    const filteredColors = useMemo(() => {
        if (!search) return colors;
        return colors?.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [colors, search]);

    useEffect(() => {
        if (colors && color?.value && !color.label) {
            const active = colors.find(item => item.value === color.value);
            if (active) {
                handleUniqueChange("color", {
                    label: active.label,
                    value: color.value
                });
            }
        }
    }, [colors, color, handleUniqueChange]);

    if (colorsLoading) return <SkeletonFilterList />;

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {Boolean(filteredColors?.length) ? filteredColors?.map(item => (
                <button
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeColor === item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
                    key={item.value}
                    onClick={() => {
                        handleUniqueChange("color", {
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

const ColorFilter = () => {
    return (
        <FilterItem filterKey="color">
            <FilterItem.Header showLabel title="color" />
            <FilterItem.Menu searchable>
                <ColorFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
}

export default ColorFilter;