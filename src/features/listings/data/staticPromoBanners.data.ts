import type { PromoBannerItem } from "@/features/listings/data/promoBanners.data";

export const singleStaticBanner: readonly PromoBannerItem[] = [
  {
    id: "finance-offer",
    title: "عروض تمويل مميزة على أحدث السيارات",
    description:
      "حلول مرنة وخيارات متعددة تساعدك تختار السيارة المناسبة بسهولة.",
    image: "/banners/finance-offer.webp",
    imageAlt: "بانر تمويل سيارات",
    ctaLabel: "اعرف أكثر",
    href: "/finance",
    variant: "full-hero",
  },
];

export const dualStaticBanners: readonly PromoBannerItem[] = [
  {
    id: "insurance-banner",
    title: "أفضل عروض التأمين على السيارات",
    description: "قارن بين العروض واختر الأنسب لاحتياجاتك.",
    image: "/banners/insurance-banner.webp",
    imageAlt: "بانر تأمين سيارات",
    ctaLabel: "قارن الآن",
    href: "/insurance",
    variant: "small-side",
  },
  {
    id: "service-banner",
    title: "احجز صيانة سيارتك بسهولة",
    description: "خدمات موثوقة ومواعيد أسرع من خلال شركائنا.",
    image: "/banners/service-banner.webp",
    imageAlt: "بانر صيانة سيارات",
    ctaLabel: "احجز الآن",
    href: "/service",
    variant: "gradient",
  },
];
