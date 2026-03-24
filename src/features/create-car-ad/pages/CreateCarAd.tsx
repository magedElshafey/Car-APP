import React, { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiImage } from "react-icons/fi";
import { toast } from "sonner";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainInput from "@/common/components/inputs/MainInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import PageSeo from "@/common/components/seo/PageSeo";
import CarImagesUpload from "../components/CarImagesUpload";
import CarDetails, { CarDetailsValue } from "../components/CarDetails";
import useCreateCarAdForm from "../hooks/useCreateCarAdForm";
import useGetFuelTypes from "@/features/browse/hooks/use-get-fuel-types";
import useGetCities, { CityOption } from "@/features/browse/hooks/use-get-cities";

const MAX_IMAGES = 20;
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

const CreateCarAdPage: React.FC = () => {
  const { t } = useTranslation();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagesError, setImagesError] = useState<string>("");
  const [carDetails, setCarDetails] = useState<CarDetailsValue>({
    brand: "",
    model: "",
    year: "",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useCreateCarAdForm();

  const { data: fuelTypes, isLoading: fuelTypesLoading } = useGetFuelTypes();
  const { data: cities, isLoading: citiesLoading } = useGetCities();

  const selectedCondition = watch("condition");
  const selectedCarType = watch("car_type");
  const selectedFuelType = watch("fuel_type");
  const selectedCity = watch("city");
  const selectedColor = watch("color");
  const selectedCanBeFinanced = watch("can_be_financed");
  const price = watch("price");
  const downPayment = watch("down_payment");
  const durationMonths = watch("duration_months");
  const monthlyInstallment = watch("monthly_installment");

  const selectedCityId = useMemo(() => {
    if (!selectedCity || !cities?.length) return null;
    const matchedCity = cities.find((item) => item.value === selectedCity);
    return matchedCity?.id ?? null;
  }, [cities, selectedCity]);

  const remainingSlots = useMemo(
    () => MAX_IMAGES - uploadedImages.length,
    [uploadedImages.length],
  );

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) {
      return;
    }

    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );
    const invalidFilesCount = selectedFiles.length - imageFiles.length;
    const acceptedFiles = imageFiles.slice(0, remainingSlots);
    const overflowCount = Math.max(0, imageFiles.length - remainingSlots);

    if (invalidFilesCount > 0) {
      toast.error(t("createCarAd.toasts.imagesOnly"));
    }

    if (overflowCount > 0) {
      toast.error(t("createCarAd.toasts.maxImages", { count: MAX_IMAGES }));
    }

    if (!acceptedFiles.length) {
      event.target.value = "";
      return;
    }

    setUploadedImages((currentImages) => [...currentImages, ...acceptedFiles]);
    setImagesError("");
    event.target.value = "";
  };

  const removeImage = (imageIndex: number) => {
    setUploadedImages((currentImages) => {
      return currentImages.filter(
        (_, currentIndex) => currentIndex !== imageIndex,
      );
    });
  };

  const clearUploadedImages = () => {
    setUploadedImages([]);
    setImagesError("");
  };

  const onSubmit = () => {
    if (!uploadedImages.length) {
      const message = "createCarAd.validation.imagesRequired";
      setImagesError(message);
      toast.error(t(message));
      return;
    }

    toast.success(t("createCarAd.toasts.readyToSubmit"));
    reset();
    clearUploadedImages();
  };

  return (
    <div className="app-container py-10 space-y-4">
      <PageSeo
        title="createCarAd.seo.title"
        description="createCarAd.seo.description"
        canonicalPath="/create-car-ad"
      />

      <div className="max-w-3xl">
        <span className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-1 text-sm font-semibold text-primary shadow-soft">
          {t("createCarAd.hero.badge")}
        </span>
        <h1 className="mt-5 text-3xl font-semibold text-text-main md:text-5xl">
          {t("createCarAd.hero.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted md:text-base">
          {t("createCarAd.hero.description")}
        </p>
      </div>

      <main className="containerr py-section-y">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_360px]"
          noValidate>
          <div className="space-y-6">
            <CarImagesUpload
              files={uploadedImages}
              onChange={handleImagesChange}
              onRemove={removeImage}
              error={imagesError}
              maxImages={MAX_IMAGES}
            />

            <section className="rounded-card border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
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
                    onChange={setCarDetails}
                  />
                </div>

                <div>
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

                <MainSelect<CityOption>
                  options={cities || []}
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
                  }}
                  error={errors.city?.message}
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
                            setValue("car_type", option as "automatic" | "manual", {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            });
                          }}
                        >
                          {t(`createCarAd.fields.carType.options.${option}`)}
                        </button>
                      );
                    })}
                  </div>
                  {errors.car_type?.message && (
                    <p className="mt-2 text-xs text-red-500">
                      {t(errors.car_type.message)}
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
                    <div className="flex flex-wrap gap-2 py-1">
                      {fuelTypes?.map((item) => {
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
                            }}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.fuel_type?.message && (
                    <p className="mt-2 text-xs text-red-500">
                      {t(errors.fuel_type.message)}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="mb-3 text-sm font-semibold text-text-main">
                    {t("createCarAd.fields.color.label")}
                  </h3>
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
                          }}
                        >
                          <span
                            className={`h-11 w-full rounded-md border transition-all ${
                              isActive
                                ? "border-blue-500 ring-2 ring-blue-200"
                                : "border-slate-300"
                            }`}
                            style={{ backgroundColor: item.hexColor }}
                            aria-hidden="true"
                          />
                          <span className="text-sm text-text-main">
                            {t(`createCarAd.fields.color.options.${item.value}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.color?.message && (
                    <p className="mt-2 text-xs text-red-500">
                      {t(errors.color.message)}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-card border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-main">
                  {t("createCarAd.pricing.title")}
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  {t("createCarAd.pricing.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  }}
                  error={errors.price?.message}
                />

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-text-main">
                    {t("createCarAd.pricing.fields.canBeFinanced.label")}
                  </h3>
                  <div className="flex flex-wrap gap-2 py-1">
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
                              shouldDirty: true,
                              shouldTouch: true,
                            });

                            if (option === "no") {
                              setValue("down_payment", "", { shouldValidate: true });
                              setValue("duration_months", "", { shouldValidate: true });
                              setValue("monthly_installment", "", { shouldValidate: true });
                            }
                          }}
                        >
                          {t(`createCarAd.pricing.fields.canBeFinanced.options.${option}`)}
                        </button>
                      );
                    })}
                  </div>
                  {errors.can_be_financed?.message && (
                    <p className="mt-2 text-xs text-red-500">
                      {t(errors.can_be_financed.message)}
                    </p>
                  )}
                </div>

                {selectedCanBeFinanced === "yes" && (
                  <div className="md:col-span-2 rounded-2xl bg-slate-50/40 p-4">
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
                        }}
                        error={errors.monthly_installment?.message}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
            <section className="rounded-card border border-slate-300 bg-bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-3 text-text-main">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiImage size={22} />
                </span>
                <div>
                  <h2 className="font-semibold">{t("createCarAd.summary.title")}</h2>
                  <p className="text-sm text-text-muted">
                    {t("createCarAd.summary.description")}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-text-muted">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>{t("createCarAd.summary.imagesCount")}</span>
                  <strong className="text-text-main">
                    {uploadedImages.length}
                  </strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>{t("createCarAd.summary.remaining")}</span>
                  <strong className="text-text-main">{remainingSlots}</strong>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 leading-6">
                  {t("createCarAd.summary.tip")}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <MainBtn
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {t("createCarAd.actions.submit")}
                </MainBtn>
                <MainBtn
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    reset();
                    clearUploadedImages();
                  }}>
                  {t("createCarAd.actions.reset")}
                </MainBtn>
              </div>
            </section>

            <section className="rounded-card border border-slate-300 bg-bg-surface p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-text-main">
                {t("createCarAd.tips.title")}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-text-muted">
                <li>
                  {t("createCarAd.tips.items.lighting")}
                </li>
                <li>{t("createCarAd.tips.items.interior")}</li>
                <li>{t("createCarAd.tips.items.duplicates")}</li>
              </ul>
            </section>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default CreateCarAdPage;
