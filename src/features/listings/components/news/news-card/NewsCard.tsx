import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { cn } from "@/lib/utils";

type NewsCardProps = {
  title: string;
  image: string;
  href: string;
  date: string;
  imageAlt?: string;
  category?: string;
  className?: string;
};

export default function NewsCard({
  title,
  image,
  href,
  date,
  imageAlt = "",
  category,
  className,
}: NewsCardProps) {
  return (
    <Link
      to={href}
      aria-label={title}
      className={cn(
        "group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <article
        className={cn(
          "relative isolate overflow-hidden rounded-2xl border border-divider bg-surface",
          "min-h-[390px] md:min-h-[420px]",
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover",
              "transform-gpu will-change-transform transition-transform duration-500 ease-out",
              "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]",
            )}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            "from-black/85 via-black/30 to-black/10",
          )}
        />

        {category ? (
          <div className="absolute right-3 top-3 z-[2]">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-white rounded-lg shadow-sm text-text">
              {category}
            </span>
          </div>
        ) : null}

        <div
          className={cn(
            "relative z-[1] flex h-full flex-col justify-end p-4 md:p-5",
            "transform-gpu transition-transform duration-500 ease-out",
            "group-hover:-translate-y-1 group-focus-visible:-translate-y-1",
          )}
        >
          <h3
            className={cn(
              "line-clamp-2 text-lg font-extrabold leading-7 text-white md:text-xl",
              "drop-shadow-sm",
            )}
          >
            {title}
          </h3>

          <div className="flex items-center justify-end gap-2 mt-3 text-sm text-white/90">
            <span>{date}</span>
            <FiCalendar className="w-4 h-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}
