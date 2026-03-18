import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { FiltersDrawerContext } from "../hooks/use-filters-drawer";

const FiltersDrawerProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(old => !old), []);

    const value = useMemo(() => ({
        isOpen,
        open,
        close,
        toggle
    }), [isOpen, open, close, toggle]);

    return (
        <FiltersDrawerContext.Provider value={value}>
            {children}
        </FiltersDrawerContext.Provider>
    );
}

export default FiltersDrawerProvider;