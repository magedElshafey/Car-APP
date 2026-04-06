import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { CarDetails } from "../types/car.types";
import { useTranslation } from "react-i18next";
const useGetCarById = (carId?: number | null) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["car", carId, i18n.language],
    queryFn: async () => {
      if (!carId) return null;
      const response = await Axios.get<CarDetails>(
        `${apiRoutes.cars}/${carId}`,
      );
      return response.data;
    },

    enabled: !!carId,
  });
};

export default useGetCarById;
