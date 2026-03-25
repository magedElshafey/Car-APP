import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { CarouselSlider } from "@/common/components/sliders/CarouselSlider";
import NewsCard from "@/features/listings/components/news/news-card/NewsCard";
import { cn } from "@/lib/utils";
import { Blog } from "@/features/blogs/types/blog.types";
import { useTranslation } from "react-i18next";

type LatestCarNewsSectionProps = {
  data: Blog[];
  title?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function LatestCarNewsSection({
  data,
  title = "أحدث أخبار السيارات",
  actionHref = "/blogs",
  actionLabel = "عرض جميع الأخبار",
}: LatestCarNewsSectionProps) {
  const {
    t,
    i18n: { dir },
  } = useTranslation();

  if (!data.length) return null;

  return (
    <section className="w-full" aria-label="Latest car news">
      <div className="flex flex-col gap-3 mb-5 md:mb-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-text md:text-4xl">
          {t(title)}
        </h2>

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

      <CarouselSlider
        items={data}
        className="w-full"
        trackClassName="pb-1"
        slideClassName="h-full"
        arrowsClassName="!top-1/2 !-translate-y-1/2"
        getItemId={(item) => item.id}
        getItemAriaLabel={(item) => item.name}
        renderItem={(item) => (
          <div className="h-full">
            <NewsCard
              className="h-full"
              title={item.name}
              image={item.image}
              href={`/blogs/${item.id}`}
              date={item.published_at}
              imageAlt={item.name}
            />
          </div>
        )}
      />
    </section>
  );
}
