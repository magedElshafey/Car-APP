import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export type CityOption = {
  id: number;
  name: string;
  value: string;
  image: string;
};

type RawCity = {
  id?: number | string;
  name?: string;
  label?: string;
  value?: string | number;
  city?: string;
  image: string;
};

const normalizeCityOption = (city: RawCity, index: number): CityOption => {
  const label =
    city.name || city.label || city.city || String(city.value || "");
  const value = String(city.value ?? city.id ?? label);
  const id =
    typeof city.id === "number" ? city.id : Number(city.id) || index + 1;
  const image = city.image;

  return {
    id,
    name: label,
    value,
    image,
  };
};

const useGetCities = () => {
  const {
    i18n: { language },
  } = useTranslation();

  return useQuery({
    queryKey: [apiRoutes.cities, language],
    queryFn: async () => {
      const response = await Axios.get<Response<RawCity[]>>(apiRoutes.cities);
      return (response.data.data || []).map(normalizeCityOption);
    },
  });
};

export default useGetCities;
