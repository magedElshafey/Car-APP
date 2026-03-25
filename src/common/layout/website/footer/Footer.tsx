import React, { useMemo } from "react";
import FooterBrand from "./components/FooterBrand";
import FooterLinkGroup from "./components/FooterLinkGroup";
import FooterSocialLinks from "./components/FooterSocialLinks";
import { buildFooterGroups } from "./data/footer.data";
import {
  DEFAULT_LINKS,
  NavLinkItem,
} from "@/common/layout/website/navbar/data/navbarData";
import CopyRight from "@/common/layout/website/footer/components/CopyRight";

type FooterProps = {
  navLinks?: NavLinkItem[];
};

const Footer: React.FC<FooterProps> = ({ navLinks = DEFAULT_LINKS }) => {
  const footerGroups = useMemo(
    () => buildFooterGroups({ navLinks }),
    [navLinks],
  );

  return (
    <footer
      aria-label="Site footer"
      className="mt-16 border-t border-border/80 bg-bg"
    >
      <div className="py-10 app-container md:py-12 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <FooterBrand />

          {footerGroups.map((group) => (
            <div
              key={group.id}
              className="p-5 border shadow-sm rounded-3xl border-border/70 bg-surface/80 backdrop-blur-sm sm:p-6"
            >
              <FooterLinkGroup group={group} />
            </div>
          ))}

          <FooterSocialLinks />
        </div>

        <div className="mt-6">
          <CopyRight />
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
