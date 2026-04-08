import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

export interface SubType {
  label: string;
  value: string;
}

const useGetVehicleSubtype = (type?: string) => {
  const {
    i18n: { language },
  } = useTranslation();
  return useQuery({
    enabled: Boolean(type),
    queryKey: [apiRoutes.vehicleSubType, type, language],
    queryFn: async () => {
      const response: AxiosResponse<Response<SubType[]>> = await Axios.get(
        `${apiRoutes.vehicleSubType}/${type}`,
      );
      return response.data.data;
    },
  });
};

export default useGetVehicleSubtype;
