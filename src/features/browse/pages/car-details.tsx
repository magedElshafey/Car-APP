import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdBrokenImage } from "react-icons/md";
import CarDetailsNotFound from "../components/car-details-not-found";
import CarDetailsSkeleton from "../components/car-details-skeleton";
import useGetCar from "../hooks/use-get-car";

const CarDetails = () => {
    const { id = null } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: carResponse, isLoading } = useGetCar(id);
    const car = carResponse?.data;
    const [activeImage, setActiveImage] = useState(0);
    const [sellerImageError, setSellerImageError] = useState(false);

    if (isLoading) {
        return <CarDetailsSkeleton />;
    }

    if (!car) {
        return <CarDetailsNotFound />;
    }

    const images = car.images.length ? car.images : ["/images/cars/car-1.png"];
    const title = `${car.car.brand} ${car.car.model} ${car.car.year}`;
    const sellerPhone = car.seller?.phone || car.contact_phone;
    const normalizedSellerPhone = sellerPhone.replace(/[^\d+]/g, "");
    const whatsappPhone = normalizedSellerPhone.replace(/^\+/, "");
    const hasSellerPhone = Boolean(whatsappPhone);

    const tableRows: { label: string; value: string }[] = [
        { label: t("carDetails.table.brand"), value: car.car.brand },
        { label: t("carDetails.table.publishedAt"), value: formatDate(car.created_at) },
        { label: t("carDetails.table.model"), value: car.car.model },
        ...(car.updated_at
            ? [{ label: t("carDetails.table.updatedAt"), value: formatDate(car.updated_at) }]
            : [{ label: "", value: "" }]),
        { label: t("carDetails.table.condition"), value: t(`createCarAd.fields.condition.options.${car.condition}`) },
        { label: t("carDetails.table.location"), value: car.city },
        { label: t("carDetails.table.color"), value: car.color },
        ...(car.car.trim ? [{ label: t("carDetails.table.trim"), value: car.car.trim }] : []),
        { label: t("carDetails.table.transmission"), value: car.transmission },
        { label: t("carDetails.table.fuelType"), value: car.fuel_type },
        { label: t("carDetails.table.year"), value: String(car.car.year) },
        ...(car.mileage_km ? [{ label: t("carDetails.table.mileage"), value: `${formatPrice(car.mileage_km, i18n.language)} ${t("km")}` }] : []),
        { label: t("carDetails.table.price"), value: `${formatPrice(Number(car.price), i18n.language)} ${t("EGP")}` },
    ];

    // Pair rows for 4-column table layout
    const pairedRows: { left: { label: string; value: string }; right: { label: string; value: string } | null }[] = [];
    for (let i = 0; i < tableRows.length; i += 2) {
        pairedRows.push({
            left: tableRows[i],
            right: tableRows[i + 1] ?? null,
        });
    }

    return (
        <div className="app-container my-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

                {/* ── Sidebar (contact card) ── */}
                <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="border-b border-stone-100 px-4 py-3 text-center font-semibold text-stone-800">
                            {t("carDetails.contact")}
                        </div>
                        <div className="space-y-3 p-4">
                            {car.seller ? (
                                <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-3">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-stone-500">
                                        {car.seller.image && !sellerImageError ? (
                                            <img
                                                src={car.seller.image}
                                                alt={car.seller.name}
                                                className="h-full w-full object-cover"
                                                onError={() => setSellerImageError(true)}
                                            />
                                        ) : (
                                            <MdBrokenImage size={24} aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                                            {t("carDetails.seller")}
                                        </p>
                                        <p className="line-clamp-1 text-sm font-semibold text-stone-900">
                                            {car.seller.name}
                                        </p>
                                        <p className="text-sm text-stone-500">{sellerPhone}</p>
                                    </div>
                                </div>
                            ) : null}
                            <a
                                href={hasSellerPhone ? `tel:${normalizedSellerPhone}` : undefined}
                                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                                    hasSellerPhone
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "cursor-not-allowed bg-stone-200 text-stone-500"
                                }`}
                                aria-disabled={!hasSellerPhone}
                            >
                                <FiPhoneCall size={16} />
                                {sellerPhone}
                            </a>
                            {car.whatsapp_allowed && (
                                <a
                                    href={hasSellerPhone ? `https://wa.me/${whatsappPhone}` : undefined}
                                    target={hasSellerPhone ? "_blank" : undefined}
                                    rel={hasSellerPhone ? "noopener noreferrer" : undefined}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                                        hasSellerPhone
                                            ? "border border-green-500 bg-green-50 text-green-700 hover:bg-green-100"
                                            : "cursor-not-allowed bg-stone-200 text-stone-500"
                                    }`}
                                    aria-disabled={!hasSellerPhone}
                                >
                                    <IoLogoWhatsapp size={17} />
                                    {t("carDetails.whatsapp")}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Financing summary card (sidebar) */}
                    {car.financing_available && car.financing && (
                        <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white">
                            <div className="border-b border-stone-100 px-4 py-3 font-semibold text-stone-800">
                                {t("carDetails.financing.title")}
                            </div>
                            <div className="divide-y divide-stone-100 text-sm">
                                {car.financing.down_payment && (
                                    <div className="flex items-center justify-between px-4 py-2.5">
                                        <span className="text-stone-500">{t("carDetails.financing.downPayment")}</span>
                                        <span className="font-medium text-stone-800">
                                            {formatPrice(Number(car.financing.down_payment), i18n.language)} {t("EGP")}
                                        </span>
                                    </div>
                                )}
                                {car.financing.duration_months && (
                                    <div className="flex items-center justify-between px-4 py-2.5">
                                        <span className="text-stone-500">{t("carDetails.financing.duration")}</span>
                                        <span className="font-medium text-stone-800">
                                            {car.financing.duration_months} {t("carDetails.financing.months")}
                                        </span>
                                    </div>
                                )}
                                {car.financing.monthly_installment && (
                                    <div className="flex items-center justify-between px-4 py-2.5">
                                        <span className="text-stone-500">{t("carDetails.financing.monthlyInstallment")}</span>
                                        <span className="font-medium text-stone-800">
                                            {formatPrice(Number(car.financing.monthly_installment), i18n.language)} {t("EGP")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </aside>

                {/* ── Main content ── */}
                <div className="min-w-0 flex-1 space-y-8">

                    {/* Image Gallery */}
                    <div className="space-y-3">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-100">
                            <img
                                src={images[activeImage]}
                                alt={title}
                                className="h-full w-full object-cover transition-opacity duration-200"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
                                {images.map((src, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                                            activeImage === idx
                                                ? "border-blue-500 ring-1 ring-blue-300"
                                                : "border-stone-200 hover:border-stone-400"
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt={`${title} ${idx + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Car title */}
                    <h1 className="text-2xl font-bold text-stone-900">{title}</h1>

                    {/* Details Table */}
                    <div className="overflow-hidden rounded-xl border border-stone-200">
                        <h2 className="border-b border-stone-200 bg-stone-50 px-4 py-3 text-base font-semibold text-stone-800">
                            {t("carDetails.pageTitle")}
                        </h2>
                        <table className="w-full text-sm">
                            <tbody>
                                {pairedRows.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? "bg-white" : "bg-stone-50"}
                                    >
                                        <td className="w-1/4 border-b border-stone-100 px-4 py-3 font-medium text-blue-600">
                                            {row.left.label}
                                        </td>
                                        <td className="w-1/4 border-b border-stone-100 px-4 py-3 text-stone-700">
                                            {row.left.value || "—"}
                                        </td>
                                        {row.right ? (
                                            <>
                                                <td className="w-1/4 border-b border-s border-stone-100 px-4 py-3 font-medium text-blue-600">
                                                    {row.right.label}
                                                </td>
                                                <td className="w-1/4 border-b border-stone-100 px-4 py-3 text-stone-700">
                                                    {row.right.value || "—"}
                                                </td>
                                            </>
                                        ) : (
                                            <td colSpan={2} className="border-b border-stone-100" />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Description */}
                    {car.description && (
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-stone-800">{t("carDetails.description")}</h2>
                            <p className="whitespace-pre-line leading-relaxed text-stone-600">{car.description}</p>
                        </div>
                    )}

                    {/* Features */}
                    {car.features.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-stone-800">{t("carDetails.features")}</h2>
                            {car.features.map((group, gIdx) => (
                                <div key={gIdx} className="space-y-2">
                                    {group.category && (
                                        <h3 className="text-sm font-medium text-stone-500">{group.category}</h3>
                                    )}
                                    <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                                        {group.options.map((option, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                                                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Highlights */}
                    {car.highlights.length > 0 && (
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-stone-800">{t("carDetails.highlights")}</h2>
                            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                                {car.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CarDetails;
