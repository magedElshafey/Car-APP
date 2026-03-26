import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { PaginatedResponse } from "@/types/Response";
import { CarListing } from "../types/car.types";

const useSearchCars = (search: string) => {
  const trimmedSearch = search.trim();

  return useQuery({
    queryKey: [apiRoutes.cars, "compare-search", trimmedSearch],
    queryFn: async () => {
      const response = await Axios.get<PaginatedResponse<CarListing[]>>(
        apiRoutes.cars,
        {
          params: {
            search: trimmedSearch,
            per_page: 8,
          },
        },
      );

      return response.data;
    },
    enabled: trimmedSearch.length > 1,
  });
};

export default useSearchCars;