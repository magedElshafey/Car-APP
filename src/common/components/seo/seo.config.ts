import { baseUrl } from "@/services/api-routes/apiRoutes";
export const seoConfig = {
  siteName: "Garage369",
  defaultTitle: "Your Trusted Automotive Services Hub",
  defaultDescription:
    "Discover reliable car services, repairs, and maintenance tips. Search by service type, location, or vehicle model.",
  siteUrl: baseUrl,
  defaultOgImage: `${baseUrl}/static/og-default.jpg`,
  twitterHandle: "@WiseFollowup",

  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.png",
  manifestUrl: "/site.webmanifest",
  themeColor: "#ffffff",
  msTileColor: "#ffffff",
} as const;
