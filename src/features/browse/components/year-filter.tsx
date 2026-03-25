import RangeFilter from "@/features/browse/components/range-filter";

const YearFilter = () => {
    return (
        <RangeFilter
            filterKey="year"
            title="browse.filters.year"
        />
    );
}

export default YearFilter;