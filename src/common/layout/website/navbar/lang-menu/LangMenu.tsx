import { useLanguage } from "@/store/LanguageProvider";
const NavbarLanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <button
      onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
      type="button"
      className="
        inline-flex items-center gap-1
        rounded-pill border border-border-subtle
        bg-bg-surface
        px-3 py-1.5
        text-xs font-medium text-text-muted
        hover:bg-bg-page
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
      "
      aria-label="Change language"
    >
      {language === "ar" ? " EN" : "AR"}

      <span aria-hidden="true" className="text-[10px]">
        ↓
      </span>
    </button>
  );
};
export default NavbarLanguageToggle;
