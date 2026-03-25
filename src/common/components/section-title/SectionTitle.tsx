import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

type SectionTitleProps = {
  title: string;
  ctaLabel?: string;
  href?: string;
};
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  ctaLabel,
  href,
}) => {
  const {
    t,
    i18n: { dir },
  } = useTranslation();
  return (
    <div className="flex flex-col gap-3 mb-5 md:mb-6 lg:mb-7 md:flex-row md:items-center md:justify-between">
      <h2 className="font-bold tracking-tight text-md text-text md:text-2xl">
        {t(title)}
      </h2>
      {ctaLabel && href && (
        <Link
          to={href}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80",
          )}
        >
          <FiChevronLeft
            className={cn("h-4 w-4 shrink-0", dir() === "ltr" && "rotate-180")}
            aria-hidden="true"
          />
          <span>{t(ctaLabel)}</span>
        </Link>
      )}
    </div>
  );
};

export default React.memo(SectionTitle);
