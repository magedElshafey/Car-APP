import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import type { Articles } from "@/features/blogs/types/blog.types";

export function useGetPageByRoute(route: string) {
  return useQuery<Articles>({
    queryKey: [route],
    queryFn: async () => {
      const { data } = await Axios.get(route);
      return data as Articles;
    },
    enabled: Boolean(route),
  });
}
