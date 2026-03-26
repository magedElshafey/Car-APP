import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { User } from "@/features/auth/types/auth.types";
import { useAuth } from "@/store/AuthProvider";
const useGetMyProfileData = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: [apiRoutes?.profile],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.profile);
      return data?.data as User;
    },
    ...delayOptions,
    enabled: !!user,
  });
};

export default useGetMyProfileData;
