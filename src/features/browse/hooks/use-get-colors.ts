import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Color } from "../types/color.types";

const useGetColors = () => {
    const { i18n: { language } } = useTranslation();

    return useQuery({
        queryKey: [apiRoutes.colors, language],
        queryFn: async () => {
            const response = await Axios.get<Response<Color[]>>(apiRoutes.colors);
            return response.data.data;
        }
    });
}

export default useGetColors;