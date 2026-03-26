import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useTranslation } from "react-i18next";
import type { StaticPage } from "@/features/static-pages/types/static.pages.types";
const useGetAllStaticPages = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: [apiRoutes?.static, "list", i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.static}/list`);
      return data?.data as StaticPage[];
    },
    ...delayOptions,
  });
};

export default useGetAllStaticPages;
