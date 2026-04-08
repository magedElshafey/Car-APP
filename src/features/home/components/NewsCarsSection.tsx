import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import BrowseCarCard from "@/features/browse/components/car-card";
import { CarDetails } from "@/features/browse/types/car.types";
import { cn } from "@/lib/utils";
import React from "react";

import SectionTitle from "@/common/components/section-title/SectionTitle";

type UsedCarSectionProps = {
  data: CarDetails[];
  title?: string;

  actionHref?: string;
  actionLabel?: string;
};
const NewsCarsSection: React.FC<UsedCarSectionProps> = ({
  data,
  title = "new cars",
  actionHref = "/car-browse?filter-condition=new",
  actionLabel = "browse all new cars",
}) => {
  if (!data?.length) return;
  if (!data?.length) return;
  return (
    <section className={cn("w-full")} aria-label="Browse by location">
      <SectionTitle title={title} ctaLabel={actionLabel} href={actionHref} />

      <GridPagesSlider
        items={data}
        itemsPerPage={{
          xs: 1,
          md: 3,
          lg: 4,
        }}
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

export default NewsCarsSection;
