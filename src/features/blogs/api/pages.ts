import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useGetPageByRoute } from "./useGetPageByRoute";

export const useGetCookies = () => useGetPageByRoute(apiRoutes.cookies);
export const useGetPrivacy = () => useGetPageByRoute(apiRoutes.privacy);
export const useGetTerms = () => useGetPageByRoute(apiRoutes.terms);
export const useGetMedical = () => useGetPageByRoute(apiRoutes.disclaimer);
