import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "../types/blog.types";

export default function useGetBlogDetails(slug: string) {
  return useQuery<Articles>({
    queryKey: [apiRoutes.blogs, slug],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes.blogs}/${slug}`);
      return data?.data as Articles;
    },
    enabled: Boolean(slug),
  });
}
