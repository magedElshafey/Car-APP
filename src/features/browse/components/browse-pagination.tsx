import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface BrowsePaginationProps {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

const BrowsePagination = ({
    currentPage,
    lastPage,
    total,
    perPage,
    onPageChange
}: BrowsePaginationProps) => {
    if (lastPage <= 1) return null;

    const pageItems = getPageItems(currentPage, lastPage);
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < lastPage;

    return (
        <div className="mt-6 space-y-3">
            <div className="text-xs text-stone-500">
                {total} results • {perPage} per page
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="h-10 w-10 rounded-md border border-stone-300 text-stone-500 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrev}
                    aria-label="Previous page"
                >
                    <FaChevronLeft className="mx-auto" size={12} />
                </button>

                {pageItems.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={`dots-${index}`} className="px-2 text-stone-500">
                                ...
                            </span>
                        );
                    }

                    const isActive = item === currentPage;

                    return (
                        <button
                            key={item}
                            type="button"
                            className={`h-10 min-w-10 rounded-md border px-3 text-sm font-semibold ${isActive ? "border-blue-600 bg-blue-600 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"}`}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    );
                })}

                <button
                    type="button"
                    className="h-10 w-10 rounded-md border border-stone-300 text-stone-500 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    aria-label="Next page"
                >
                    <FaChevronRight className="mx-auto" size={12} />
                </button>
            </div>
        </div>
    );
}

function getPageItems(currentPage: number, lastPage: number): Array<number | "..."> {
    if (lastPage <= 7) {
        return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", lastPage];
    }

    if (currentPage >= lastPage - 3) {
        return [1, "...", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage];
}

export default BrowsePagination;