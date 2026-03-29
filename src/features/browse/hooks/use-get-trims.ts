import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios";

interface Trim {
    trim_name: string;
    id: number;
}

const useGetTrims = (brand_id?: number, model_id?: number, year?: string) => {
    return useQuery({
        queryKey: [model_id, brand_id, year],
        queryFn: async () => {
            const response: AxiosResponse<Response<Trim[]>> = await Axios.get(apiRoutes.trims, {
                params: {
                    brand_id,
                    model_id,
                    year
                }
            });

            return response.data.data
        },
        select: (data) => data.map(trim => ({name: trim.trim_name, id: trim.id})),
        enabled: Boolean(brand_id && model_id && year)
    });
}

export default useGetTrims