import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFilters from "../hooks/use-filters";
import FilterItem from "./car-filter-item";

const transmissionOptions = [
  {
    value: "automatic",
    labelKey: "createCarAd.fields.carType.options.automatic",
  },
  {
    value: "manual",
    labelKey: "createCarAd.fields.carType.options.manual",
  },
] as const;

const TransmissionFilterMenu = () => {
  const {
    states: { transmission },
    handlers: { handleUniqueChange },
  } = useFilters();
  const { t } = useTranslation();

  useEffect(() => {
    if (transmission?.id && !transmission.name) {
      const active = transmissionOptions.find(
        (option) => option.value === transmission.id,
      );
      if (active) {
        handleUniqueChange("transmission", {
          id: transmission.id,
          name: t(active.labelKey),
        });
      }
    }
  }, [handleUniqueChange, t, transmission]);

  return (
    <div className="flex flex-wrap gap-2 py-1">
      {transmissionOptions.map((option) => {
        const isActive = transmission?.id == option.value;

        return (
          <button
            key={option.value}
            className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${isActive ? "border-blue-400 bg-blue-50 text-blue-500" : "border-stone-300 text-stone-600 hover:border-stone-400"}`}
            onClick={() => {
              handleUniqueChange("transmission", {
                id: option.value,
                name: t(option.labelKey),
              });
            }}
          >
            {t(option.labelKey)}
          </button>
        );
      })}
    </div>
  );
};

const TransmissionFilter = () => {
  return (
    <FilterItem filterKey="transmission">
      <FilterItem.Header showLabel title="browse.filters.transmission" />
      <FilterItem.Menu>
        <TransmissionFilterMenu />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default TransmissionFilter;
