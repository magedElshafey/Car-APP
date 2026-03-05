import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { BlogCategories } from "../types/blog.types";
const useGetBlogCategories = () => {
  return useQuery({
    queryKey: [apiRoutes?.categories],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.categories);
      return data?.data as BlogCategories[];
    },
  });
};

export default useGetBlogCategories;
