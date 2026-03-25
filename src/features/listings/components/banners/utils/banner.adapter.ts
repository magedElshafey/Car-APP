import type {
  BannerMediaItem,
  BannerVariant,
  HeroBannerApiResponse,
  NormalizedBannerItem,
  SliderBannerApiResponse,
} from "../types/banner.types";

// const FALLBACK_TITLE = "Explore now";

export function stripHtml(html?: string | null): string {
  if (!html) return "";

  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent?.trim() ?? "";
  }

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createMedia(params: {
  id: string | number;
  image?: string | null;
  video?: string | null;
  mediaType?: "image" | "video" | null;
  alt?: string;
}): BannerMediaItem[] {
  const { id, image, video, mediaType, alt } = params;

  if (mediaType === "video" && video) {
    return [
      {
        id: `${id}-video`,
        type: "video",
        src: video,
        alt,
      },
    ];
  }

  if (image) {
    return [
      {
        id: `${id}-image`,
        type: "image",
        src: image,
        alt,
      },
    ];
  }

  if (video) {
    return [
      {
        id: `${id}-video`,
        type: "video",
        src: video,
        alt,
      },
    ];
  }

  return [];
}

type MapOptions = {
  variant?: BannerVariant;
  href?: string;
  ctaLabel?: string;
  titleFallback?: string;
  imageAltPrefix?: string;
  overlayClassName?: string;
};

export function mapHeroBannerResponse(
  response: HeroBannerApiResponse,
  options: MapOptions = {},
): NormalizedBannerItem[] {
  const item = response?.data;
  if (!item || !item.is_active) return [];

  const title = item.title?.trim() || options.titleFallback;
  const description = stripHtml(item.description);

  return [
    {
      id: item.id,
      title,
      description,
      href: options.href,
      ctaLabel: options.ctaLabel,
      overlayClassName: options.overlayClassName,
      variant: options.variant ?? "full-hero",
      isActive: item.is_active,
      media: createMedia({
        id: item.id,
        image: item.image,
        video: item.video,
        mediaType: item.media_type,
        alt: options.imageAltPrefix ?? title,
      }),
    },
  ];
}

export function mapSliderBannerResponse(
  response: SliderBannerApiResponse,
  options: MapOptions = {},
): NormalizedBannerItem[] {
  const items = response?.data?.filter((item) => item?.is_active) ?? [];
  if (!items.length) return [];

  const media = items.flatMap((item) =>
    createMedia({
      id: item.id,
      image: item.image,
      video: item.video,
      mediaType: item.media_type,
      alt: `${options.imageAltPrefix ?? options.titleFallback} ${item.id}`,
    }),
  );

  const firstWithTitle = items.find((item) => item.title?.trim());
  const firstWithDescription = items.find((item) => item.description?.trim());

  return [
    {
      id: `slider-${items.map((item) => item.id).join("-")}`,
      title: firstWithTitle?.title?.trim() || options.titleFallback,

      description: stripHtml(firstWithDescription?.description),
      href: options.href,
      ctaLabel: options.ctaLabel,
      overlayClassName: options.overlayClassName,
      variant: options.variant ?? "full-hero",
      isActive: true,
      media,
    },
  ];
}

export function mapUnknownBannerResponse(
  response: HeroBannerApiResponse | SliderBannerApiResponse,
  options: MapOptions = {},
): NormalizedBannerItem[] {
  const data = response?.data;

  if (Array.isArray(data)) {
    return mapSliderBannerResponse(
      response as SliderBannerApiResponse,
      options,
    );
  }

  if (data && typeof data === "object") {
    return mapHeroBannerResponse(response as HeroBannerApiResponse, options);
  }

  return [];
}
