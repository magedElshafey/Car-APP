import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainInput from "@/common/components/inputs/MainInput";
import useGetBrands from "@/features/browse/hooks/use-get-brands";
import useGetModels from "@/features/browse/hooks/use-get-models";

export type CarDetailsValue = {
  brand: string;
  model: string;
  year: string;
  trim_id: number | null;
};

type CarDetailsProps = CarDetailsValue & {
  onChange: (value: CarDetailsValue) => void;
};

const CarDetails: React.FC<CarDetailsProps> = ({
  brand,
  model,
  year,
  trim_id,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const { data: brands = [], isLoading: brandsLoading } = useGetBrands();

  const [opened, setOpened] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [draft, setDraft] = useState<CarDetailsValue>({
    brand,
    model,
    year,
    trim_id,
  });
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const { data: models = [], isLoading: modelsLoading } = useGetModels(
    selectedBrandId ? String(selectedBrandId) : undefined,
  );

  const arrowClass = i18n.dir() === "rtl" ? "rotate-180" : "rotate-0";

  useEffect(() => {
    if (!opened) {
      setDraft({ brand, model, year, trim_id });
      setBrandSearch("");
      setModelSearch("");
      setYearSearch("");
    }
  }, [brand, model, opened, trim_id, year]);

  useEffect(() => {
    if (!opened) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  useEffect(() => {
    if (!brands.length) return;
    const active = brands.find((item) => item.name === draft.brand);
    setSelectedBrandId(active?.id ?? null);
  }, [brands, draft.brand]);

  const filteredBrands = useMemo(() => {
    const keyword = brandSearch.trim().toLowerCase();
    if (!keyword) return brands;
    return brands.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [brandSearch, brands]);

  const filteredModels = useMemo(() => {
    const keyword = modelSearch.trim().toLowerCase();
    if (!keyword) return models;
    return models.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [modelSearch, models]);

  const selectedModelId = useMemo(() => {
    const matchedModel = models.find((item) => item.name === draft.model);
    return matchedModel?.id ?? null;
  }, [draft.model, models]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1970 + 1 }, (_, index) =>
      String(currentYear - index),
    );
  }, []);

  const filteredYears = useMemo(() => {
    const keyword = yearSearch.trim().toLowerCase();
    if (!keyword) return years;
    return years.filter((item) => item.toLowerCase().includes(keyword));
  }, [yearSearch, years]);

  const isEmptySelection = !brand && !model && !year;

  const triggerValue = [brand, model, year].filter(Boolean).join(" • ");

  return (
    <>
      <div className="w-full" onClick={() => setOpened(true)}>
        <MainInput
          label="createCarAd.carDetails.label"
          placeholder="createCarAd.carDetails.placeholder"
          value={triggerValue}
          readOnly
        />
      </div>

      {opened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpened(false)}
        >
          <div
            className={`w-full rounded-2xl border-none outline-none bg-white shadow-lg ${
              isEmptySelection ? "max-w-md p-0" : "max-w-2xl "
            }`}
            onClick={(event) => event.stopPropagation()}
          >
              <>
                <div className="border-none">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                      <div className="border-b border-slate-200 px-3 py-3 text-center">
                        <h4 className="text-2xl font-semibold text-text-main">
                          {t("createCarAd.carDetails.brands.title")}
                        </h4>
                      </div>

                      <div className="p-3">
                        <input
                          type="text"
                          value={brandSearch}
                          onChange={(event) => setBrandSearch(event.target.value)}
                          placeholder={t("createCarAd.carDetails.brands.search")}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                        />
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                        {brandsLoading ? (
                          <p className="p-4 text-sm text-text-muted">{t("createCarAd.carDetails.loading")}</p>
                        ) : filteredBrands.length ? (
                          filteredBrands.map((item) => {
                            const isActive = draft.brand === item.name;

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  const next = {
                                    ...draft,
                                    brand: item.name,
                                    model: "",
                                    year: "",
                                    trim_id: null,
                                  };
                                  setDraft(next);
                                  setSelectedBrandId(item.id);
                                  onChange(next);
                                }}
                                className={`group flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                                  isActive
                                    ? "bg-blue-100 text-text-main"
                                    : "hover:bg-slate-50 text-text-main"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isActive && (
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white text-blue-500">
                                      <FiCheck size={13} />
                                    </span>
                                  )}
                                  <span className="font-medium">{item.name}</span>
                                </div>

                                <FiChevronRight
                                  size={16}
                                  className={`opacity-0 transition-all group-hover:opacity-100 ${arrowClass}`}
                                />
                              </button>
                            );
                          })
                        ) : (
                          <p className="p-4 text-sm text-text-muted">{t("createCarAd.carDetails.empty")}</p>
                        )}
                      </div>
                    </div>

                    {selectedBrandId && (
                      <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                        <div className="border-b border-slate-200 px-3 py-3 text-center">
                          <h4 className="text-2xl font-semibold text-text-main">
                            {t("createCarAd.carDetails.models.title")}
                          </h4>
                        </div>

                        <div className="p-3">
                          <input
                            type="text"
                            value={modelSearch}
                            onChange={(event) => setModelSearch(event.target.value)}
                            placeholder={t("createCarAd.carDetails.models.search")}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                          />
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                          {modelsLoading ? (
                            <p className="p-4 text-sm text-text-muted">
                              {t("createCarAd.carDetails.loading")}
                            </p>
                          ) : filteredModels.length ? (
                            filteredModels.map((item) => {
                              const isActive = draft.model === item.name;

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => {
                                    const next = {
                                      ...draft,
                                      model: item.name,
                                      year: "",
                                      trim_id: null,
                                    };
                                    setDraft(next);
                                    onChange(next);
                                  }}
                                  className={`group flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                                    isActive
                                      ? "bg-blue-100 text-text-main"
                                      : "hover:bg-slate-50 text-text-main"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isActive && (
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white text-blue-500">
                                        <FiCheck size={13} />
                                      </span>
                                    )}
                                    <span className="font-medium">{item.name}</span>
                                  </div>
                                  <FiChevronRight
                                    size={16}
                                    className={`opacity-0 transition-all group-hover:opacity-100 ${arrowClass}`}
                                  />
                                </button>
                              );
                            })
                          ) : (
                            <p className="p-4 text-sm text-text-muted">{t("createCarAd.carDetails.empty")}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {draft.model && (
                      <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                        <div className="border-b border-slate-200 px-3 py-3 text-center">
                          <h4 className="text-2xl font-semibold text-text-main">
                            {t("createCarAd.carDetails.years.title")}
                          </h4>
                        </div>

                        <div className="p-3">
                          <input
                            type="text"
                            value={yearSearch}
                            onChange={(event) => setYearSearch(event.target.value)}
                            placeholder={t("createCarAd.carDetails.years.search")}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                          />
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                          {filteredYears.length ? (
                            filteredYears.map((item) => {
                              const isActive = draft.year === item;

                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => {
                                    const next = {
                                      ...draft,
                                      year: item,
                                      trim_id: selectedModelId,
                                    };
                                    setDraft(next);
                                    onChange(next);
                                  }}
                                  className={`group flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                                    isActive
                                      ? "bg-blue-100 text-text-main"
                                      : "hover:bg-slate-50 text-text-main"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isActive && (
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white text-blue-500">
                                        <FiCheck size={13} />
                                      </span>
                                    )}
                                    <span className="font-medium">{item}</span>
                                  </div>
                                  <FiChevronRight
                                    size={16}
                                    className={`opacity-0 transition-all group-hover:opacity-100 ${arrowClass}`}
                                  />
                                </button>
                              );
                            })
                          ) : (
                            <p className="p-4 text-sm text-text-muted">{t("createCarAd.carDetails.empty")}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-200 p-3">
                  <MainBtn
                    type="button"
                    className="w-full"
                    disabled={!draft.brand || !draft.model || !draft.year}
                    onClick={() => {
                      onChange(draft);
                      setOpened(false);
                    }}
                  >
                    {t("createCarAd.carDetails.done")}
                  </MainBtn>
                </div>
              </>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetails;