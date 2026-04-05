import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { toast } from "sonner";

const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addFavorite"],
    mutationFn: async (car_id: number) => {
      queryClient.cancelQueries({ queryKey: [apiRoutes.favorites] });
      queryClient.cancelQueries({ queryKey: [apiRoutes.cars] });
      queryClient.cancelQueries({ queryKey: [apiRoutes.favs] });
      const { data } = await Axios.post<Response<unknown>>(apiRoutes.wishlist, {
        car_id,
      });
      return data;
    },
    onSuccess: async (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cars] });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.favorites] });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.favs] });
    },
  });
};

export default useAddFavorite;
