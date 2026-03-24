// import React, { useEffect, useRef } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { NavLinkItem } from "../navbar/data/navbarData";
// import NavbarLanguageToggle from "../navbar/lang-menu/LangMenu";
// import MainBtn from "@/common/components/buttons/MainBtn";
// import { useTranslation } from "react-i18next";

// type Props = {
//   isOpen: boolean;
//   links: NavLinkItem[];
//   onClose: () => void;
// };

// const MobileMenu: React.FC<Props> = ({ isOpen, links, onClose }) => {
//   const { t } = useTranslation();
//   const dialogRef = useRef<HTMLDivElement | null>(null);

//   // ESC close
//   useEffect(() => {
//     if (!isOpen) return;

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, [isOpen, onClose]);

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//         aria-hidden
//       />

//       {/* Drawer */}
//       <div
//         ref={dialogRef}
//         id="mobile-menu"
//         role="dialog"
//         aria-modal="true"
//         aria-label="Mobile menu"
//         className={`
//           fixed inset-y-0 right-0 z-50
//           w-full max-w-xs
//           bg-bg-surface
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "translate-x-full"}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-5 border-b border-border-subtle">
//           <span className="text-sm font-semibold">{t("Menu")}</span>
//           <button
//             onClick={onClose}
//             className="border h-9 w-9 rounded-xl border-border-subtle // hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-primary"
//             aria-label="Close menu"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col h-[calc(100dvh-4rem)] overflow-y-auto">
//           {/* Links */}
//           <nav aria-label="Mobile navigation" className="px-4 py-4">
//             <ul className="space-y-1">
//               {links.map((link) => (
//                 <li key={link.id}>
//                   <NavLink
//                     to={link.href}
//                     onClick={onClose}
//                     className={({ isActive }) =>
//                       `
//                       block rounded-xl px-4 py-3 text-sm
//                       transition
//                       ${
//                         isActive
//                           ? "bg-primary-soft text-primary font-semibold"
//                           : "text-text-text-muted hover:bg-bg-alt hover:text-text-main"
//                       }
//                     `
//                     }
//                   >
//                     {t(link.label)}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Divider */}
//           <div className="mx-4 border-t border-border-subtle" />

//           {/* Actions */}
//           <div className="p-4 mt-auto space-y-4">
//             <NavbarLanguageToggle />

//             <Link className="block mt-5" to="/leaflets" onClick={onClose}>
//               <MainBtn className="w-full">{t("Browse leaflets")}</MainBtn>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default React.memo(MobileMenu);
import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

import type { NavLinkItem } from "../navbar/data/navbarData";
import NavbarLanguageToggle from "../navbar/lang-menu/LangMenu";
import MainBtn from "@/common/components/buttons/MainBtn";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { User } from "@/features/auth/types/auth.types";

type Props = {
  isOpen: boolean;
  links: NavLinkItem[];
  onClose: () => void;
  user?: User | null;
  userLabel?: string;
};

const MobileMenu: React.FC<Props> = ({
  isOpen,
  links,
  onClose,
  user,
  userLabel,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setExpandedId(null);
    }
  }, [isOpen]);

  const pathnameWithSearch = useMemo(
    () => `${location.pathname}${location.search}`,
    [location.pathname, location.search],
  );

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-40 bg-black/50  transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
        aria-hidden
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={[
          "fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-sm flex-col border-s border-border bg-surface shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div>
            <p className="text-sm font-semibold text-primary">{t("Menu")}</p>
            <p className="text-xs text-text-muted">{t("Quick navigation")}</p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center justify-center transition border rounded-full w-7 h-7 border-border text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          {user && (
            <div className="p-4 mb-4 border rounded-2xl border-border bg-muted/60">
              <p className="text-xs text-text-muted">{t("Signed in")}</p>
              <p className="mt-1 text-sm font-semibold truncate text-primary">
                {userLabel || t("My account")}
              </p>
            </div>
          )}

          <nav aria-label="Mobile navigation">
            <ul className="space-y-3">
              {links.map((link) => {
                const hasChildren = Boolean(link.list?.length);
                const isExpanded = expandedId === link.id;
                const isParentActive =
                  pathnameWithSearch === link.href ||
                  link.list?.some((sub) => pathnameWithSearch === sub.href);

                return (
                  <li key={link.id} className="overflow-hidden">
                    <div>
                      <div className="flex items-center">
                        <NavLink
                          to={link.href}
                          onClick={onClose}
                          className={({ isActive }) =>
                            [
                              "flex-1 px-2  text-sm font-medium transition",
                              isActive || isParentActive
                                ? "text-primary"
                                : "text-text-muted",
                            ].join(" ")
                          }
                        >
                          {t(link.label)}
                        </NavLink>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId((prev) =>
                                prev === link.id ? null : link.id,
                              )
                            }
                            className="inline-flex items-center justify-center transition w-7 h-7 text-text-text-muted hover:bg-bg-muted hover:text-text-muted"
                            aria-expanded={isExpanded}
                            aria-label={`Toggle ${t(link.label)} submenu`}
                          >
                            <IoIosArrowDown
                              className={[
                                "transition-transform duration-200",
                                isExpanded ? "rotate-180" : "",
                              ].join(" ")}
                            />
                          </button>
                        )}
                      </div>

                      {hasChildren && isExpanded && (
                        <ul className="space-y-2 border-t border-border">
                          {link.list?.map((subLink) => (
                            <li key={subLink.id}>
                              <NavLink
                                to={subLink.href}
                                onClick={onClose}
                                className={({ isActive }) =>
                                  [
                                    "block rounded-xl px-2  text-sm transition",
                                    isActive
                                      ? "bg-primary/10 font-semibold text-primary"
                                      : "text-text-text-muted hover:bg-bg-muted hover:text-text-main",
                                  ].join(" ")
                                }
                              >
                                {t(subLink.label)}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 space-y-3 border-t border-border">
          <div className="flex items-center justify-between gap-3">
            <NavbarLanguageToggle />
            <Link to="/sell-your-car" onClick={onClose} className="flex-1">
              <MainBtn className="w-full !rounded-full">
                {t("Selling my car")}
              </MainBtn>
            </Link>
          </div>

          {user ? (
            <LogoutButton>
              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold transition border rounded-full border-border text-text-muted hover:bg-muted"
              >
                {t("logout")}
              </button>
            </LogoutButton>
          ) : (
            <Link to="/auth/login" onClick={onClose} className="block">
              <MainBtn variant="outline" className="w-full !rounded-full">
                {t("login")}
              </MainBtn>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default React.memo(MobileMenu);
