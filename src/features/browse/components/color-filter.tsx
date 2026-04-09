import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import useGetColors from "../hooks/use-get-colors";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";

const ColorFilterMenu = () => {
  const {
    states: { color },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { value: search } = useFilterSearch();
  const { t } = useTranslation();

  const { data: colors, isLoading: colorsLoading } = useGetColors();

  const activeColor = color?.id;

  const filteredColors = useMemo(() => {
    if (!search) return colors;
    return colors?.filter((item) =>
      item?.label?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [colors, search]);

  useEffect(() => {
    if (colors && color?.id && !color.name) {
      const active = colors.find((item) => item.value === color.id);
      if (active) {
        handleUniqueChange("color", {
          name: active.label,
          id: color.id,
        });
      }
    }
  }, [colors, color, handleUniqueChange]);

  if (colorsLoading) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {Boolean(filteredColors?.length) ? (
        filteredColors?.map((item) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeColor == item.value ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={item.value}
            onClick={() => {
              handleUniqueChange("color", {
                name: item.label,
                id: item.value,
              });
            }}
          >
            {item.label}
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

const ColorFilter = () => {
  return (
    <FilterItem filterKey="color">
      <FilterItem.Header showLabel title="browse.filters.color" />
      <FilterItem.Menu searchable>
        <ColorFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default ColorFilter;
