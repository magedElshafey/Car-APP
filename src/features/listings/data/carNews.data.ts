export type CarNewsItem = {
  id: string;
  title: string;
  image: string;
  imageAlt?: string;
  href: string;
  date: string;
  category?: string;
};

export const carNews: readonly CarNewsItem[] = [
  {
    id: "news-1",
    title: "تغير جديد في رفع أسعار السيارات بحضور بمصر",
    image: "/news/news-1.webp",
    imageAlt: "سيارات متوقفة في معرض",
    href: "/news/1",
    date: "2026-03-09",
  },
  {
    id: "news-2",
    title: "بيع أكثر من 50 ألف دراجة نارية في مصر خلال فبراير الماضي",
    image: "/news/news-2.webp",
    imageAlt: "دراجات نارية داخل معرض",
    href: "/news/2",
    date: "2026-03-09",
    category: "أخبار محلية",
  },
  {
    id: "news-3",
    title: "عرض من وكيل سوبارو بمصر عند تغيير الإكسدامات",
    image: "/news/news-3.webp",
    imageAlt: "سيارة سوبارو",
    href: "/news/3",
    date: "2026-03-09",
    category: "أخبار الشركات",
  },
  {
    id: "news-4",
    title: "فرصة: عدد ضخم من السيارات في مزاد جمرك بورسعيد والإسكندرية بمصر",
    image: "/news/news-4.webp",
    imageAlt: "سيارة في مزاد",
    href: "/news/4",
    date: "2026-03-09",
    category: "مزادات",
  },
  {
    id: "news-1",
    title: "تغير جديد في رفع أسعار السيارات بحضور بمصر",
    image: "/news/news-1.webp",
    imageAlt: "سيارات متوقفة في معرض",
    href: "/news/1",
    date: "2026-03-09",
  },
  {
    id: "news-2",
    title: "بيع أكثر من 50 ألف دراجة نارية في مصر خلال فبراير الماضي",
    image: "/news/news-2.webp",
    imageAlt: "دراجات نارية داخل معرض",
    href: "/news/2",
    date: "2026-03-09",
    category: "أخبار محلية",
  },
  {
    id: "news-3",
    title: "عرض من وكيل سوبارو بمصر عند تغيير الإكسدامات",
    image: "/news/news-3.webp",
    imageAlt: "سيارة سوبارو",
    href: "/news/3",
    date: "2026-03-09",
    category: "أخبار الشركات",
  },
  {
    id: "news-4",
    title: "فرصة: عدد ضخم من السيارات في مزاد جمرك بورسعيد والإسكندرية بمصر",
    image: "/news/news-4.webp",
    imageAlt: "سيارة في مزاد",
    href: "/news/4",
    date: "2026-03-09",
    category: "مزادات",
  },
];
