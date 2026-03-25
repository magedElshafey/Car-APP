import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";

type CarImagesUploadProps = {
  files: File[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  error?: string;
  maxImages?: number;
};

type PreviewImage = {
  name: string;
  url: string;
};

const CarImagesUpload: React.FC<CarImagesUploadProps> = ({
  files,
  onChange,
  onRemove,
  error,
  maxImages = 20,
}) => {
  const { t } = useTranslation();
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const hasError = Boolean(error);

  useEffect(() => {
    const nextPreviewImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(nextPreviewImages);

    return () => {
      nextPreviewImages.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [files]);

  const remainingSlots = maxImages - files.length;

  return (
    <section className="rounded-card rounded-2xl border border-slate-300 bg-bg-surface p-6 shadow-soft md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-text-main">
            {t("createCarAd.images.title")}
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {t("createCarAd.images.description")}
          </p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {files.length} / {maxImages}
        </div>
      </div>

      {!files.length ? (
        <label className={`flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed px-6 text-center transition ${
          hasError
            ? "border-red-400 bg-red-50/40"
            : "border-primary/30 bg-slate-50 hover:border-primary hover:bg-primary/5"
        }`}>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onChange}
          />
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-soft">
            <FiUploadCloud size={34} />
          </div>
          <h3 className="text-lg font-semibold text-text-main">
            {t("createCarAd.images.emptyTitle")}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
            {t("createCarAd.images.emptyDescription")}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft">
            <FiPlus size={18} />
            {t("createCarAd.images.uploadButton")}
          </span>
          {hasError && (
            <p className="mt-3 text-xs font-medium text-red-500">
              {t(error as string)}
            </p>
          )}
        </label>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {previewImages.map((image, index) => (
              <div
                key={`${image.name}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-300 bg-slate-100"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-soft transition hover:scale-105"
                  aria-label={t("createCarAd.images.removeAriaLabel", {
                    imageName: image.name,
                  })}
                >
                  <FiTrash2 size={16} />
                </button>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8 text-xs text-white">
                  <p className="truncate">{image.name}</p>
                </div>
              </div>
            ))}

            {remainingSlots > 0 && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center transition hover:border-primary hover:bg-primary/10">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onChange}
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-soft">
                  <FiPlus size={20} />
                </span>
                <span className="mt-4 text-sm font-semibold text-primary">
                  {t("createCarAd.images.addMore")}
                </span>
                <span className="mt-1 text-xs text-text-muted">
                  {t("createCarAd.images.remaining", { count: remainingSlots })}
                </span>
              </label>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-text-muted">
            <p>{t("createCarAd.images.helper")}</p>
            {remainingSlots > 0 && (
              <label className="cursor-pointer font-semibold text-primary">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onChange}
                />
                {t("createCarAd.images.addImages")}
              </label>
            )}
          </div>
        </div>
      )}

      <div
        className={`overflow-hidden transition-all duration-300 ${
          error ? "mt-3 max-h-10 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs text-red-500">{error ? t(error) : ""}</p>
      </div>
    </section>
  );
};

export default CarImagesUpload;