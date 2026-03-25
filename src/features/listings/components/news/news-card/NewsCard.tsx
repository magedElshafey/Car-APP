import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { FiArrowUpLeft } from "react-icons/fi";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

type NewsCardProps = {
  title: string;
  image: string;
  href: string;
  date: string;
  imageAlt?: string;
  category?: string;
  className?: string;
  desc: string;
};

export default function NewsCard({
  title,
  image,
  href,
  date,
  imageAlt = "",
  category,
  className,
  desc,
}: NewsCardProps) {
  const {
    i18n: { dir },
  } = useTranslation();

  const isRtl = dir() === "rtl";
  console.log("desc", desc);
  return (
    <Link
      to={href}
      aria-label={title}
      className={cn(
        "group block h-full rounded-[26px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <article
        className={cn(
          "flex h-full min-h-[380px] flex-col overflow-hidden rounded-[26px]",
          "border border-divider/70 bg-background/95 backdrop-blur-sm",
          "transition-[border-color,background-color,transform] duration-300 ease-out",
          "hover:border-primary/15 hover:bg-background",
        )}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[16/10] w-full overflow-hidden bg-muted/50">
            <img
              src={image}
              alt={imageAlt || title}
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full object-cover",
                "transform-gpu transition-transform duration-500 ease-out",
              )}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-black/12 to-transparent" />

          {category ? (
            <div className="absolute left-4 top-4 z-[2]">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border border-white/50",
                  "bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-sm backdrop-blur-md",
                )}
              >
                {category}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div
              className={cn(
                "inline-flex max-w-full items-center gap-2 rounded-full",
                "border border-primary/10 bg-primary/[0.04] px-3 py-1.5",
                "text-xs font-medium text-primary",
              )}
            >
              <FiCalendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{date}</span>
            </div>

            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                "border border-divider/80 bg-background text-text-muted",
                "transition-colors duration-300",
                "group-hover:border-primary/15 group-hover:text-primary",
              )}
              aria-hidden="true"
            >
              <FiArrowUpLeft
                className={cn(
                  "h-4 w-4 transform-gpu transition-transform duration-300 ease-out",
                  isRtl
                    ? "rotate-0 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    : "rotate-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                )}
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div
              className={cn(
                "transform-gpu transition-transform duration-300 ease-out will-change-transform",
                isRtl
                  ? "group-hover:-translate-x-1"
                  : "group-hover:translate-x-1",
              )}
            >
              <h3
                className={cn(
                  "line-clamp-3 text-lg font-bold leading-8 tracking-tight text-text",
                  "md:text-lg",
                )}
              >
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 line-clamp-2 text-text-muted">
                <HtmlConverter html={desc} />
              </p>
            </div>

            {/* <div className="pt-4 mt-5">
              <div
                className={cn(
                  "h-px w-full bg-gradient-to-r from-transparent via-divider to-transparent",
                  isRtl && "bg-gradient-to-l",
                )}
              />
            </div> */}

            {/* <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-text-muted">
                اقرأ المقال
              </span>

              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.18em] text-primary/70",
                )}
              >
                NEWS
              </span>
            </div> */}
          </div>
        </div>
      </article>
    </Link>
  );
}
