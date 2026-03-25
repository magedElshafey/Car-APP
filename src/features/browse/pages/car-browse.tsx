import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BrowseCarCard from "../components/car-card";
import BrowseFiltersDrawer from "../components/browse-filters-drawer";
import BrowseFiltersMenu from "../components/browse-filters-menu";
import BrowsePagination from "../components/browse-pagination";
import useActiveFilters from "../hooks/use-active-filters";
import useFiltersDrawer from "../hooks/use-filters-drawer";
import useGetCars from "../hooks/use-get-cars";
import FiltersDrawerProvider from "../providers/filters-drawer-provider";
import FilterContextProvider from "../providers/filters-provider";

const CarBrowseContent = () => {
    const { open } = useFiltersDrawer();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilters = useActiveFilters();
    const currentPage = Math.max(1, Number(searchParams.get("page") || "1") || 1);
    const carsFilters = useMemo(() => {
        return {
            ...activeFilters,
            page: currentPage.toString()
        };
    }, [activeFilters, currentPage]);

    const {
        data: carsResponse,
        isLoading: carsLoading
    } = useGetCars(carsFilters);

    const cars = carsResponse?.data || [];
    const meta = carsResponse?.meta;

    const handlePageChange = (page: number) => {
        if (!meta || page < 1 || page > meta.last_page || page === currentPage) return;

        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set("page", page.toString());
            return next;
        });
    };

    return (
        <div className="flex gap-4 min-h-screen app-container my-6">
            <div className="hidden self-start lg:sticky lg:top-24 lg:block">
                <BrowseFiltersMenu />
            </div>
            <BrowseFiltersDrawer />
            <div className="flex-1 bg-stone-50 ">
                <div className="mb-4 lg:hidden">
                    <button
                        type="button"
                        className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
                        onClick={open}
                    >
                        Open Filters
                    </button>
                </div>
                {carsLoading ? (
                    <div className="text-sm text-stone-500">Loading cars...</div>
                ) : cars.length ? (
                    <div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {cars.map(car => (
                                <BrowseCarCard key={car.id} car={car} />
                            ))}
                        </div>
                        {
                            meta && (
                                <BrowsePagination
                                    currentPage={meta.current_page}
                                    lastPage={meta.last_page}
                                    total={meta.total}
                                    perPage={meta.per_page}
                                    onPageChange={handlePageChange}
                                />
                            )
                        }
                    </div>
                ) : (
                    <div className="text-sm text-stone-500">No cars found.</div>
                )}
            </div>
        </div>
    );
}

const CarBrowse = () => {
    return (
        <FilterContextProvider>
            <FiltersDrawerProvider>
                <CarBrowseContent />
            </FiltersDrawerProvider>
        </FilterContextProvider>
    );
}

export default CarBrowse;