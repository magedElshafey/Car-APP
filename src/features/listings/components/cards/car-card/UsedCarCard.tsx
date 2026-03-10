import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/formatPrice";

type UsedCarCardProps = {
  title: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  price: number;
  currency?: string;
  city: string;
  area?: string;
  badge?: string;
  images: string[];
  sellerTag?: string;
  onCall?: () => void;
  onWhatsApp?: () => void;
  onViewSeller?: () => void;
  onCardClick?: () => void;
};

export default function UsedCarCard({
  title,
  year,
  mileage,
  transmission,
  fuelType,
  price,
  currency = "جنيه",
  city,
  area,
  badge = "ترو",
  images,
  sellerTag,
  onCall,
  onWhatsApp,
  onViewSeller,
  onCardClick,
}: UsedCarCardProps) {
  const { i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = useMemo(
    () => (images.length ? images : ["/placeholder-car.jpg"]),
    [images],
  );

  const totalImages = safeImages.length;
  const currentImage = safeImages[activeIndex];

  const goNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % totalImages);
  };

  const goPrev = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <article
      onClick={onCardClick}
      className="
        group overflow-hidden rounded-2xl border border-border bg-white
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-[2px] hover:shadow-lg
      "
    >
      {/* Image area */}
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
          <img
            src={currentImage}
            alt={title}
            className="
              h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-[1.02]
            "
          />
        </div>

        {/* top overlay */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-black/20 to-transparent" />

        {/* badge */}
        {badge ? (
          <div className="absolute right-3 top-3 z-[2]">
            <span
              className="
                inline-flex items-center rounded-lg
                bg-[#8B4D16] px-2.5 py-1 text-xs font-bold text-white
                shadow-sm
              "
            >
              {badge}
            </span>
          </div>
        ) : null}

        {/* image counter */}
        <div className="absolute bottom-3 left-3 z-[2]">
          <span
            className="
              inline-flex items-center rounded-lg bg-black/80 px-2.5 py-1
              text-sm font-bold text-white backdrop-blur-sm
            "
          >
            {activeIndex + 1} / {totalImages}
          </span>
        </div>

        {/* controls */}
        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="
                absolute left-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2
                items-center justify-center rounded-full
                border border-white/70 bg-white/90 text-text shadow-md backdrop-blur-sm
                opacity-100 transition-all duration-300
                md:opacity-0 md:group-hover:opacity-100
                hover:scale-105
              "
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="
                absolute right-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2
                items-center justify-center rounded-full
                border border-white/70 bg-white/90 text-text shadow-md backdrop-blur-sm
                opacity-100 transition-all duration-300
                md:opacity-0 md:group-hover:opacity-100
                hover:scale-105
              "
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* title */}
        <h3
          className="
            line-clamp-2 text-[22px] font-extrabold leading-8 text-text
            transition-colors duration-300 group-hover:text-primary
          "
        >
          {title}
        </h3>

        {/* meta */}
        <div className="flex flex-wrap items-center mt-2 text-sm gap-x-3 gap-y-1 text-text-muted">
          <span>{year}</span>
          <span className="w-1 h-1 rounded-full bg-divider" />
          <span>{formatPrice(mileage, i18n.language)} كم</span>
          <span className="w-1 h-1 rounded-full bg-divider" />
          <span>{transmission}</span>
          <span className="w-1 h-1 rounded-full bg-divider" />
          <span>{fuelType}</span>
        </div>

        {/* price */}
        <div className="mt-4">
          <p className="text-[15px] font-black leading-none text-primary sm:text-[18px]">
            {formatPrice(price, i18n.language)} {currency}
          </p>
        </div>

        {/* chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {sellerTag ? (
            <span
              className="
                inline-flex items-center rounded-lg border border-border
                bg-surface px-2.5 py-1.5 text-xs font-medium text-text-muted
              "
            >
              {sellerTag}
            </span>
          ) : null}

          <span
            className="
              inline-flex items-center gap-1.5 rounded-lg border border-border
              bg-surface px-2.5 py-1.5 text-xs font-medium text-text-muted
            "
          >
            <FiMapPin className="h-3.5 w-3.5" />
            {city}
            {area ? `، ${area}` : ""}
          </span>
        </div>

        {/* actions */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCall?.();
            }}
            className="inline-flex items-center justify-center gap-2 text-sm font-bold transition-colors duration-200 border  h-11 rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
          >
            <FiPhone className="h-4.5 w-4.5" />
            <span>اتصال</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWhatsApp?.();
            }}
            aria-label="WhatsApp"
            className="
              inline-flex h-11 items-center justify-center rounded-xl
              border border-border bg-surface
              text-[#22c55e] transition-colors duration-200 hover:bg-[#22c55e]/10
            "
          >
            <FaWhatsapp className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewSeller?.();
            }}
            aria-label="View seller"
            className="inline-flex items-center justify-center transition-colors duration-200 border  h-11 rounded-xl border-border bg-surface text-text-muted hover:bg-surface-2"
          >
            <FiUser className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
