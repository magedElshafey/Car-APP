import React, { useCallback, useEffect, useState } from "react";
import NavbarLinks from "./links/NavbarLinks";
import { DEFAULT_LINKS, NavLinkItem } from "./data/navbarData";
import Logo from "@/common/components/logo/Logo";
import NavbarLanguageToggle from "./lang-menu/LangMenu";
import NavbarCtaButton from "./cta/NavbarCtaButton";
import MobileMenuButton from "./mobile-menu-button/MobileMenuButton";
import MobileMenu from "../mobile-menu/MobileMenu";
import MainBtn from "@/common/components/buttons/MainBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
type Props = {
  links?: NavLinkItem[];
};

const Navbar: React.FC<Props> = ({ links = DEFAULT_LINKS }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-bg-surface/95 backdrop-blur">
        <div className="app-container">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-16"
          >
            <Logo src="/images/logo.png" />

            {/* Desktop */}
            <div className="hidden md:block">
              <NavbarLinks links={links} />
            </div>

            <div className="items-center hidden gap-3 md:flex ">
              <NavbarCtaButton />
              <Link to="/login">
                <MainBtn
                  variant="outline"
                  className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 !rounded-md min-w-16"
                >
                  {t("login")}
                </MainBtn>
              </Link>
              <NavbarLanguageToggle />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
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

      <MobileMenu isOpen={isOpen} links={links} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
