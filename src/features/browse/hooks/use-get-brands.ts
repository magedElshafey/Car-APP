import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { Brand } from "../types/brand.types";
import { AxiosResponse } from "axios";

const useGetBrands = () => {
    return useQuery({
        queryKey: [apiRoutes.brands],
        queryFn: async () => {
            const response: Response<AxiosResponse<Brand[]>> = await Axios.get(apiRoutes.brands);
            return response.data.data;
        }
    });
}

export default useGetBrands;