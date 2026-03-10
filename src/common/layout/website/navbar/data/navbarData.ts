export type NavLinkItem = {
  id: string;
  label: string;
  href: string;
  list?: NavLinkItem[];
};

export const DEFAULT_LINKS: NavLinkItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "new-cars", label: "New Cars", href: "/new-cars" },
  { id: "used-cars", label: "Used Cars", href: "/used-cars" },
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
];
