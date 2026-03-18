import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Model } from "../types/model.types";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

const useGetModels = (brand?: string) => {
    const { i18n: language } = useTranslation();
    return useQuery({
        queryKey: [apiRoutes.brands, brand, language],
        queryFn: async () => {
            const response: Response<AxiosResponse<Model[]>> = await Axios.get(apiRoutes.models, {
                params: {
                    brand_id: brand
                }
            });
            return response.data.data;
        },
        enabled: !!brand
    });
}

export default useGetModels;