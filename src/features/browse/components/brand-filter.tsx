import useFilters from "../hooks/use-filters";
import FilterItem, { useSearch } from "./car-filter-item";
import useGetBrands from "../hooks/use-get-brands";
import SkeletonFilterList from "./filter-list-skeleton";
import { useEffect, useMemo } from "react";

const BrandFilterMenu = () => {
    const { 
        states: {
            brand
        },
        handlers: {
            handleChange
        }
    } = useFilters();
    const { value: search } = useSearch();

    const {
        data: brands,
        isLoading: brandsLoading
    } = useGetBrands();

    const activeBrand = parseInt(brand?.value || "") || undefined;
    const filteredBrands = useMemo(() => {
        if(!search) return brands;
        return brands?.filter(brand => brand.name.toLowerCase().includes(search.toLowerCase()));
    }, [brands, search]);

    useEffect(() => {
        if(brands && brand && !brand.label) {
            const active = brands.find(b => b.id.toString() === brand.value);
            if(active) {
                handleChange("brand", {
                    label: active.name,
                    value: brand.value 
                });
            }
        }
    }, [brands, brand]);

    if(brandsLoading) return <SkeletonFilterList /> 

    return (
        <div className="bg-slate-100 rounded-sm p-1">
            {filteredBrands?.map(brand => (
                <button 
                    className={`py-2 block w-full text-start rounded px-2 duration-75 cursor-pointer font-semibold text-sm ${activeBrand === brand.id ? "text-blue-400 bg-blue-50" : "hover:bg-slate-300"}`} key={brand.id}
                    onClick={() => {
                        handleChange("brand", {
                            label: brand.name,
                            value: brand.id.toString()
                        });
                    }}
                >
                    {brand.name}
                </button>
            ))}
        </div>
    );
}

const BrandFilter = () => {
    return (
        <FilterItem filterKey="brand">
            <FilterItem.Header showLabel title="brand" />
            <FilterItem.Menu searchable>
                <BrandFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
};

export default BrandFilter;
