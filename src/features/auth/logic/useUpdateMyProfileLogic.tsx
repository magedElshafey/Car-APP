// useUpdateMyProfileLogic.ts
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/store/AuthProvider";
import useChangeMyProfileData from "@/features/auth/api/useChangeMyProfileData";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

import type { UpdateProfileFormValues } from "../schema/schema";
import type { User } from "@/features/auth/types/auth.types";
import handlePromisError from "@/utils/handlePromiseError";
import { toast } from "sonner";

const useUpdateMyProfileLogic = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();
  const { mutateAsync, isPending } = useChangeMyProfileData();

  const onSubmit = useCallback(
    async (values: UpdateProfileFormValues) => {
      const oldData = queryClient.getQueryData<User>([apiRoutes.profile]);

      // 🧠 check if changed
      const isSame =
        oldData &&
        oldData.name === values.name &&
        oldData.email === values.email &&
        oldData.phone === values.phone;

      if (isSame) return;

      // 🚀 optimistic update
      queryClient.setQueryData<User>([apiRoutes.profile], (prev) => ({
        ...prev!,
        ...values,
      }));

      try {
        const response = await mutateAsync(values);
        console.log("res from update profile", response);
        if (response?.status) {
          toast.success(response?.message);
          updateUser(values);
          queryClient.invalidateQueries({ queryKey: [[apiRoutes.profile]] });
        }
      } catch (error) {
        handlePromisError(error);
        queryClient.setQueryData([apiRoutes.profile], oldData);
      }
    },
    [mutateAsync, queryClient, updateUser],
  );

  return {
    onSubmit,
    isPending,
  };
};

export default useUpdateMyProfileLogic;
