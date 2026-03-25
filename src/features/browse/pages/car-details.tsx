import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import useGetCar from "../hooks/use-get-car";

const CarDetails = () => {
    const { id = null } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: carResponse, isLoading } = useGetCar(id);
    const car = carResponse?.data;
    const [activeImage, setActiveImage] = useState(0);

    if (isLoading) {
        return (
            <div className="app-container my-12 flex items-center justify-center">
                <p className="text-sm text-stone-500">{t("carDetails.loading")}</p>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="app-container my-12 flex items-center justify-center">
                <p className="text-sm text-stone-500">{t("carDetails.notFound")}</p>
            </div>
        );
    }

    const images = car.images.length ? car.images : ["/images/cars/car-1.png"];
    const title = `${car.car.brand} ${car.car.model} ${car.car.year}`;

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
                            <a
                                href={`tel:${car.contact_phone}`}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                </svg>
                                {car.contact_phone}
                            </a>
                            {car.whatsapp_allowed && (
                                <a
                                    href={`https://wa.me/${car.contact_phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-500 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        <path d="M12.031 1.5C6.24 1.5 1.532 6.206 1.53 11.997c-.001 1.84.48 3.638 1.393 5.218L1.5 22.5l5.43-1.424a10.468 10.468 0 0 0 5.098 1.3h.004c5.789 0 10.496-4.707 10.497-10.498C22.53 6.11 17.823 1.502 12.031 1.5Zm0 19.23h-.003a8.7 8.7 0 0 1-4.432-1.212l-.318-.188-3.294.864.879-3.21-.207-.33a8.672 8.672 0 0 1-1.33-4.659c.001-4.793 3.903-8.694 8.7-8.694 2.324.001 4.508.907 6.151 2.552a8.643 8.643 0 0 1 2.547 6.145c-.002 4.794-3.904 8.695-8.693 8.695v-.963Zm4.77-6.513c-.262-.13-1.55-.763-1.79-.85-.24-.087-.414-.13-.589.13-.174.261-.675.85-.827 1.025-.152.174-.304.196-.566.065-.26-.13-1.1-.406-2.095-1.294-.775-.69-1.298-1.542-1.45-1.803-.152-.261-.016-.402.114-.532.117-.116.262-.304.392-.456.13-.152.174-.261.261-.435.087-.174.044-.326-.022-.456-.065-.13-.588-1.42-.807-1.945-.212-.511-.43-.442-.588-.45l-.502-.009c-.174 0-.456.065-.696.326-.239.261-.914.893-.914 2.18 0 1.286.937 2.528 1.067 2.703.13.174 1.843 2.813 4.467 3.945.624.27 1.111.43 1.49.55.626.2 1.196.171 1.646.104.502-.075 1.55-.634 1.768-1.247.218-.612.218-1.138.152-1.246-.065-.109-.24-.174-.501-.304Z" />
                                    </svg>
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
