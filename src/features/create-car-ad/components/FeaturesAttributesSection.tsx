import React from "react";
import { useTranslation } from "react-i18next";
import { Control, UseFormSetValue, UseFormTrigger, useWatch } from "react-hook-form";
import { FiPlus, FiX } from "react-icons/fi";
import { CarFeature, GroupedCarFeature } from "@/features/browse/types/car-feature.types";
import { HighlightType } from "@/features/browse/types/highlight-type.types";
import { CreateCarAdSchemaType } from "../schema/createCarAd.schema";
import FeatureSelectionDialog from "./FeatureSelectionDialog";
import AttributeSelectionDialog from "./AttributeSelectionDialog";

type SelectedFeaturesGroup = {
  categoryName: string;
  selectedFeatures: CarFeature[];
};

type FeaturesAttributesSectionProps = {
  featureCategories: Array<[string, GroupedCarFeature]>;
  activeFeatureCategory: string;
  onActiveFeatureCategoryChange: (categoryName: string) => void;
  activeFeatures: CarFeature[];
  selectedFeatureIds: number[];
  selectedFeaturesByCategory: SelectedFeaturesGroup[];
  isFeaturesDialogOpen: boolean;
  onFeaturesDialogChange: (open: boolean) => void;
  draftFeatureIds: number[];
  onToggleDraftFeature: (featureId: number) => void;
  onApplyFeatureSelection: () => void;
  onRemoveSelectedFeature: (featureId: number) => void;
  carFeaturesLoading: boolean;
  sortedHighlightTypes: HighlightType[];
  selectedAttributeIds: number[];
  selectedAttributes: HighlightType[];
  isAttributesDialogOpen: boolean;
  onAttributesDialogChange: (open: boolean) => void;
  draftAttributeIds: number[];
  onToggleDraftAttribute: (attributeId: number) => void;
  onApplyAttributeSelection: () => void;
  onRemoveSelectedAttribute: (attributeId: number) => void;
  highlightTypesLoading: boolean;
  control: Control<CreateCarAdSchemaType>;
  setValue: UseFormSetValue<CreateCarAdSchemaType>;
  trigger: UseFormTrigger<CreateCarAdSchemaType>;
};

const FeaturesAttributesSection: React.FC<FeaturesAttributesSectionProps> = ({
  featureCategories,
  activeFeatureCategory,
  onActiveFeatureCategoryChange,
  activeFeatures,
  selectedFeatureIds,
  selectedFeaturesByCategory,
  isFeaturesDialogOpen,
  onFeaturesDialogChange,
  draftFeatureIds,
  onToggleDraftFeature,
  onApplyFeatureSelection,
  onRemoveSelectedFeature,
  carFeaturesLoading,
  sortedHighlightTypes,
  selectedAttributeIds,
  selectedAttributes,
  isAttributesDialogOpen,
  onAttributesDialogChange,
  draftAttributeIds,
  onToggleDraftAttribute,
  onApplyAttributeSelection,
  onRemoveSelectedAttribute,
  highlightTypesLoading,
  control,
  setValue,
  trigger,
}) => {
  const { t } = useTranslation();

  const isSpecialNeeds = useWatch({ control, name: "is_special_needs" });
  const isTaxi = useWatch({ control, name: "is_taxi" });
  const isImported = useWatch({ control, name: "is_imported" });

  return (
    <section className="rounded-card rounded-2xl border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-main">{t("createCarAd.features.title")}</h2>
        <p className="mt-2 text-sm text-text-muted">{t("createCarAd.featuresAndAttributes.description")}</p>
      </div>

      <div>
        <p className="mt-2 text-sm font-semibold text-text-main">
          {t("createCarAd.features.label")}
          <span className="ms-1 font-normal text-text-muted">({t("createCarAd.features.optional")})</span>
        </p>
        {!!selectedFeatureIds.length && (
          <p className="mt-2 text-sm text-text-muted">
            {t("createCarAd.features.selectedCount", { count: selectedFeatureIds.length })}
          </p>
        )}

        <div className="mt-3">
          <FeatureSelectionDialog
            open={isFeaturesDialogOpen}
            onOpenChange={onFeaturesDialogChange}
            featureCategories={featureCategories}
            activeFeatureCategory={activeFeatureCategory}
            onActiveFeatureCategoryChange={onActiveFeatureCategoryChange}
            activeFeatures={activeFeatures}
            carFeaturesLoading={carFeaturesLoading}
            draftFeatureIds={draftFeatureIds}
            onToggleDraftFeature={onToggleDraftFeature}
            onApply={onApplyFeatureSelection}
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-5 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-100"
              >
                <FiPlus size={18} />
                <span>{t("createCarAd.features.addButton")}</span>
              </button>
            }
          />
        </div>

        {!!selectedFeaturesByCategory.length && (
          <div className="mt-6 space-y-4">
            {selectedFeaturesByCategory.map((group) => (
              <div key={group.categoryName}>
                <p className="mb-2 text-lg font-semibold text-text-main">{group.categoryName}</p>
                <div className="flex flex-wrap gap-2">
                  {group.selectedFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-base text-text-main"
                      onClick={() => onRemoveSelectedFeature(feature.id)}
                    >
                      <span>{feature.name}</span>
                      <FiX size={14} className="text-text-muted" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="my-8 border-t border-slate-200" />

      <div>
        <p className="mt-2 text-sm font-semibold text-text-main">
          {t("createCarAd.attributes.label")}
          <span className="ms-1 font-normal text-text-muted">({t("createCarAd.attributes.optional")})</span>
        </p>
        {!!selectedAttributeIds.length && (
          <p className="mt-2 text-sm text-text-muted">
            {t("createCarAd.attributes.selectedCount", { count: selectedAttributeIds.length })}
          </p>
        )}

        <div className="mt-3">
          <AttributeSelectionDialog
            open={isAttributesDialogOpen}
            onOpenChange={onAttributesDialogChange}
            highlightTypesLoading={highlightTypesLoading}
            sortedHighlightTypes={sortedHighlightTypes}
            draftAttributeIds={draftAttributeIds}
            onToggleDraftAttribute={onToggleDraftAttribute}
            onApply={onApplyAttributeSelection}
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-5 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-100"
              >
                <FiPlus size={18} />
                <span>{t("createCarAd.attributes.addButton")}</span>
              </button>
            }
          />
        </div>

        {!!selectedAttributes.length && (
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedAttributes.map((attribute) => (
              <button
                key={attribute.id}
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-base text-text-main"
                onClick={() => onRemoveSelectedAttribute(attribute.id)}
              >
                <span>{attribute.name}</span>
                <FiX size={14} className="text-text-muted" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="my-8 border-t border-slate-200" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.isSpecialNeeds.label")}</h3>
          <div className="flex flex-wrap gap-2 py-1">
            {[true, false].map((option) => {
              const isActive = isSpecialNeeds === option;
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
                    setValue("is_special_needs", option, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("is_special_needs");
                  }}
                >
                  {t(option ? "createCarAd.fields.binaryOptions.yes" : "createCarAd.fields.binaryOptions.no")}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.isTaxi.label")}</h3>
          <div className="flex flex-wrap gap-2 py-1">
            {[true, false].map((option) => {
              const isActive = isTaxi === option;
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
                    setValue("is_taxi", option, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("is_taxi");
                  }}
                >
                  {t(option ? "createCarAd.fields.binaryOptions.yes" : "createCarAd.fields.binaryOptions.no")}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-main">{t("createCarAd.fields.isImported.label")}</h3>
          <div className="flex flex-wrap gap-2 py-1">
            {[true, false].map((option) => {
              const isActive = isImported === option;
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
                    setValue("is_imported", option, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    void trigger("is_imported");
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

export default FeaturesAttributesSection;
