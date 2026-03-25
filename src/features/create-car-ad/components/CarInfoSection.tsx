import React from "react";
import { useTranslation } from "react-i18next";
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger, useWatch } from "react-hook-form";
import MainInput from "@/common/components/inputs/MainInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import CarDetails, { CarDetailsValue } from "./CarDetails";
import { CityOption } from "@/features/browse/hooks/use-get-cities";
import { FuelType } from "@/features/browse/types/fuel-type.types";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";

const PREDEFINED_COLORS = [
  { value: "white", hexColor: "#FFFFFF" },
  { value: "black", hexColor: "#000000" },
  { value: "silver", hexColor: "#E5E7EB" },
  { value: "red", hexColor: "#FF1A1A" },
  { value: "blue", hexColor: "#1D39F2" },
  { value: "green", hexColor: "#30B05C" },
  { value: "gold", hexColor: "#ECDD67" },
  { value: "bronze", hexColor: "#D4B07B" },
] as const;

type CarInfoSectionProps = {
  control: Control<CreateCarAdSchemaType>;
  setValue: UseFormSetValue<CreateCarAdSchemaType>;
  trigger: UseFormTrigger<CreateCarAdSchemaType>;
  errors: FieldErrors<CreateCarAdSchemaType>;
  carDetails: CarDetailsValue;
  onCarDetailsChange: (value: CarDetailsValue) => void;
  cities: CityOption[];
  citiesLoading: boolean;
  fuelTypes: FuelType[];
  fuelTypesLoading: boolean;
};

const CarInfoSection: React.FC<CarInfoSectionProps> = ({
  control,
  setValue,
  trigger,
  errors,
  carDetails,
  onCarDetailsChange,
  cities,
  citiesLoading,
  fuelTypes,
  fuelTypesLoading,
}) => {
  const { t } = useTranslation();

  const selectedCondition = useWatch({ control, name: "condition" });
  const selectedCarType = useWatch({ control, name: "car_type" });
  const selectedFuelType = useWatch({ control, name: "fuel_type" });
  const selectedCityId = useWatch({ control, name: "city_id" });
  const selectedColor = useWatch({ control, name: "color" });
  const mileageKm = useWatch({ control, name: "mileage_km" });
  const description = useWatch({ control, name: "description" });

  return (
    <section className="rounded-card rounded-2xl border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-main">{t("createCarAd.form.title")}</h2>
        <p className="mt-2 text-sm text-text-muted">{t("createCarAd.form.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <CarDetails
            brand={carDetails.brand}
            model={carDetails.model}
            year={carDetails.year}
            trim_id={carDetails.trim_id}
            onChange={onCarDetailsChange}
          />
          {errors.trim_id?.message && (
            <p className="mt-2 text-xs text-red-500">{t(errors.trim_id.message)}</p>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.condition.label")}</h3>
          <div className="flex flex-wrap gap-2 py-1">
            {["new", "used"].map((option) => {
              const isActive = selectedCondition === option;
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
                    setValue("condition", option as "new" | "used", {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("condition");
                  }}
                >
                  {t(`createCarAd.fields.condition.options.${option}`)}
                </button>
              );
            })}
          </div>
          {errors.condition?.message && (
            <p className="mt-2 text-xs text-red-500">{t(errors.condition.message)}</p>
          )}
        </div>

        {selectedCondition === "used" && (
          <MainInput
            label="createCarAd.fields.mileage.label"
            placeholder="createCarAd.fields.mileage.placeholder"
            value={mileageKm}
            onChange={(event) => {
              setValue("mileage_km", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              void trigger("mileage_km");
            }}
            error={errors.mileage_km?.message}
            dir="ltr"
          />
        )}

        <MainSelect<CityOption>
          options={cities}
          value={selectedCityId}
          loading={citiesLoading}
          label="createCarAd.fields.location.label"
          placeholder="createCarAd.fields.location.placeholder"
          required
          onSelect={(option) => {
            setValue("city", option.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            setValue("city_id", option.id, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            void trigger(["city", "city_id"]);
          }}
          error={errors.city?.message ? errors.city.message : ""}
        />

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.carType.label")}</h3>
          <div className="flex flex-wrap gap-2 py-1">
            {["automatic", "manual"].map((option) => {
              const isActive = selectedCarType === option;
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
                    setValue("car_type", option as "automatic" | "manual", {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("car_type");
                  }}
                >
                  {t(`createCarAd.fields.carType.options.${option}`)}
                </button>
              );
            })}
          </div>
          {errors.car_type?.message && (
            <p className="mt-2 text-xs text-red-500">{t(errors.car_type.message)}</p>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.fuelType.label")}</h3>
          {fuelTypesLoading ? (
            <p className="text-sm text-text-muted">{t("createCarAd.fields.fuelType.loading")}</p>
          ) : (
            <div className="flex flex-wrap gap-2 py-1">
              {fuelTypes.map((item) => {
                const isActive = selectedFuelType === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-blue-400 bg-blue-50 text-blue-500"
                        : "border-slate-300 text-stone-600 hover:border-slate-400"
                    }`}
                    onClick={() => {
                      setValue("fuel_type", item.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      void trigger("fuel_type");
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
          {errors.fuel_type?.message && (
            <p className="mt-2 text-xs text-red-500">{t(errors.fuel_type.message)}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.color.label")}</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-3 py-1">
            {PREDEFINED_COLORS.map((item) => {
              const isActive = selectedColor === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  className="flex min-w-[88px] flex-col items-center gap-2 text-center"
                  onClick={() => {
                    setValue("color", item.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("color");
                  }}
                >
                  <span
                    className={`h-11 w-full rounded-md border transition-all ${
                      isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-300"
                    }`}
                    style={{ backgroundColor: item.hexColor }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-text-main">{t(`createCarAd.fields.color.options.${item.value}`)}</span>
                </button>
              );
            })}
          </div>
          {errors.color?.message && (
            <p className="mt-2 text-xs text-red-500">{t(errors.color.message)}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <MainTextArea
            label="createCarAd.fields.description.label"
            placeholder="createCarAd.fields.description.placeholder"
            value={description}
            onChange={(event) => {
              setValue("description", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              void trigger("description");
            }}
            error={errors.description?.message}
            rows={5}
          />
        </div>
      </div>
    </section>
  );
};

export default CarInfoSection;
