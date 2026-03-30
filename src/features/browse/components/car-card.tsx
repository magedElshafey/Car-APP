import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdBrokenImage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CarDetails } from "../types/car.types";

interface BrowseCarCardProps {
  car: CarDetails;
}

const BrowseCarCard = ({ car }: BrowseCarCardProps) => {
  const { i18n, t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const image = car.images[0] || "/images/cars/car-1.png";
  const mileageInEnglishDigits = new Intl.NumberFormat("en-US").format(
    car.details.mileage_km,
  );
  const details = [
    car.details.fuel_type_label,
    `${mileageInEnglishDigits} ${t("km")}`,
    String(car.car.year),
  ].join(" | ");
  const locationLine = [car.city, car.car.brand, car.car.model].join(" | ");
  const normalizedPhone = car.contact_phone.replace(/[^\d+]/g, "");
  const phoneWithoutPlus = normalizedPhone.replace(/^\+/, "");
  const hasPhone = Boolean(phoneWithoutPlus);
  const whatsappMessage = encodeURIComponent(
    `${car.car.brand} ${car.car.model} - ${formatPrice(Number(car.price), i18n.language)} ${t("EGP")}`,
  );
  const whatsappLink = `https://wa.me/${phoneWithoutPlus}?text=${whatsappMessage}`;

  return (
    <article className="overflow-hidden transition-shadow bg-white border shadow-sm rounded-xl border-stone-200 hover:shadow-md">
      <Link to={`/cars/${car.id}`} className="block">
        <div className="aspect-[16/10] bg-stone-100">
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-stone-200 text-stone-500">
              <MdBrokenImage size={36} aria-hidden="true" />
            </div>
          ) : (
            <img
              src={image}
              alt={`${car.car.brand} ${car.car.model}`}
              className="object-cover w-full h-full"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/cars/${car.id}`} className="block">
          <h3 className="text-xl font-bold line-clamp-1 text-stone-900">
            {car.car.brand} {car.car.model}
          </h3>
        </Link>

        <p className="text-sm line-clamp-1 text-stone-600">{details}</p>

        <div className="text-2xl font-extrabold leading-none text-primary">
          {formatPrice(Number(car.price), i18n.language)}
          <span className="text-xl ms-1">{t("EGP")}</span>
        </div>

        <p className="text-sm line-clamp-1 text-stone-500">
          <HiOutlineLocationMarker className="inline me-1" size={16} />
          {locationLine}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={hasPhone ? `tel:${normalizedPhone}` : undefined}
            className={`inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold transition-colors ${
              hasPhone
                ? "bg-white text-stone-700 hover:bg-stone-100"
                : "cursor-not-allowed bg-stone-100 text-stone-400"
            }`}
            aria-disabled={!hasPhone}
          >
            <FiPhoneCall size={16} />
            {t("browse.card.call")}
          </a>
          <a
            href={car.whatsapp_allowed && hasPhone ? whatsappLink : undefined}
            target={car.whatsapp_allowed && hasPhone ? "_blank" : undefined}
            rel={car.whatsapp_allowed && hasPhone ? "noreferrer" : undefined}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              car.whatsapp_allowed && hasPhone
                ? "bg-green-600 text-white hover:bg-green-700"
                : "cursor-not-allowed bg-stone-200 text-stone-500"
            }`}
            aria-disabled={!car.whatsapp_allowed || !hasPhone}
          >
            <IoLogoWhatsapp size={17} />
            {t("browse.card.whatsapp")}
          </a>
        </div>
      </div>
    </article>
  );
};

export default BrowseCarCard;
