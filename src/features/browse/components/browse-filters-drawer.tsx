import { useEffect } from "react";
import useFiltersDrawer from "../hooks/use-filters-drawer";
import BrowseFiltersMenu from "./browse-filters-menu";

const BrowseFiltersDrawer = () => {
    const {
        isOpen,
        close
    } = useFiltersDrawer();

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [close, isOpen]);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={close}
                aria-hidden
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Filters menu"
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-stone-50 p-4 transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-stone-700">Filters</h2>
                    <button
                        type="button"
                        onClick={close}
                        className="h-8 w-8 rounded-md border border-stone-300 text-stone-600"
                        aria-label="Close filters"
                    >
                        x
                    </button>
                </div>
                <BrowseFiltersMenu className="w-full" />
            </aside>
        </>
    );
}

export default BrowseFiltersDrawer;