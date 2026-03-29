import NewsCard from "@/features/listings/components/news/news-card/NewsCard";
import { Blog } from "@/features/blogs/types/blog.types";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";
import SectionTitle from "@/common/components/section-title/SectionTitle";

type LatestCarNewsSectionProps = {
  data: Blog[];
  title?: string;
};

export default function LatestCarNewsSection({
  data,
  title = "Latest car news",
}: LatestCarNewsSectionProps) {
  if (!data.length) return null;
  return (
    <section className="w-full" aria-label="Latest car news">
      <SectionTitle title={title} />

      <GridPagesSlider
        items={data}
        itemsPerPage={4}
        gridClassName="grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        slideClassName="pb-1"
        dotsClassName="mt-5"
        getItemId={(item) => item.id}
        getItemAriaLabel={(item) => item.name}
        renderItem={(item) => (
          <NewsCard
            className="h-full"
            title={item.name}
            image={item.image}
            href={`/blogs/${item.id}`}
            date={item.published_at}
            imageAlt={item.name}
            desc={item?.description}
          />
        )}
      />
    </section>
  );
}
