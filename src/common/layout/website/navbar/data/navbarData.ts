export type NavLinkItem = {
  id: string;
  label: string;
  href: string;
  list?: NavLinkItem[];
};

export const DEFAULT_LINKS: NavLinkItem[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "new-cars",
    label: "New Cars",
    href: "/car-browse?filter-condition=new",
  },
  {
    id: "used-cars",
    label: "Used Cars",
    href: "/car-browse?filter-condition=used",
  },
  {
    id: "compare-cars",
    label: "Compare Cars",
    href: "/cars/compare",
  },
  {
    id: "other-vehicles",
    label: "Other Vehicles",
    href: "/other-vehicles",
    list: [
      {
        id: "motorcycles",
        label: "Motorcycles",
        href: "/other-vehicles/motorcycles",
      },
      {
        id: "trucks",
        label: "Trucks",
        href: "/other-vehicles/trucks",
      },
    ],
  },
  {
    id: "about us",
    label: "about us",
    href: "/about",
  },
];
