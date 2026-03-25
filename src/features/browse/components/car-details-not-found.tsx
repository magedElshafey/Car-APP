import { MdOutlineDirectionsCarFilled } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CarDetailsNotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="app-container my-12">
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                    <MdOutlineDirectionsCarFilled size={30} aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900">{t("carDetails.notFoundTitle")}</h1>
                <p className="mt-3 text-sm leading-6 text-stone-500">{t("carDetails.notFoundDescription")}</p>
                <Link
                    to="/cars"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    {t("carDetails.backToBrowse")}
                </Link>
            </div>
        </div>
    );
};

export default CarDetailsNotFound;