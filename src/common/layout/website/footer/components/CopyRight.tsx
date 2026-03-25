import React from "react";
import { useTranslation } from "react-i18next";

const CopyRight: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 pt-5 border-t  border-border/80 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-text-muted">
        &copy; {year}{" "}
        <a
          className="font-medium underline rounded-sm  text-primary underline-offset-4 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          target="_blank"
          rel="noopener noreferrer"
          href="https://qutell.com"
        >
          Qutell Technology
        </a>{" "}
        · {t("All rights reserved")}.
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
        <a
          href="/terms"
          className="transition-colors rounded-sm  hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {t("terms and conditions")}
        </a>

        <a
          href="/privacy-policy"
          className="transition-colors rounded-sm  hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {t("privacy policy")}
        </a>
      </div>
    </div>
  );
};

export default React.memo(CopyRight);
