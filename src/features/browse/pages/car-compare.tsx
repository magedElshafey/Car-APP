import useGetCarFeatures from "@/features/browse/hooks/use-get-car-features";
import useGetHighlightTypes from "@/features/browse/hooks/use-get-highlight-types";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo, useState, FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiX } from "react-icons/fi";
import CarCompareSearchInput from "../components/car-compare-search-input.tsx";
import { CarDetails } from "../types/car.types";
import useGetCarById from "@/features/browse/hooks/useGetCarById.tsx";

const CompareCarHeader: FC<{
  car: CarDetails | null;
  title: string;
  isLoading?: boolean;
}> = ({ car, title, isLoading }) => {
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <div className="overflow-hidden bg-white border rounded-2xl border-stone-200 animate-pulse">
        <div className="px-5 py-3 text-sm font-semibold text-center border-b border-stone-100 text-stone-500">
          {title}
        </div>
        <div className="flex flex-col items-center justify-center h-56 px-5 py-4 text-center">
          <div className="w-24 h-24 mb-3 rounded bg-stone-200" />
          <div className="w-32 h-6 mb-2 rounded bg-stone-200" />
          <div className="w-20 h-4 rounded bg-stone-200" />
        </div>
      </div>
    );
  }

  const image = car?.images?.[0] || "/images/cars/car-1.png";

  return (
    <div className="overflow-hidden bg-white border rounded-2xl border-stone-200">
      <div className="px-5 py-3 text-sm font-semibold text-center border-b border-stone-100 text-stone-500">
        {title}
      </div>
      <div className="flex flex-col items-center justify-center h-56 px-5 py-4 text-center">
        {car ? (
          <>
            <img
              src={image}
              alt={`${car.car.brand} ${car.car.model}`}
              className="object-contain w-auto h-24 mx-auto mb-3"
            />
            <p className="text-2xl font-extrabold text-stone-900">
              {car.car.brand} {car.car.model} {car.car.year}
            </p>
            <p className="mt-2 text-sm font-semibold text-stone-700">
              {t("compare.startsFrom")}{" "}
              {formatPrice(Number(car.price), i18n.language)} {t("EGP")}
            </p>
          </>
        ) : (
          <p className="text-sm text-stone-500">{t("compare.pickCarHint")}</p>
        )}
      </div>
    </div>
  );
};

const PresenceIcon = ({ active }: { active: boolean }) => {
  return active ? (
    <FiCheck className="mx-auto text-emerald-600" size={18} />
  ) : (
    <FiX className="mx-auto text-rose-600" size={18} />
  );
};

const normalize = (value?: string | null) =>
  (value || "-").toString().trim() || "-";

const boolToLabel = (value: boolean | undefined, t: (key: string) => string) =>
  value ? t("compare.yes") : t("compare.no");

const CarComparePage = () => {
  const { t, i18n } = useTranslation();
  const [leftCar, setLeftCar] = useState<CarDetails | null>(null);
  const [rightCar, setRightCar] = useState<CarDetails | null>(null);

  const { data: groupedFeatures = {} } = useGetCarFeatures();
  const { data: highlightTypes = [] } = useGetHighlightTypes();
  const {
    data: leftCarData,
    refetch: refetchLeftCar,
    isFetching: isLeftFetching,
  } = useGetCarById(leftCar?.id);
  const {
    data: rightCarData,
    refetch: refetchRightCar,
    isFetching: isRightFetching,
  } = useGetCarById(rightCar?.id);
  useEffect(() => {
    if (leftCar?.id) refetchLeftCar();
    if (rightCar?.id) refetchRightCar();
  }, [
    i18n.language,
    leftCar?.id,
    rightCar?.id,
    refetchLeftCar,
    refetchRightCar,
  ]);
  const leftCarFinal = leftCarData || leftCar;
  const rightCarFinal = rightCarData || rightCar;
  const basicRows = useMemo(() => {
    return [
      {
        id: "price",
        label: t("compare.price"),
        left: leftCarFinal ? `${leftCarFinal.price} ${t("EGP")}` : "-",
        right: rightCarFinal ? `${rightCarFinal?.price} ${t("EGP")}` : "-",
      },
      {
        id: "condition",
        label: t("compare.condition"),
        left: normalize(leftCarFinal?.details?.condition_label),
        right: normalize(rightCarFinal?.details?.condition_label),
      },
      {
        id: "transmission",
        label: t("compare.transmission"),
        left: normalize(leftCarFinal?.details?.transmission_label),
        right: normalize(rightCarFinal?.details?.transmission_label),
      },
      {
        id: "fuel",
        label: t("compare.fuelType"),
        left: normalize(leftCarFinal?.details?.fuel_type_label),
        right: normalize(rightCarFinal?.details?.fuel_type_label),
      },
      {
        id: "color",
        label: t("compare.color"),
        left: normalize(leftCarFinal?.details?.color_label),
        right: normalize(rightCarFinal?.details?.color_label),
      },
      {
        id: "mileage",
        label: t("compare.mileage"),
        left: leftCarFinal
          ? `${leftCarFinal?.details?.mileage_km} ${t("km")}`
          : "-",
        right: rightCarFinal
          ? `${rightCarFinal?.details?.mileage_km} ${t("km")}`
          : "-",
      },
      {
        id: "city",
        label: t("compare.city"),
        left: normalize(leftCarFinal?.city),
        right: normalize(rightCarFinal?.city),
      },
      {
        id: "imported",
        label: t("compare.imported"),
        left: boolToLabel(leftCarFinal?.details?.is_imported, t),
        right: boolToLabel(rightCarFinal?.details?.is_imported, t),
      },
      {
        id: "taxi",
        label: t("compare.taxi"),
        left: boolToLabel(leftCarFinal?.details?.is_taxi, t),
        right: boolToLabel(rightCarFinal?.details?.is_taxi, t),
      },
      {
        id: "special-needs",
        label: t("compare.specialNeeds"),
        left: boolToLabel(leftCarFinal?.details?.is_special_needs, t),
        right: boolToLabel(rightCarFinal?.details?.is_special_needs, t),
      },
      {
        id: "whatsapp",
        label: t("compare.whatsappAllowed"),
        left: boolToLabel(leftCarFinal?.whatsapp_allowed, t),
        right: boolToLabel(rightCarFinal?.whatsapp_allowed, t),
      },
    ];
  }, [leftCarFinal, rightCarFinal, t]);

  const featureNames = useMemo(() => {
    return Object.values(groupedFeatures).flatMap((group) =>
      group.features.map((feature) => feature.name),
    );
  }, [groupedFeatures]);

  const highlightNames = useMemo(() => {
    return highlightTypes.map((item) => item.name);
  }, [highlightTypes]);

  const leftFeatureSet = useMemo(() => {
    return new Set((leftCar?.features || []).flatMap((group) => group.options));
  }, [leftCar]);

  const rightFeatureSet = useMemo(() => {
    return new Set(
      (rightCar?.features || []).flatMap((group) => group.options),
    );
  }, [rightCar]);

  const leftHighlightSet = useMemo(() => {
    return new Set(leftCar?.highlights || []);
  }, [leftCar]);

  const rightHighlightSet = useMemo(() => {
    return new Set(rightCar?.highlights || []);
  }, [rightCar]);

  return (
    <section className="py-8 app-container">
      <div className="mx-auto space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
            {t("compare.title")}
          </h1>
          <p className="mt-2 text-sm text-stone-600 md:text-base">
            {t("compare.subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-start justify-around gap-4 md:flex-row md:gap-6">
          <CarCompareSearchInput
            label={t("compare.firstCar")}
            placeholder={t("compare.searchPlaceholder")}
            selectedCar={leftCar}
            onSelect={setLeftCar}
          />
          <CarCompareSearchInput
            label={t("compare.secondCar")}
            placeholder={t("compare.searchPlaceholder")}
            selectedCar={rightCar}
            onSelect={setRightCar}
          />
        </div>

        <div className="p-4 bg-white border rounded-2xl border-stone-200 lg:p-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="hidden lg:block" />
            <CompareCarHeader
              car={leftCarFinal}
              title={t("compare.firstCar")}
              isLoading={isLeftFetching}
            />
            <CompareCarHeader
              car={rightCarFinal}
              title={t("compare.secondCar")}
              isLoading={isRightFetching}
            />
          </div>

          <div className="mt-5 overflow-hidden bg-white border rounded-2xl border-stone-200">
            <div className="grid grid-cols-1 border-b border-stone-200 bg-stone-50 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="px-4 py-3 text-sm font-bold tracking-wide uppercase text-stone-500">
                {t("compare.basicAttributes")}
              </div>
              <div />
              <div />
            </div>
            {basicRows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 border-b border-stone-100 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="px-4 py-3 font-semibold text-stone-700">
                  {row.label}
                </div>
                <div className="px-4 py-3 font-medium text-center text-stone-800">
                  {row.left}
                </div>
                <div className="px-4 py-3 font-medium text-center text-stone-800">
                  {row.right}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 border-b border-t border-stone-200 bg-stone-50 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="px-4 py-3 text-sm font-bold tracking-wide uppercase text-stone-500">
                {t("compare.highlights")}
              </div>
              <div />
              <div />
            </div>
            {highlightNames.map((name) => (
              <div
                key={name}
                className="grid grid-cols-1 border-b border-stone-100 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="px-4 py-3 font-semibold text-stone-700">
                  {name}
                </div>
                <div className="px-4 py-3">
                  <PresenceIcon active={leftHighlightSet.has(name)} />
                </div>
                <div className="px-4 py-3">
                  <PresenceIcon active={rightHighlightSet.has(name)} />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 border-b border-t border-stone-200 bg-stone-50 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="px-4 py-3 text-sm font-bold tracking-wide uppercase text-stone-500">
                {t("compare.features")}
              </div>
              <div />
              <div />
            </div>
            {featureNames.map((name) => (
              <div
                key={name}
                className="grid grid-cols-1 border-b border-stone-100 last:border-b-0 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="px-4 py-3 font-semibold text-stone-700">
                  {name}
                </div>
                <div className="px-4 py-3">
                  <PresenceIcon active={leftFeatureSet.has(name)} />
                </div>
                <div className="px-4 py-3">
                  <PresenceIcon active={rightFeatureSet.has(name)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarComparePage;
