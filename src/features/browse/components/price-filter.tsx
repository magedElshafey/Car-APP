import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/formatPrice";
import RangeFilter from "@/features/browse/components/range-filter";

const PriceFilter = () => {
    const { i18n } = useTranslation();

    return (
        <RangeFilter
            filterKey="price"
            title="price"
            formatValue={(value) => formatPrice(value, i18n.language)}
        />
    );
}

export default PriceFilter;