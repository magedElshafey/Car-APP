import CarFilters from "./car-filters";
import useFilters from "../hooks/use-filters";

interface BrowseFiltersMenuProps {
    className?: string;
}

const BrowseFiltersMenu = ({
    className = ""
}: BrowseFiltersMenuProps) => {
    const {
        handlers: {
            resetFilters
        }
    } = useFilters();

    return (
        <div className={`p-2 space-y-2 w-[260px] border border-stone-300 rounded-lg bg-white ${className}`}>
            <button
                type="button"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                onClick={resetFilters}
            >
                Reset Search
            </button>
            <CarFilters />
        </div>
    );
}

export default BrowseFiltersMenu;