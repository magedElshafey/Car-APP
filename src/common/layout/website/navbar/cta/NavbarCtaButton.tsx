// import MainBtn from "@/common/components/buttons/MainBtn";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// const NavbarCtaButton: React.FC = () => {
//   const { t } = useTranslation();
//   return (
//     <Link to="/sell-your-car">
//       <MainBtn
//         variant="primary"
//         className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 !rounded-md"
//       >
//         {t("Selling my car")}
//       </MainBtn>
//     </Link>
//   );
// };
// export default NavbarCtaButton;
import MainBtn from "@/common/components/buttons/MainBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavbarCtaButton: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Link to="/create-car-ad">
      <MainBtn
        variant="primary"
        className="!rounded-full px-4 py-2 text-sm font-semibold shadow-sm"
      >
        {t("Selling my car")}
      </MainBtn>
    </Link>
  );
};

export default NavbarCtaButton;
