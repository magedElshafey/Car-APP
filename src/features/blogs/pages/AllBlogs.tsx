import React, { useMemo, useState } from "react";
import PageSeo from "@/common/components/seo/PageSeo";
import useGetSimpleBlogs from "../api/useGetSimpleBlogs";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetBlogCategories from "../api/useGetBlogCategories";
import BlogCardFeed from "@/features/home/components/blogs/BlogCard";
import { useTranslation } from "react-i18next";
import MainSelect from "@/common/components/inputs/MainSelect";
const ALL_CATEGORY = "all";
const GRID_MIN_HEIGHT = "min-h-[200px]";

type SelectCategory = {
  id: number;
  name: string;
  slug: string;
};

const AllBlogsPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const blogsQuery = useGetSimpleBlogs();
  const categoriesQuery = useGetBlogCategories();

  const blogs = blogsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>(ALL_CATEGORY);

  /* =========================
     Prepare categories for MainSelect
  ========================= */
  const selectCategories: SelectCategory[] = useMemo(() => {
    const mapped = categories.map((c, index) => ({
      id: index + 1,
      name: `${c.name} (${c.blogs_count})`,
      slug: c.slug,
    }));

    return [
      {
        id: 0,
        name: t("All categories"),
        slug: ALL_CATEGORY,
      },
      ...mapped,
    ];
  }, [categories, t]);

  const selectedCategoryId = useMemo(() => {
    const found = selectCategories.find((c) => c.slug === cat);
    return found ? found.id : 0;
  }, [cat, selectCategories]);

  /* =========================
     Filtering (memoized)
  ========================= */
  const filteredBlogs = useMemo(() => {
    const term = q.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !term ||
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term);

      const matchesCategory =
        cat === ALL_CATEGORY || blog.category?.slug === cat;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, q, cat]);

  const hasActiveFilters = q.trim() !== "" || cat !== ALL_CATEGORY;

  return (
    <>
      <PageSeo
        title="Blogs | Wise Followup"
        description="Expert-written articles about eye health, treatments, and patient education."
        canonicalPath="/blogs"
        ogType="website"
      />

      <main className="section-shell">
        <FetchHandler queryResult={blogsQuery} skeletonType="card">
          <div className="containerr space-y-6">
            {/* ================= Header ================= */}
            <header className="space-y-1">
              <h1 className="text-2xl font-bold text-text-main">
                {t("All blog posts")}
              </h1>
              <p className="text-sm text-text-muted">
                {t("Practical guidance for patients and clinicians.")}
              </p>
            </header>

            {/* ================= Filters ================= */}
            <div className="rounded-card border border-border-subtle bg-bg-surface p-4 shadow-soft">
              <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] items-center">
                {/* Search */}
                <div className="relative">
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t("Search blog posts…")}
                    className="
                      w-full rounded-pill border border-border-subtle bg-bg-page
                      px-4 py-2.5 text-sm text-text-main
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                  />
                  <span
                    className={`absolute ${
                      i18n.language === "en" ? "right-4" : "left-4"
                    } top-1/2 -translate-y-1/2 text-text-muted`}
                    aria-hidden
                  >
                    🔎
                  </span>
                </div>

                {/* Category – MainSelect */}
                <MainSelect<SelectCategory>
                  options={selectCategories}
                  value={selectedCategoryId}
                  placeholder={t("All categories")}
                  ariaLabel={t("Filter by category")}
                  onSelect={(option) => {
                    setCat(option.slug);
                  }}
                  className="min-w-[220px]"
                />

                {/* Reset – always visible */}
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setCat(ALL_CATEGORY);
                  }}
                  disabled={!hasActiveFilters}
                  className="
                    rounded-pill border border-border-subtle
                    px-4 py-2.5 text-sm font-medium transition
                    bg-bg-page text-text-muted
                    hover:bg-bg-surface hover:text-text-main
                    disabled:opacity-40 disabled:cursor-not-allowed
                  "
                >
                  {t("Reset")}
                </button>
              </div>
            </div>

            {/* ================= Results ================= */}
            <div className="relative">
              <section
                aria-label="Blog results"
                className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${GRID_MIN_HEIGHT}`}
              >
                {!blogsQuery.isLoading &&
                  filteredBlogs.map((post) => (
                    <BlogCardFeed key={post.id} post={post} />
                  ))}
              </section>

              {!blogsQuery.isLoading && filteredBlogs.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-card border border-border-subtle bg-bg-surface p-6 text-center">
                    <p className="text-sm font-semibold text-text-main">
                      {t("No posts found")}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {t("Try a different keyword or category.")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FetchHandler>
      </main>
    </>
  );
};

export default AllBlogsPage;
