import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";

const useGetSliders = () => {
  return useQuery({
    queryKey: [apiRoutes.sliders],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.sliders);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export default useGetSliders;
