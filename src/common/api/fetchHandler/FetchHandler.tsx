import Skeleton from "@/common/components/loader/skeltons/Skeleton";
import Loader from "@/common/components/loader/spinner/Loader";
import { useTranslation } from "react-i18next";
import { SkeletonType } from "../../../types/SkeltonType";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

interface FetchHandlerProps {
  children: React.ReactNode | null;
  queryResult: any;
  skeletonType: SkeletonType;
  loadingType?: "skeleton" | "loader";
}

const FetchHandler: React.FC<FetchHandlerProps> = ({
  children,
  queryResult,
  skeletonType,
  loadingType = "skeleton",
}) => {
  const { isLoading, isError, isSuccess, refetch } = queryResult;
  const { t } = useTranslation();

  // لو مفيش تحميل، ولا خطأ، ولا محتوى → متعملش render خالص
  if (!isLoading && !isError && isSuccess && !children) {
    return null;
  }

  return (
    <section className="relative w-full">
      {/* LOADING */}
      {isLoading && (
        <>
          {loadingType === "skeleton" ? (
            <Skeleton type={skeletonType} />
          ) : (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          )}
        </>
      )}

      {/* ERROR */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <IoAlertCircleOutline className="w-10 h-10 text-red-600" />
          <p className="font-medium text-center text-red-700">
            {t("Something went wrong")}
          </p>
          <button
            onClick={() => refetch?.()}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
          >
            <FiRefreshCcw className="w-4 h-4" />
            {t("Retry")}
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {isSuccess && children}
    </section>
  );
};

export default FetchHandler;
