import MainBtn from "@/common/components/buttons/MainBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const NavbarCtaButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Link to="/leaflets">
      <MainBtn
        variant="primary"
        className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
      >
        {t("Browse leaflets")}
      </MainBtn>
    </Link>
  );
};
export default NavbarCtaButton;
