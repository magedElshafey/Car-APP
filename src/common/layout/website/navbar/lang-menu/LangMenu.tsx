// import { useLanguage } from "@/store/LanguageProvider";
// const NavbarLanguageToggle: React.FC = () => {
//   const { language, changeLanguage } = useLanguage();

//   return (
//     <button
//       onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
//       type="button"
//       className="
//         inline-flex items-center gap-1
//         rounded-pill border border-border-subtle
//         bg-bg-surface
//         px-3 py-1.5
//         text-xs font-medium text-text-muted
//         hover:bg-bg-page
//         focus-visible:outline-none
//         focus-visible:ring-2 focus-visible:ring-primary
//         focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
//       "
//       aria-label="Change language"
//     >
//       {language === "ar" ? " EN" : "AR"}

//       <span aria-hidden="true" className="text-[10px]">
//         ↓
//       </span>
//     </button>
//   );
// };
// export default NavbarLanguageToggle;
import { useLanguage } from "@/store/LanguageProvider";

type Props = {
  compact?: boolean;
};

const NavbarLanguageToggle: React.FC<Props> = ({ compact = false }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <button
      onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
      type="button"
      className={[
        "inline-flex items-center justify-center gap-1 rounded-full border border-border bg-surface text-sm font-semibold text-text-muted transition",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
        compact ? "h-10 min-w-10 px-3" : "h-10 min-w-[56px] px-3.5",
      ].join(" ")}
      aria-label="Change language"
    >
      <span>{language === "ar" ? "EN" : "AR"}</span>
      {!compact && (
        <span aria-hidden="true" className="text-[10px] opacity-70">
          ↓
        </span>
      )}
    </button>
  );
};

export default NavbarLanguageToggle;
