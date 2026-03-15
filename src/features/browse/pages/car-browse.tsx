import CarFilters from "../components/car-filters";
import FilterContextProvider from "../providers/filters-provider";

const CarBrowse = () => {
    return (
        <FilterContextProvider>
            <div className="flex gap-4 min-h-screen app-container my-6">
                <div className="p-2 space-y-2 w-[260px] border border-stone-300 rounded-lg">
                    <p>
                        Reset Search
                    </p>
                    <CarFilters />
                </div>
                <div className="flex-1 bg-green-200 rounded-lg">

                </div>
            </div>
        </FilterContextProvider>
    );
}

export default CarBrowse;