import { FiMail, FiHeadphones, FiMessageCircle } from "react-icons/fi";

export const supportContacts = [
  {
    id: "support",
    title: "الدعم الفني",
    description: "أرسل لنا استفساراتك!",
    icon: <FiMessageCircle size={20} />,
    href: "/support",
  },
  {
    id: "sales",
    title: "اتصل بالمبيعات",
    description: "تواصل مع فريق المبيعات لدينا",
    icon: <FiHeadphones size={20} />,
    href: "/sales",
  },
  {
    id: "email",
    title: "البريد الإلكتروني",
    description: "contact@hatla2ee.com",
    icon: <FiMail size={20} />,
    href: "mailto:contact@hatla2ee.com",
  },
];
