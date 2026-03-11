import FilterItem from "./car-filter-item";

const CarFilters = () => {
    return (
        <>
            <FilterItem filterKey="brand">
                <FilterItem.Header title="brand" />
                <FilterItem.Menu searchable>
                    {
                        new Array(100).fill("some-brand").map((item, i) => (
                            <div key={i}>
                                {item}
                            </div>
                        ))
                    }
                </FilterItem.Menu>
            </FilterItem>
        </>
    );
}

export default CarFilters;