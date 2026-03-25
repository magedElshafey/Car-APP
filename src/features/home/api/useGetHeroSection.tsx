import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { useTranslation } from "react-i18next";
const useGetHeroSection = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes.hero, i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.hero);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export default useGetHeroSection;
