export type FooterLinkItem = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLinkItem[];
};
