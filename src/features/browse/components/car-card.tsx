import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "react-i18next";
import { CarListing } from "../types/car.types";

interface BrowseCarCardProps {
    car: CarListing;
}

const BrowseCarCard = ({ car }: BrowseCarCardProps) => {
    const { i18n, t } = useTranslation();
    const image = car.images[0] || "/images/cars/car-1.png";

    return (
        <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="aspect-[16/10] bg-stone-100">
                <img
                    src={image}
                    alt={`${car.car.brand} ${car.car.model}`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="line-clamp-1 text-base font-bold text-stone-800">
                        {car.car.brand} {car.car.model}
                    </h3>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">
                        {t(car.condition)}
                    </span>
                </div>

                <p className="text-sm text-stone-500">
                    {car.car.year} • {car.transmission} • {car.fuel_type} • {car.color}
                </p>

                <p className="text-sm text-stone-500">
                    {car.city} • {formatPrice(car.mileage_km, i18n.language)} {t("km")}
                </p>

                <div className="pt-1 text-lg font-extrabold text-stone-900">
                    {formatPrice(Number(car.price), i18n.language)} {t("EGP")}
                </div>
            </div>
        </article>
    );
}

export default BrowseCarCard;