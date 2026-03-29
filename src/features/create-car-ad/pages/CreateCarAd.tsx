import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";
import PageSeo from "@/common/components/seo/PageSeo";
import CarImagesUpload from "../components/CarImagesUpload";
import CarInfoSection from "../components/CarInfoSection";
import PricingSection from "../components/PricingSection";
import FeaturesAttributesSection from "../components/FeaturesAttributesSection";
import ContactSection from "../components/ContactSection";
import CreateCarAdSidebar from "../components/CreateCarAdSidebar";
import { CarDetailsValue } from "../components/CarDetails";
import useCreateCarAdForm from "../hooks/useCreateCarAdForm";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";
import useGetFuelTypes from "@/features/browse/hooks/use-get-fuel-types";
import useGetCities from "@/features/browse/hooks/use-get-cities";
import useGetCarFeatures from "@/features/browse/hooks/use-get-car-features";
import useGetHighlightTypes from "@/features/browse/hooks/use-get-highlight-types";
import useCreateCar, { CreateCarPayload } from "../api/useCreateCar";
import toastApiError from "@/utils/toastApiError";

const MAX_IMAGES = 20;

const CreateCarAdPage: React.FC = () => {
  const { t } = useTranslation();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagesError, setImagesError] = useState<string>("");
  const [carDetails, setCarDetails] = useState<CarDetailsValue>({});
  const [isFeaturesDialogOpen, setIsFeaturesDialogOpen] = useState(false);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<number[]>([]);
  const [draftFeatureIds, setDraftFeatureIds] = useState<number[]>([]);
  const [activeFeatureCategory, setActiveFeatureCategory] = useState<string>("");
  const [isAttributesDialogOpen, setIsAttributesDialogOpen] = useState(false);
  const [selectedAttributeIds, setSelectedAttributeIds] = useState<number[]>([]);
  const [draftAttributeIds, setDraftAttributeIds] = useState<number[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
    register,
  } = useCreateCarAdForm();

  const { data: fuelTypes, isLoading: fuelTypesLoading } = useGetFuelTypes();
  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const { data: groupedCarFeatures = {}, isLoading: carFeaturesLoading } =
    useGetCarFeatures();
  const { data: highlightTypes = [], isLoading: highlightTypesLoading } =
    useGetHighlightTypes();
  const { mutateAsync: createCar, isPending: isCreatingCar } = useCreateCar();

  const condition = useWatch({ control, name: "condition" });
  const carType = useWatch({ control, name: "transmission" });
  const color = useWatch({ control, name: "color" });
  const price = useWatch({ control, name: "price" });
  const contactPhone = useWatch({ control, name: "contact_phone" });

  const carDetailsText = useMemo(
    () => [carDetails.brand?.name, carDetails.model?.name, carDetails.year, carDetails.trim?.name].filter(Boolean).join(" • "),
    [carDetails.brand, carDetails.model, carDetails.year, carDetails.trim],
  );

  const remainingSlots = useMemo(
    () => MAX_IMAGES - uploadedImages.length,
    [uploadedImages.length],
  );

  const featureCategories = useMemo(() => {
    return Object.entries(groupedCarFeatures).sort((a, b) => {
      const aSort = a[1].category.sort ?? Number.MAX_SAFE_INTEGER;
      const bSort = b[1].category.sort ?? Number.MAX_SAFE_INTEGER;
      if (aSort !== bSort) return aSort - bSort;
      return a[0].localeCompare(b[0]);
    });
  }, [groupedCarFeatures]);

  const activeFeatures = useMemo(() => {
    if (!activeFeatureCategory) return [];
    return groupedCarFeatures[activeFeatureCategory]?.features ?? [];
  }, [activeFeatureCategory, groupedCarFeatures]);

  const selectedFeaturesByCategory = useMemo(() => {
    return featureCategories
      .map(([categoryName, group]) => {
        const selectedFeatures = group.features.filter((feature) =>
          selectedFeatureIds.includes(feature.id),
        );

        return {
          categoryName,
          selectedFeatures,
        };
      })
      .filter((item) => item.selectedFeatures.length > 0);
  }, [featureCategories, selectedFeatureIds]);

  const sortedHighlightTypes = useMemo(() => {
    return [...highlightTypes].sort((a, b) => {
      const aSort = a.sort ?? Number.MAX_SAFE_INTEGER;
      const bSort = b.sort ?? Number.MAX_SAFE_INTEGER;

      if (aSort !== bSort) return aSort - bSort;
      return a.name.localeCompare(b.name);
    });
  }, [highlightTypes]);

  const selectedAttributes = useMemo(() => {
    return sortedHighlightTypes.filter((attribute) =>
      selectedAttributeIds.includes(attribute.id),
    );
  }, [selectedAttributeIds, sortedHighlightTypes]);

  const handleImagesChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
  }, [remainingSlots, t]);

  const removeImage = useCallback((imageIndex: number) => {
    setUploadedImages((currentImages) => {
      return currentImages.filter(
        (_, currentIndex) => currentIndex !== imageIndex,
      );
    });
  }, []);

  const clearUploadedImages = useCallback(() => {
    setUploadedImages([]);
    setImagesError("");
  }, []);

  const toggleDraftFeature = useCallback((featureId: number) => {
    setDraftFeatureIds((current) => {
      if (current.includes(featureId)) {
        return current.filter((id) => id !== featureId);
      }
      return [...current, featureId];
    });
  }, []);

  const handleFeaturesDialogChange = useCallback((opened: boolean) => {
    setIsFeaturesDialogOpen(opened);
    setDraftFeatureIds(selectedFeatureIds);

    if (opened && featureCategories.length && !activeFeatureCategory) {
      setActiveFeatureCategory(featureCategories[0][0]);
    }
  }, [activeFeatureCategory, featureCategories, selectedFeatureIds]);

  const applyFeatureSelection = useCallback(() => {
    setSelectedFeatureIds(draftFeatureIds);
    setIsFeaturesDialogOpen(false);
  }, [draftFeatureIds]);

  const removeSelectedFeature = useCallback((featureId: number) => {
    setSelectedFeatureIds((current) => current.filter((id) => id !== featureId));
  }, []);

  const toggleDraftAttribute = useCallback((attributeId: number) => {
    setDraftAttributeIds((current) => {
      if (current.includes(attributeId)) {
        return current.filter((id) => id !== attributeId);
      }

      return [...current, attributeId];
    });
  }, []);

  const handleAttributesDialogChange = useCallback((opened: boolean) => {
    setIsAttributesDialogOpen(opened);
    setDraftAttributeIds(selectedAttributeIds);
  }, [selectedAttributeIds]);

  const applyAttributeSelection = useCallback(() => {
    setSelectedAttributeIds(draftAttributeIds);
    setIsAttributesDialogOpen(false);
  }, [draftAttributeIds]);

  const removeSelectedAttribute = useCallback((attributeId: number) => {
    setSelectedAttributeIds((current) =>
      current.filter((id) => id !== attributeId),
    );
  }, []);

  const handleFormReset = useCallback(() => {
    reset();
    clearUploadedImages();
    setCarDetails({});
    setSelectedFeatureIds([]);
    setDraftFeatureIds([]);
    setSelectedAttributeIds([]);
    setDraftAttributeIds([]);
  }, [clearUploadedImages, reset]);

  const handleCarDetailsChange = useCallback((value: CarDetailsValue) => {
    setCarDetails(value);
    if(value?.trim?.id) {
      setValue("trim_id", value.trim?.id, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [setValue]);

  const onSubmit = useCallback(async (values: CreateCarAdSchemaType) => {
    if (!uploadedImages.length) {
      const message = "createCarAd.validation.imagesRequired";
      setImagesError(message);
      toast.error(t(message));
      return;
    }

    const cityId = values.city_id ?? cities?.find((item) => item.value === values.city)?.id;

    if (!values.trim_id) {
      toast.error(t("createCarAd.validation.trimRequired"));
      return;
    }

    if (!cityId) {
      toast.error(t("createCarAd.validation.locationRequired"));
      return;
    }

    const financingAvailable = values.can_be_financed === "yes";

    const payload: CreateCarPayload = {
      trim_id: values.trim_id!,
      city_id: cityId,
      sub_type: values.sub_type || undefined,
      vehicle_type: values.vehicle_type || undefined,

      contact_phone: values.contact_phone,
      whatsapp_allowed: values.whatsapp_allowed ? 1 : 0,

      price: Number(values.price),

      financing_available: financingAvailable ? 1 : 0,
      financing: financingAvailable
        ? {
          down_payment: Number(values.down_payment),
          duration_months: Number(values.duration_months),
          monthly_installment: Number(values.monthly_installment),
        }
        : null,

      feature_option_ids: selectedFeatureIds,
      highlight_type_ids: selectedAttributeIds,

      images: uploadedImages,

      details: {
        condition: values.condition,
        color: values.color,
        transmission: values.transmission,
        fuel_type: values.fuel_type,

        mileage_km:
          values.condition === "used" ? Number(values.mileage_km || 0) : undefined,

        // booleans
        is_imported: values.is_imported ? 1 : 0,
        is_taxi: values.is_taxi ? 1 : 0,
        is_special_needs: values.is_special_needs ? 1 : 0,

        // specs (convert safely)
        cylinders: values.cylinders ? Number(values.cylinders) : undefined,
        drive_type: values.drive_type || undefined,
        fuel_tank_capacity_l: values.fuel_tank_capacity_l
          ? Number(values.fuel_tank_capacity_l)
          : undefined,
        height_mm: values.height_mm ? Number(values.height_mm) : undefined,
        length_mm: values.length_mm ? Number(values.length_mm) : undefined,
        width_mm: values.width_mm ? Number(values.width_mm) : undefined,
        wheelbase_mm: values.wheelbase_mm
          ? Number(values.wheelbase_mm)
          : undefined,

        power_hp: values.power_hp ? Number(values.power_hp) : undefined,
        torque_nm: values.torque_nm ? Number(values.torque_nm) : undefined,
        top_speed_kmh: values.top_speed_kmh
          ? Number(values.top_speed_kmh)
          : undefined,

        seats: values.seats ? Number(values.seats) : undefined,
        warranty_km: values.warranty_km
          ? Number(values.warranty_km)
          : undefined,
      },
    };

    try {
      await createCar(payload);
      toast.success(t("createCarAd.toasts.readyToSubmit"));
      handleFormReset();
    } catch (error) {
      toastApiError(error as Error);
    }
  }, [cities, createCar, handleFormReset, selectedAttributeIds, selectedFeatureIds, t, uploadedImages]);

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

            <CarInfoSection
              control={control}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
              carDetails={carDetails}
              onCarDetailsChange={handleCarDetailsChange}
              cities={cities ?? []}
              citiesLoading={citiesLoading}
              fuelTypes={fuelTypes ?? []}
              fuelTypesLoading={fuelTypesLoading}
              register={register}
            />

            <PricingSection control={control} setValue={setValue} trigger={trigger} errors={errors} />

            <FeaturesAttributesSection
              featureCategories={featureCategories}
              activeFeatureCategory={activeFeatureCategory}
              onActiveFeatureCategoryChange={setActiveFeatureCategory}
              activeFeatures={activeFeatures}
              selectedFeatureIds={selectedFeatureIds}
              selectedFeaturesByCategory={selectedFeaturesByCategory}
              isFeaturesDialogOpen={isFeaturesDialogOpen}
              onFeaturesDialogChange={handleFeaturesDialogChange}
              draftFeatureIds={draftFeatureIds}
              onToggleDraftFeature={toggleDraftFeature}
              onApplyFeatureSelection={applyFeatureSelection}
              onRemoveSelectedFeature={removeSelectedFeature}
              carFeaturesLoading={carFeaturesLoading}
              sortedHighlightTypes={sortedHighlightTypes}
              selectedAttributeIds={selectedAttributeIds}
              selectedAttributes={selectedAttributes}
              isAttributesDialogOpen={isAttributesDialogOpen}
              onAttributesDialogChange={handleAttributesDialogChange}
              draftAttributeIds={draftAttributeIds}
              onToggleDraftAttribute={toggleDraftAttribute}
              onApplyAttributeSelection={applyAttributeSelection}
              onRemoveSelectedAttribute={removeSelectedAttribute}
              highlightTypesLoading={highlightTypesLoading}
              control={control}
              setValue={setValue}
              trigger={trigger}
            />

            <ContactSection control={control} setValue={setValue} trigger={trigger} errors={errors} />
          </div>

          <CreateCarAdSidebar
            firstImageFile={uploadedImages[0] ?? null}
            carDetailsText={carDetailsText}
            condition={condition}
            carType={carType}
            color={color}
            price={price}
            contactPhone={contactPhone}
            isPending={isCreatingCar}
            onReset={handleFormReset}
          />
        </form>
      </main>
    </div>
  );
};

export default CreateCarAdPage;
