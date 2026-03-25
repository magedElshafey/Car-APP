import React from "react";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger, useWatch } from "react-hook-form";
import MainInput from "@/common/components/inputs/MainInput";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";

type ContactSectionProps = {
  control: Control<CreateCarAdSchemaType>;
  setValue: UseFormSetValue<CreateCarAdSchemaType>;
  trigger: UseFormTrigger<CreateCarAdSchemaType>;
  errors: FieldErrors<CreateCarAdSchemaType>;
};

const ContactSection: React.FC<ContactSectionProps> = ({ control, setValue, trigger, errors }) => {
  const { t } = useTranslation();

  const contactPhone = useWatch({ control, name: "contact_phone" });
  const whatsappAllowed = useWatch({ control, name: "whatsapp_allowed" });

  return (
    <section className="rounded-card rounded-2xl border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-main">{t("createCarAd.contact.title")}</h2>
        <p className="mt-2 text-sm text-text-muted">{t("createCarAd.contact.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <MainInput
          label="createCarAd.contact.fields.contactPhone.label"
          placeholder="createCarAd.contact.fields.contactPhone.placeholder"
          value={contactPhone}
          onChange={(event) => {
            setValue("contact_phone", event.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            void trigger("contact_phone");
          }}
          error={errors.contact_phone?.message}
          dir="ltr"
        />

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">
            {t("createCarAd.contact.fields.whatsappAllowed.label")}
          </h3>
          <div className="flex flex-wrap gap-2 py-1">
            {[true, false].map((option) => {
              const isActive = whatsappAllowed === option;
              return (
                <button
                  key={String(option)}
                  type="button"
                  className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-blue-400 bg-blue-50 text-blue-500"
                      : "border-slate-300 text-stone-600 hover:border-slate-400"
                  }`}
                  onClick={() => {
                    setValue("whatsapp_allowed", option, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("whatsapp_allowed");
                  }}
                >
                  {t(option ? "createCarAd.fields.binaryOptions.yes" : "createCarAd.fields.binaryOptions.no")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
