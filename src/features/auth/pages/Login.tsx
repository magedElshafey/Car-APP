import { Link } from "react-router-dom";
import MainInput from "../../../common/components/inputs/MainInput";
import MainCheckInput from "../../../common/components/inputs/MainCheckInput";
import AuthCard from "../../../common/layout/auth/AuthCard";
import { GoKey } from "react-icons/go";
import { useTranslation } from "react-i18next";
import "../style/login-form.css";
import MainBtn from "../../../common/components/buttons/MainBtn";
import useLoginLogic from "../logic/useLoginLogic";
import { MdOutlinePhoneEnabled } from "react-icons/md";

const Login = () => {
  const { t } = useTranslation();
  const { errors, register, onSubmit, handleSubmit, isPending, control } =
    useLoginLogic();

  return (
    <AuthCard
      title="login"
      description="By logging in, you can use the site's features."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8"
      >
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={MdOutlinePhoneEnabled}
            placeholder="01XXXXXXXXX"
            label="phone"
            enableAutocomplete
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
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
        <div className="flex items-center justify-between w-full mb-4">
          <Link className="text-sm text-danger" to="/auth/forget-password">
            {t("forget password?")}
          </Link>
          <MainCheckInput
            label="remember me"
            control={control}
            name="rememberMe"
          />
        </div>
        <div className="flex items-center justify-center w-full mb-7 sm:mb-8 md:mb-9 lg:mb-10">
          <div className="w-full md:w-[150px]">
            <MainBtn
              type="submit"
              className="flex items-center justify-center w-full"
              disabled={isPending}
            >
              {t("login")}
            </MainBtn>
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-2 text-sm">
          <span className="text-muted">{t("don't have an account ?")}</span>
          <Link
            to="/auth/register"
            className="underline transition-colors duration-200 text-accent hover:text-accent-hover"
          >
            {t("create an account")}
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;
