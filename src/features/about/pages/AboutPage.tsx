import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetAboutPage from "@/features/about/api/useGetAboutPage";
import { cn } from "@/lib/utils";

/* ============================= */
/* ===== Skeleton ============== */
/* ============================= */

const AboutSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Hero */}
      <div className="space-y-4">
        <div className="w-1/3 h-10 rounded-md bg-surface-2" />
        <div className="w-2/3 h-4 rounded-md bg-surface-2" />
      </div>

      {/* Image */}
      <div className="h-[260px] w-full bg-surface-2 rounded-2xl" />

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

const AboutPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetAboutPage();

  /* ============================= */
  /* ===== Memo ================== */
  /* ============================= */

  const description = useMemo(() => {
    return data?.description ?? "";
  }, [data?.description]);

  /* ============================= */
  /* ===== Render ================ */
  /* ============================= */

  return (
    <main className="bg-bg">
      <div className="app-container mt-7 md:mt-8 lg:mt-9">
        {isLoading ? (
          <AboutSkeleton />
        ) : isError ? (
          <ErrorState message={t("something went wrong")} />
        ) : !data ? (
          <ErrorState message={t("no data found")} />
        ) : (
          <>
            {/* ============================= */}
            {/* ===== Hero Section ========== */}
            {/* ============================= */}
            <section className="mb-12">
              <div className="relative p-8 overflow-hidden border shadow-sm rounded-3xl border-border bg-surface md:p-10">
                {/* subtle gradient */}
                <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.04),transparent_60%)]" />

                <div className="relative grid items-center gap-8 md:grid-cols-2">
                  {/* Text */}
                  <div>
                    <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl text-text">
                      {data.name}
                    </h1>

                    <p className="text-base leading-relaxed text-text-muted">
                      {description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-surface-2 flex items-center justify-center">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt={data.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm text-text-muted">
                        {t("no image available")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ============================= */}
            {/* ===== About Content ========= */}
            {/* ============================= */}
            <section>
              <article
                className={cn(
                  "rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-sm",
                  "prose prose-neutral dark:prose-invert max-w-none",
                  "prose-headings:text-text prose-p:text-text-muted",
                  "prose-strong:text-text",
                  "prose-a:text-primary hover:prose-a:text-primary-hover",
                )}
              >
                <p>{description}</p>
              </article>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default AboutPage;
