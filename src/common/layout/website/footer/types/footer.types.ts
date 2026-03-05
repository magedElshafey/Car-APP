export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};
