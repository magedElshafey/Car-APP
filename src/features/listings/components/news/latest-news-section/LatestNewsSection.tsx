import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { CarouselSlider } from "@/common/components/sliders/CarouselSlider";
import NewsCard from "@/features/listings/components/news/news-card/NewsCard";
import {
  carNews,
  type CarNewsItem,
} from "@/features/listings/data/carNews.data";
import { cn } from "@/lib/utils";

type LatestCarNewsSectionProps = {
  items?: readonly CarNewsItem[];
  className?: string;
  title?: React.ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

export default function LatestCarNewsSection({
  items = carNews,
  className,
  title = "أحدث أخبار السيارات",
  actionHref = "/news",
  actionLabel = "عرض جميع الأخبار",
}: LatestCarNewsSectionProps) {
  if (!items.length) return null;

  return (
    <section className={cn("w-full", className)} aria-label="Latest car news">
      <div className="flex flex-col gap-3 mb-5 md:mb-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-text md:text-4xl">{title}</h2>

        <Link
          to={actionHref}
          className="inline-flex items-center gap-2 text-sm font-medium transition text-primary hover:underline"
        >
          <FiChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>{actionLabel}</span>
        </Link>
      </div>

      <CarouselSlider
        items={items}
        className="w-full"
        trackClassName="pb-1"
        slideClassName=""
        arrowsClassName="!top-1/2 !-translate-y-1/2"
        getItemId={(item) => item.id}
        getItemAriaLabel={(item) => item.title}
        renderItem={(item) => (
          <NewsCard
            title={item.title}
            image={item.image}
            href={item.href}
            date={item.date}
            imageAlt={item.imageAlt}
            category={item.category}
          />
        )}
      />
    </section>
  );
}
