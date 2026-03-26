import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetBlogDetails from "@/features/blogs/api/useGetBlogDetails";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogHero = memo(function BlogHero({ data }: { data: any }) {
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden shadow-lg rounded-2xl group">
        <img
          src={data?.image}
          alt={data?.name || "blog image"}
          loading="lazy"
          className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-6 md:p-8">
          <h1 className="mb-3 text-2xl font-bold leading-tight text-white md:text-4xl">
            {data?.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{data?.published_at}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const BlogContent = memo(function BlogContent({ html }: { html: string }) {
  const content = useMemo(() => html || "", [html]);

  return (
    <article
      className={cn(
        "lg:col-span-2",
        "prose prose-lg max-w-none",
        "prose-headings:text-text",
        "prose-p:text-text-muted",
        "prose-a:text-primary hover:prose-a:text-primary-hover",
      )}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
});

const BlogSidebar = memo(function BlogSidebar({
  createdAt,
  t,
}: {
  createdAt?: string;
  t: any;
}) {
  return (
    <aside className="space-y-6">
      {/* Author */}
      <div className="p-5 transition-shadow border shadow-sm bg-surface border-border rounded-2xl hover:shadow-md">
        <h3 className="mb-3 font-semibold">{t("About the Author")}</h3>
        <p className="text-sm text-text-muted">
          {t(
            "Written by our automotive experts to help you make better decisions when buying cars.",
          )}
        </p>
      </div>

      {/* CTA */}
      <div className="p-6 text-white bg-primary rounded-2xl shadow-primary-glow">
        <h3 className="mb-2 text-lg font-semibold">
          {t("Looking for a car?")}
        </h3>
        <p className="mb-4 text-sm opacity-90">
          {t("Browse thousands of cars now and find the best deal.")}
        </p>
        <Link
          to="/car-browse"
          className="px-4 py-2 text-sm font-medium transition bg-white rounded-lg text-primary hover:bg-gray-100"
        >
          {t("Browse Cars")}
        </Link>
      </div>

      {/* Meta */}
      <div className="p-5 text-sm border bg-surface-2 border-divider rounded-2xl text-text-muted">
        <p>
          <span className="font-medium text-text">{t("Created at:")}</span>{" "}
          {createdAt}
        </p>
      </div>
    </aside>
  );
});

// =========================
// Main Page
// =========================

export default function BlogDetailsPage() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const queryResult = useGetBlogDetails(slug ?? "");
  const { data } = queryResult;

  return (
    <FetchHandler queryResult={queryResult} skeletonType="blog">
      <div className="min-h-screen bg-bg text-text">
        <main className="max-w-5xl px-4 py-10 mx-auto">
          <BlogHero data={data} />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <BlogContent html={data?.description || ""} />

            <BlogSidebar createdAt={data?.created_at} t={t} />
          </div>
        </main>
      </div>
    </FetchHandler>
  );
}
