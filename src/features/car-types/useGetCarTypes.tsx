import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useTranslation } from "react-i18next";
const useGetCarTypes = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes?.types, i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.types);
      return data?.data as { id: string; name: string }[];
    },
    ...delayOptions,
  });
};

export default useGetCarTypes;
