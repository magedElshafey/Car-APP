import type { Articles } from "@/features/blogs/types/blog.types";
import { seoConfig } from "@/common/components/seo/seo.config";

export function buildBlogStructuredData(
    post: Articles,
    canonicalUrl: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },

        headline: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,

        image:
            post.images?.length > 0
                ? post.images
                : seoConfig.defaultOgImage
                    ? [seoConfig.defaultOgImage]
                    : undefined,

        datePublished: post.published_at || post.created_at,
        dateModified: post.updated_at || post.published_at,

        articleSection: post.category?.name,

        timeRequired: post.reading_time
            ? `PT${post.reading_time}M`
            : undefined,

        author: post.author?.name
            ? {
                "@type": "Person",
                name: post.author.name,
                affiliation: post.author.affiliation,
                image: post.author.image,
            }
            : post.author_name
                ? {
                    "@type": "Person",
                    name: post.author_name,
                }
                : undefined,

        publisher: {
            "@type": "Organization",
            name: seoConfig.siteName,
            url: seoConfig.siteUrl,
        },
    };
}
