// useChangeMyProfileData.ts
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { User } from "@/features/auth/types/user.types";

const useChangeMyProfileData = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      const res = await Axios.put(apiRoutes.updateProfile, data);
      return res.data;
    },
  });
};

export default useChangeMyProfileData;
