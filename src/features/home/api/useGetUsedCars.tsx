import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { CarListing } from "@/features/browse/types/car.types";
import { useTranslation } from "react-i18next";
const useGetUsedCars = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes?.cars, "used", i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes.cars}?condition=used`);
      return data?.data as CarListing[];
    },
    ...delayOptions,
  });
};

export default useGetUsedCars;
