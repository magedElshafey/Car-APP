export type CarBrowseItem = {
  id: string;
  label: string;
  count: number;
  image?: string;
  href?: string;
};

export type BrowseTabKey =
  | "brands"
  | "popular-models"
  | "cities"
  | "price"
  | "body"
  | "special"
  | "engine";

export type BrowseTab = {
  id: BrowseTabKey;
  label: string;
  items: readonly CarBrowseItem[];
};

export const browseTabs: readonly BrowseTab[] = [
  {
    id: "brands",
    label: "العلامات التجارية",
    items: [
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
      {
        id: "mercedes",
        label: "مرسيدس",
        count: 1381,
        image: "/brands/mercedes.webp",
      },
      { id: "kia", label: "كيا", count: 958, image: "/brands/kia.webp" },
      {
        id: "chevrolet",
        label: "شيفروليه",
        count: 746,
        image: "/brands/chevrolet.webp",
      },
      {
        id: "bmw",
        label: "بي إم دبليو",
        count: 644,
        image: "/brands/bmw.webp",
      },
      {
        id: "skoda",
        label: "سكودا",
        count: 472,
        image: "/brands/skoda.webp",
      },
      {
        id: "chery",
        label: "شيري",
        count: 461,
        image: "/brands/chery.webp",
      },
      {
        id: "peugeot",
        label: "بيجو",
        count: 443,
        image: "/brands/peugeot.webp",
      },
      {
        id: "volkswagen",
        label: "فولكس فاجن",
        count: 420,
        image: "/brands/volkswagen.webp",
      },
    ],
  },
  {
    id: "popular-models",
    label: "أشهر الموديلات",
    items: [
      {
        id: "nissan-sunny",
        label: "نيسان صني",
        count: 361,
        image: "/models/sunny.webp",
      },
      {
        id: "chev-optra",
        label: "شيفروليه أوبترا",
        count: 244,
        image: "/models/optra.webp",
      },
      {
        id: "kia-cerato",
        label: "كيا سيراتو",
        count: 198,
        image: "/models/cerato.webp",
      },
      {
        id: "mercedes-e200",
        label: "مرسيدس E 200",
        count: 165,
        image: "/models/e200.webp",
      },
    ],
  },
  {
    id: "cities",
    label: "المدينة",
    items: [
      {
        id: "cairo",
        label: "القاهرة",
        count: 7507,
        image: "/cities/cairo.webp",
      },
      {
        id: "new-cairo",
        label: "التجمع - القاهرة الجديدة",
        count: 2102,
        image: "/cities/new-cairo.webp",
      },
      {
        id: "giza",
        label: "الجيزة",
        count: 2587,
        image: "/cities/giza.webp",
      },
      {
        id: "nasr-city",
        label: "مدينة نصر",
        count: 1410,
        image: "/cities/nasr-city.webp",
      },
    ],
  },
];
