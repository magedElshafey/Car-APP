import { useTranslation } from "react-i18next";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
const ResetPasswordSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div className="flex flex-col items-center w-full text-center">
      <header className="mb-7">
        <h1 className="text-xl font-bold text-primary ">
          {t("Password changed successfully")}
        </h1>

        <p className="mt-2 text-sm text-text-muted">
          {t("Keep your password confidential")}
        </p>
      </header>
      <div className="flex items-center justify-center w-full text-nowrap">
        <MainBtn variant="primary" onClick={handleClick} type="button">
          {t("Home")}
        </MainBtn>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
