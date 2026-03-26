import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { Blog } from "@/features/blogs/types/blog.types";
import { useTranslation } from "react-i18next";
const useGetBlogDetails = (id: string) => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [apiRoutes?.blogs, id, i18n.language],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.blogs}/${id}`);
      return data?.data as Blog;
    },
    ...delayOptions,
  });
};

export default useGetBlogDetails;
