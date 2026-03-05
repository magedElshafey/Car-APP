import React, { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { NavLinkItem } from "../navbar/data/navbarData";
import NavbarLanguageToggle from "../navbar/lang-menu/LangMenu";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  links: NavLinkItem[];
  onClose: () => void;
};

const MobileMenu: React.FC<Props> = ({ isOpen, links, onClose }) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // ESC close
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`
          fixed inset-y-0 right-0 z-50
          w-full max-w-xs
          bg-bg-surface
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle">
          <span className="text-sm font-semibold">{t("Menu")}</span>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl border border-border-subtle
              hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100dvh-4rem)] overflow-y-auto">
          {/* Links */}
          <nav aria-label="Mobile navigation" className="px-4 py-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      block rounded-xl px-4 py-3 text-sm
                      transition
                      ${
                        isActive
                          ? "bg-primary-soft text-primary font-semibold"
                          : "text-text-muted hover:bg-bg-alt hover:text-text-main"
                      }
                    `
                    }
                  >
                    {t(link.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="border-t border-border-subtle mx-4" />

          {/* Actions */}
          <div className="p-4 space-y-4 mt-auto">
            <NavbarLanguageToggle />

            <Link className="mt-5 block" to="/leaflets" onClick={onClose}>
              <MainBtn className="w-full">{t("Browse leaflets")}</MainBtn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(MobileMenu);
