import { Axios } from "@/lib/axios/Axios";
import { useMutation } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { SubmitReviewValues } from "../schema/review.schema";
const useSubmitReview = () => {
  return useMutation({
    mutationFn: async (values: SubmitReviewValues) => {
      const { data } = await Axios.post(apiRoutes?.reviews, values);
      return data;
    },
  });
};

export default useSubmitReview;
