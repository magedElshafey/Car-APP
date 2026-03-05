// // src/seo/PageSeo.tsx
// import React, { useMemo } from "react";
// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";
// import { seoConfig } from "./seo.config";

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

// const PageSeo: React.FC<PageSeoProps> = ({
//   title,
//   description,
//   canonicalPath,
//   noIndex = false,
//   ogType = "website",
//   ogImage,
//   publishedTime,
//   structuredData,
//   langAlternates,
//   fav,
// }) => {
//   const { i18n } = useTranslation();
//   const lang = i18n.language || "en";
//   const dir = i18n.dir();

//   const {
//     siteName,
//     defaultTitle,
//     defaultDescription,
//     siteUrl,
//     defaultOgImage,
//     twitterHandle,
//     favicon,
//     appleTouchIcon,
//     manifestUrl,
//     themeColor,
//     msTileColor,
//   } = seoConfig;

//   const fullTitle = useMemo(() => {
//     const base = title || defaultTitle;
//     // لو عايز صفحة الهوم تبقى من غير "| siteName" ممكن تحط condition هنا
//     return `${base}`;
//   }, [title, defaultTitle]);

//   const metaDescription = description || defaultDescription;

//   const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
//   const canonicalUrl = canonicalPath
//     ? `${normalizedSiteUrl}${canonicalPath}`
//     : normalizedSiteUrl;

//   const finalOgImage = ogImage || defaultOgImage;

//   const robots = noIndex ? "noindex,nofollow" : "index,follow";

//   const jsonLd =
//     structuredData &&
//     (Array.isArray(structuredData) ? structuredData : [structuredData]);

//   return (
//     <Helmet prioritizeSeoTags>
//       {/* html lang/dir عشان الـ SEO و الـ accessibility */}
//       <html lang={lang} dir={dir} />

//       {/* مهم تحط charset بدري */}
//       <meta charSet="utf-8" />

//       <title>{fullTitle}</title>

//       {/* Basic meta */}
//       <meta name="description" content={metaDescription} />
//       <meta name="robots" content={robots} />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />

//       {/* Favicon / icons */}
//       <link rel="icon" type="image/svg+xml" href={fav ? fav : favicon} />

//       {appleTouchIcon && (
//         <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
//       )}
//       {manifestUrl && <link rel="manifest" href={manifestUrl} />}
//       {themeColor && <meta name="theme-color" content={themeColor} />}
//       {msTileColor && (
//         <meta name="msapplication-TileColor" content={msTileColor} />
//       )}

//       {/* Canonical */}
//       <link rel="canonical" href={canonicalUrl} />

//       {/* hreflang alternates (للـ multi-language SEO) */}
//       {langAlternates?.map((alt) => (
//         <link
//           key={alt.hrefLang}
//           rel="alternate"
//           hrefLang={alt.hrefLang}
//           href={alt.href}
//         />
//       ))}

//       {/* Open Graph */}
//       <meta property="og:site_name" content={siteName} />
//       <meta property="og:type" content={ogType} />
//       <meta property="og:title" content={fullTitle} />
//       <meta property="og:description" content={metaDescription} />
//       <meta property="og:url" content={canonicalUrl} />
//       {finalOgImage && <meta property="og:image" content={finalOgImage} />}
//       {publishedTime && ogType === "article" && (
//         <meta property="article:published_time" content={publishedTime} />
//       )}

//       {/* locale الأساسي + البديل لو محتاج */}
//       <meta property="og:locale" content={lang === "ar" ? "ar_EG" : "en_GB"} />
//       {langAlternates?.map((alt) => (
//         <meta
//           key={`og-alt-${alt.hrefLang}`}
//           property="og:locale:alternate"
//           content={alt.hrefLang.replace("-", "_")}
//         />
//       ))}

//       {/* Twitter Card */}
//       <meta name="twitter:card" content="summary_large_image" />
//       {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
//       <meta name="twitter:title" content={fullTitle} />
//       <meta name="twitter:description" content={metaDescription} />
//       {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}

//       {/* JSON-LD structured data */}
//       {jsonLd &&
//         jsonLd.map((obj, idx) => (
//           <script
//             key={idx}
//             type="application/ld+json"
//             // مهم جداً: stringify بس من غير format عشان الحجم
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify(obj),
//             }}
//           />
//         ))}
//     </Helmet>
//   );
// };

// export default React.memo(PageSeo);
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
  const defaultTitle = settings?.seo_title || seoConfig.defaultTitle;
  const defaultDescription =
    settings?.seo_description || seoConfig.defaultDescription;

  const siteUrl = settings?.app_url || seoConfig.siteUrl;
  const defaultOgImage = seoConfig.defaultOgImage;

  const favicon = settings?.app_favicon || seoConfig.favicon;

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
