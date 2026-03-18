import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CarType } from "../types/car-type.types";

const useGetCarTypes = () => {
    const { i18n: { language } } = useTranslation();

    return useQuery({
        queryKey: [apiRoutes.carTypes, language],
        queryFn: async () => {
            const response = await Axios.get<Response<CarType[]>>(apiRoutes.carTypes);
            return response.data.data;
        }
    });
}

export default useGetCarTypes;