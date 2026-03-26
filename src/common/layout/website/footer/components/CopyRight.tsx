import React from "react";
import { useTranslation } from "react-i18next";
import useGetAllStaticPages from "@/features/static-pages/api/useGetAllStaticPages";
import { Link } from "react-router-dom";
const CopyRight: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetAllStaticPages();

  return (
    <div className="flex flex-col gap-3 pt-5 border-t border-border/80 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-text-muted">
        &copy; {year}{" "}
        <a
          className="font-medium underline rounded-sm text-primary underline-offset-4 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          target="_blank"
          rel="noopener noreferrer"
          href="https://qutell.com"
        >
          Qutell Technology
        </a>{" "}
        · {t("All rights reserved")}.
      </p>
      {isLoading ? (
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Skeleton Link 1 */}
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />

          {/* Skeleton Link 2 */}
          <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
        </div>
      ) : isError || !data?.length ? null : (
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          {data?.map((item) => (
            <Link
              key={item?.id}
              to={`/static/${item?.slug}`}
              className="transition-colors rounded-sm hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(CopyRight);
