import { formatPrice } from "@/utils/formatPrice";
import { useMemo, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdBrokenImage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CarDetails } from "../types/car.types";
import FavoriteButton from "@/features/browse/components/FavoriteButton";
import { FaUser } from "react-icons/fa";

interface BrowseCarCardProps {
  car: CarDetails;
}

const BrowseCarCard = ({ car }: BrowseCarCardProps) => {
  console.log("car", car);
  const { i18n, t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const images = car.images || [];
  const image = images[0] || "/images/cars/car-1.png";

  /** ✅ Fix NaN mileage */
  const mileage = car?.details?.mileage_km
    ? Number(car?.details?.mileage_km)
    : 0;

  const mileageFormatted = useMemo(
    () => new Intl.NumberFormat("en-US").format(mileage),
    [mileage],
  );

  /** ✅ تفاصيل العربية */
  const details = [
    car?.details?.fuel_type_label || "-",
    car?.details?.transmission_label || "-",
    `${mileageFormatted} ${t("km")}`,
    car?.car?.year,
  ].join(" | ");

  /** 📞 Phone handling */
  const normalizedPhone = car.contact_phone?.replace(/[^\d+]/g, "") || "";
  const phoneWithoutPlus = normalizedPhone.replace(/^\+/, "");
  const hasPhone = Boolean(phoneWithoutPlus);

  /** 💬 WhatsApp */
  const whatsappMessage = encodeURIComponent(
    `${car?.car?.brand} ${car?.car?.model} - ${formatPrice(
      Number(car.price),
      i18n.language,
    )} جنيه`,
  );

  const whatsappLink = `https://wa.me/${phoneWithoutPlus}?text=${whatsappMessage}`;

  return (
    <article className="relative overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl hover:shadow-lg border-stone-200">
      {/* ❤️ Favorite */}
      <FavoriteButton
        productId={car.id}
        showLabel={false}
        className="absolute z-20 flex items-center justify-center w-8 h-8 border rounded-full shadow-sm top-3 right-3 bg-white/90 backdrop-blur"
        isInWishlist={car.is_fav}
      />

      {/* 🔥 Badge */}
      {car.status_label && (
        <span className="absolute z-20 px-2 py-1 text-xs text-white rounded-md shadow top-3 left-3 bg-primary">
          {car.status_label}
        </span>
      )}

      {/* 🖼 Image */}
      <Link to={`/cars/${car.id}`} className="relative block">
        <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-stone-200 text-stone-500">
              <MdBrokenImage size={36} />
            </div>
          ) : (
            <img
              src={image}
              alt={`${car?.car?.brand} ${car?.car?.model}`}
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}

          {/* 🔢 Image Counter */}
          {images.length > 1 && (
            <span className="absolute px-2 py-1 text-xs text-white rounded bottom-2 left-2 bg-black/60">
              1 / {images.length}
            </span>
          )}

          {/* 👁 View All */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-center transition opacity-0 group-hover:opacity-100">
              <span className="px-4 py-2 text-sm text-white rounded-lg bg-black/70">
                {t("view_all")} ({images.length})
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* 📦 Content */}
      <div className="p-4 space-y-3">
        {/* 🏷 Title */}
        <Link to={`/cars/${car.id}`}>
          <h3 className="text-lg font-bold text-stone-900 line-clamp-1">
            {car?.car?.brand} {car?.car?.model}
          </h3>
        </Link>

        {/* ⚙️ Details */}
        <p className="text-sm text-stone-600 line-clamp-1">{details}</p>

        {/* 💰 Price */}
        <div className="flex items-center gap-1 text-2xl font-extrabold text-primary">
          {formatPrice(Number(car.price), i18n.language)}
          <span className="text-base font-medium">{t("egp")}</span>
        </div>

        {/* 🏷 Tags */}
        <div className="flex flex-wrap gap-2">
          {car?.city && car?.city_id && (
            <Link
              to={`/car-browse?filter-vehicle_type=car&filter-city_id=${car.city_id}`}
              className="tag"
            >
              {car.city}
            </Link>
          )}

          {car?.car?.brand_id && car?.car?.brand && (
            <Link
              to={`/car-browse?filter-brand=${car.car.brand_id}`}
              className="tag"
            >
              {car.car.brand}
            </Link>
          )}
          {car?.car?.brand_id && car?.car?.model && car?.car?.model_id && (
            <Link
              to={`/car-browse?filter-brand=${car.car.brand_id}&filter-model=${car.car.model_id}`}
              className="tag"
            >
              {car.car.model}
            </Link>
          )}
        </div>

        {/* 👤 Seller Logo */}

        <div className="flex items-center gap-1">
          {car.seller.image ? (
            <img
              src={car.seller.image || ""}
              alt={car.seller.name}
              className="object-cover w-6 h-6 border rounded-full"
              loading="lazy"
            />
          ) : (
            <FaUser className="text-text-muted" size={12} />
          )}

          <span className="text-xs text-stone-500">{car.seller.name}</span>
        </div>

        {/* 📞 Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={hasPhone ? `tel:${normalizedPhone}` : undefined}
            aria-label="Call"
            className={`btn ${hasPhone ? "btn-outline" : "btn-disabled"}`}
          >
            <FiPhoneCall />
            {t("browse.card.call")}
          </a>

          <a
            href={car.whatsapp_allowed && hasPhone ? whatsappLink : undefined}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className={`btn ${
              car.whatsapp_allowed && hasPhone ? "btn-success" : "btn-disabled"
            }`}
          >
            <IoLogoWhatsapp />
            {t("browse.card.whatsapp")}
          </a>
        </div>
      </div>
    </article>
  );
};

export default BrowseCarCard;
