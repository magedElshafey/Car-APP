import React, { useMemo } from "react";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import PageSeo from "@/common/components/seo/PageSeo";
import { seoConfig } from "@/common/components/seo/seo.config";
import { buildBlogStructuredData } from "../utils/buildBlogStructuredData";
import BlogHeader from "@/features/blogs/components/BlogHeader";
import BlogAside from "@/features/blogs/components/BlogAside";
import MobileToc from "@/features/blogs/components/MobileToc";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import type { TocItem } from "@/features/blogs/types/TocItem";
import type { UseQueryResult } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSectionsWithIds } from "@/features/blogs/hooks/useSectionsWithIds";
import { useTocOffsetCssVar } from "@/features/blogs/hooks/useTocOffsetCssVar";
import { useActiveHeadingObserver } from "@/features/blogs/hooks/useActiveHeadingObserver";
import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";
import { LeafletType } from "@/features/leaflets/types/leaflets.types";
import BlogCardFeed from "@/features/home/components/blogs/BlogCard";
import { Articles } from "../types/blog.types";
import { formatDate } from "@/utils/formatDate";
import MetaItem from "@/features/blogs/components/MetaItem";
export type ArticleSeoType = "blog" | "none";

type Props = {
  useQueryHook: () => UseQueryResult<any>;
  skeletonType?: string;
  tocFromData?: boolean;

  /** يحدد هل الصفحة Blog ولا لأ */
  seoType?: ArticleSeoType;
};

const ArticleDocPage: React.FC<Props> = ({
  useQueryHook,
  tocFromData = true,
  seoType = "none",
}) => {
  const { t } = useTranslation();
  const query = useQueryHook();
  const post = seoType === "blog" ? query.data : query?.data?.data;

  const sections = useMemo(() => post?.content ?? [], [post]);
  const sectionsWithIds = useSectionsWithIds(sections);

  const tocItems: TocItem[] = useMemo(() => {
    if (!tocFromData) return [];
    return sectionsWithIds
      .filter((s) => String(s.heading || "").trim().length > 0)
      .map((s) => ({ id: s._id, text: s.heading, level: 2 }));
  }, [sectionsWithIds, tocFromData]);

  const activeId = useActiveHeadingObserver(tocItems);
  useTocOffsetCssVar(post);

  return (
    <FetchHandler queryResult={query} skeletonType={"article-page"}>
      {post?.is_active ? (
        <>
          {/* ================= SEO (Blog only) ================= */}
          {seoType === "blog" && (
            <PageSeo
              title={post.meta_title || post.title}
              description={post.meta_description || post.excerpt}
              canonicalPath={`/blogs/${post.slug}`}
              ogType="article"
              ogImage={post.images?.[0]}
              publishedTime={post.published_at}
              structuredData={buildBlogStructuredData(
                post,
                `${seoConfig.siteUrl}/blogs/${post.slug}`,
              )}
            />
          )}

          {/* ================= HEADER ================= */}
          <BlogHeader post={post} />

          {/* ================= CONTENT ================= */}
          <main className="mt-8 containerr lg:mt-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              {/* Article */}
              <article className="col-span-4 p-6 prose border max-w-none bg-bg-surface border-border-subtle rounded-card prose-headings:text-text-main prose-p:text-text-muted prose-strong:text-text-main prose-a:text-primary">
                {sectionsWithIds.map((sec) => (
                  <section
                    key={sec._id}
                    className="scroll-mt-[calc(var(--toc-offset)+16px)]"
                  >
                    <h2 id={sec._id}>{sec.heading}</h2>
                    <HtmlConverter html={sec.content} sanitize />
                  </section>
                ))}
              </article>

              {/* Aside */}
              <aside className="hidden lg:block sticky top-[120px] self-start">
                <BlogAside tocItems={tocItems} activeId={activeId} />
              </aside>
            </div>
            {seoType === "blog" && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2">
                  {post.author?.image ? (
                    <MetaItem>
                      <img
                        alt={post.author.name}
                        src={post.author.image}
                        className="object-contain w-12 h-12 rounded-full"
                      />
                    </MetaItem>
                  ) : null}

                  <div className="flex flex-col gap-[2px] italic">
                    {post.author?.name && (
                      <MetaItem>
                        <span className="text-sm font-semibold text-text-main">
                          {t("By")}: {post.author.name}
                        </span>
                      </MetaItem>
                    )}

                    <span className="text-xs text-text-muted">
                      {post.author?.affiliation}
                    </span>

                    {post.published_at && (
                      <MetaItem>
                        <time dateTime={formatDate(post.published_at)}>
                          {formatDate(post.published_at)}
                        </time>
                      </MetaItem>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-7">
                  {post?.related_blogs && post.related_blogs.length > 0 && (
                    <section
                      className="mt4 md:mt-5 lg:mt-6 xl:mt-7"
                      aria-labelledby="related-leaflets-heading"
                    >
                      <h3
                        id="related-leaflets-heading"
                        className="mb-3 text-sm font-semibold text-text-main"
                      >
                        {t("Related blogs")}
                      </h3>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {post.related_blogs
                          .slice(0, 3)
                          .map((item: Articles) => (
                            <BlogCardFeed post={item} />
                          ))}
                      </div>
                    </section>
                  )}
                  {/* Related related leaflets */}
                  {post?.related_leaflets &&
                    post.related_leaflets.length > 0 && (
                      <section aria-labelledby="related-leaflets-heading">
                        <h3
                          id="related-leaflets-heading"
                          className="mb-3 text-sm font-semibold text-text-main"
                        >
                          {t("Related leaflets")}
                        </h3>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {post.related_leaflets
                            .slice(0, 3)
                            .map((item: LeafletType) => (
                              <FeaturedLeafletCard leaflet={item} />
                            ))}
                        </div>
                      </section>
                    )}
                </div>
              </div>
            )}
          </main>

          <MobileToc tocItems={tocItems} activeId={activeId} />
        </>
      ) : null}
    </FetchHandler>
  );
};

export default React.memo(ArticleDocPage);
