import useFilterSearch from "@/features/browse/hooks/use-filter-search";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";
import useGetModels from "../hooks/use-get-models";
import { useTranslation } from "react-i18next";
import useActiveFilters from "../hooks/use-active-filters";

const ModelFilterMenu = () => {
  const {
    states: { model },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { t } = useTranslation();

  const { value: search } = useFilterSearch();

  const activeFilters = useActiveFilters();

  const { data: models, isLoading: modelsLoading } = useGetModels(
    activeFilters.brand,
  );

  const activeModel = parseInt(model?.id || "") || undefined;

  const filteredModels = useMemo(() => {
    if (!search) return models;
    return models?.filter((model) =>
      model?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [models, search]);

  useEffect(() => {
    if (models && model?.id && !model.name) {
      const active = models.find((b) => b.id.toString() == model.id);
      if (active) {
        handleUniqueChange("model", {
          name: active.name,
          id: model.id,
        });
      }
    }
  }, [models, model, handleUniqueChange]);

  if (modelsLoading || !activeFilters.brand) return <SkeletonFilterList />;

  return (
    <div className="p-1 rounded-sm bg-slate-100">
      {!!filteredModels?.length ? (
        filteredModels?.map((model) => (
          <button
            className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeModel == model.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`}
            key={model.id}
            onClick={() => {
              handleUniqueChange("model", {
                name: model.name,
                id: model.id.toString(),
              });
            }}
          >
            {model.name}
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

const ModelFilter = () => {
  const { brand } = useFilters().states;

  if (!brand?.id) return null;
  return (
    <FilterItem filterKey="model">
      <FilterItem.Header showLabel title="browse.filters.model" />
      <FilterItem.Menu searchable>
        <ModelFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default ModelFilter;
