import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";

const conditionOptions = [
    {
        value: "new",
        labelKey: "new"
    },
    {
        value: "used",
        labelKey: "used"
    }
] as const;

const ConditionFilterMenu = () => {
    const {
        states: {
            condition
        },
        handlers: {
            handleUniqueChange
        }
    } = useFilters();
    const { t } = useTranslation();

    useEffect(() => {
        if (condition?.value && !condition.label) {
            const active = conditionOptions.find(option => option.value === condition.value);
            if (active) {
                handleUniqueChange("condition", {
                    value: condition.value,
                    label: t(active.labelKey)
                });
            }
        }
    }, [condition, handleUniqueChange, t]);

    return (
        <div className="flex flex-wrap gap-2 py-1">
            {conditionOptions.map(option => {
                const isActive = condition?.value === option.value;

                return (
                    <button
                        key={option.value}
                        className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${isActive ? "border-blue-400 bg-blue-50 text-blue-500" : "border-stone-300 text-stone-600 hover:border-stone-400"}`}
                        onClick={() => {
                            handleUniqueChange("condition", {
                                value: option.value,
                                label: t(option.labelKey)
                            });
                        }}
                    >
                        {t(option.labelKey)}
                    </button>
                );
            })}
        </div>
    );
}

const ConditionFilter = () => {
    return (
        <FilterItem filterKey="condition">
            <FilterItem.Header showLabel title="condition" />
            <FilterItem.Menu>
                <ConditionFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
}

export default ConditionFilter;