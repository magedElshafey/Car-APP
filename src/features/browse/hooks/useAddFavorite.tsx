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
      const { data } = await Axios.post<Response<unknown>>(apiRoutes.wishlist, {
        car_id,
      });
      return data;
    },
    onSuccess: async (response) => {
      toast.success(response.message);
      const promises = [];
      promises.push(
        queryClient.invalidateQueries({ queryKey: [apiRoutes.cars] }),
      );
      promises.push(
        queryClient.invalidateQueries({ queryKey: [apiRoutes.favorites] }),
      );
      await Promise.all(promises);
    },
  });
};

export default useAddFavorite;
