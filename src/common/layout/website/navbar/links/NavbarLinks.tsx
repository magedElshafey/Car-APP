import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import type { NavLinkItem } from "../data/navbarData";
import { useTranslation } from "react-i18next";
import { useCarTypes } from "@/store/CarTypesProvider";

type NavbarLinksProps = {
  links: NavLinkItem[];
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({ links }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { types } = useCarTypes();
  console.log("types is", types);
  const isActiveLink = (href: string) => {
    if (!href) return false; // إذا لا يوجد href لا نعتبره active

    try {
      const url = new URL(href, window.location.origin);
      const targetPath = url.pathname;
      const targetParams = url.searchParams;

      const currentPath = location.pathname;
      const currentParams = new URLSearchParams(location.search);

      if (targetPath !== currentPath) return false;

      // تحقق من جميع البراميترز
      for (const [key, value] of targetParams.entries()) {
        if (currentParams.get(key) !== value) return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  // ✅ Compose dynamic links
  const dynamicLinks: NavLinkItem[] = useMemo(() => {
    const otherVehicles = {
      id: "other-vehicles",
      label: t("Other Vehicles"),
      href: "", // no href
      list: types?.map((type) => ({
        id: type.value,
        label: type.label,
        href: `/car-browse?filter-condition=used&filter-vehicle_type=${type.value}`,
      })),
    };

    return links
      .filter((link) => link.id !== "other-vehicles")
      .concat(otherVehicles);
  }, [links, types, t]);
  if (!dynamicLinks.length) return null;

  return (
    <ul className="flex items-center gap-4 lg:gap-6">
      {dynamicLinks.map((link) => {
        const hasChildren = Boolean(link.list?.length);
        const isParentActive =
          isActiveLink(link.href) ||
          link.list?.some((subLink) => isActiveLink(subLink.href));

        return (
          <li key={link.id} className="relative group">
            <NavLink
              to={link.href}
              className={`
                inline-flex items-center gap-1 py-5 transition-colors
                ${
                  isParentActive
                    ? "font-semibold text-primary"
                    : "text-text-muted"
                }
              `}
            >
              <span>{t(link.label)}</span>

              {hasChildren && (
                <IoIosArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              )}
            </NavLink>

            {hasChildren && (
              <div
                className="
                  invisible absolute left-1/2 top-full z-50 w-[520px]
                  -translate-x-1/2 translate-y-2 opacity-0
                  transition-all duration-200
                  group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                "
              >
                <div className="p-6 border shadow-xl rounded-2xl border-border bg-surface">
                  <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {link.list?.map((subLink) => {
                      const isSubActive = isActiveLink(subLink.href);

                      return (
                        <li key={subLink.id}>
                          <NavLink
                            to={subLink.href}
                            className={`
                              block rounded-xl border px-4 py-3 transition-all
                              ${
                                isSubActive
                                  ? "border-primary/30 bg-primary/5"
                                  : "border-transparent hover:border-border hover:bg-muted"
                              }
                            `}
                          >
                            <p
                              className={`text-sm font-medium ${
                                isSubActive ? "text-primary" : "text-text-muted"
                              }`}
                            >
                              {t(subLink.label)}
                            </p>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarLinks;
