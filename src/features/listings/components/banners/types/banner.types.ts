export type BannerVariant =
  | "full-hero"
  | "small-side"
  | "gradient"
  | "text-only";

export type BannerMediaType = "image" | "video";

export type BannerMediaItem = {
  id: string | number;
  type: BannerMediaType;
  src: string;
  alt?: string;
};

export type NormalizedBannerItem = {
  id: string | number;
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  overlayClassName?: string;
  variant?: BannerVariant;
  isActive?: boolean;
  media?: BannerMediaItem[];
};

export type HeroBannerApiResponse = {
  data: {
    id: number;
    title?: string | null;
    description?: string | null;
    media_type?: "image" | "video" | null;
    image?: string | null;
    video?: string | null;
    is_active?: boolean;
    created_at?: string;
  } | null;
};

export type SliderBannerApiResponse = {
  data: Array<{
    id: number;
    title?: string | null;
    description?: string | null;
    image?: string | null;
    video?: string | null;
    media_type?: "image" | "video" | null;
    is_active?: boolean;
  }> | null;
};
