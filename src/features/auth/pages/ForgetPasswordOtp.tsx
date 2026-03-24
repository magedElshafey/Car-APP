import AuthCard from "../../../common/layout/auth/AuthCard";
import MainInput from "../../../common/components/inputs/MainInput";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../store/LanguageProvider";
import useForgetPasswordOtpLogic from "../logic/useForgetPasswordOtpLogic";
import { useTranslation } from "react-i18next";
const ForgetPasswordOtp = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useForgetPasswordOtpLogic();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const { t } = useTranslation();
  return (
    <AuthCard
      title="Password recovery"
      description="Enter the code sent to your email"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            type="text"
            required={true}
            placeholder="code"
            label="code"
            enableAutocomplete
            {...register("code")}
            error={errors.code?.message}
          />
        </div>
        <div className="w-full flex-center">
          <div className="w-full md:w-[180px] flex gap-2">
            {isRTL ? (
              <>
                <MainBtn
                  type="submit"
                  className="flex-1 flex-center"
                  disabled={isPending}
                >
                  <p>{t("next")}</p>
                </MainBtn>
                <MainBtn
                  type="button"
                  onClick={() => navigate("/auth/forget-password")}
                  className="flex-1 flex-center"
                  variant="outline"
                >
                  <p>{t("back")}</p>
                  <IoArrowBack size={18} />
                </MainBtn>
              </>
            ) : (
              <>
                <MainBtn
                  type="button"
                  onClick={() => navigate("/auth/forget-password")}
                  className="flex-1 flex-center"
                  variant="outline"
                >
                  <p>{t("back")}</p>
                  <IoArrowBack size={18} />
                </MainBtn>
                <MainBtn
                  type="submit"
                  className="flex-1 flex-center"
                  disabled={isPending}
                >
                  {t("next")}
                </MainBtn>
              </>
            )}
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgetPasswordOtp;
