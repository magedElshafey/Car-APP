import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { Brand } from "../types/brand.types";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

const useGetBrands = () => {
    const {i18n: language} = useTranslation();
    return useQuery({
        queryKey: [apiRoutes.brands, language],
        queryFn: async () => {
            const response: Response<AxiosResponse<Brand[]>> = await Axios.get(apiRoutes.brands);
            return response.data.data;
        }
    });
}

export default useGetBrands;