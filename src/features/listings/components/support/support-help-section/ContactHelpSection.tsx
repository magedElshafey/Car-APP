import { useMemo } from "react";
import { FiChevronLeft, FiHeadphones, FiMail, FiMapPin } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import SupportCard from "@/features/listings/components/support/support-card/SupportCard";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { cn } from "@/lib/utils";

type ContactHelpItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
};

function normalizePhoneForWhatsapp(phone?: string | null) {
  if (!phone) return "";

  return phone.replace(/[^\d+]/g, "").replace(/^00/, "+");
}

function formatPhoneForDisplay(phone?: string | null, locale = "en") {
  if (!phone) return "";

  const normalized = phone.trim();

  const toArabicDigits = (value: string) =>
    value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);

  return locale.startsWith("ar") ? toArabicDigits(normalized) : normalized;
}

export default function ContactHelpSection() {
  const { settings, isLoading } = useWebsiteSettings();
  const {
    t,
    i18n: { language, dir },
  } = useTranslation();

  const phone = settings?.contact_phone?.trim() ?? "";
  const email = settings?.contact_email?.trim() ?? "";
  const address = settings?.contact_address?.trim() ?? "";

  const displayPhone = formatPhoneForDisplay(phone, language);
  const whatsappPhone = normalizePhoneForWhatsapp(phone);

  const items = useMemo<ContactHelpItem[]>(
    () => [
      {
        id: "address",
        title: t("contact.address.title"),
        description: address || t("contact.address.fallback"),
        icon: <FiMapPin className="w-5 h-5" aria-hidden="true" />,
        external: false,
        ariaLabel: t("contact.address.aria"),
      },
      {
        id: "sales",
        title: t("contact.sales.title"),
        description: displayPhone || t("contact.sales.fallback"),
        icon: <FiHeadphones className="w-5 h-5" aria-hidden="true" />,
        href: whatsappPhone
          ? `https://wa.me/${whatsappPhone.replace("+", "")}`
          : undefined,
        external: true,
        ariaLabel: displayPhone
          ? t("contact.sales.ariaWithPhone", {
              phone: displayPhone,
            })
          : t("contact.sales.fallback"),
      },
      {
        id: "email",
        title: t("contact.email.title"),
        description: email || t("contact.email.fallback"),
        icon: <FiMail className="w-5 h-5" aria-hidden="true" />,
        href: email ? `mailto:${email}` : undefined,
        external: true,
        ariaLabel: email
          ? t("contact.email.ariaWithEmail", {
              email,
            })
          : t("contact.email.fallback"),
      },
    ],
    [displayPhone, email, whatsappPhone, address, t],
  );

  return (
    <section className="w-full" aria-labelledby="contact-help-heading">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <span
          className={cn(
            "mb-3 inline-flex items-center rounded-full border border-primary/15",
            "bg-primary/5 px-3 py-1 text-xs font-medium text-primary",
          )}
        >
          {t("contact.badge")}
        </span>

        <h2
          id="contact-help-heading"
          className="text-2xl font-bold tracking-tight text-text md:text-3xl"
        >
          {t("contact.title")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-text-muted md:text-base">
          {t("contact.subtitle")}
        </p>
      </div>

      <div
        className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3")}
        role="list"
        aria-busy={isLoading}
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <SupportCard
              id={item?.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              href={item.href}
              external={item.external}
              ariaLabel={item.ariaLabel}
              trailingIcon={
                <FiChevronLeft
                  className={cn(
                    "h-4 w-4 shrink-0 text-text-muted transition-transform duration-300",
                    dir() === "rtl"
                      ? "group-hover:-translate-x-1"
                      : "rotate-180 group-hover:translate-x-1",
                  )}
                  aria-hidden="true"
                />
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
