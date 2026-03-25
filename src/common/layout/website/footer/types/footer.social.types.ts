import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import type { Setting } from "@/features/settings/types/settings.type";

export type SocialKey =
  | "social_facebook"
  | "social_instagram"
  | "social_twitter"
  | "social_linkedin";

export type SocialMetaItem = {
  label: string;
  Icon: IconType;
};

export const SOCIAL_META: Record<SocialKey, SocialMetaItem> = {
  social_facebook: {
    label: "Facebook",
    Icon: FaFacebookF,
  },
  social_instagram: {
    label: "Instagram",
    Icon: FaInstagram,
  },
  social_twitter: {
    label: "X",
    Icon: FaXTwitter,
  },
  social_linkedin: {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
};

export const SOCIAL_KEYS = Object.keys(SOCIAL_META) as SocialKey[];

export function isValidSocialHref(value?: string) {
  return Boolean(value && value.trim());
}

export function getSocialLinksFromSettings(settings?: Setting) {
  if (!settings) return [];

  return SOCIAL_KEYS.flatMap((key) => {
    const href = settings[key];

    if (!isValidSocialHref(href)) return [];

    return [
      {
        key,
        href: href!.trim(),
        ...SOCIAL_META[key],
      },
    ];
  });
}
