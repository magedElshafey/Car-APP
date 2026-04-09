import React, { useMemo, useState, useRef } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import MainInput from "@/common/components/inputs/MainInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import CarDetails, { CarDetailsValue } from "./CarDetails";
import { CityOption } from "@/features/browse/hooks/use-get-cities";
import { FuelType } from "@/features/browse/types/fuel-type.types";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";
import useGetVehicleType from "@/features/browse/hooks/use-get-vehicle-type";
import useGetVehicleSubtype from "@/features/browse/hooks/use-get-vehicle-subtype";
import useGetColors from "@/features/browse/hooks/use-get-colors";

// const PREDEFINED_COLORS = [
//   { value: "white", hexColor: "#FFFFFF" },
//   { value: "black", hexColor: "#000000" },
//   { value: "silver", hexColor: "#E5E7EB" },
//   { value: "red", hexColor: "#FF1A1A" },
//   { value: "blue", hexColor: "#1D39F2" },
//   { value: "green", hexColor: "#30B05C" },
//   { value: "gold", hexColor: "#ECDD67" },
//   { value: "bronze", hexColor: "#D4B07B" },
// ] as const;

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
  register: UseFormRegister<CreateCarAdSchemaType>;
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
  register,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const selectedCondition = useWatch({ control, name: "condition" });
  const selectedCarType = useWatch({ control, name: "transmission" });
  const selectedFuelType = useWatch({ control, name: "fuel_type_id" });
  const selectedCityId = useWatch({ control, name: "city_id" });
  const selectedVehicleType = useWatch({ control, name: "vehicle_type_id" });
  const selectedColor = useWatch({ control, name: "color" });
  console.log("selectedColor", selectedColor);
  const mileageKm = useWatch({ control, name: "mileage_km" });
  const description = useWatch({ control, name: "description" });
  const selectedSubtype = useWatch({ control, name: "sub_type_id" });

  const { data: vehicleTypes, isLoading: vehicleTypesLoading } =
    useGetVehicleType();

  const { data: subtypes, isLoading: subtypesLoading } =
    useGetVehicleSubtype(selectedVehicleType);
  const { data: colors, isLoading: loadingColors } = useGetColors();
  // types
  const vehicleTypesOptions = useMemo(() => {
    if (vehicleTypes)
      return vehicleTypes.map((type) => ({
        name: type.name,
        value: type.id,
        id: type.id,
      }));
    return [];
  }, [vehicleTypes]);
  //  sub types
  const subTypesOptions = useMemo(() => {
    if (subtypes)
      return subtypes?.map((type) => ({
        name: type.name,
        value: type.id,
        id: type.id,
      }));

    return [];
  }, [subtypes]);
  // colors
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [customColor, setCustomColor] = useState("");
  const visibleColors = colors && colors?.length ? colors?.slice(0, 7) : [];
  return (
    <>
      {isColorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => {
            if (
              modalRef.current &&
              !modalRef.current.contains(e.target as Node)
            ) {
              setIsColorModalOpen(false);
            }
          }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="mb-4 text-lg font-semibold">
              {t("createCarAd.fields.color.label")}
            </h3>

            {/* all colors */}
            <div className="flex flex-wrap gap-3 mb-4">
              {colors?.map((item) => {
                const isActive = selectedColor === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    className="flex min-w-[66px] flex-col items-center gap-2 text-center"
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
                        isActive
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-slate-300"
                      }`}
                      style={{ backgroundColor: item.hexColor }}
                    />
                    <span className="text-sm text-text-main">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* custom input */}
            <input
              type="text"
              placeholder={t("createCarAd.fields.color.customPlaceholder")}
              value={customColor}
              onChange={(e) => {
                if (selectedColor) {
                  setCustomColor("");
                } else {
                  setCustomColor(e.target.value);
                }
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md border-slate-300"
            />

            {/* actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsColorModalOpen(false)}
                className="px-4 py-2 border rounded-md border-slate-300"
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (customColor.trim()) {
                    setValue("color", customColor, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("color");
                  }
                  setIsColorModalOpen(false);
                }}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                {t("common.save")}
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="p-6 border rounded-card rounded-2xl border-slate-300 bg-bg-surface shadow-soft md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-main">
            {t("createCarAd.form.title")}
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {t("createCarAd.form.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <CarDetails
              brand={carDetails.brand}
              model={carDetails.model}
              year={carDetails.year}
              trim={carDetails.trim}
              onChange={onCarDetailsChange}
            />
            {errors.brand_id?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.brand_id.message)}
              </p>
            )}
            {errors.model_id?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.model_id.message)}
              </p>
            )}
            {errors.year?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.year.message)}
              </p>
            )}
          </div>
          <MainSelect
            loading={vehicleTypesLoading}
            options={vehicleTypesOptions}
            label="createCarAd.fields.vehicle_type.label"
            placeholder="createCarAd.fields.vehicle_type.placeholder"
            onSelect={(option) => {
              setValue("vehicle_type_id", String(option.value), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              setValue("sub_type_id", undefined);

              void trigger(["vehicle_type_id", "sub_type_id"]);
            }}
            value={Number(selectedVehicleType) || null}
          />
          <MainSelect
            loading={subtypesLoading}
            options={subTypesOptions}
            label="createCarAd.fields.subtype.label"
            placeholder="createCarAd.fields.subtype.placeholder"
            onSelect={(option) => {
              setValue("sub_type_id", String(option.value), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              void trigger("sub_type_id");
            }}
            value={Number(selectedSubtype) || null}
          />
          {/** conditions */}
          <div className="md:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-text-main">
              {t("createCarAd.fields.condition.label")}
            </h3>
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
              <p className="mt-2 text-xs text-red-500">
                {t(errors.condition.message)}
              </p>
            )}
          </div>
          {selectedCondition === "used" && (
            <div className="md:col-span-2">
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
            </div>
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
            <h3 className="mb-3 text-sm font-semibold text-text-main">
              {t("createCarAd.fields.carType.label")}
            </h3>
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
                      setValue(
                        "transmission",
                        option as "automatic" | "manual",
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        },
                      );
                      void trigger("transmission");
                    }}
                  >
                    {t(`createCarAd.fields.carType.options.${option}`)}
                  </button>
                );
              })}
            </div>
            {errors.transmission?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.transmission.message)}
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-main">
              {t("createCarAd.fields.fuelType.label")}
            </h3>
            {fuelTypesLoading ? (
              <p className="text-sm text-text-muted">
                {t("createCarAd.fields.fuelType.loading")}
              </p>
            ) : (
              <div className="flex flex-wrap col-span-2 gap-2 py-1">
                {fuelTypes.map((item) => {
                  const isActive = selectedFuelType == item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`rounded-full border px-4 py-1 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-blue-400 bg-blue-50 text-blue-500"
                          : "border-slate-300 text-stone-600 hover:border-slate-400"
                      }`}
                      onClick={() => {
                        setValue("fuel_type_id", String(item.id), {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        void trigger("fuel_type_id");
                      }}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.fuel_type_id?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.fuel_type_id.message)}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-text-main">
              {t("createCarAd.fields.color.label")}
            </h3>
            {loadingColors ? (
              <p className="text-sm text-text-muted">
                {t("createCarAd.fields.fuelType.loading")}
              </p>
            ) : (
              <div className="flex flex-wrap py-1 gap-x-5 gap-y-3">
                {/* visible colors */}
                {visibleColors.map((item) => {
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
                          isActive
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-slate-300"
                        }`}
                        style={{ backgroundColor: item.hexColor }}
                      />
                      <span className="text-sm text-text-main">
                        {item.label}
                      </span>
                    </button>
                  );
                })}

                {/* other button */}
                <button
                  type="button"
                  onClick={() => setIsColorModalOpen(true)}
                  className="flex min-w-[88px] flex-col items-center gap-2 text-center"
                >
                  <span className="flex items-center justify-center w-full border border-dashed rounded-md h-11 border-slate-400">
                    <Plus size={20} />
                  </span>
                  <span className="text-sm text-text-main">
                    {t("createCarAd.fields.color.other")}
                  </span>
                </button>
              </div>
            )}

            {errors.color?.message && (
              <p className="mt-2 text-xs text-red-500">
                {t(errors.color.message)}
              </p>
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
          <MainInput
            label="createCarAd.fields.power_hp.label"
            placeholder="createCarAd.fields.power_hp.placeholder"
            {...register("power_hp")}
          />
          <MainInput
            label="createCarAd.fields.torque_nm.label"
            placeholder="createCarAd.fields.torque_nm.placeholder"
            {...register("torque_nm")}
          />
          <MainInput
            label="createCarAd.fields.wheelbase_mm.label"
            placeholder="createCarAd.fields.wheelbase_mm.placeholder"
            {...register("wheelbase_mm")}
          />

          <MainInput
            label="createCarAd.fields.height_mm.label"
            placeholder="createCarAd.fields.height_mm.placeholder"
            {...register("height_mm")}
          />

          <MainInput
            label="createCarAd.fields.width_mm.label"
            placeholder="createCarAd.fields.width_mm.placeholder"
            {...register("width_mm")}
          />

          <MainInput
            label="createCarAd.fields.length_mm.label"
            placeholder="createCarAd.fields.length_mm.placeholder"
            {...register("length_mm")}
          />

          <MainInput
            label="createCarAd.fields.cylinders.label"
            placeholder="createCarAd.fields.cylinders.placeholder"
            {...register("cylinders")}
          />

          <MainInput
            label="createCarAd.fields.seats.label"
            placeholder="createCarAd.fields.seats.placeholder"
            {...register("seats")}
          />

          <MainInput
            label="createCarAd.fields.fuel_tank_capacity_l.label"
            placeholder="createCarAd.fields.fuel_tank_capacity_l.placeholder"
            {...register("fuel_tank_capacity_l")}
          />

          <MainInput
            label="createCarAd.fields.warranty_km.label"
            placeholder="createCarAd.fields.warranty_km.placeholder"
            {...register("warranty_km")}
          />

          <MainInput
            label="createCarAd.fields.top_speed_kmh.label"
            placeholder="createCarAd.fields.top_speed_kmh.placeholder"
            {...register("top_speed_kmh")}
          />
        </div>
      </section>
    </>
  );
};

export default CarInfoSection;
