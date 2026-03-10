import { FaEye } from "react-icons/fa";
import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "react-i18next";

type CarCardProps = {
  title: string;
  adCount: number;
  priceFrom: number;
  priceTo: number;
  currency?: string;
  image: string;
};

export default function CarCard({
  title,
  adCount,
  priceFrom,
  priceTo,
  currency = "جنيه",
  image,
}: CarCardProps) {
  const { i18n } = useTranslation();

  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl border border-border/70
        bg-gradient-to-b from-white to-surface transition-all duration-300 ease-out
        hover:-translate-y-[2px] hover:border-primary/30 hover:shadow-lg
      "
    >
      {/* subtle top bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-primary/80" />

      {/* view details */}
      <button
        type="button"
        aria-label="View details"
        className="absolute z-10 flex items-center justify-center transition-all duration-300 -translate-y-1 border rounded-full shadow-sm opacity-0 left-4 top-4 h-9 w-9 border-border/70 bg-white/95 text-text-muted backdrop-blur-sm group-hover:translate-y-0 group-hover:opacity-100 hover:border-primary/20 hover:bg-primary hover:text-white"
      >
        <FaEye className="w-4 h-4" />
      </button>

      <div className="flex min-h-[320px] flex-col p-5">
        {/* header */}
        <div className="space-y-1">
          <div className="inline-flex items-center rounded-full bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary">
            {adCount} فئات
          </div>

          <h3 className="text-lg font-bold leading-7 transition-colors duration-300 line-clamp-2 text-text group-hover:text-primary">
            {title}
          </h3>
        </div>

        {/* image area */}
        <div className="relative flex items-center justify-start flex-1 mt-4 overflow-hidden">
          <div className="absolute w-32 h-6 rounded-full bottom-6 left-6 bg-black/10 blur-xl" />

          <img
            src={image}
            alt={title}
            className="
              relative z-[1] h-auto w-[220px] max-w-none object-contain
              -translate-x-5 transition-all duration-300 ease-out
              group-hover:-translate-x-1 group-hover:scale-[1.02]
              sm:w-[235px]
            "
          />
        </div>

        {/* footer */}
        <div className="pt-4 mt-4 border-t border-divider">
          <p className="mb-1 text-xs font-medium text-text-muted">يبدأ من</p>

          <div className="flex items-end justify-between gap-3">
            <p className="text-[16px] font-extrabold leading-6 text-text">
              <span dir="ltr">
                {formatPrice(priceTo, i18n.language)} -{" "}
                {formatPrice(priceFrom, i18n.language)}
              </span>{" "}
              {currency}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
