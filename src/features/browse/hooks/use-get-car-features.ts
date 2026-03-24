import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
    CarFeature,
    GroupedCarFeaturesByCategory,
} from "../types/car-feature.types";

const useGetCarFeatures = () => {
    const { i18n: { language } } = useTranslation();

    return useQuery({
        queryKey: [apiRoutes.featureOptions, language],
        queryFn: async () => {
            const response = await Axios.get<Response<CarFeature[]>>(apiRoutes.featureOptions);
            return response.data.data;
        },
        select: (features: CarFeature[]): GroupedCarFeaturesByCategory => {
            return features.reduce<GroupedCarFeaturesByCategory>((acc, feature) => {
                const categoryName = feature.category.name;

                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        category: feature.category,
                        features: [],
                    };
                }

                acc[categoryName].features.push(feature);
                return acc;
            }, {});
        },
    });
}

export default useGetCarFeatures;