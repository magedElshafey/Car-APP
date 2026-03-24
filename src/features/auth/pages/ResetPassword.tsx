import AuthCard from "../../../common/layout/auth/AuthCard";
import MainInput from "../../../common/components/inputs/MainInput";
import MainBtn from "../../../common/components/buttons/MainBtn";
import useResetPasswordLogic from "../logic/useResetPasswordLogic";
import { GoKey } from "react-icons/go";
import { useTranslation } from "react-i18next";
const ResetPassword = () => {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useResetPasswordLogic();
  const { t } = useTranslation();
  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password"
            label="password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password confirmation"
            label="password confirmation"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
        </div>
        <div className="w-full flex-center">
          <div className="w-full md:w-[180px]">
            <MainBtn
              type="submit"
              className="w-full flex-center text-nowrap"
              disabled={isPending}
            >
              {t("reassign password")}
            </MainBtn>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
