import { NavLink, useLocation } from "react-router-dom";
import type { NavLinkItem } from "../data/navbarData";
import { useTranslation } from "react-i18next";
type NavbarLinksProps = {
  links: NavLinkItem[];
};
const NavbarLinks: React.FC<NavbarLinksProps> = ({ links }) => {
  const location = useLocation();
  const isActiveLink = (href: string) => {
    const url = new URL(href, window.location.origin);

    const targetPath = url.pathname; // /explore
    const targetType = url.searchParams.get("type"); // leaflets/tools

    const currentPath = location.pathname; // /explore
    const currentType = new URLSearchParams(location.search).get("type");

    return currentPath === targetPath && currentType === targetType;
  };
  const { t } = useTranslation();
  if (!links.length) return null;

  return (
    <ul className="flex items-center gap-4 lg:gap-6 ">
      {links.map((link) => {
        return (
          <li key={link.id}>
            <NavLink
              to={link?.href}
              className={`
            inline-flex items-center gap-1
            transition-colors
      ${
        isActiveLink(link.href)
          ? "text-primary font-semibold"
          : "text-text-muted hover:text-text-main"
      }
    `}
            >
              <span>{t(link.label)}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default NavbarLinks;
