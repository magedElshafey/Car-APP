import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FuelType } from "../types/fuel-type.types";

const useGetFuelTypes = () => {
    const {i18n: {language}} = useTranslation();
    return useQuery({
        queryKey: [apiRoutes.fuelTypes, language],
        queryFn: async () => {
            const response = await Axios.get<Response<FuelType[]>>(apiRoutes.fuelTypes);
            return response.data.data;
        }
    })

}

export default useGetFuelTypes;