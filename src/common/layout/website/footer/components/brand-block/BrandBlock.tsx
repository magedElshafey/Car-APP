import Logo from "@/common/components/logo/Logo";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { useTranslation } from "react-i18next";

const BrandBlock: React.FC = () => {
  const { settings, isLoading } = useWebsiteSettings();
  const { t } = useTranslation();

  const slogan = settings?.app_slogan;
  const notEmergency = settings?.not_emergency;
  const forClinicians = settings?.for_clinicians;

  return (
    <section
      aria-label="About Wise Follow Up"
      className="flex flex-col gap-2 p-4 border rounded-card border-border-subtle bg-bg-page sm:p-5"
    >
      {/* Logo (fixed height → no CLS) */}
      <div className="lg:ms-[17px] h-11">
        <Logo src={"/images/footer-logo.png"} hasScale={true} />
      </div>

      {/* Slogan */}
      {isLoading ? (
        <div
          aria-hidden
          className="w-4/5 h-4 rounded bg-border-subtle animate-pulse"
        />
      ) : slogan ? (
        <p className="text-xs leading-relaxed md:text-sm text-text-muted">
          {slogan}
        </p>
      ) : null}

      {/* Info blocks */}
      {(isLoading || notEmergency || forClinicians) && (
        <div
          className="
            grid gap-3
            sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]
            text-xs
          "
        >
          {/* Not emergency */}
          <div className="space-y-1">
            <p className="font-medium text-text-main">
              {t("Not an emergency service")}
            </p>

            {isLoading ? (
              <>
                <div className="w-full h-3 rounded bg-border-subtle animate-pulse" />
                <div className="w-5/6 h-3 rounded bg-border-subtle animate-pulse" />
              </>
            ) : notEmergency ? (
              <p className="leading-relaxed text-text-muted">{notEmergency}</p>
            ) : null}
          </div>

          {/* For clinicians */}
          <div className="space-y-1">
            <p className="font-medium text-text-main">{t("For clinicians")}</p>

            {isLoading ? (
              <>
                <div className="w-full h-3 rounded bg-border-subtle animate-pulse" />
                <div className="w-4/6 h-3 rounded bg-border-subtle animate-pulse" />
              </>
            ) : forClinicians ? (
              <p className="leading-relaxed text-text-muted">{forClinicians}</p>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default BrandBlock;
