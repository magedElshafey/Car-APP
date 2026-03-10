import { useTranslation } from "react-i18next";
const CopyRight: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 pt-4 mt-6 border-t border-border-subtle md:flex-row md:items-center md:justify-between">
      {/* ================= LEFT ================= */}
      <div className="max-w-xl text-xs text-text-muted">
        {/* Copyright line (static → no CLS) */}
        <p className="mb-1">
          &copy; {year}{" "}
          <a
            className="font-medium underline text-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://qutell.com"
          >
            Qutell Technology
          </a>
          . {t("All rights reserved")}.
        </p>
      </div>
    </div>
  );
};

export default CopyRight;
