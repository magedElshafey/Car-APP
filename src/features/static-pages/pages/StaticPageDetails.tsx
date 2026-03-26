import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetStaticPageDetails from "@/features/static-pages/api/useGetStaticPageDetails";
import { cn } from "@/lib/utils";

/* ============================= */
/* ===== Skeleton ============== */
/* ============================= */

const StaticPageSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="w-1/3 h-8 rounded-md bg-surface-2" />

      {/* Breadcrumb */}
      <div className="w-1/4 h-4 rounded-md bg-surface-2" />

      {/* Content */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-4 rounded-md bg-surface-2" />
        ))}
      </div>
    </div>
  );
};

/* ============================= */
/* ===== Error State =========== */
/* ============================= */

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div
      role="alert"
      className="p-6 border rounded-xl border-danger/30 bg-danger/5 text-danger"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};

/* ============================= */
/* ===== Main Component ======== */
/* ============================= */

const StaticPageDetails = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetStaticPageDetails(slug ?? "");

  /* ============================= */
  /* ===== Memoized Content ====== */
  /* ============================= */

  const content = useMemo(() => {
    return data?.description ?? "";
  }, [data?.description]);

  /* ============================= */
  /* ===== Render ================ */
  /* ============================= */

  return (
    <main className="bg-bg">
      <div className="app-container mt-7 md:mt-8 lg:mt-9">
        {/* ============================= */}
        {/* ===== Breadcrumb ============ */}
        {/* ============================= */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-muted">
          <Link
            to="/"
            className="transition-colors rounded-sm hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("Home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{data?.name || t("page")}</span>
        </nav>

        {/* ============================= */}
        {/* ===== Title ================= */}
        {/* ============================= */}
        {isLoading ? (
          <StaticPageSkeleton />
        ) : isError ? (
          <ErrorState message={t("something went wrong")} />
        ) : !data ? (
          <ErrorState message={t("no data found")} />
        ) : (
          <>
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl text-text">
                {data.name}
              </h1>
            </header>

            {/* ============================= */}
            {/* ===== Content Card ========== */}
            {/* ============================= */}
            <article
              className={cn(
                "rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-sm",
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-headings:text-text prose-p:text-text-muted",
                "prose-a:text-primary hover:prose-a:text-primary-hover",
                "prose-img:rounded-xl",
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </>
        )}
      </div>
    </main>
  );
};

export default StaticPageDetails;
