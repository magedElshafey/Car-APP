import { MdOutlineDirectionsCarFilled } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CarDetailsNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="my-12 app-container">
      <div className="max-w-xl px-6 py-12 mx-auto text-center bg-white border border-dashed shadow-sm rounded-2xl border-stone-300">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-stone-100 text-stone-500">
          <MdOutlineDirectionsCarFilled size={30} aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">
          {t("carDetails.notFoundTitle")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          {t("carDetails.notFoundDescription")}
        </p>
        <Link
          to="/car-browse"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          {t("carDetails.backToBrowse")}
        </Link>
      </div>
    </div>
  );
};

export default CarDetailsNotFound;
