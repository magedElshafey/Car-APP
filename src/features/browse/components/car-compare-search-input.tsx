import MainInput from "@/common/components/inputs/MainInput";
import useGetBrands from "@/features/browse/hooks/use-get-brands";
import useGetModels from "@/features/browse/hooks/use-get-models";
import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { PaginatedResponse } from "@/types/Response";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { formatPrice } from "@/utils/formatPrice";
import { CarListing } from "../types/car.types";

interface CarCompareSearchInputProps {
  label: string;
  placeholder: string;
  selectedCar: CarListing | null;
  onSelect: (car: CarListing) => void;
}

const CarCompareSearchInput = ({
  label,
  placeholder,
  selectedCar,
  onSelect,
}: CarCompareSearchInputProps) => {
  const { t, i18n } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [carSearch, setCarSearch] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  const { data: brands = [], isLoading: brandsLoading } = useGetBrands();
  const { data: models = [], isLoading: modelsLoading } = useGetModels(
    selectedBrandId ? String(selectedBrandId) : undefined,
  );

  const { data: carsResponse, isLoading: carsLoading } = useQuery({
    queryKey: [apiRoutes.cars, "compare-dialog", selectedBrandId, selectedModelId],
    queryFn: async () => {
      const response = await Axios.get<PaginatedResponse<CarListing[]>>(
        apiRoutes.cars,
        {
          params: {
            brand: String(selectedBrandId),
            model: String(selectedModelId),
            per_page: 30,
          },
        },
      );

      return response.data;
    },
    enabled: Boolean(selectedBrandId && selectedModelId),
  });
  const cars = useMemo(() => carsResponse?.data || [], [carsResponse]);

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

  const filteredCars = useMemo(() => {
    const keyword = carSearch.trim().toLowerCase();
    if (!keyword) return cars;

    return cars.filter((item) => {
      const title = `${item.car.brand} ${item.car.model} ${item.car.year}`.toLowerCase();
      return title.includes(keyword);
    });
  }, [carSearch, cars]);

  const triggerValue = selectedCar
    ? `${selectedCar.car.brand} ${selectedCar.car.model} ${selectedCar.car.year}`
    : "";

  return (
    <>
      <div className="w-full max-w-xl" onClick={() => setOpened(true)}>
        <MainInput
          label={label}
          placeholder={placeholder}
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
            className="w-full max-w-5xl rounded-2xl bg-white shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                <div className="border-b border-slate-200 px-3 py-3 text-center">
                  <h4 className="text-2xl font-semibold text-text-main">{t("browse.filters.brand")}</h4>
                </div>

                <div className="p-3">
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(event) => setBrandSearch(event.target.value)}
                    placeholder={t("browse.filters.search.brand")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                  />
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                  {brandsLoading ? (
                    <p className="p-4 text-sm text-text-muted">{t("compare.loading")}</p>
                  ) : filteredBrands.length ? (
                    filteredBrands.map((item) => {
                      const isActive = selectedBrandId === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedBrandId(item.id);
                            setSelectedModelId(null);
                            setModelSearch("");
                            setCarSearch("");
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

                          <FiChevronRight size={16} className="opacity-0 transition-all group-hover:opacity-100" />
                        </button>
                      );
                    })
                  ) : (
                    <p className="p-4 text-sm text-text-muted">{t("compare.noResults")}</p>
                  )}
                </div>
              </div>

              {selectedBrandId && (
                <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                  <div className="border-b border-slate-200 px-3 py-3 text-center">
                    <h4 className="text-2xl font-semibold text-text-main">{t("browse.filters.model")}</h4>
                  </div>

                  <div className="p-3">
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(event) => setModelSearch(event.target.value)}
                      placeholder={t("browse.filters.search.model")}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                    />
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                    {modelsLoading ? (
                      <p className="p-4 text-sm text-text-muted">{t("compare.loading")}</p>
                    ) : filteredModels.length ? (
                      filteredModels.map((item) => {
                        const isActive = selectedModelId === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedModelId(item.id);
                              setCarSearch("");
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
                            <FiChevronRight size={16} className="opacity-0 transition-all group-hover:opacity-100" />
                          </button>
                        );
                      })
                    ) : (
                      <p className="p-4 text-sm text-text-muted">{t("compare.noResults")}</p>
                    )}
                  </div>
                </div>
              )}

              {selectedModelId && (
                <div className="min-w-0 flex-1 rounded-lg max-h-[500px] flex flex-col">
                  <div className="border-b border-slate-200 px-3 py-3 text-center">
                    <h4 className="text-2xl font-semibold text-text-main">{t("compare.cars")}</h4>
                  </div>

                  <div className="p-3">
                    <input
                      type="text"
                      value={carSearch}
                      onChange={(event) => setCarSearch(event.target.value)}
                      placeholder={t("compare.searchCar")}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                    />
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
                    {carsLoading ? (
                      <p className="p-4 text-sm text-text-muted">{t("compare.loading")}</p>
                    ) : filteredCars.length ? (
                      filteredCars.map((item) => {
                        const isActive = selectedCar?.id === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              onSelect(item);
                              setOpened(false);
                            }}
                            className={`group block w-full px-3 py-2 text-start text-sm transition-colors ${
                              isActive
                                ? "bg-blue-100 text-text-main"
                                : "hover:bg-slate-50 text-text-main"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium">
                                {item.car.brand} {item.car.model} {item.car.year}
                              </p>
                              {isActive && (
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white text-blue-500">
                                  <FiCheck size={13} />
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-stone-600">
                              {formatPrice(Number(item.price), i18n.language)} {t("EGP")}
                            </p>
                          </button>
                        );
                      })
                    ) : (
                      <p className="p-4 text-sm text-text-muted">{t("compare.noResults")}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCompareSearchInput;
