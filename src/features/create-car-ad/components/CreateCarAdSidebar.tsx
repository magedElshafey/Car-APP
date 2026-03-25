import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiImage } from "react-icons/fi";
import MainBtn from "@/common/components/buttons/MainBtn";

type CreateCarAdSidebarProps = {
  firstImageFile: File | null;
  carDetailsText: string;
  condition: "new" | "used" | undefined;
  carType: "automatic" | "manual" | undefined;
  color: string;
  price: string;
  contactPhone: string;
  isSubmitting: boolean;
  onReset: () => void;
};

const CreateCarAdSidebar: React.FC<CreateCarAdSidebarProps> = ({
  firstImageFile,
  carDetailsText,
  condition,
  carType,
  color,
  price,
  contactPhone,
  isSubmitting,
  onReset,
}) => {
  const { t } = useTranslation();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!firstImageFile) {
      setPreviewUrl("");
      return;
    }

    const imageUrl = URL.createObjectURL(firstImageFile);
    setPreviewUrl(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [firstImageFile]);

  const summaryItems = useMemo(
    () => [
      {
        label: t("createCarAd.preview.fields.carDetails"),
        value: carDetailsText || t("createCarAd.preview.emptyValue"),
      },
      {
        label: t("createCarAd.preview.fields.condition"),
        value: condition
          ? t(`createCarAd.fields.condition.options.${condition}`)
          : t("createCarAd.preview.emptyValue"),
      },
      {
        label: t("createCarAd.preview.fields.carType"),
        value: carType
          ? t(`createCarAd.fields.carType.options.${carType}`)
          : t("createCarAd.preview.emptyValue"),
      },
      {
        label: t("createCarAd.preview.fields.color"),
        value: color
          ? t(`createCarAd.fields.color.options.${color}`)
          : t("createCarAd.preview.emptyValue"),
      },
      {
        label: t("createCarAd.preview.fields.price"),
        value: price || t("createCarAd.preview.emptyValue"),
      },
      {
        label: t("createCarAd.preview.fields.phone"),
        value: contactPhone || t("createCarAd.preview.emptyValue"),
      },
    ],
    [carDetailsText, color, condition, contactPhone, price, carType, t],
  );

  return (
    <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
      <section className="rounded-card rounded-2xl border border-slate-300 bg-bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-3 text-text-main">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FiImage size={22} />
          </span>
          <div>
            <h2 className="font-semibold">{t("createCarAd.preview.title")}</h2>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-text-muted">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={t("createCarAd.preview.imageAlt")}
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="flex h-44 items-center justify-center px-4 text-center text-sm text-text-muted">
                {t("createCarAd.preview.noImage")}
              </div>
            )}
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-50 px-4 py-3">
            {summaryItems.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-3">
                <span>{item.label}</span>
                <strong className="max-w-[60%] text-right text-text-main">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <MainBtn type="submit" className="w-full" disabled={isSubmitting}>
            {t("createCarAd.actions.submit")}
          </MainBtn>
          <MainBtn type="button" variant="ghost" className="w-full" onClick={onReset}>
            {t("createCarAd.actions.reset")}
          </MainBtn>
        </div>
      </section>

    </aside>
  );
};

export default CreateCarAdSidebar;
