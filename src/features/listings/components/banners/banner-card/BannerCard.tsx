import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type BannerVariant =
  | "full-hero"
  | "small-side"
  | "gradient"
  | "text-only";

type BannerCardProps = {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  ctaLabel?: string;
  imageAlt?: string;
  overlayClassName?: string;
  className?: string;
  variant?: BannerVariant;
};

function BannerInner({
  title,
  description,
  image,
  ctaLabel,
  imageAlt = "",
  overlayClassName,
  className,
  variant = "full-hero",
}: Omit<BannerCardProps, "href">) {
  if (variant === "text-only") {
    return (
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl border border-divider bg-surface p-6 md:p-8",
          "min-h-[180px] md:min-h-[220px]",
          className,
        )}
      >
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
                  {ctaLabel}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  if (variant === "gradient") {
    return (
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl min-h-[180px] md:min-h-[220px]",
          "bg-gradient-to-l from-primary via-primary-hover to-accent text-white",
          className,
        )}
      >
        <div className="relative z-[1] flex min-h-[180px] md:min-h-[220px] items-center justify-between gap-6 p-6 md:p-8">
          <div className="max-w-[520px] text-right">
            <h3 className="text-2xl font-extrabold leading-tight md:text-4xl">
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
                  {ctaLabel}
                </span>
              </div>
            ) : null}
          </div>

          {image ? (
            <div className="hidden shrink-0 md:block">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="max-h-[170px] w-auto object-contain"
              />
            </div>
          ) : null}
        </div>
      </article>
    );
  }

  if (variant === "small-side") {
    return (
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl min-h-[150px] md:min-h-[180px]",
          "bg-surface",
          className,
        )}
      >
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 object-cover w-full h-full"
          />
        ) : null}

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-black/10",
            overlayClassName,
          )}
        />

        <div className="relative z-[1] flex min-h-[150px] md:min-h-[180px] items-end justify-end p-4 md:p-5">
          <div className="max-w-[320px] text-right text-white">
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
                  {ctaLabel}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl min-h-[180px] md:min-h-[220px]",
        "bg-surface",
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 object-cover w-full h-full"
        />
      ) : null}

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-l from-black/70 via-black/35 to-transparent",
          overlayClassName,
        )}
      />

      <div className="relative z-[1] flex min-h-[180px] md:min-h-[220px] items-center justify-end p-5 md:p-8">
        <div className="max-w-[520px] text-right text-white">
          <h3 className="text-2xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-2 text-sm leading-6 text-white/90 md:text-lg">
              {description}
            </p>
          ) : null}

          {ctaLabel ? (
            <div className="mt-5">
              <span className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition min-h-11 rounded-xl bg-accent text-text hover:bg-accent-hover">
                {ctaLabel}
              </span>
            </div>
          ) : null}
        </div>
      </div>
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
      <BannerInner {...rest} />
    </Link>
  );
}
