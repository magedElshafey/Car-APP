import BrandFilter from "./brand-filter";
import CarTypeFilter from "./car-type-filter";
import ConditionFilter from "./condition-filter";
import ColorFilter from "./color-filter";
import FuelTypeFilter from "./fuel-type-filter";
import ModelFilter from "./models-filter";
import PriceFilter from "./price-filter";
import TransmissionFilter from "./transmission-filter";
import YearFilter from "./year-filter";

const CarFilters = () => {
    return (
        <>
            <BrandFilter />
            <ModelFilter />
            <FuelTypeFilter />
            <ColorFilter />
            <CarTypeFilter />
            <TransmissionFilter />
            <ConditionFilter />
            <YearFilter />
            <PriceFilter />
        </>
    );
}

export default CarFilters;