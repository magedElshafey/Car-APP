export type DealerItem = {
  id: string;
  name: string;
  city: string;
  logo: string;
  featured?: boolean;
  href?: string;
};

export type DealerTabKey =
  | "featured"
  | "used-cars"
  | "new-cars"
  | "certified-cars";

export type DealerTab = {
  id: DealerTabKey;
  label: string;
  items: readonly DealerItem[];
};

export const dealersTabs: readonly DealerTab[] = [
  {
    id: "featured",
    label: "التجار المميزون",
    items: [
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
      {
        id: "hamedo",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
    ],
  },
  {
    id: "used-cars",
    label: "سيارات مستعملة",
    items: [
      {
        id: "alfarid",
        name: "الفريد كار شو",
        city: "الجيزة",
        logo: "/dealers/alfarid.webp",
      },
      {
        id: "araby",
        name: "عربيتي",
        city: "التجمع الخامس",
        logo: "/dealers/araby.webp",
      },
      {
        id: "autowan",
        name: "اوتو وان",
        city: "مصر الجديدة",
        logo: "/dealers/autowan.webp",
      },
      {
        id: "trust",
        name: "تراست موتورز",
        city: "مدينة نصر",
        logo: "/dealers/trust.webp",
      },
      {
        id: "new-elmam",
        name: "نيو المام",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/newelmam.webp",
      },
    ],
  },
  {
    id: "new-cars",
    label: "سيارات جديدة",
    items: [
      {
        id: "alfarid-new",
        name: "الفريد كار شو",
        city: "الجيزة",
        logo: "/dealers/alfarid.webp",
      },
      {
        id: "araby-new",
        name: "عربيتي",
        city: "التجمع الخامس",
        logo: "/dealers/araby.webp",
      },
      {
        id: "autowan-new",
        name: "اوتو وان",
        city: "مصر الجديدة",
        logo: "/dealers/autowan.webp",
      },
      {
        id: "trust-new",
        name: "تراست موتورز",
        city: "مدينة نصر",
        logo: "/dealers/trust.webp",
      },
      {
        id: "new-elmam-new",
        name: "نيو المام",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/newelmam.webp",
      },
    ],
  },
  {
    id: "certified-cars",
    label: "سيارات معتمدة",
    items: [
      {
        id: "hamedo-certified",
        name: "حمديو موتورز",
        city: "6 أكتوبر",
        logo: "/dealers/hamedo.webp",
      },
      {
        id: "mohamed-fahmy-certified",
        name: "محمد فهمي كارز",
        city: "القاهرة الكبرى (القاهرة - الجيزة)",
        logo: "/dealers/fahmy.webp",
      },
      {
        id: "drive-in-certified",
        name: "درايف إن موتورز",
        city: "مدينة نصر",
        logo: "/dealers/drivein.webp",
        featured: true,
      },
      {
        id: "elrowad-certified",
        name: "الرواد اوتو",
        city: "القاهرة",
        logo: "/dealers/elrowad.webp",
      },
      {
        id: "abou-ghali-certified",
        name: "ابو غالي اوتو",
        city: "القاهرة",
        logo: "/dealers/aboughali.webp",
      },
    ],
  },
];
