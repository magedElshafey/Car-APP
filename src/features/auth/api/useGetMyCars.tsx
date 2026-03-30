import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useAuth } from "@/store/AuthProvider";
import { CarListing } from "@/features/browse/types/car.types";
const useGetMyCars = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: [apiRoutes.myCars],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.myCars);
      return data?.data as CarListing[];
    },
    ...delayOptions,
    enabled: !!user,
  });
};

export default useGetMyCars;
