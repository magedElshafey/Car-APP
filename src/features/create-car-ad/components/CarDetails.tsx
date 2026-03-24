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
};

type CarDetailsProps = CarDetailsValue & {
  onChange: (value: CarDetailsValue) => void;
};

const CarDetails: React.FC<CarDetailsProps> = ({
  brand,
  model,
  year,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const { data: brands = [], isLoading: brandsLoading } = useGetBrands();

  const [opened, setOpened] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [draft, setDraft] = useState<CarDetailsValue>({ brand, model, year });
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const { data: models = [], isLoading: modelsLoading } = useGetModels(
    selectedBrandId ? String(selectedBrandId) : undefined,
  );

  const arrowClass = i18n.dir() === "rtl" ? "rotate-180" : "rotate-0";

  useEffect(() => {
    if (!opened) {
      setDraft({ brand, model, year });
      setBrandSearch("");
      setModelSearch("");
      setYearSearch("");
    }
  }, [brand, model, opened, year]);

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
          label="Car details"
          placeholder="Choose brand, model, and year"
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
                          {t("Brands")}
                        </h4>
                      </div>

                      <div className="p-3">
                        <input
                          type="text"
                          value={brandSearch}
                          onChange={(event) => setBrandSearch(event.target.value)}
                          placeholder={t("Search brand")}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                        />
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                        {brandsLoading ? (
                          <p className="p-4 text-sm text-text-muted">{t("Loading...")}</p>
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
                          <p className="p-4 text-sm text-text-muted">{t("no data")}</p>
                        )}
                      </div>
                    </div>

                    {selectedBrandId && (
                      <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                        <div className="border-b border-slate-200 px-3 py-3 text-center">
                          <h4 className="text-2xl font-semibold text-text-main">
                            {t("Models")}
                          </h4>
                        </div>

                        <div className="p-3">
                          <input
                            type="text"
                            value={modelSearch}
                            onChange={(event) => setModelSearch(event.target.value)}
                            placeholder={t("Search models")}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                          />
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                          {modelsLoading ? (
                            <p className="p-4 text-sm text-text-muted">
                              {t("Loading...")}
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
                            <p className="p-4 text-sm text-text-muted">{t("no data")}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {draft.model && (
                      <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                        <div className="border-b border-slate-200 px-3 py-3 text-center">
                          <h4 className="text-2xl font-semibold text-text-main">
                            {t("Years")}
                          </h4>
                        </div>

                        <div className="p-3">
                          <input
                            type="text"
                            value={yearSearch}
                            onChange={(event) => setYearSearch(event.target.value)}
                            placeholder={t("Search years")}
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
                                    const next = { ...draft, year: item };
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
                            <p className="p-4 text-sm text-text-muted">{t("no data")}</p>
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
                    {t("Done")}
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