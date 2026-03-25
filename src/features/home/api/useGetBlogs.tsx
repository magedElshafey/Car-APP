import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useTranslation } from "react-i18next";
import type { Blog } from "@/features/blogs/types/blog.types";
const useGetBlogs = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes?.blogs, i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.blogs);
      return data?.data as Blog[];
    },
  });
};

export default useGetBlogs;
