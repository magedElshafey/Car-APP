import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes"
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next"

export interface VehicleType {
    label: string;
    value: string;
}

const useGetVehicleType = () => {
    const { i18n: {language} } = useTranslation();
    return useQuery({
        queryKey: [apiRoutes.vehicleType, language],
        queryFn: async () => {
            const response: AxiosResponse<Response<VehicleType[]>> = await Axios.get(apiRoutes.vehicleType);
            return response.data.data
        }
    });
}

export default useGetVehicleType;