import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { HighlightType } from "../types/highlight-type.types";

const useGetHighlightTypes = () => {
  const {
    i18n: { language },
  } = useTranslation();

  return useQuery({
    queryKey: [apiRoutes.highlightTypes, language],
    queryFn: async () => {
      const response = await Axios.get<Response<HighlightType[]>>(
        apiRoutes.highlightTypes,
      );

      return response.data.data;
    },
  });
};

export default useGetHighlightTypes;
