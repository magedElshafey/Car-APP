import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { PaginatedResponse } from "@/types/Response";
import { CarListing } from "../types/car.types";

const useGetCars = (filters: Record<string, string> = {}) => {
  const {
    i18n: { language },
  } = useTranslation();

  return useQuery({
    queryKey: [apiRoutes.cars, language, filters],
    queryFn: async () => {
      const response = await Axios.get<PaginatedResponse<CarListing[]>>(
        apiRoutes.cars,
        {
          params: filters,
        },
      );

      return response.data;
    },
  });
};

export default useGetCars;
