import React from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import MainBtn from "@/common/components/buttons/MainBtn";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { CarFeature, GroupedCarFeature } from "@/features/browse/types/car-feature.types";

type FeatureSelectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureCategories: Array<[string, GroupedCarFeature]>;
  activeFeatureCategory: string;
  onActiveFeatureCategoryChange: (categoryName: string) => void;
  activeFeatures: CarFeature[];
  carFeaturesLoading: boolean;
  draftFeatureIds: number[];
  onToggleDraftFeature: (featureId: number) => void;
  onApply: () => void;
  trigger: React.ReactNode;
};

const FeatureSelectionDialog: React.FC<FeatureSelectionDialogProps> = ({
  open,
  onOpenChange,
  featureCategories,
  activeFeatureCategory,
  onActiveFeatureCategoryChange,
  activeFeatures,
  carFeaturesLoading,
  draftFeatureIds,
  onToggleDraftFeature,
  onApply,
  trigger,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-5xl rounded-xl border border-slate-300 bg-white p-0">
        <div className="px-6 pt-6">
          <div className="flex flex-wrap gap-6 border-b border-slate-200">
            {featureCategories.map(([categoryName]) => {
              const isActive = activeFeatureCategory === categoryName;
              return (
                <button
                  key={categoryName}
                  type="button"
                  onClick={() => onActiveFeatureCategoryChange(categoryName)}
                  className={`-mb-px border-b-2 pb-3 text-base transition-colors ${
                    isActive
                      ? "border-blue-600 font-semibold text-blue-700"
                      : "border-transparent text-text-muted hover:text-text-main"
                  }`}
                >
                  {categoryName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-6 py-4">
          {carFeaturesLoading ? (
            <p className="text-sm text-text-muted">{t("createCarAd.features.loading")}</p>
          ) : !featureCategories.length ? (
            <p className="text-sm text-text-muted">{t("createCarAd.features.empty")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {activeFeatures.map((feature) => {
                const isSelected = draftFeatureIds.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => onToggleDraftFeature(feature.id)}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-5 text-start transition-colors hover:bg-slate-50"
                  >
                    <span className="text-base text-text-main">{feature.name}</span>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <FiCheck size={13} className="text-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <MainBtn type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("createCarAd.features.cancel")}
          </MainBtn>
          <MainBtn type="button" onClick={onApply}>
            {t("createCarAd.features.apply")}
          </MainBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(FeatureSelectionDialog);
