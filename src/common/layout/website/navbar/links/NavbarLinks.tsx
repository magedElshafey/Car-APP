import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import type { NavLinkItem } from "../data/navbarData";
import { useTranslation } from "react-i18next";

type NavbarLinksProps = {
  links: NavLinkItem[];
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({ links }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActiveLink = (href: string) => {
    const url = new URL(href, window.location.origin);

    const targetPath = url.pathname;
    const targetType = url.searchParams.get("type");

    const currentPath = location.pathname;
    const currentType = new URLSearchParams(location.search).get("type");

    return currentPath === targetPath && currentType === targetType;
  };

  if (!links.length) return null;

  return (
    <ul className="flex items-center gap-4 lg:gap-6">
      {links.map((link) => {
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
                  <div className="mb-4">
                    <p className="text-base font-semibold text-text-muted">
                      {t(link.label)}
                    </p>
                    <p className="text-sm text-text-muted">
                      {t("Browse all categories under")} {t(link.label)}
                    </p>
                  </div>

                  <ul className="grid grid-cols-2 gap-3">
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
                            <p className="mt-1 text-xs text-text-muted">
                              {t("Explore")} {t(subLink.label)}
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
