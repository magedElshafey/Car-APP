import DoubleSlider from "@/common/components/double-slider/double-slider";
import useFilters from "../hooks/use-filters";
import { RANGE_FILTER_CONFIG } from "../config";
import {
  isRangeFilterValue,
  type RangeFilterKey,
} from "../types/filters.types";
import FilterItem from "./car-filter-item";

interface RangeFilterProps {
  filterKey: RangeFilterKey;
  title: string;
  formatValue?: (value: number) => string;
}

const RangeFilter = ({ filterKey, title, formatValue }: RangeFilterProps) => {
  const {
    states,
    handlers: { handleChange },
  } = useFilters();

  const config = RANGE_FILTER_CONFIG[filterKey];
  const activeValue = isRangeFilterValue(states[filterKey])
    ? states[filterKey]
    : undefined;
  const min = Number(activeValue?.from || config.min);
  const max = Number(activeValue?.to || config.max);

  return (
    <FilterItem filterKey={filterKey}>
      <FilterItem.Header showLabel title={title} />
      <FilterItem.Menu>
        <DoubleSlider
          min={config.min}
          max={config.max}
          step={config.step}
          value={{ min, max }}
          onChange={(value) => {
            const isDefaultRange =
              value.min === config.min && value.max === config.max;

            handleChange(
              filterKey,
              isDefaultRange
                ? undefined
                : {
                    from: value.min.toString(),
                    to: value.max.toString(),
                  },
            );
          }}
          formatValue={formatValue}
        />
      </FilterItem.Menu>
    </FilterItem>
  );
};

export default RangeFilter;
