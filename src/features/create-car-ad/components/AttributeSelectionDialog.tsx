import React from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import MainBtn from "@/common/components/buttons/MainBtn";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { HighlightType } from "@/features/browse/types/highlight-type.types";

type AttributeSelectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  highlightTypesLoading: boolean;
  sortedHighlightTypes: HighlightType[];
  draftAttributeIds: number[];
  onToggleDraftAttribute: (attributeId: number) => void;
  onApply: () => void;
  trigger: React.ReactNode;
};

const AttributeSelectionDialog: React.FC<AttributeSelectionDialogProps> = ({
  open,
  onOpenChange,
  highlightTypesLoading,
  sortedHighlightTypes,
  draftAttributeIds,
  onToggleDraftAttribute,
  onApply,
  trigger,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-3xl rounded-xl border border-slate-300 bg-white p-0">
        <div className="max-h-[420px] overflow-y-auto px-6 py-6">
          {highlightTypesLoading ? (
            <p className="text-sm text-text-muted">{t("createCarAd.attributes.loading")}</p>
          ) : !sortedHighlightTypes.length ? (
            <p className="text-sm text-text-muted">{t("createCarAd.attributes.empty")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {sortedHighlightTypes.map((attribute) => {
                const isSelected = draftAttributeIds.includes(attribute.id);

                return (
                  <button
                    key={attribute.id}
                    type="button"
                    onClick={() => onToggleDraftAttribute(attribute.id)}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-5 text-start transition-colors hover:bg-slate-50"
                  >
                    <span className="text-base text-text-main">{attribute.name}</span>
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
            {t("createCarAd.attributes.cancel")}
          </MainBtn>
          <MainBtn type="button" onClick={onApply}>
            {t("createCarAd.attributes.apply")}
          </MainBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AttributeSelectionDialog);
