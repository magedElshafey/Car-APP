import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useTranslation } from "react-i18next";
import useGetMyProfileData from "@/features/auth/api/useGetMyProfileData";
import useUpdateMyProfileLogic from "@/features/auth/logic/useUpdateMyProfileLogic";
import { updateProfileSchema, UpdateProfileFormValues } from "../schema/schema";
import useGetMyCars from "@/features/auth/api/useGetMyCars";
import BrowseCarCard from "@/features/browse/components/car-card";
import useGetMyFavs from "@/features/auth/api/useGetMyFavs";
/* ================= UI HELPERS ================= */

const Tabs = ({ active, setActive, t }: any) => {
  const tabs = [
    { key: "profile", label: t("My Profile") },
    { key: "cars", label: t("My Cars") },
    { key: "favs", label: t("My Favourites") },
  ];

  return (
    <div className="flex w-full gap-2 p-1 overflow-x-auto bg-zinc-100 dark:bg-zinc-800 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActive(tab.key)}
          className={`flex-1 min-w-fit px-4 py-2 text-sm font-medium rounded-lg transition ${
            active === tab.key
              ? "bg-white dark:bg-zinc-900 shadow text-primary"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
);

const GridSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const ProfileHeader = ({ name }: { name?: string }) => {
  const { t } = useTranslation();
  const initials = useMemo(() => name?.charAt(0)?.toUpperCase() || "U", [name]);

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center font-bold text-white rounded-full shadow w-14 h-14 bg-gradient-to-br from-primary to-primary/60">
        {initials}
      </div>

      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {t("My Profile")}
        </h1>
        <p className="text-sm text-zinc-500">
          {t("Manage your personal information")}
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

const MyProfile = () => {
  const { t } = useTranslation();
  const { data } = useGetMyProfileData();
  const { onSubmit, isPending } = useUpdateMyProfileLogic();

  const [activeTab, setActiveTab] = useState("profile");

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, [data, reset]);

  const { data: cars, isLoading: carsLoading } = useGetMyCars();
  const { data: favs, isLoading: favsLoading } = useGetMyFavs();

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Tabs active={activeTab} setActive={setActiveTab} t={t} />

        <div className="p-6 bg-white border shadow-sm dark:bg-zinc-900 md:p-8 rounded-2xl border-zinc-200 dark:border-zinc-800">
          <AnimatePresence mode="wait">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileHeader name={data?.name} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <MainInput
                      label={t("User Name")}
                      Icon={FiUser}
                      {...register("name")}
                      error={errors.name?.message}
                    />

                    <MainInput
                      label={t("Email")}
                      Icon={FiMail}
                      {...register("email")}
                      error={errors.email?.message}
                    />

                    <div className="md:col-span-2">
                      <MainInput
                        label={t("Phone")}
                        Icon={FiPhone}
                        {...register("phone")}
                        error={errors.phone?.message}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-4 border-t md:flex-row md:items-center md:justify-between">
                    <p className="text-xs text-zinc-500">
                      {isDirty
                        ? t("You have unsaved changes")
                        : t("All changes saved")}
                    </p>

                    <MainBtn
                      type="submit"
                      disabled={!isDirty || !isValid || isPending}
                    >
                      {isPending ? t("Saving...") : t("Save Changes")}
                    </MainBtn>
                  </div>
                </form>
              </motion.div>
            )}

            {/* CARS TAB */}
            {activeTab === "cars" && (
              <motion.div
                key="cars"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {carsLoading ? (
                  <GridSkeleton />
                ) : cars?.length ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cars.map((car) => (
                      <BrowseCarCard key={car.id} car={car} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">{t("No cars found")}</p>
                )}
              </motion.div>
            )}

            {/* FAVS TAB */}
            {activeTab === "favs" && (
              <motion.div
                key="favs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {favsLoading ? (
                  <GridSkeleton />
                ) : favs?.length ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favs.map((car) => (
                      <BrowseCarCard key={car.id} car={car} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">
                    {t("No favourites yet")}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
