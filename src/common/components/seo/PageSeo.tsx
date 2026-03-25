type OgType = "website" | "article";

type LangAlternate = {
  hrefLang: string; // "en", "ar", "en-GB", "x-default" ...
  href: string; // full URL
};

export interface PageSeoProps {
  /** عنوان الصفحة (من غير اسم الموقع – هنضيفه لوحدنا) */
  title?: string;
  /** Meta description */
  description?: string;
  /** الـ path بس: مثلاً "/procedures/cataract-surgery" */
  canonicalPath?: string;
  /** لو true → noindex,nofollow */
  noIndex?: boolean;
  /** نوع الـ OpenGraph */
  ogType?: OgType;
  /** OG image مخصصة */
  ogImage?: string;
  /** تاريخ نشر لو Article (للـ blog / procedure details) */
  publishedTime?: string; // ISO
  /** Structured data (JSON-LD) */
  structuredData?: Record<string, any> | Record<string, any>[];
  /** hreflang alternates للصفحات متعددة اللغات */
  langAlternates?: LangAlternate[];
  fav?: string;
}

import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { seoConfig } from "./seo.config";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
const PageSeo: React.FC<PageSeoProps> = ({
  title,
  description,
  canonicalPath,
  noIndex = false,
  ogType = "website",
  ogImage,
  publishedTime,
  structuredData,

  fav,
}) => {
  const { i18n, t } = useTranslation();
  const { settings } = useWebsiteSettings();

  const lang = i18n.language || "en";
  const dir = i18n.dir();

  /* ========= defaults from API → then local config ========= */
  const siteName = seoConfig.siteName;
  const defaultTitle = settings?.site_name || seoConfig.defaultTitle;
  const defaultDescription =
    settings?.site_description || seoConfig.defaultDescription;

  const siteUrl = seoConfig.siteUrl;
  const defaultOgImage = seoConfig.defaultOgImage;

  const favicon = settings?.site_favicon || seoConfig.favicon;

  const fullTitle = useMemo(() => {
    return title || defaultTitle;
  }, [title, defaultTitle]);

  const metaDescription = description || defaultDescription;

  const canonicalUrl = canonicalPath
    ? `${siteUrl.replace(/\/$/, "")}${canonicalPath}`
    : siteUrl;

  const finalOgImage = ogImage || defaultOgImage;
  const robots = noIndex ? "noindex,nofollow" : "index,follow";

  const jsonLd =
    structuredData &&
    (Array.isArray(structuredData) ? structuredData : [structuredData]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} dir={dir} />
      <meta charSet="utf-8" />

      <title>{t(fullTitle)}</title>
      <meta name="description" content={t(metaDescription)} />
      <meta name="robots" content={robots} />

      <link rel="icon" href={fav || favicon} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {finalOgImage && <meta property="og:image" content={finalOgImage} />}

      {publishedTime && ogType === "article" && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}

      {/* Structured Data */}
      {jsonLd &&
        jsonLd.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(obj),
            }}
          />
        ))}
    </Helmet>
  );
};

export default React.memo(PageSeo);
