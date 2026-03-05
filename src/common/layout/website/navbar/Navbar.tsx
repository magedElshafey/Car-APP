import React, { useCallback, useEffect, useState } from "react";
import NavbarLinks from "./links/NavbarLinks";
import { DEFAULT_LINKS, NavLinkItem } from "./data/navbarData";
import Logo from "@/common/components/logo/Logo";
import NavbarLanguageToggle from "./lang-menu/LangMenu";
import NavbarCtaButton from "./cta/NavbarCtaButton";
import MobileMenuButton from "./mobile-menu-button/MobileMenuButton";
import MobileMenu from "../mobile-menu/MobileMenu";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";

type Props = {
  links?: NavLinkItem[];
};

const Navbar: React.FC<Props> = ({ links = DEFAULT_LINKS }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useWebsiteSettings();

  const toggleMenu = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-bg-surface/95 backdrop-blur border-border-subtle">
        <div className="containerr">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-16"
          >
            <Logo src={settings?.app_logo || ""} />

            {/* Desktop */}
            <div className="hidden md:block">
              <NavbarLinks links={links} />
            </div>
            <div className="items-center hidden gap-3 md:flex">
              <NavbarLanguageToggle />
              <NavbarCtaButton />
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

      <MobileMenu isOpen={isOpen} links={links} onClose={toggleMenu} />
    </>
  );
};

export default Navbar;
