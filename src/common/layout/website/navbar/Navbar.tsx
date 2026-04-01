import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NavbarLinks from "./links/NavbarLinks";
import { DEFAULT_LINKS, type NavLinkItem } from "./data/navbarData";
import Logo from "@/common/components/logo/Logo";
import NavbarLanguageToggle from "./lang-menu/LangMenu";
import NavbarCtaButton from "./cta/NavbarCtaButton";
import MobileMenuButton from "./mobile-menu-button/MobileMenuButton";
import MobileMenu from "../mobile-menu/MobileMenu";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useAuth } from "@/store/AuthProvider";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { CiLogout } from "react-icons/ci";
import { CarTypesProvider } from "@/store/CarTypesProvider";
type Props = {
  links?: NavLinkItem[];
};

const Navbar: React.FC<Props> = ({ links = DEFAULT_LINKS }) => {
  const { user } = useAuth();
  const { settings } = useWebsiteSettings();

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const userLabel = useMemo(() => {
    if (!user) return "";
    const candidate =
      (user as { name?: string; fullName?: string; email?: string })?.name ||
      (user as { name?: string; fullName?: string; email?: string })
        ?.fullName ||
      (user as { name?: string; fullName?: string; email?: string })?.email ||
      t("My account");

    return String(candidate);
  }, [user, t]);

  const userInitial = useMemo(() => {
    if (!userLabel) return "U";
    return userLabel.trim().charAt(0).toUpperCase();
  }, [userLabel]);

  return (
    <CarTypesProvider>
      <header
        className={[
          "py-2 bg-white",
          isScrolled
            ? "border-b border-primary  shadow-[0_8px_30px_rgb(0_0_0_/_0.06)]"
            : "",
        ].join(" ")}
      >
        <div className="app-container">
          <nav
            aria-label="Main navigation"
            className="flex h-16 items-center justify-between lg:h-[72px]"
          >
            {/* Logo */}
            <div className="flex items-center min-w-0 gap-3">
              <Logo src={settings?.site_logo || "/images/logo.png"} />
            </div>

            {/* Desktop nav */}
            <div className="justify-center flex-1 hidden min-w-0 px-6 md:flex">
              <NavbarLinks links={links} />
            </div>

            {/* Desktop actions */}
            <div className="items-center hidden gap-2 md:flex">
              <NavbarLanguageToggle />

              <NavbarCtaButton />

              {user ? (
                <div className="flex items-center gap-2 px-2 py-1 border rounded-full shadow-sm border-border bg-surface">
                  <div className="flex items-center justify-center text-sm font-semibold rounded-full h-9 w-9 bg-primary/10 text-primary">
                    {userInitial}
                  </div>

                  <Link to="/profile" className="max-w-[140px] pe-1">
                    <p className="text-xs truncate text-text-muted">
                      {t("Signed in")}
                    </p>
                    <p className="text-sm font-semibold truncate text-text-muted">
                      {userLabel}
                    </p>
                  </Link>

                  <LogoutButton>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center font-medium text-white transition rounded-full h-7 w-7 bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
                    >
                      <CiLogout size={15} />
                    </button>
                  </LogoutButton>
                </div>
              ) : (
                <Link to="/auth/login">
                  <MainBtn
                    variant="outline"
                    className="!rounded-full px-4 py-2 text-sm"
                  >
                    {t("login")}
                  </MainBtn>
                </Link>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
              <NavbarLanguageToggle compact />
              <MobileMenuButton
                isOpen={isOpen}
                onToggle={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              />
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        links={links}
        onClose={closeMenu}
        user={user}
        userLabel={userLabel}
      />
    </CarTypesProvider>
  );
};

export default Navbar;
