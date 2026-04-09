import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useActiveFilters = () => {
  const [searchParams] = useSearchParams();

  const activeFilters = useMemo(() => {
    const activeFilters = {} as Record<string, string>;
    for (const entry of searchParams.entries()) {
      const [key, value] = entry;
      if (key.startsWith("filter-")) {
        const keyName = key.split("-")[1];
        if (keyName) {
          activeFilters[keyName] = value;
        }
      }
    }
    return activeFilters;
  }, [searchParams]);

  return activeFilters;
};

export default useActiveFilters;
