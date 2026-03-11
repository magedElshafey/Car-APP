import useFilters from "../hooks/use-filters";
import FilterItem, { useSearch } from "./car-filter-item";
import useGetBrands from "../hooks/use-get-brands";
import SkeletonFilterList from "./filter-list-skeleton";

const BrandFilterMenu = () => {
    const { 
        states: {
            brand
        }
    } = useFilters();
    const { value: search } = useSearch();

    const {
        data: brands,
        isLoading: brandsLoading
    } = useGetBrands();

    if(brandsLoading) return <SkeletonFilterList /> 

    return (
        <>
            {brands?.map(brand => (
                <div key={brand.id}>
                    {brand.name}
                </div>
            ))}
        </>
    );
}

const BrandFilter = () => {
    return (
        <FilterItem filterKey="brand">
            <FilterItem.Header title="brand" />
            <FilterItem.Menu searchable>
                <BrandFilterMenu />
            </FilterItem.Menu>
        </FilterItem>
    );
};

export default BrandFilter;
