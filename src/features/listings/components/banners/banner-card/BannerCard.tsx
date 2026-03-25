import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type {
  BannerMediaItem,
  BannerVariant,
} from "@/features/listings/components/banners/types/banner.types";

type BannerCardProps = {
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  overlayClassName?: string;
  className?: string;
  variant?: BannerVariant;
  media?: BannerMediaItem[];
  autoSlideIntervalMs?: number;
  isSingle: boolean;
};

function useAutoSlide(total: number, enabled: boolean, intervalMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled || total <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [enabled, total, intervalMs]);

  useEffect(() => {
    if (activeIndex > total - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  return { activeIndex, setActiveIndex };
}

function BannerMedia({
  media,
  overlayClassName,
  variant,
}: {
  media?: BannerMediaItem[];
  overlayClassName?: string;
  variant: BannerVariant;
}) {
  const prefersReducedMotion = useReducedMotion();
  const safeMedia = useMemo(() => media ?? [], [media]);
  const hasMultipleSlides = safeMedia.length > 1;

  const { activeIndex, setActiveIndex } = useAutoSlide(
    safeMedia.length,
    !prefersReducedMotion,
    4000,
  );

  const activeMedia = safeMedia[activeIndex];

  if (!activeMedia) return null;

  const overlayByVariant =
    variant === "small-side"
      ? "absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-black/10"
      : "absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent";

  return (
    <>
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={String(activeMedia.id)}
            initial={
              prefersReducedMotion ? false : { opacity: 0.92, scale: 1.02 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0.96, scale: 1.01 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {activeMedia.type === "video" ? (
              <video
                className="absolute inset-0 object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              >
                <source src={activeMedia.src} />
              </video>
            ) : (
              <img
                src={activeMedia.src}
                alt={activeMedia.alt ?? ""}
                loading={hasMultipleSlides ? "lazy" : "eager"}
                decoding="async"
                fetchPriority={hasMultipleSlides ? "auto" : "high"}
                className={cn(
                  "absolute inset-0 h-full w-full",
                  "object-cover object-center",
                  "transition-transform duration-700 will-change-transform",
                  "group-hover:scale-[1.04]",
                )}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className={cn(overlayByVariant, overlayClassName)} />
      </div>

      {hasMultipleSlides ? (
        <div
          className="absolute bottom-3 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2"
          role="tablist"
          aria-label="Banner slides"
        >
          {safeMedia.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={isActive}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  isActive
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/55 hover:bg-white/80",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}

function BannerContent({
  title,
  description,
  ctaLabel,
  variant,
}: Pick<BannerCardProps, "title" | "description" | "ctaLabel" | "variant">) {
  const { t } = useTranslation();
  if (variant === "text-only") {
    return (
      <div className="flex flex-col justify-center h-full">
        <div className="max-w-[640px]">
          <h3 className="text-2xl font-extrabold leading-tight text-text md:text-4xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-3 text-sm leading-6 text-text-muted md:text-lg">
              {description}
            </p>
          ) : null}

          {ctaLabel ? (
            <div className="mt-5">
              <span className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition min-h-11 rounded-xl bg-accent text-text hover:bg-accent-hover">
                {t(ctaLabel)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="relative z-[1] flex min-h-[220px] items-center justify-between gap-6 p-6 md:min-h-[260px] md:p-8">
        <div className="max-w-[560px] text-right">
          <h3 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-3 text-sm leading-6 text-white/90 md:text-lg">
              {description}
            </p>
          ) : null}

          {ctaLabel ? (
            <div className="mt-5">
              <span className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition bg-white min-h-11 rounded-xl text-primary hover:bg-white/90">
                {t(ctaLabel)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (variant === "small-side") {
    return (
      <div className="relative z-[1] flex min-h-[180px] items-end justify-end p-4 md:min-h-[220px] md:p-5">
        <div className="max-w-[340px] text-right text-white">
          <h3 className="text-lg font-extrabold leading-tight md:text-2xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-2 text-xs leading-5 line-clamp-2 text-white/90 md:text-sm">
              {description}
            </p>
          ) : null}

          {ctaLabel ? (
            <div className="mt-4">
              <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition min-h-10 rounded-xl bg-accent text-text hover:bg-accent-hover">
                {t(ctaLabel)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-[1] flex min-h-[320px] items-center justify-end p-6 md:min-h-[420px] md:p-10 lg:min-h-[520px] lg:p-12">
      <div className="max-w-[620px] text-right text-white">
        <h3 className="text-2xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h3>

        {description ? (
          <p className="mt-3 text-sm leading-6 text-white/90 md:text-lg lg:text-xl">
            {description}
          </p>
        ) : null}

        {ctaLabel ? (
          <div className="mt-6">
            <span className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition min-h-11 rounded-xl bg-accent text-text hover:bg-accent-hover md:min-h-12 md:px-6 md:text-base">
              {t(ctaLabel)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BannerInner({
  title,
  description,
  ctaLabel,
  overlayClassName,
  className,
  variant = "full-hero",
  media,
}: Omit<BannerCardProps, "href" | "autoSlideIntervalMs">) {
  const isTextOnly = variant === "text-only" || !media?.length;

  if (variant === "text-only") {
    return (
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl border border-divider bg-surface p-6 md:p-8",
          "min-h-[220px] md:min-h-[260px]",
          "shadow-sm transition-shadow duration-300 hover:shadow-md",
          className,
        )}
      >
        <BannerContent
          title={title}
          description={description}
          ctaLabel={ctaLabel}
          variant="text-only"
        />
      </article>
    );
  }

  if (variant === "gradient") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl",
          "min-h-[220px] md:min-h-[260px]",
          "bg-gradient-to-l from-primary via-primary-hover to-accent text-white",
          "shadow-sm transition-shadow duration-300 hover:shadow-md",
          className,
        )}
      >
        {!isTextOnly ? (
          <BannerMedia
            media={media}
            overlayClassName={overlayClassName}
            variant={variant}
          />
        ) : null}

        <BannerContent
          title={title}
          description={description}
          ctaLabel={ctaLabel}
          variant="gradient"
        />
      </article>
    );
  }

  if (variant === "small-side") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-surface",
          "min-h-[180px] md:min-h-[220px]",
          "shadow-sm transition-shadow duration-300 hover:shadow-md",
          className,
        )}
      >
        {!isTextOnly ? (
          <BannerMedia
            media={media}
            overlayClassName={overlayClassName}
            variant={variant}
          />
        ) : null}

        <BannerContent
          title={title}
          description={description}
          ctaLabel={ctaLabel}
          variant="small-side"
        />
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-surface",
        "min-h-[320px] md:min-h-[420px] lg:min-h-[520px]",
        "shadow-sm transition-shadow duration-300 hover:shadow-md",
        className,
      )}
    >
      {!isTextOnly ? (
        <BannerMedia
          media={media}
          overlayClassName={overlayClassName}
          variant="full-hero"
        />
      ) : null}

      <BannerContent
        title={title}
        description={description}
        ctaLabel={ctaLabel}
        variant="full-hero"
      />
    </article>
  );
}

export default function BannerCard(props: BannerCardProps) {
  const { href, ...rest } = props;

  if (!href) {
    return <BannerInner {...rest} />;
  }

  return (
    <Link
      to={href}
      aria-label={props.title}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <BannerInner {...rest} />
      </motion.div>
    </Link>
  );
}
