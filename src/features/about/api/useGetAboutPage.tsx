import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useTranslation } from "react-i18next";
import type { About } from "@/features/about/api/types/about.types";
const useGetAboutPage = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes?.about, i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.about);
      return data?.data as About;
    },
    ...delayOptions,
  });
};

export default useGetAboutPage;
