// MyProfile.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { useEffect } from "react";
import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useTranslation } from "react-i18next";
import useGetMyProfileData from "@/features/auth/api/useGetMyProfileData";
import useUpdateMyProfileLogic from "@/features/auth/logic/useUpdateMyProfileLogic";
import { updateProfileSchema, UpdateProfileFormValues } from "../schema/schema";
import useGetMyCars from "@/features/auth/api/useGetMyCars";
import BrowseCarsSkeleton from "@/features/browse/components/browse-cars-skeleton";
import BrowseCarCard from "@/features/browse/components/car-card";
const MyProfile = () => {
  const { data } = useGetMyProfileData();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const { onSubmit, isPending } = useUpdateMyProfileLogic();

  // sync data
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, [data, reset]);
  const { data: cars, isLoading } = useGetMyCars();

  return (
    <div className="py-10 space-y-4 app-container">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 border shadow-md bg-surface rounded-2xl border-border md:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center text-xl font-bold rounded-full w-14 h-14 bg-primary/10 text-primary">
              {data?.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text">
                {t("My Profile")}
              </h2>
              <p className="text-sm text-text-muted">
                {t("Manage your personal information")}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <MainInput
                label="user name"
                Icon={FiUser}
                {...register("name")}
                error={errors.name?.message}
              />

              <MainInput
                label="email"
                Icon={FiMail}
                {...register("email")}
                error={errors.email?.message}
              />

              <div className="md:col-span-2">
                <MainInput
                  label="phone"
                  Icon={FiPhone}
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-divider">
              <p className="text-xs text-text-muted">
                {isDirty
                  ? t("You have unsaved changes")
                  : t("All changes saved")}
              </p>

              <MainBtn type="submit" disabled={!isDirty || isPending}>
                {t("Save Changes")}
              </MainBtn>
            </div>
          </form>
        </div>
      </div>
      {isLoading ? (
        <BrowseCarsSkeleton />
      ) : cars && cars?.length ? (
        <div className="max-w-3xl mx-auto">
          <div className="p-6 border shadow-md bg-surface rounded-2xl border-border md:p-8">
            {/* Header */}
            <h2 className="mb-4 text-xl font-semibold text-text">
              {t("My cars")}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <BrowseCarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyProfile;
