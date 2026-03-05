// footer.social.ts
import {
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaInstagram,
    FaFacebookF,
} from "react-icons/fa6";

export type SocialKey =
    | "social_facebook"
    | "social_twitter"
    | "social_linkedin"
    | "social_youtube"
    | "social_instagram";

export const SOCIAL_META: Record<
    SocialKey,
    { label: string; Icon: React.FC<{ className?: string }> }
> = {
    social_facebook: {
        label: "Facebook",
        Icon: FaFacebookF,
    },
    social_twitter: {
        label: "X (Twitter)",
        Icon: FaXTwitter,
    },
    social_linkedin: {
        label: "LinkedIn",
        Icon: FaLinkedinIn,
    },
    social_youtube: {
        label: "YouTube",
        Icon: FaYoutube,
    },
    social_instagram: {
        label: "Instagram",
        Icon: FaInstagram,
    },
};
