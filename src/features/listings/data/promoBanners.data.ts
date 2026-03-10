import type { BannerVariant } from "@/features/listings/components/banners/banner-card/BannerCard";
export type PromoBannerItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  ctaLabel?: string;
  href?: string;
  imageAlt?: string;
  overlayClassName?: string;
  variant?: BannerVariant;
};

export const promoBanners: readonly PromoBannerItem[] = [
  {
    id: "sell-your-car",
    title: "هتبيع، هتشتري، هتلاقي",
    description: "انضم على الملايين الذين باعوا بثقة واشتروا بمشترين موثوقين",
    image: "/banners/sell-car-banner.webp",
    imageAlt: "بانر بيع سيارة",
    ctaLabel: "بيع سيارتي",
    href: "/sell-my-car",
    variant: "full-hero",
  },
  {
    id: "small-side-offer",
    title: "خصومات حصرية لفترة محدودة",
    description: "اكتشف أفضل العروض على السيارات الجديدة والمستعملة",
    image: "/banners/small-side-offer.webp",
    imageAlt: "بانر عرض جانبي صغير",
    ctaLabel: "شوف العرض",
    href: "/offers",
    variant: "small-side",
  },
  {
    id: "gradient-banner",
    title: "أفضل تجربة شراء سيارات في مكان واحد",
    description: "قارن، اختار، وتواصل مع المعارض بكل سهولة وثقة",
    image: "/banners/gradient-car.webp",
    imageAlt: "بانر جراديانت",
    ctaLabel: "ابدأ الآن",
    href: "/browse",
    variant: "gradient",
  },
  {
    id: "text-only-banner",
    title: "ابحث عن سيارتك القادمة بثقة",
    description:
      "منصة واحدة تجمع الموديلات، الأسعار، المعارض، والعروض في تجربة منظمة وسريعة.",
    ctaLabel: "ابدأ التصفح",
    href: "/cars",
    variant: "text-only",
  },
];
