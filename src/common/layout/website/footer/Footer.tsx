import React from "react";
import FooterLinkGroup from "./components/footer-links/FooterLinkGroup";
import CopyRight from "./components/copyrights/CopyRight";
import FooterConnectSection from "./components/connect/FooterConnectSection";
import { FooterLinkGroup as FooterLinkGroupT } from "./types/footer.types";

const LINK_GROUPS: FooterLinkGroupT[] = [
  {
    id: "site-map",
    title: "Site Map",
    links: [
      { label: "home", href: "/" },
      { label: "Contact us", href: "/contact-us" },
      { label: "terms and conditions", href: "/terms" },
      { label: "privacy policy", href: "/privacy-policy" },
    ],
  },
  {
    id: "new-cars",
    title: "New cars",
    links: [
      { label: "New cars in egypt", href: "/new-cars?filter=egypt" },
      {
        label: "new cars in saudi arabia",
        href: "/new-cars?filter=saudi",
      },
      {
        label: "New cars in Qatar",
        href: "/new-cars?filter=Qatar",
      },
    ],
  },
  {
    id: "used-cars",
    title: "used cars",
    links: [
      { label: "used cars in egypt", href: "/used-cars?filter=egypt" },
      {
        label: "used cars in saudi arabia",
        href: "/used-cars?filter=saudi",
      },
      {
        label: "used cars in Qatar",
        href: "/used-cars?filter=Qatar",
      },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-10 border-t border-border-subtle bg-bg-surface"
      aria-label="Site footer"
    >
      <div className="py-8 space-y-8 app-container md:py-10 lg:py-12">
        <nav
          aria-label="Footer navigation"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {LINK_GROUPS.map((group) => (
            <FooterLinkGroup key={group.id} group={group} />
          ))}
        </nav>

        {/* Connect */}
        <FooterConnectSection />

        {/* Copyright & policies */}
        <CopyRight />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
