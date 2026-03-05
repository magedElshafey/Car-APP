import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "../types/blog.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
type Options = {
  enabled?: boolean;
};
const useGetSimpleBlogs = (options?: Options) => {
  const { enabled = true } = options ?? {};
  return useQuery({
    queryKey: [apiRoutes?.simpleBlogs],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.simpleBlogs);
      return data?.data as Articles[];
    },
    enabled,
    ...delayOptions,
  });
};

export default useGetSimpleBlogs;
