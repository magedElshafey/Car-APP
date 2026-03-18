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
        states: {
           model,
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const {t} = useTranslation();

    const { value: search } = useFilterSearch();

    const activeFilters = useActiveFilters();

    const {
        data: models,
        isLoading: modelsLoading 
    } = useGetModels(activeFilters.brand);

    const activeModel = parseInt(model?.value || "") || undefined;

    const filteredModels = useMemo(() => {
        if(!search) return models;
        return models?.filter(model => model.name.toLowerCase().includes(search.toLowerCase()));
    }, [models, search]);

    useEffect(() => {
        if(models && model?.value && !model.label) {
            const active = models.find(b => b.id.toString() === model.value);
            if(active) {
                handleUniqueChange("model", {
                    label: active.name,
                    value: model.value 
                });
            }
        }
    }, [models, model, handleUniqueChange]);

    if(modelsLoading || !activeFilters.brand) return <SkeletonFilterList />

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {!!filteredModels?.length ? filteredModels?.map(model => (
                <button 
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeModel === model.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`} key={model.id}
                    onClick={() => {
                        handleUniqueChange("model", {
                            label: model.name,
                            value: model.id.toString()
                        });
                    }}
                >
                    {model.name}
                </button>
            )) : <div className="py-2 block w-full text-start rounded px-2 text-sm text-gray-500">{t("no results found")}</div>}
        </div>
    );
}

const ModelFilter = () => {
    const {brand} = useFilters().states;

    if(!brand?.value) return null;
    return (
        <FilterItem filterKey="model">
            <FilterItem.Header showLabel title="model" />
            <FilterItem.Menu searchable>
                <ModelFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
};

export default ModelFilter;
