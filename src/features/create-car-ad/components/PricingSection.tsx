import React from "react";
import { useTranslation } from "react-i18next";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import MainInput from "@/common/components/inputs/MainInput";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";

type PricingSectionProps = {
  control: Control<CreateCarAdSchemaType>;
  setValue: UseFormSetValue<CreateCarAdSchemaType>;
  trigger: UseFormTrigger<CreateCarAdSchemaType>;
  errors: FieldErrors<CreateCarAdSchemaType>;
};

const PricingSection: React.FC<PricingSectionProps> = ({
  control,
  setValue,
  trigger,
  errors,
}) => {
  const { t } = useTranslation();

  // const selectedCanBeFinanced = useWatch({ control, name: "can_be_financed" });
  const price = useWatch({ control, name: "price" });
  // const downPayment = useWatch({ control, name: "down_payment" });
  // const durationMonths = useWatch({ control, name: "duration_months" });
  // const monthlyInstallment = useWatch({ control, name: "monthly_installment" });

  return (
    <section className="p-6 border rounded-card rounded-2xl border-slate-300 bg-bg-surface shadow-soft md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-main">
          {t("createCarAd.pricing.title")}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          {t("createCarAd.pricing.description")}
        </p>
      </div>

      <MainInput
        label="createCarAd.pricing.fields.price.label"
        placeholder="createCarAd.pricing.fields.price.placeholder"
        value={price}
        onChange={(event) => {
          setValue("price", event.target.value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          void trigger("price");
        }}
        error={errors.price?.message}
      />

      {/* <h3 className="mb-3 text-sm font-semibold text-text-main">
            {t("createCarAd.pricing.fields.canBeFinanced.label")}
          </h3> */}
      {/* <div className="flex flex-wrap gap-2 py-1">
            {["yes", "no"].map((option) => {
              const isActive = selectedCanBeFinanced === option;
              return (
                <button
                  key={option}
                  type="button"
                  className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-blue-400 bg-blue-50 text-blue-500"
                      : "border-slate-300 text-stone-600 hover:border-slate-400"
                  }`}
                  onClick={() => {
                    setValue("can_be_financed", option as "yes" | "no", {
                      shouldValidate: true,
                    });

                    if (option === "no") {
                      setValue("down_payment", "", { shouldValidate: true });
                      setValue("duration_months", "", { shouldValidate: true });
                      setValue("monthly_installment", "", {
                        shouldValidate: true,
                      });
                    }

                    void trigger([
                      "can_be_financed",
                      "down_payment",
                      "duration_months",
                      "monthly_installment",
                    ]);
                  }}
                >
                  {t(
                    `createCarAd.pricing.fields.canBeFinanced.options.${option}`,
                  )}
                </button>
              );
            })}
          </div> */}
      {/* {errors.can_be_financed?.message && (
            <p className="mt-2 text-xs text-red-500">
              {t(errors.can_be_financed.message)}
            </p>
          )} */}

      {/* {selectedCanBeFinanced === "yes" && (
          <div className="p-4 md:col-span-2 rounded-2xl bg-slate-50/40">
            <p className="mb-4 text-sm font-semibold text-text-main">
              {t("createCarAd.pricing.financing.title")}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MainInput
                label="createCarAd.pricing.fields.downPayment.label"
                placeholder="createCarAd.pricing.fields.downPayment.placeholder"
                value={downPayment}
                onChange={(event) => {
                  setValue("down_payment", event.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  void trigger("down_payment");
                }}
                error={errors.down_payment?.message}
              />

              <MainInput
                label="createCarAd.pricing.fields.durationMonths.label"
                placeholder="createCarAd.pricing.fields.durationMonths.placeholder"
                value={durationMonths}
                onChange={(event) => {
                  setValue("duration_months", event.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  void trigger("duration_months");
                }}
                error={errors.duration_months?.message}
              />

              <MainInput
                label="createCarAd.pricing.fields.monthlyInstallment.label"
                placeholder="createCarAd.pricing.fields.monthlyInstallment.placeholder"
                value={monthlyInstallment}
                onChange={(event) => {
                  setValue("monthly_installment", event.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  void trigger("monthly_installment");
                }}
                error={errors.monthly_installment?.message}
              />
            </div>
          </div>
        )} */}
    </section>
  );
};

export default PricingSection;
