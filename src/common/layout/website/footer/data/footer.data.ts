import { NavLinkItem } from "@/common/layout/website/navbar/data/navbarData";
import type { FooterLinkGroup } from "../types/footer.types";

type BuildFooterGroupsParams = {
  navLinks: NavLinkItem[];
};

export function buildFooterGroups({
  navLinks,
}: BuildFooterGroupsParams): FooterLinkGroup[] {
  const browseLinks = navLinks.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  // const otherVehiclesParent = navLinks.find(
  //   (item) => item.id === "other-vehicles",
  // );

  // const otherVehicleLinks =
  //   otherVehiclesParent?.list?.map((item) => ({
  //     label: item.label,
  //     href: item.href,
  //   })) ?? [];

  return [
    // {
    //   id: "site-pages",
    //   title: "Site Map",
    //   links: [...STATIC_SITE_PAGES],
    // },
    {
      id: "browse",
      title: "Browse",
      links: browseLinks,
    },
    // {
    //   id: "vehicle-categories",
    //   title: "Vehicle Categories",
    //   links: otherVehicleLinks.length
    //     ? otherVehicleLinks
    //     : [{ label: "Other Vehicles", href: "/other-vehicles" }],
    // },
  ];
}
