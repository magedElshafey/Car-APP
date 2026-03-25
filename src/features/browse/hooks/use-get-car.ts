import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { Response } from "@/types/Response";
import { CarListing } from "../types/car.types";

const useGetCar = (id: string | null) => {
    const { i18n: { language } } = useTranslation();

    return useQuery({
        queryKey: [apiRoutes.cars, id, language],
        queryFn: async () => {
            const response = await Axios.get<Response<CarListing>>(`${apiRoutes.cars}/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};

export default useGetCar;
