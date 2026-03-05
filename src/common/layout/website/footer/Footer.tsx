import React from "react";
import BrandBlock from "./components/brand-block/BrandBlock";
import FooterLinkGroup from "./components/footer-links/FooterLinkGroup";
import SafetyNote from "./components/note/SafetyNote";
import CopyRight from "./components/copyrights/CopyRight";
import FooterConnectSection from "./components/connect/FooterConnectSection";
import { FooterLinkGroup as FooterLinkGroupT } from "./types/footer.types";

const LINK_GROUPS: FooterLinkGroupT[] = [
  {
    id: "explore",
    title: "Explore",
    links: [
      { label: "All patient leaflets", href: "/leaflets" },
      {
        label: "Eye conditions",
        href: "/leaflets?filter-search=eye conditions",
      },
      {
        label: "Procedures & surgery",
        href: "/leaflets?filter-search=procedures",
      },
      { label: "Medications", href: "/leaflets?filter-search=medications" },
    ],
  },
  {
    id: "site-map",
    title: "Site Map",
    links: [
      { label: "About Wise Follow Up", href: "/about" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Blogs", href: "/blogs" },
      { label: "Share your experience", href: "/submit-review" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-10 border-t border-border-subtle bg-bg-surface"
      aria-label="Site footer"
    >
      <div className="containerr py-8 md:py-10 lg:py-12 space-y-8">
        {/* Top */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
          <BrandBlock />

          <nav
            aria-label="Footer navigation"
            className="grid gap-6 sm:grid-cols-2"
          >
            {LINK_GROUPS.map((group) => (
              <FooterLinkGroup key={group.id} group={group} />
            ))}
          </nav>
        </div>

        {/* Safety */}
        <SafetyNote />

        {/* Connect */}
        <FooterConnectSection />

        {/* Copyright & policies */}
        <CopyRight />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
