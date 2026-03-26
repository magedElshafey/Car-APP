import useRegisterLogic from "../logic/useRegisterLogic";
import { useTranslation } from "react-i18next";
import AuthCard from "../../../common/layout/auth/AuthCard";
import MainInput from "../../../common/components/inputs/MainInput";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { CiUser } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
// import MainCheckInput from "../../../common/components/inputs/MainCheckInput";

const Register = () => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useRegisterLogic();
  const { t } = useTranslation();

  return (
    <AuthCard
      title="Create a new account"
      description="By logging in, you can use the site's features."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={CiUser}
            placeholder="user name"
            label="user name"
            enableAutocomplete
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="mb-4">
          <MainInput
            required={true}
            Icon={MdOutlinePhoneEnabled}
            placeholder="0574896520"
            label="phone"
            enableAutocomplete
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div className="mb-4">
          <MainInput
            required={true}
            Icon={MdOutlineEmail}
            placeholder="example@example.com"
            label="email"
            enableAutocomplete
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="gap-4 mb-4 grid-2">
          <MainInput
            required={true}
            Icon={GoKey}
            type="password"
            placeholder="password"
            label="password"
            error={errors.password?.message}
            {...register("password")}
          />
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
        {/* <MainCheckInput
          label={
            <div>
              <span className="me-1">{t("agree-on-terms-and-conditions")}</span>
              <span
                className="text-sm font-bold underline cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateClick();
                }}
              >
                {t("terms and conditions")}
              </span>
            </div>
          }
          control={control}
          name="agree_on_terms"
        /> */}
        <div className="w-full text-sm mb-7">
          <span className="text-gray">{t("have an account ?")}</span>
          <Link
            to="/auth/login"
            className="underline transition-colors duration-200 text-accent hover:text-accent-hover ms-1"
          >
            {t("login now")}
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full md:w-auto text-nowrap">
            <MainBtn
              type="submit"
              className="w-full flex items-center justify-center disabled:!pointer-events-auto"
              disabled={isPending}
            >
              {t("Create a new account")}
            </MainBtn>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default Register;
