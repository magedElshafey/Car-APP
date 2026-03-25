import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCarCard from "@/features/browse/components/car-card";
import { CarListing } from "@/features/browse/types/car.types";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

type UsedCarSectionProps = {
  data: CarListing[];
  title?: string;
  actionHref?: string;
  actionLabel?: string;
};
const UsedCarSection: React.FC<UsedCarSectionProps> = ({
  data,
  title = "used cars",
  actionHref = "/car-browse?filter-condition=used",
  actionLabel = "browse all used cars",
}) => {
  const {
    t,
    i18n: { dir },
  } = useTranslation();
  if (!data?.length) return;
  return (
    <section className={cn("w-full")} aria-label="Browse by location">
      <div className="flex flex-wrap justify-between gap-3 mb-4 md:mb-5">
        <h2 className="text-2xl font-bold text-text md:text-4xl">{t(title)}</h2>
        <Link
          to={actionHref}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80",
          )}
        >
          <FiChevronLeft
            className={cn("h-4 w-4 shrink-0", dir() === "ltr" && "rotate-180")}
            aria-hidden="true"
          />
          <span>{t(actionLabel)}</span>
        </Link>
      </div>

      <GridPagesSlider
        items={data}
        gridClassName="grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        slideClassName="pb-1"
        dotsClassName="mt-5"
        getItemId={(item) => item.id}
        getItemAriaLabel={(item) => item.car.model}
        renderItem={(item) => <BrowseCarCard car={item} />}
      />
    </section>
  );
};

export default UsedCarSection;
